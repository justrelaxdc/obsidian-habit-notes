import { MarkdownPostProcessorContext, Notice, Plugin, TFile, TFolder } from "obsidian";
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import type { DateWrapper } from "../domain/date-types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { parseMaybeNumber } from "../utils/misc";
import { normalizePath, getFolderFromFilePath } from "../utils/path";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/index.css";
import { DateService } from "../services/date-service";
import { TrackerOrderService } from "../services/tracker-order-service";
import { IconizeService } from "../services/iconize-service";
import { MOBILE_BREAKPOINT, ERROR_MESSAGES, MODAL_LABELS, DEBOUNCE_DELAY_MS, ARCHIVE_FOLDER_NAME } from "../constants";
import { trackerStore } from "../store";
import { logError } from "../utils/notifications";

// Managers
import { StateManager } from "./managers/state-manager";
import { SortOrderManager } from "./managers/sort-order-manager";
import { DomReorderManager } from "./managers/dom-reorder";
import { BlockManager } from "./managers/block-manager";
import { WriteQueueManager } from "./managers/write-queue-manager";

/**
 * Main plugin class for Tracker Habits & Metrics
 * 
 * NOTE: This class currently handles multiple responsibilities (SRP violation):
 * - CRUD operations (create/delete/edit trackers)
 * - Navigation operations (move up/down)
 * - File system operations
 * - UI orchestration
 * 
 * Future refactoring consideration:
 * - Consider splitting into TrackerCrudService (create/delete/edit operations)
 * - Consider splitting into TrackerNavigationService (move up/down operations)
 * - Keep plugin as orchestrator only
 * 
 * This is a larger refactor - evaluate effort vs benefit before proceeding.
 */
export default class TrackerPlugin extends Plugin {
  settings!: TrackerSettings;
  
  // Services
  private folderTreeService!: FolderTreeService;
  private trackerFileService!: TrackerFileService;
  private trackerOrderService!: TrackerOrderService;
  private iconizeService!: IconizeService;
  
