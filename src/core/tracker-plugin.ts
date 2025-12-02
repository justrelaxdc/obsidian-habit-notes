import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile, TFolder } from "obsidian";
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { parseMaybeNumber } from "../utils/misc";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/index.css";
import { DateService } from "../services/date-service";
import { TrackerOrderService } from "../services/tracker-order-service";
import { IconizeService } from "../services/iconize-service";
import { MOBILE_BREAKPOINT, ERROR_MESSAGES, MODAL_LABELS, DEBOUNCE_DELAY_MS } from "../constants";

// Managers
import { StateManager } from "./managers/state-manager";
import { SortOrderManager } from "./managers/sort-order-manager";
import { DomReorderManager } from "./managers/dom-reorder";
import { BlockManager } from "./managers/block-manager";
import { VaultEventHandlers } from "./handlers/vault-events";

export default class TrackerPlugin extends Plugin {
  settings: TrackerSettings;
  
  // Services
  private folderTreeService: FolderTreeService;
  private trackerFileService: TrackerFileService;
  private trackerOrderService: TrackerOrderService;
  private iconizeService: IconizeService;
  
  // Managers
  private stateManager: StateManager;
  private sortOrderManager: SortOrderManager;
  private domReorderManager: DomReorderManager;
  private blockManager: BlockManager;
  private vaultEventHandlers: VaultEventHandlers;
  
  // UI
  private styleEl?: HTMLStyleElement;
  private refreshBlocksDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Get active blocks (for external access)
   */
  get activeBlocks(): Set<TrackerBlockRenderChild> {
    return this.blockManager.activeBlocks;
  }

  /**
   * Check if current device is mobile (based on viewport width)
   */
  isMobileDevice(): boolean {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    
    // Initialize services
    this.folderTreeService = new FolderTreeService(this.app);
    this.folderTreeService.updateSettings(this.settings);
    this.trackerFileService = new TrackerFileService(this.app);
    this.trackerOrderService = new TrackerOrderService(this.app);
    this.iconizeService = new IconizeService(this.app);
    
    // Initialize managers
    this.stateManager = new StateManager(
      this.app,
      this.trackerFileService,
      this.folderTreeService
    );
    
    this.sortOrderManager = new SortOrderManager(
      this.settings,
      () => this.saveSettings()
    );
    
    this.blockManager = new BlockManager(
      () => this.app.workspace
    );
    
    this.domReorderManager = new DomReorderManager(
      () => this.blockManager.activeBlocks,
      (p) => this.normalizePath(p),
      (t, b) => this.blockManager.isFolderRelevant(t, b)
    );
    
    this.vaultEventHandlers = new VaultEventHandlers(
      this.sortOrderManager,
      this.stateManager,
      this.folderTreeService,
      () => this.settings,
      (p) => this.normalizePath(p),
      (p) => this.getFolderPathFromFile(p)
    );
    
    // Load Iconize data asynchronously
    this.iconizeService.loadIconizeData().then(() => {
      this.iconizeService.startWatching();
    }).catch(() => {
      // Silently fail if Iconize is not installed
    });
    
    this.addStyleSheet();
    this.addSettingTab(new TrackerSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("tracker", this.processTrackerBlock.bind(this));
    this.registerMarkdownCodeBlockProcessor("habit", this.processTrackerBlock.bind(this));

    this.addCommand({
      id: "tracker-create",
      name: "Create new tracker",
      callback: () => this.createNewTracker()
    });

    // Register vault event handlers
    this.registerEvent(
      this.app.vault.on('rename', (file, oldPath) => {
        if (file instanceof TFile || file instanceof TFolder) {
          this.vaultEventHandlers.handleRename(file, oldPath);
        }
      })
    );

    this.registerEvent(
      this.app.vault.on('delete', (file) => {
        if (file instanceof TFile && file.extension === 'md') {
          void this.vaultEventHandlers.handleFileDelete(file, file.path);
        } else if (file instanceof TFolder) {
          void this.vaultEventHandlers.handleFolderDelete(file.path);
        }
      })
    );
  }

  async onunload() {
    this.blockManager.clearAllBlocks();
    this.iconizeService.stopWatching();
  }

  // ---- Path utilities --------------------------------------------------------

  private normalizePath(path: string): string {
    if (!path) return "";
    return path
      .trim()
      .replace(/\\/g, "/")
      .replace(/\/+/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
  }

  getFolderPathFromFile(filePath: string): string {
    if (!filePath) return "";
    const normalizedPath = this.normalizePath(filePath);
    const lastSlash = normalizedPath.lastIndexOf("/");
    if (lastSlash === -1) {
      return "";
    }
    return normalizedPath.substring(0, lastSlash);
  }

  getFolderTree(folderPath: string) {
    return this.folderTreeService.getFolderTree(folderPath);
  }

  // ---- Stylesheet ------------------------------------------------------------

  private addStyleSheet() {
    if (this.styleEl) return;
    const styleEl = document.createElement("style");
    styleEl.textContent = trackerStyles;
    document.head.appendChild(styleEl);
    this.styleEl = styleEl;
    this.register(() => {
      styleEl.remove();
      if (this.styleEl === styleEl) {
        this.styleEl = undefined;
      }
    });
  }

  // ---- Code blocks -----------------------------------------------------------

  async processTrackerBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    const block = new TrackerBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.blockManager.addBlock(block);
    await block.render();
  }

  removeActiveBlock(block: TrackerBlockRenderChild) {
    this.blockManager.removeBlock(block);
  }

  async refreshBlocksForFolder(folderPath: string) {
    await this.blockManager.refreshBlocksForFolder(folderPath, (p) => this.normalizePath(p));
  }

  refreshTrackersForFile(file: TFile): void {
    this.blockManager.refreshTrackersForFile(
      file, 
      (f) => this.invalidateCacheForFile(f),
      (path) => this.refreshTracker(path)
    );
  }

  async refreshAllBlocks() {
    await this.blockManager.refreshAllBlocks();
  }

  // ---- Data Access -----------------------------------------------------------

  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    const state = await this.stateManager.ensureTrackerState(file);
    return state.fileOpts;
  }