  // Managers
  private stateManager!: StateManager;
  private sortOrderManager!: SortOrderManager;
  private domReorderManager!: DomReorderManager;
  private blockManager!: BlockManager;
  private writeQueueManager!: WriteQueueManager;
  
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
      normalizePath,
      (t, b) => this.blockManager.isFolderRelevant(t, b)
    );
    
    this.writeQueueManager = new WriteQueueManager();
    
    // Initialize global store with settings
    trackerStore.setSettings(this.settings);
    
    // Set up Iconize service with active blocks checker
    // Polling only happens when there are tracker blocks displayed
    this.iconizeService.setActiveBlocksChecker(() => this.blockManager.activeBlocks.size > 0);
    
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
    
    // Note: Vault event subscriptions for rename/delete removed.
    // Sort order cleanup is now handled lazily in FolderTreeService.
  }

  async onunload() {
    this.blockManager.clearAllBlocks();
    this.iconizeService.stopWatching();
    this.writeQueueManager.clear();
    this.folderTreeService.cleanup();
    if (this.refreshBlocksDebounceTimer) {
      clearTimeout(this.refreshBlocksDebounceTimer);
      this.refreshBlocksDebounceTimer = null;
    }
    trackerStore.clear();
  }

  // ---- Path utilities --------------------------------------------------------

  /**
   * Get folder path from a file path
   * Uses shared utility function from utils/path
   */
  getFolderPathFromFile(filePath: string): string {
    return getFolderFromFilePath(filePath);
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
    await this.blockManager.refreshBlocksForFolder(folderPath, normalizePath);
  }

  /**
   * Refresh tracker data for a specific file
   * Uses signals to trigger reactive updates
   */
  async refreshTrackersForFile(file: TFile): Promise<void> {
    // Invalidate caches
    this.invalidateCacheForFile(file);
    
    // Reload data and update store (signals will trigger re-renders)
    // Use readTrackerFile for efficient single-file read
    const { entries: entriesData, fileOpts } = await this.trackerFileService.readTrackerFile(file);
    
    trackerStore.setTrackerState(file.path, {
      entries: entriesData,
      fileOptions: fileOpts,
      lastUpdated: Date.now(),
    });
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
    this.stateManager.invalidateCacheForFolder(folderPath, normalizePath);
  }

  invalidateCacheForFile(file: TFile): void {
    this.stateManager.clearTrackerState(file.path);
    this.trackerFileService.invalidateFileCache(file.path);
  }

  // Note: trackerRefreshCallbacks removed - using signals for reactivity

  handleTrackerRenamed(oldPath: string, file: TFile): void {
    // Move tracker state to new path in both managers and store
    this.stateManager.moveTrackerState(oldPath, file.path);
    trackerStore.moveTrackerState(oldPath, file.path);
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

  calculateStreak(entries: Map<string, string | number>, endDate: Date | DateWrapper, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file, startTrackingDateStr);
  }

  calculateBestStreak(entries: Map<string, string | number>, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateBestStreak(entries, this.settings, trackerType, file, startTrackingDateStr);
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const state = await this.stateManager.ensureTrackerState(file);
    return new Map(state.entries);
  }

  async readTrackerFile(file: TFile): Promise<{
    entries: Map<string, string | number>;
    fileOpts: TrackerFileOptions;
  }> {
    return this.trackerFileService.readTrackerFile(file);
  }

  // ---- Tracker CRUD ----------------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string, file: TFile) {
    this.folderTreeService.invalidate(folderPath);
    await this.stateManager.ensureTrackerState(file);
    const normalizedFolderPath = normalizePath(folderPath);
    
    if (normalizedFolderPath) {
      const currentSortOrder = this.settings.customSortOrder?.[normalizedFolderPath] || [];
      const updatedSortOrder = currentSortOrder.filter(name => name !== file.basename);
      updatedSortOrder.unshift(file.basename);
      await this.sortOrderManager.saveSortOrderForFolder(
        normalizedFolderPath,
        updatedSortOrder,
        normalizePath
      );
    }
    
    for (const block of Array.from(this.blockManager.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = normalizePath(blockFolderPath);
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

  formatDataToJson(data: Record<string, string | number>): string {
    return this.trackerFileService.formatDataToJson(data);
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    return this.writeQueueManager.executeWrite(file, async () => {
      try {
        const state = await this.stateManager.ensureTrackerState(file);
        const normalizedValue = parseMaybeNumber(value);
        
        // Store original value for rollback on error
        const originalValue = state.entries.get(dateIso);
        
        // Optimistically update state
        state.entries.set(dateIso, normalizedValue);
        trackerStore.updateSingleEntry(file.path, dateIso, normalizedValue);
        
        try {
          // Use writeLogLineFromState to avoid re-reading the file
          await this.trackerFileService.writeLogLineFromState(file, state);
        } catch (error) {
          // Revert optimistic update on error
          if (originalValue !== undefined) {
            state.entries.set(dateIso, originalValue);
            trackerStore.updateSingleEntry(file.path, dateIso, originalValue);
          } else {
            state.entries.delete(dateIso);
            trackerStore.deleteEntry(file.path, dateIso);
          }
          const errorMsg = error instanceof Error ? error.message : String(error);
          new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
          logError("Tracker: write error", error);
          throw error;
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
        logError("Tracker: write error", error);
        throw error;
      }
    });
  }

  async deleteEntry(file: TFile, dateIso: string): Promise<void> {
    return this.writeQueueManager.executeWrite(file, async () => {
      try {
        const state = await this.stateManager.ensureTrackerState(file);
        
        // Store original value for rollback on error
        const originalValue = state.entries.get(dateIso);
        const hadValue = originalValue !== undefined;
        
        // Optimistically update state
        state.entries.delete(dateIso);
        trackerStore.deleteEntry(file.path, dateIso);
        
        try {
          // Use deleteEntryFromState to avoid re-reading the file
          await this.trackerFileService.deleteEntryFromState(file, state);
        } catch (error) {
          // Revert optimistic update on error
          if (hadValue) {
            state.entries.set(dateIso, originalValue!);
            trackerStore.updateSingleEntry(file.path, dateIso, originalValue!);
          }
          const errorMsg = error instanceof Error ? error.message : String(error);
          new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
          logError("Tracker: delete entry error", error);
          throw error;
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
        logError("Tracker: delete entry error", error);
        throw error;
      }
    });
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
    // Update signal immediately for reactive UI updates
    trackerStore.setSettings(this.settings);
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
      trackers, folderPath, normalizePath
    );

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex <= 0) return;

    [sortedTrackers[currentIndex - 1], sortedTrackers[currentIndex]] = 
      [sortedTrackers[currentIndex], sortedTrackers[currentIndex - 1]];

    const newOrder = sortedTrackers.map(t => t.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath, newOrder, normalizePath
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
      trackers, folderPath, normalizePath
    );

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex < 0 || currentIndex >= sortedTrackers.length - 1) return;

    [sortedTrackers[currentIndex], sortedTrackers[currentIndex + 1]] = 
      [sortedTrackers[currentIndex + 1], sortedTrackers[currentIndex]];

    const newOrder = sortedTrackers.map(t => t.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath, newOrder, normalizePath
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

    // Ignore folders containing archive folder name in name (case-insensitive)
    folders = folders.filter(f => !f.name.toLowerCase().includes(ARCHIVE_FOLDER_NAME));

    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders, parentFolderPath || '', normalizePath
    );

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex <= 0) return;

    [sortedFolders[currentIndex - 1], sortedFolders[currentIndex]] = 
      [sortedFolders[currentIndex], sortedFolders[currentIndex - 1]];

    const newOrder = sortedFolders.map(f => f.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || '', newOrder, normalizePath
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

    // Ignore folders containing archive folder name in name (case-insensitive)
    folders = folders.filter(f => !f.name.toLowerCase().includes(ARCHIVE_FOLDER_NAME));

    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders, parentFolderPath || '', normalizePath
    );

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex < 0 || currentIndex >= sortedFolders.length - 1) return;

    [sortedFolders[currentIndex], sortedFolders[currentIndex + 1]] = 
      [sortedFolders[currentIndex + 1], sortedFolders[currentIndex]];

    const newOrder = sortedFolders.map(f => f.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || '', newOrder, normalizePath
    );

    await this.domReorderManager.reorderFolderElementsInDOM(parentFolderPath || '', sortedFolders);
    this.folderTreeService.invalidate(parentFolderPath || '');
  }
}