  invalidateCacheForFolder(folderPath: string): void {
    this.stateManager.invalidateCacheForFolder(folderPath, (p) => this.normalizePath(p));
  }

  invalidateCacheForFile(file: TFile): void {
    this.stateManager.clearTrackerState(file.path);
    this.trackerFileService.invalidateFileCache(file.path);
  }

  // Simple callback registry for tracker refresh
  private trackerRefreshCallbacks = new Map<string, () => void>();

  /**
   * Register a refresh callback for a tracker
   */
  registerTrackerRefresh(filePath: string, callback: () => void): void {
    this.trackerRefreshCallbacks.set(filePath, callback);
  }

  /**
   * Unregister a refresh callback for a tracker
   */
  unregisterTrackerRefresh(filePath: string): void {
    this.trackerRefreshCallbacks.delete(filePath);
  }

  /**
   * Directly call the refresh callback for a specific tracker
   */
  refreshTracker(filePath: string): void {
    const callback = this.trackerRefreshCallbacks.get(filePath);
    if (callback) {
      callback();
    }
  }

  /**
   * Update callback registration when a tracker file is renamed
   */
  updateTrackerRefreshPath(oldPath: string, newPath: string): void {
    const callback = this.trackerRefreshCallbacks.get(oldPath);
    if (callback) {
      this.trackerRefreshCallbacks.delete(oldPath);
      this.trackerRefreshCallbacks.set(newPath, callback);
    }
  }

  handleTrackerRenamed(oldPath: string, file: TFile): void {
    this.vaultEventHandlers.handleTrackerRenamed(oldPath, file);
    // Update callback registration for the renamed file
    this.updateTrackerRefreshPath(oldPath, file.path);
    // Update icon path in Iconize service to preserve icon after rename
    this.iconizeService.updateIconPath(oldPath, file.path);
  }

  async getStartTrackingDateAsync(entries: Map<string, string | number>, file?: TFile): Promise<string | null> {
    if (!file) {
      return DateService.format(DateService.now(), this.settings.dateFormat);
    }
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }

  getStartTrackingDate(entries: Map<string, string | number>, fileOpts?: TrackerFileOptions): string | null {
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }

  calculateStreak(entries: Map<string, string | number>, endDate: Date | any, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file, startTrackingDateStr);
  }

  calculateBestStreak(entries: Map<string, string | number>, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateBestStreak(entries, this.settings, trackerType, file, startTrackingDateStr);
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const state = await this.stateManager.ensureTrackerState(file);
    return new Map(state.entries);
  }

  // ---- Tracker CRUD ----------------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string, file: TFile) {
    this.folderTreeService.invalidate(folderPath);
    await this.stateManager.ensureTrackerState(file);
    const normalizedFolderPath = this.normalizePath(folderPath);
    
    if (normalizedFolderPath) {
      const currentSortOrder = this.settings.customSortOrder?.[normalizedFolderPath] || [];
      const updatedSortOrder = currentSortOrder.filter(name => name !== file.basename);
      updatedSortOrder.unshift(file.basename);
      await this.sortOrderManager.saveSortOrderForFolder(
        normalizedFolderPath,
        updatedSortOrder,
        (p) => this.normalizePath(p)
      );
    }
    
    for (const block of Array.from(this.blockManager.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = this.normalizePath(blockFolderPath);
      if (!this.blockManager.isFolderRelevant(normalizedFolderPath, normalizedBlockPath)) continue;
      await block.render();
    }
  }

  async onTrackerDeleted(filePath: string) {
    this.stateManager.clearTrackerState(filePath);
    await this.blockManager.onTrackerDeleted(filePath);
  }

  // ---- File operations -------------------------------------------------------

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    return this.trackerFileService.ensureFileWithHeading(filePath, type);
  }

  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    return this.trackerFileService.parseFrontmatterData(frontmatter);
  }

  formatDataToYaml(data: Record<string, string | number>): string {
    return this.trackerFileService.formatDataToYaml(data);
  }

  async readValueForDate(file: TFile, dateIso: string): Promise<string | number | null> {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      const state = await this.stateManager.ensureTrackerState(file);
      const normalizedValue = parseMaybeNumber(value);
      state.entries.set(dateIso, normalizedValue);
      await this.trackerFileService.writeLogLine(file, dateIso, value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: write error", error);
      throw error;
    }
  }

  async deleteEntry(file: TFile, dateIso: string): Promise<void> {
    try {
      const state = await this.stateManager.ensureTrackerState(file);
      state.entries.delete(dateIso);
      await this.trackerFileService.deleteEntry(file, dateIso);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: delete entry error", error);
      throw error;
    }
  }

  async pickTrackerFile(): Promise<TFile | null> {
    const files = this.app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith(this.settings.trackersFolder + "/"));
    if (files.length === 0) { new Notice(MODAL_LABELS.NO_TRACKERS_FOUND); return null; }
    if (files.length === 1) return files[0];

    return new Promise(resolve => {
      new FilePickerModal(this.app, files, resolve).open();
    });
  }

  // ---- Settings --------------------------------------------------------------

  async saveSettings() { 
    await this.saveData(this.settings);
    this.folderTreeService.updateSettings(this.settings);
    this.sortOrderManager.updateSettings(this.settings);
    
    if (this.refreshBlocksDebounceTimer) {
      clearTimeout(this.refreshBlocksDebounceTimer);
    }
    this.refreshBlocksDebounceTimer = setTimeout(async () => {
      await this.refreshAllBlocks();
      this.refreshBlocksDebounceTimer = null;
    }, DEBOUNCE_DELAY_MS);
  }

  // ---- Tracker editing -------------------------------------------------------

  editTracker(file: TFile): void {
    new EditTrackerModal(this.app, this, file).open();
  }

  openEditTrackerModal(file: TFile): void {
    this.editTracker(file);
  }

  // ---- Tracker ordering ------------------------------------------------------

  async moveTrackerUp(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    const sortedTrackers = this.sortOrderManager.sortItemsByOrder(
      trackers, folderPath, (p) => this.normalizePath(p)
    );

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex <= 0) return;

    [sortedTrackers[currentIndex - 1], sortedTrackers[currentIndex]] = 
      [sortedTrackers[currentIndex], sortedTrackers[currentIndex - 1]];

    const newOrder = sortedTrackers.map(t => t.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath, newOrder, (p) => this.normalizePath(p)
    );

    await this.domReorderManager.swapTrackerElementsInDOM(folderPath, sortedTrackers);
    this.folderTreeService.invalidate(folderPath);
  }

  async moveTrackerDown(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    const sortedTrackers = this.sortOrderManager.sortItemsByOrder(
      trackers, folderPath, (p) => this.normalizePath(p)
    );

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex < 0 || currentIndex >= sortedTrackers.length - 1) return;

    [sortedTrackers[currentIndex], sortedTrackers[currentIndex + 1]] = 
      [sortedTrackers[currentIndex + 1], sortedTrackers[currentIndex]];

    const newOrder = sortedTrackers.map(t => t.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath, newOrder, (p) => this.normalizePath(p)
    );

    await this.domReorderManager.swapTrackerElementsInDOM(folderPath, sortedTrackers);
    this.folderTreeService.invalidate(folderPath);
  }

  async moveFolderUp(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    
    let folders: TFolder[];
    if (!parentFolderPath) {
      folders = this.app.vault.getRoot().children.filter(
        f => f instanceof TFolder
      ) as TFolder[];
    } else {
      const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
      if (!parentFolder || !(parentFolder instanceof TFolder)) return;
      folders = parentFolder.children.filter(
        f => f instanceof TFolder
      ) as TFolder[];
    }

    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders, parentFolderPath || '', (p) => this.normalizePath(p)
    );

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex <= 0) return;

    [sortedFolders[currentIndex - 1], sortedFolders[currentIndex]] = 
      [sortedFolders[currentIndex], sortedFolders[currentIndex - 1]];

    const newOrder = sortedFolders.map(f => f.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || '', newOrder, (p) => this.normalizePath(p)
    );

    await this.domReorderManager.reorderFolderElementsInDOM(parentFolderPath || '', sortedFolders);
    this.folderTreeService.invalidate(parentFolderPath || '');
  }

  async moveFolderDown(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    
    let folders: TFolder[];
    if (!parentFolderPath) {
      folders = this.app.vault.getRoot().children.filter(
        f => f instanceof TFolder
      ) as TFolder[];
    } else {
      const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
      if (!parentFolder || !(parentFolder instanceof TFolder)) return;
      folders = parentFolder.children.filter(
        f => f instanceof TFolder
      ) as TFolder[];
    }

    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders, parentFolderPath || '', (p) => this.normalizePath(p)
    );

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex < 0 || currentIndex >= sortedFolders.length - 1) return;

    [sortedFolders[currentIndex], sortedFolders[currentIndex + 1]] = 
      [sortedFolders[currentIndex + 1], sortedFolders[currentIndex]];

    const newOrder = sortedFolders.map(f => f.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || '', newOrder, (p) => this.normalizePath(p)
    );

    await this.domReorderManager.reorderFolderElementsInDOM(parentFolderPath || '', sortedFolders);
    this.folderTreeService.invalidate(parentFolderPath || '');
  }

  // ---- Iconize integration ---------------------------------------------------

  getIconForPath(path: string, isFile: boolean = false): string | null {
    return this.iconizeService.getIcon(path, isFile);
  }

  renderIcon(icon: string | null, container: HTMLElement): void {
    this.iconizeService.renderIcon(icon, container);
  }
}
