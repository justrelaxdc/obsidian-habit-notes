import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile, TFolder } from "obsidian";
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { resolveDateIso } from "../utils/date";
import { parseMaybeNumber } from "../utils/misc";
import { isTrackerValueTrue } from "../utils/validation";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/tracker.css";
import { DateService } from "../services/date-service";
import { StatisticsService } from "../services/statistics-service";
import { TrackerOrderService } from "../services/tracker-order-service";
import { IconizeService } from "../services/iconize-service";
import { FILE_UPDATE_DELAY_MS, ANIMATION_DURATION_MS, ANIMATION_DURATION_SHORT_MS, SCROLL_RESTORE_DELAY_2_MS, IMMEDIATE_TIMEOUT_MS, MOBILE_BREAKPOINT, NOTICE_TIMEOUT_MS, UI_CONSTANTS, ERROR_MESSAGES, MODAL_LABELS, CSS_CLASSES, DEBOUNCE_DELAY_MS } from "../constants";
import { showNoticeIfNotMobile } from "../utils/notifications";
import { parseFilename, formatFilename } from "../utils/filename-parser";

export default class TrackerPlugin extends Plugin {
  settings: TrackerSettings;
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();
  private folderTreeService: FolderTreeService;
  private trackerFileService: TrackerFileService;
  private styleEl?: HTMLStyleElement;
  private trackerState: Map<string, { entries: Map<string, string | number>; fileOpts: TrackerFileOptions }> = new Map();
  private currentNotePath: string | null = null;
  private refreshBlocksDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private statisticsService: StatisticsService;
  private trackerOrderService: TrackerOrderService;
  private iconizeService: IconizeService;

  /**
   * Check if current device is mobile (based on viewport width)
   * Public for use by Preact components
   */
  isMobileDevice(): boolean {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.folderTreeService = new FolderTreeService(this.app);
    this.folderTreeService.updateSettings(this.settings);
    this.trackerFileService = new TrackerFileService(this.app);
    this.statisticsService = new StatisticsService();
    this.trackerOrderService = new TrackerOrderService(this.app);
    this.iconizeService = new IconizeService(this.app);
    
    // Load Iconize data asynchronously
    this.iconizeService.loadIconizeData().then(() => {
      // Start watching for icon data file changes
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

    // Register handler for file/folder rename events
    this.registerEvent(
      this.app.vault.on('rename', (file, oldPath) => {
        if (file instanceof TFile || file instanceof TFolder) {
          this.handleRename(file, oldPath);
        }
      })
    );

    // Register handler for file/folder deletion events
    this.registerEvent(
      this.app.vault.on('delete', (file) => {
        if (file instanceof TFile && file.extension === 'md') {
          void this.handleFileDelete(file, file.path);
        } else if (file instanceof TFolder) {
          void this.handleFolderDelete(file.path);
        }
      })
    );
  }

  private isFileInTrackersFolder(file: TFile): boolean {
    const fileFolderPath = this.getFolderPathFromFile(file.path);
    const trackersFolderPath = this.normalizePath(this.settings.trackersFolder);
    if (!trackersFolderPath) {
      return fileFolderPath === "";
    }
    const normalizedFilePath = this.normalizePath(file.path);
    return fileFolderPath === trackersFolderPath || normalizedFilePath.startsWith(`${trackersFolderPath}/`);
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

  addStyleSheet() {
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

  async onunload() {
    // Clear all active blocks
    this.activeBlocks.forEach(block => block.unload());
    this.activeBlocks.clear();
    
    // Stop watching icon data file
    this.iconizeService.stopWatching();
  }

  // ---- Code blocks ------------------------------------------------------------

  async processTrackerBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    // Check if note changed (new note opened)
    const notePath = ctx.sourcePath || null;
    if (notePath !== this.currentNotePath) {
      // New note opened - clear all caches to show fresh data
      await this.clearAllCaches();
      this.currentNotePath = notePath;
    }
    
    const block = new TrackerBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.activeBlocks.add(block);
    await block.render();
  }

  removeActiveBlock(block: TrackerBlockRenderChild) {
    this.activeBlocks.delete(block);
  }

  private isFolderRelevant(targetPath: string, blockPath: string): boolean {
    if (blockPath === targetPath) return true;
    if (!blockPath || !targetPath) return true;
    return targetPath.startsWith(`${blockPath}/`) || blockPath.startsWith(`${targetPath}/`);
  }

  async refreshBlocksForFolder(folderPath: string) {
    const normalizedPath = this.normalizePath(folderPath);
    const blocksToRefresh = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedPath, blockPath);
    });

    for (const block of blocksToRefresh) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
  }

  /**
   * Reorders tracker DOM elements in place without full re-rendering
   * This preserves icons and other DOM content
   * Works independently of file system - uses only passed data
   * @param folderPath Path to the folder containing trackers
   * @param trackersInNewOrder Array of files in the desired order
   */
  private async swapTrackerElementsInDOM(
    folderPath: string,
    trackersInNewOrder: TFile[]
  ): Promise<void> {
    const normalizedFolderPath = this.normalizePath(folderPath);

    // Find all active blocks containing this folder
    const relevantBlocks = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedFolderPath, blockPath);
    });

    // Process each block
    for (const block of relevantBlocks) {
      // Find trackers container for this folder
      const trackersContainers = block.containerEl.querySelectorAll<HTMLElement>(
        `.tracker-notes__trackers[data-folder-path="${normalizedFolderPath}"]`
      );

      for (const trackersContainer of Array.from(trackersContainers)) {
        // Find all tracker elements by file paths
        const trackerElementsMap = new Map<string, HTMLElement>();
        
        for (const file of trackersInNewOrder) {
          const trackerElement = trackersContainer.querySelector<HTMLElement>(
            `.tracker-notes__tracker[data-file-path="${file.path}"]`
          );
          if (trackerElement) {
            trackerElementsMap.set(file.path, trackerElement);
          }
        }

        // Create array of tracker elements in correct order based on trackersInNewOrder
        const sortedTrackerElements: HTMLElement[] = [];
        for (const file of trackersInNewOrder) {
          const element = trackerElementsMap.get(file.path);
          if (element) {
            sortedTrackerElements.push(element);
          }
        }

        // Reorder elements in DOM: remove all tracker elements, then reinsert in correct order
        // Remove all tracker elements from their current positions
        for (const element of sortedTrackerElements) {
          if (element.parentElement) {
            element.remove();
          }
        }

        // Reinsert trackers in correct order at the end of container
        for (const element of sortedTrackerElements) {
          trackersContainer.appendChild(element);
        }
      }
    }
  }

  /**
   * Reorders folder DOM elements in place without full re-rendering
   * This preserves icons and all DOM content
   * Works independently of file system - uses only passed data
   * @param parentFolderPath Path to the parent folder containing folders
   * @param foldersInNewOrder Array of folders in the desired order
   */
  private async reorderFolderElementsInDOM(
    parentFolderPath: string,
    foldersInNewOrder: TFolder[]
  ): Promise<void> {
    const normalizedParentPath = this.normalizePath(parentFolderPath);

    // Find all active blocks containing this parent folder
    const relevantBlocks = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedParentPath, blockPath);
    });

    // Process each block
    for (const block of relevantBlocks) {
      // Find hierarchy container (root of folder nodes)
      const hierarchyContainer = block.containerEl.querySelector<HTMLElement>(
        `.tracker-notes__hierarchy`
      );
      if (!hierarchyContainer) continue;

      // Find parent container for folders at this level
      // It could be hierarchy itself (for root level) or a folder-node (for nested levels)
      let parentContainer: HTMLElement | null = null;
      
      // For root level (empty or root parentFolderPath), use hierarchy directly
      if (!parentFolderPath || parentFolderPath === '' || parentFolderPath === '/') {
        parentContainer = hierarchyContainer;
      } else {
        // For nested levels, find the parent folder-node by its data-folder-path
        const allFolderNodes = hierarchyContainer.querySelectorAll<HTMLElement>(`.tracker-notes__folder-node`);
        for (const folderNode of Array.from(allFolderNodes)) {
          // Check data-folder-path on the folder-node itself first
          const nodeFolderPath = this.normalizePath(folderNode.dataset.folderPath || '');
          if (nodeFolderPath === normalizedParentPath) {
            parentContainer = folderNode;
            break;
          }
          // Fallback: check trackersContainer if dataset not available
          if (!parentContainer) {
            const trackersContainer = folderNode.querySelector<HTMLElement>(`.tracker-notes__trackers`);
            if (trackersContainer) {
              const trackersPath = this.normalizePath(trackersContainer.dataset.folderPath || '');
              if (trackersPath === normalizedParentPath) {
                parentContainer = folderNode;
                break;
              }
            }
          }
        }
        
        // If not found, use hierarchy container (fallback for root level)
        if (!parentContainer) {
          parentContainer = hierarchyContainer;
        }
      }

      if (!parentContainer) {
        console.warn(`Tracker: Could not find parent container for ${parentFolderPath}`);
        continue;
      }

      // Find all folder nodes at the same level (direct children of parentContainer)
      // These are the folders we want to reorder
      const siblings = Array.from(parentContainer.children) as HTMLElement[];
      const folderSiblings = siblings.filter(el => 
        el.classList.contains('tracker-notes__folder-node')
      );

      // Map folder elements by their paths (from DOM)
      const folderElementsMap = new Map<string, HTMLElement>();
      
      for (const folderNode of folderSiblings) {
        // Get path from folder-node dataset (set during rendering)
        // Fallback to trackersContainer if dataset not available
        let nodeFolderPath = this.normalizePath(folderNode.dataset.folderPath || '');
        if (!nodeFolderPath) {
          const trackersContainer = folderNode.querySelector<HTMLElement>(`.tracker-notes__trackers`);
          if (trackersContainer) {
            nodeFolderPath = this.normalizePath(trackersContainer.dataset.folderPath || '');
          }
        }
        
        if (nodeFolderPath) {
          folderElementsMap.set(nodeFolderPath, folderNode);
        }
      }

      // Create array of folder elements in correct order based on foldersInNewOrder
      // Only include folders that are actually present in DOM
      // Some folders might not be rendered if they have no files and no children
      const sortedFolderElements: HTMLElement[] = [];
      for (const folder of foldersInNewOrder) {
        const element = folderElementsMap.get(folder.path);
        if (element) {
          sortedFolderElements.push(element);
        }
      }

      // If we didn't find any elements, skip this block
      if (sortedFolderElements.length === 0) {
        console.warn(`Tracker: No folder elements found in DOM. Parent: ${parentFolderPath}`);
        continue;
      }

      // If we found some but not all elements, log a warning but continue
      // (some folders might not be rendered if they have no content)
      if (sortedFolderElements.length < foldersInNewOrder.length) {
        console.warn(`Tracker: Some folders not found in DOM. Expected ${foldersInNewOrder.length}, found ${sortedFolderElements.length}. Parent: ${parentFolderPath}`);
        const foundPaths = sortedFolderElements.map((element) => {
          const tc = element.querySelector<HTMLElement>(`.tracker-notes__trackers`);
          return tc?.dataset.folderPath || 'no-trackers-container';
        });
        const missingPaths = foldersInNewOrder
          .map(f => f.path)
          .filter(path => !folderElementsMap.has(path));
        console.warn(`Tracker: Missing folders:`, missingPaths);
        console.warn(`Tracker: Found folders:`, foundPaths);
      }

      // Reorder elements in DOM: remove all folder elements, then reinsert in correct order
      // Remove all folder elements from their current positions
      for (const element of sortedFolderElements) {
        if (element.parentElement) {
          element.remove();
        }
      }

      // Reinsert folders in correct order
      // Find insertion point (after last non-folder sibling or at the end)
      let insertBefore: HTMLElement | null = null;
      const remainingSiblings = Array.from(parentContainer.children) as HTMLElement[];
      for (let i = remainingSiblings.length - 1; i >= 0; i--) {
        const sibling = remainingSiblings[i];
        if (!sibling.classList.contains('tracker-notes__folder-node')) {
          insertBefore = sibling.nextSibling as HTMLElement | null;
          break;
        }
      }

      if (insertBefore) {
        // Insert before the first non-folder element after folders
        for (const element of sortedFolderElements) {
          parentContainer.insertBefore(element, insertBefore);
        }
      } else {
        // Append at the end
        for (const element of sortedFolderElements) {
          parentContainer.appendChild(element);
        }
      }
    }
  }


  /**
   * Refresh trackers for a specific file by re-rendering affected blocks
   * Simplified for Preact - just invalidate cache and re-render
   */
  async refreshTrackersForFile(file: TFile) {
    // Invalidate cache for this file
    this.invalidateCacheForFile(file);
    
    // Re-render all blocks that contain this file
    const renderPromises: Promise<void>[] = [];
    for (const block of Array.from(this.activeBlocks)) {
      const hasTracker = block.containerEl.querySelector(
        `.tracker-notes__tracker[data-file-path="${file.path}"]`
      );
      if (hasTracker) {
        renderPromises.push(block.render());
      }
    }
    
    if (renderPromises.length > 0) {
      await Promise.allSettled(renderPromises);
    }
  }

  async refreshAllBlocks() {
    // Save scroll position for all possible containers
    const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
    
    // Function to find and save scroll of all elements with overflow
    const findAndSaveScrollContainers = (root: HTMLElement) => {
      // Check the element itself
      const style = window.getComputedStyle(root);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll' ||
          style.overflowX === 'auto' || style.overflowX === 'scroll') {
        scrollPositions.set(root, {
          top: root.scrollTop,
          left: root.scrollLeft
        });
      }
      
      // Check all child elements
      const allElements = root.querySelectorAll('*');
      for (const el of Array.from(allElements) as HTMLElement[]) {
        const elStyle = window.getComputedStyle(el);
        if (elStyle.overflow === 'auto' || elStyle.overflow === 'scroll' || 
            elStyle.overflowY === 'auto' || elStyle.overflowY === 'scroll' ||
            elStyle.overflowX === 'auto' || elStyle.overflowX === 'scroll') {
          scrollPositions.set(el, {
            top: el.scrollTop,
            left: el.scrollLeft
          });
        }
      }
    };
    
    // Save scroll for all active leaves
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      const view = leaf.view as any;
      if (view && view.containerEl) {
        findAndSaveScrollContainers(view.containerEl);
        
        // Also check Obsidian-specific containers
        const cmScroller = view.containerEl.querySelector('.cm-scroller') as HTMLElement;
        if (cmScroller) {
          scrollPositions.set(cmScroller, {
            top: cmScroller.scrollTop,
            left: cmScroller.scrollLeft
          });
        }
        
        const previewView = view.containerEl.querySelector('.markdown-preview-view') as HTMLElement;
        if (previewView) {
          scrollPositions.set(previewView, {
            top: previewView.scrollTop,
            left: previewView.scrollLeft
          });
        }
      }
    }
    
    // Also save window scroll
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    
    // Update all blocks
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
    
    // Restore scroll position after DOM update
    // Use multiple requestAnimationFrame and small delay to ensure DOM is fully updated
    const restoreScroll = () => {
      // Restore window scroll
      window.scrollTo(windowScroll.left, windowScroll.top);
      
      // Restore scroll for all containers
      for (const [container, position] of scrollPositions.entries()) {
        if (container && container.isConnected) {
          try {
            container.scrollTop = position.top;
            container.scrollLeft = position.left;
          } catch (e) {
            // Игнорируем ошибки, если элемент больше не доступен
          }
        }
      }
    };
    
    // Пробуем восстановить несколько раз с разными задержками
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreScroll();
        // Также пробуем восстановить после небольшой задержки
        setTimeout(() => {
          restoreScroll();
        }, IMMEDIATE_TIMEOUT_MS);
        setTimeout(() => {
          restoreScroll();
        }, SCROLL_RESTORE_DELAY_2_MS);
      });
    });
  }

  private normalizePath(path: string): string {
    if (!path) return "";
    return path
      .trim()
      .replace(/\\/g, "/")
      .replace(/\/+/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
  }

  // Helper function to get type from frontmatter file
  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    const state = await this.ensureTrackerState(file);
    return state.fileOpts;
  }

  // ---- Data Access (used by Preact components) ---------------------------------------------------------

  private async ensureTrackerState(file: TFile) {
    const existing = this.trackerState.get(file.path);
    if (existing) {
      return existing;
    }
    
    // Первичная загрузка из файла в бекенд
    const [entries, fileOpts] = await Promise.all([
      this.trackerFileService.readAllEntries(file),
      this.trackerFileService.getFileTypeFromFrontmatter(file)
    ]);
    const state = { entries, fileOpts };
    this.trackerState.set(file.path, state);
    return state;
  }
  
  private clearTrackerState(path: string): void {
    this.trackerState.delete(path);
  }
  
  /**
   * Clears all backend state (trackerState, FolderTreeService cache)
   * Called when switching to a new note to ensure fresh data
   * Iconize cache is automatically updated by file watcher
   */
  private async clearAllCaches(): Promise<void> {
    // Clear all tracker backend state
    this.trackerState.clear();
    // Clear all folder tree cache
    this.folderTreeService.invalidate();
    // Iconize cache is automatically updated by file watcher
  }
  
  invalidateCacheForFolder(folderPath: string): void {
    const normalizedPath = this.normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (folder instanceof TFolder) {
      this.clearCacheForFolder(folder);
    }
  }

  private clearCacheForFolder(folder: TFolder): void {
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === 'md') {
        this.clearTrackerState(child.path);
      } else if (child instanceof TFolder) {
        this.clearCacheForFolder(child);
      }
    }
  }
  
  private moveTrackerState(oldPath: string, newPath: string): void {
    if (oldPath === newPath) return;
    const state = this.trackerState.get(oldPath);
    if (state) {
      this.trackerState.delete(oldPath);
      this.trackerState.set(newPath, state);
    } else {
      this.trackerState.delete(newPath);
    }
  }

  /**
   * Updates trackerState after renaming multiple files/folders
   * @param newPathsMap Map of old paths to new paths (oldPath -> newPath)
   */
  private updateTrackerStateAfterRename(newPathsMap: Map<string, string>): void {
    for (const [oldPath, newPath] of newPathsMap.entries()) {
      this.moveTrackerState(oldPath, newPath);
    }
  }

  /**
   * Updates trackerState for all trackers inside renamed folders
   * @param folderPathsMap Map of old folder paths to new folder paths (oldPath -> newPath)
   */
  private updateTrackerStateForRenamedFolders(folderPathsMap: Map<string, string>): void {
    // Create map for all file paths that need to be updated
    const filePathsMap = new Map<string, string>();
    
    for (const [oldFolderPath, newFolderPath] of folderPathsMap.entries()) {
      const oldFolder = this.app.vault.getAbstractFileByPath(oldFolderPath);
      if (!(oldFolder instanceof TFolder)) continue;
      
      // Get all markdown files in the folder recursively
      const getAllFiles = (folder: TFolder): TFile[] => {
        const files: TFile[] = [];
        for (const child of folder.children) {
          if (child instanceof TFile && child.extension === 'md') {
            files.push(child);
          } else if (child instanceof TFolder) {
            files.push(...getAllFiles(child));
          }
        }
        return files;
      };
      
      const files = getAllFiles(oldFolder);
      const normalizedOldPath = this.normalizePath(oldFolderPath);
      const normalizedNewPath = this.normalizePath(newFolderPath);
      
      for (const file of files) {
        const normalizedFilePath = this.normalizePath(file.path);
        if (normalizedFilePath.startsWith(normalizedOldPath + '/')) {
          const relativePath = normalizedFilePath.substring(normalizedOldPath.length);
          const newFilePath = normalizedNewPath + relativePath;
          filePathsMap.set(file.path, newFilePath);
        }
      }
    }
    
    // Update trackerState for all files
    this.updateTrackerStateAfterRename(filePathsMap);
  }

  /**
   * Gets normalized full path from vault root
   * Returns the full normalized path as-is, without relative calculations
   */
  private getRelativePath(fullPath: string): string {
    return this.normalizePath(fullPath);
  }

  /**
   * Gets current sort order for a folder from settings or creates alphabetical order
   */
  private getSortOrderForFolder<T extends TFile | TFolder>(
    items: T[],
    folderPath: string
  ): string[] {
    const relativePath = this.getRelativePath(folderPath);
    const sortOrder = this.settings.customSortOrder?.[relativePath];
    
    if (sortOrder && sortOrder.length > 0) {
      return sortOrder;
    }
    
    // No custom sort order - return alphabetical order
    return items
      .map(item => item instanceof TFile ? item.basename : item.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }

  /**
   * Saves sort order for a folder to settings
   */
  private async saveSortOrderForFolder(folderPath: string, order: string[]): Promise<void> {
    const relativePath = this.getRelativePath(folderPath);
    
    // Создаем новый объект для customSortOrder, чтобы изменения были замечены системой сохранения
    const updatedCustomSortOrder = this.settings.customSortOrder 
      ? { ...this.settings.customSortOrder }
      : {};
    
    updatedCustomSortOrder[relativePath] = order;
    this.settings.customSortOrder = updatedCustomSortOrder;
    await this.saveSettings();
  }

  /**
   * Sorts items using custom sort order if available, otherwise alphabetically
   */
  private sortItemsByOrder<T extends TFile | TFolder>(
    items: T[],
    folderPath: string
  ): T[] {
    const order = this.getSortOrderForFolder(items, folderPath);
    
    // Create a map for quick lookup
    const itemMap = new Map<string, T>();
    for (const item of items) {
      const itemName = item instanceof TFile ? item.basename : item.name;
      itemMap.set(itemName, item);
    }
    
    // Build sorted array based on order
    const sorted: T[] = [];
    const added = new Set<string>();
    
    // Add items in custom order
    for (const orderedName of order) {
      const item = itemMap.get(orderedName);
      if (item) {
        sorted.push(item);
        added.add(orderedName);
      }
    }
    
    // Add remaining items (new ones not in sort order) at the end, sorted alphabetically
    const remaining: T[] = [];
    for (const item of items) {
      const itemName = item instanceof TFile ? item.basename : item.name;
      if (!added.has(itemName)) {
        remaining.push(item);
      }
    }
    remaining.sort((a, b) => {
      const aName = a instanceof TFile ? a.basename : a.name;
      const bName = b instanceof TFile ? b.basename : b.name;
      return aName.localeCompare(bName, undefined, { sensitivity: "base" });
    });
    
    return [...sorted, ...remaining];
  }
  
  handleTrackerRenamed(oldPath: string, file: TFile): void {
    this.moveTrackerState(oldPath, file.path);
    // Iconize cache is automatically updated by file watcher
  }

  /**
   * Handles rename events from Obsidian vault
   */
  private handleRename(file: TFile | TFolder, oldPath: string): void {
    if (!this.settings.customSortOrder) {
      return;
    }

    const normalizedOldPath = this.normalizePath(oldPath);
    const normalizedNewPath = this.normalizePath(file.path);
    const isFolder = file instanceof TFolder;

    void this.updateCustomSortOrderOnRename(normalizedOldPath, normalizedNewPath, isFolder);
  }

  /**
   * Handles file deletion events - removes tracker from customSortOrder
   */
  private async handleFileDelete(file: TFile, filePath: string): Promise<void> {
    const folderPath = this.getFolderPathFromFile(filePath);
    if (!folderPath) return; // File was in root, skip

    // Extract basename from filePath (remove .md extension)
    const fileName = filePath.split('/').pop()?.replace(/\.md$/, '') || '';
    if (!fileName) return;

    const normalizedFolderPath = this.normalizePath(folderPath);
    const relativePath = this.getRelativePath(normalizedFolderPath);
    
    // Get current sort order for the folder
    if (!this.settings.customSortOrder?.[relativePath]) {
      return; // No sort order for this folder, nothing to update
    }

    const currentSortOrder = this.settings.customSortOrder[relativePath];
    
    // Remove fileName from array
    const updatedSortOrder = currentSortOrder.filter(name => name !== fileName);
    
    // Save updated sort order (even if array becomes empty, save it)
    await this.saveSortOrderForFolder(normalizedFolderPath, updatedSortOrder);
    
    // Invalidate cache for this folder
    this.folderTreeService.invalidate(folderPath);
  }

  /**
   * Handles folder deletion events - removes folder and all nested sort order configs
   */
  private async handleFolderDelete(folderPath: string): Promise<void> {
    if (!this.settings.customSortOrder) {
      return;
    }

    const normalizedFolderPath = this.normalizePath(folderPath);
    const relativePath = this.getRelativePath(normalizedFolderPath);
    
    // Create a copy of customSortOrder
    const updated = { ...this.settings.customSortOrder };
    let hasChanges = false;
    
    // Find all keys that should be deleted:
    // 1. Keys that exactly match the folder path
    // 2. Keys that start with folderPath + "/" (nested folders)
    const folderPathPrefix = `${relativePath}/`;
    const keysToDelete: string[] = [];
    
    for (const key of Object.keys(updated)) {
      if (key === relativePath || key.startsWith(folderPathPrefix)) {
        keysToDelete.push(key);
      }
    }
    
    // Delete all found keys
    for (const key of keysToDelete) {
      delete updated[key];
      hasChanges = true;
    }
    
    // Save updated customSortOrder if there were changes
    if (hasChanges) {
      this.settings.customSortOrder = updated;
      await this.saveSettings();
      this.folderTreeService.updateSettings(this.settings);
    }
    
    // Invalidate cache for deleted folder and all subfolders
    this.folderTreeService.invalidate(folderPath);
  }

  /**
   * Updates customSortOrder when a file or folder is renamed
   */
  private async updateCustomSortOrderOnRename(
    oldPath: string,
    newPath: string,
    isFolder: boolean
  ): Promise<void> {
    if (!this.settings.customSortOrder) {
      return;
    }

    const updated = { ...this.settings.customSortOrder };
    let hasChanges = false;

    if (isFolder) {
      // Handle folder rename
      // 1. Update keys that exactly match the old path
      if (updated[oldPath]) {
        updated[newPath] = updated[oldPath];
        delete updated[oldPath];
        hasChanges = true;
      }

      // 2. Update keys that start with oldPath + "/" (subfolders)
      const oldPathPrefix = `${oldPath}/`;
      const newPathPrefix = `${newPath}/`;
      const keysToUpdate: string[] = [];

      for (const key of Object.keys(updated)) {
        if (key.startsWith(oldPathPrefix)) {
          keysToUpdate.push(key);
        }
      }

      for (const key of keysToUpdate) {
        const newKey = key.replace(oldPathPrefix, newPathPrefix);
        updated[newKey] = updated[key];
        delete updated[key];
        hasChanges = true;
      }

      // 3. Update values in arrays where old folder name appears
      const oldFolderName = oldPath.split('/').pop() || oldPath;
      const newFolderName = newPath.split('/').pop() || newPath;

      for (const key of Object.keys(updated)) {
        const order = updated[key];
        if (Array.isArray(order)) {
          let orderChanged = false;
          const updatedOrder = order.map(item => {
            if (item === oldFolderName) {
              orderChanged = true;
              return newFolderName;
            }
            return item;
          });
          if (orderChanged) {
            updated[key] = updatedOrder;
            hasChanges = true;
          }
        }
      }
    } else {
      // Handle file rename
      // Extract basename and remove .md extension for comparison
      // In customSortOrder, file names are stored without .md extension
      const oldFullFileName = oldPath.split('/').pop() || oldPath;
      const newFullFileName = newPath.split('/').pop() || newPath;
      const oldFileName = oldFullFileName.replace(/\.md$/, '');
      const newFileName = newFullFileName.replace(/\.md$/, '');
      const oldFolderPath = this.getFolderPathFromFile(oldPath);
      const newFolderPath = this.getFolderPathFromFile(newPath);
      const normalizedOldFolderPath = this.normalizePath(oldFolderPath);
      const normalizedNewFolderPath = this.normalizePath(newFolderPath);

      // 1. Update values in arrays where old file name appears
      // Check both old and new folder paths (in case file was moved)
      const foldersToCheck = new Set<string>();
      if (normalizedOldFolderPath) {
        foldersToCheck.add(normalizedOldFolderPath);
      }
      if (normalizedNewFolderPath && normalizedNewFolderPath !== normalizedOldFolderPath) {
        foldersToCheck.add(normalizedNewFolderPath);
      }

      for (const folderPath of foldersToCheck) {
        if (updated[folderPath] && Array.isArray(updated[folderPath])) {
          const order = updated[folderPath];
          let orderChanged = false;
          const updatedOrder = order.map(item => {
            if (item === oldFileName) {
              orderChanged = true;
              return newFileName;
            }
            return item;
          });
          if (orderChanged) {
            updated[folderPath] = updatedOrder;
            hasChanges = true;
          }
        }
      }
    }

    if (hasChanges) {
      this.settings.customSortOrder = updated;
      await this.saveSettings();
      this.folderTreeService.updateSettings(this.settings);
    }
  }

  /**
   * Updates onclick handlers for folder buttons to use new path after renaming
   * @param folderElement The folder-node element
   * @param newPath The new path of the folder
   */
  private updateFolderButtonHandlers(folderElement: HTMLElement, newPath: string): void {
    // Update handlers for this folder
    const orderBtnsContainer = folderElement.querySelector<HTMLElement>(`.${CSS_CLASSES.ORDER_BTN_CONTAINER}`);
    if (orderBtnsContainer) {
      const upButton = orderBtnsContainer.querySelector<HTMLButtonElement>(`.${CSS_CLASSES.ORDER_BTN_UP}`);
      if (upButton) {
        upButton.onclick = async (e) => {
          e.stopPropagation();
          await this.moveFolderUp(newPath);
        };
      }

      const downButton = orderBtnsContainer.querySelector<HTMLButtonElement>(`.${CSS_CLASSES.ORDER_BTN_DOWN}`);
      if (downButton) {
        downButton.onclick = async (e) => {
          e.stopPropagation();
          await this.moveFolderDown(newPath);
        };
      }
    }
  }
  
  async getStartTrackingDateAsync(entries: Map<string, string | number>, file?: TFile): Promise<string | null> {
    if (!file) {
      return DateService.format(DateService.now(), this.settings.dateFormat);
    }
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }

  /**
   * Get start tracking date synchronously (for Preact components that already have fileOptions)
   */
  getStartTrackingDate(entries: Map<string, string | number>, fileOpts?: TrackerFileOptions): string | null {
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }
  
  invalidateCacheForFile(file: TFile): void {
    this.clearTrackerState(file.path);
  }

  calculateStreak(entries: Map<string, string | number>, endDate: Date | any, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file, startTrackingDateStr);
  }

  calculateBestStreak(entries: Map<string, string | number>, trackerType?: string, file?: TFile, startTrackingDateStr?: string | null): number {
    return this.trackerFileService.calculateBestStreak(entries, this.settings, trackerType, file, startTrackingDateStr);
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const state = await this.ensureTrackerState(file);
    // Return a new Map so Preact detects state changes
    return new Map(state.entries);
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string, file: TFile) {
    this.folderTreeService.invalidate(folderPath);
    // Load data to backend (initial load)
    await this.ensureTrackerState(file);
    const normalizedFolderPath = this.normalizePath(folderPath);
    
    // Update customSortOrder: add new tracker to the beginning
    if (normalizedFolderPath) {
      const relativePath = this.getRelativePath(normalizedFolderPath);
      
      // Get current sort order for the folder (or empty array)
      const currentSortOrder = this.settings.customSortOrder?.[relativePath] || [];
      
      // Remove file.basename from array if it already exists (to avoid duplicates)
      const updatedSortOrder = currentSortOrder.filter(name => name !== file.basename);
      
      // Add new tracker to the beginning
      updatedSortOrder.unshift(file.basename);
      
      // Save updated sort order
      await this.saveSortOrderForFolder(normalizedFolderPath, updatedSortOrder);
    }
    
    // Re-render all relevant blocks (Preact will handle the update efficiently)
    for (const block of Array.from(this.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = this.normalizePath(blockFolderPath);
      if (!this.isFolderRelevant(normalizedFolderPath, normalizedBlockPath)) continue;
      
      await block.render();
    }
  }

  async onTrackerDeleted(filePath: string) {
    // Удаляем состояние для удаленного файла
    this.clearTrackerState(filePath);
    
    // Находим и удаляем все трекеры с этим путем из всех активных блоков
    for (const block of Array.from(this.activeBlocks)) {
      const trackersContainers = Array.from(
        block.containerEl.querySelectorAll<HTMLElement>(".tracker-notes__trackers")
      );
      if (trackersContainers.length === 0) continue;
      
      for (const trackersContainer of trackersContainers) {
        const trackersToDelete = Array.from(trackersContainer.querySelectorAll(
          `.tracker-notes__tracker[data-file-path="${filePath}"]`
        )) as HTMLElement[];
        
        if (trackersToDelete.length === 0) continue;
        
        for (const tracker of trackersToDelete) {
          tracker.style.transition = "opacity 0.2s ease";
          tracker.style.opacity = "0";
          
          setTimeout(() => {
            tracker.remove();
          }, UI_CONSTANTS.TRANSITION_OPACITY_DURATION_MS);
        }
      }
    }
  }


  // ---- Read/Write --------------------------------------------------------

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    return this.trackerFileService.ensureFileWithHeading(filePath, type);
  }

  // Парсит YAML frontmatter и возвращает объект данных
  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    return this.trackerFileService.parseFrontmatterData(frontmatter);
  }

  // Форматирует данные в YAML формат
  formatDataToYaml(data: Record<string, string | number>): string {
    return this.trackerFileService.formatDataToYaml(data);
  }

  async readValueForDate(file: TFile, dateIso: string): Promise<string | number | null> {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      // Получаем состояние из бекенда
      const state = await this.ensureTrackerState(file);
      const normalizedValue = parseMaybeNumber(value);
      
      // Обновляем бекенд
      state.entries.set(dateIso, normalizedValue);
      
      // Записываем в файл
      await this.trackerFileService.writeLogLine(file, dateIso, value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: write error", error);
      throw error;
    }
  }

  // Simple file picker: suggests recently opened/suitable files
  async pickTrackerFile(): Promise<TFile | null> {
    const files = this.app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith(this.settings.trackersFolder + "/"));
    if (files.length === 0) { new Notice(MODAL_LABELS.NO_TRACKERS_FOUND); return null; }
    if (files.length === 1) return files[0];

    return new Promise(resolve => {
      new FilePickerModal(this.app, files, resolve).open();
    });
  }

  async saveSettings() { 
    await this.saveData(this.settings);
    this.folderTreeService.updateSettings(this.settings);
    // Debounce refresh to avoid multiple re-renders when multiple settings change quickly
    if (this.refreshBlocksDebounceTimer) {
      clearTimeout(this.refreshBlocksDebounceTimer);
    }
    this.refreshBlocksDebounceTimer = setTimeout(async () => {
      await this.refreshAllBlocks();
      this.refreshBlocksDebounceTimer = null;
    }, DEBOUNCE_DELAY_MS);
  }

  editTracker(file: TFile): void {
    new EditTrackerModal(this.app, this, file).open();
  }

  /**
   * Alias for editTracker for use by Preact components
   */
  openEditTrackerModal(file: TFile): void {
    this.editTracker(file);
  }

  async moveTrackerUp(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    // Get current sort order
    const sortedTrackers = this.sortItemsByOrder(trackers, folderPath);

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex <= 0) return; // Already first or not found

    // Swap with previous
    [sortedTrackers[currentIndex - 1], sortedTrackers[currentIndex]] = [sortedTrackers[currentIndex], sortedTrackers[currentIndex - 1]];

    // Save new order to settings
    const newOrder = sortedTrackers.map(t => t.basename);
    await this.saveSortOrderForFolder(folderPath, newOrder);

    // Update DOM immediately
    await this.swapTrackerElementsInDOM(folderPath, sortedTrackers);

    this.folderTreeService.invalidate(folderPath);
  }

  async moveTrackerDown(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    // Get current sort order
    const sortedTrackers = this.sortItemsByOrder(trackers, folderPath);

    const currentIndex = sortedTrackers.findIndex(t => t.path === file.path);
    if (currentIndex < 0 || currentIndex >= sortedTrackers.length - 1) return; // Already last or not found

    // Swap with next
    [sortedTrackers[currentIndex], sortedTrackers[currentIndex + 1]] = [sortedTrackers[currentIndex + 1], sortedTrackers[currentIndex]];

    // Save new order to settings
    const newOrder = sortedTrackers.map(t => t.basename);
    await this.saveSortOrderForFolder(folderPath, newOrder);

    // Update DOM immediately
    await this.swapTrackerElementsInDOM(folderPath, sortedTrackers);

    this.folderTreeService.invalidate(folderPath);
  }

  async moveFolderUp(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    
    // For root level folders, parentFolderPath will be empty
    let folders: TFolder[];
    if (!parentFolderPath) {
      // Root level - get folders from vault root
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

    // Get current sort order
    const sortedFolders = this.sortItemsByOrder(folders, parentFolderPath || '');

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex <= 0) return; // Already first or not found

    // Swap with previous
    [sortedFolders[currentIndex - 1], sortedFolders[currentIndex]] = [sortedFolders[currentIndex], sortedFolders[currentIndex - 1]];

    // Save new order to settings
    const newOrder = sortedFolders.map(f => f.name);
    await this.saveSortOrderForFolder(parentFolderPath || '', newOrder);

    // Update DOM immediately
    await this.reorderFolderElementsInDOM(parentFolderPath || '', sortedFolders);

    this.folderTreeService.invalidate(parentFolderPath || '');
  }

  async moveFolderDown(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    
    // For root level folders, parentFolderPath will be empty
    let folders: TFolder[];
    if (!parentFolderPath) {
      // Root level - get folders from vault root
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

    // Get current sort order
    const sortedFolders = this.sortItemsByOrder(folders, parentFolderPath || '');

    const currentIndex = sortedFolders.findIndex(f => f.path === folderPath);
    if (currentIndex < 0 || currentIndex >= sortedFolders.length - 1) return; // Already last or not found

    // Swap with next
    [sortedFolders[currentIndex], sortedFolders[currentIndex + 1]] = [sortedFolders[currentIndex + 1], sortedFolders[currentIndex]];

    // Save new order to settings
    const newOrder = sortedFolders.map(f => f.name);
    await this.saveSortOrderForFolder(parentFolderPath || '', newOrder);

    // Update DOM immediately
    await this.reorderFolderElementsInDOM(parentFolderPath || '', sortedFolders);

    this.folderTreeService.invalidate(parentFolderPath || '');
  }

  /**
   * Updates button handlers for all folders and trackers in DOM after folder renaming
   * Also updates data-folder-path and data-file-path for all nested elements
   * @param newPathsMap Map of old paths to new paths
   */
  private async updateAllFolderButtonHandlersAfterRename(newPathsMap: Map<string, string>): Promise<void> {
    // Find all active blocks
    for (const block of Array.from(this.activeBlocks)) {
      const hierarchyContainer = block.containerEl.querySelector<HTMLElement>(`.tracker-notes__hierarchy`);
      if (!hierarchyContainer) continue;

      // Find all folder nodes and update their paths and handlers
      const allFolderNodes = hierarchyContainer.querySelectorAll<HTMLElement>(`.tracker-notes__folder-node`);
      
      for (const folderNode of Array.from(allFolderNodes)) {
        const currentPath = this.normalizePath(folderNode.dataset.folderPath || '');
        if (!currentPath) continue;

        // Check if this folder or any parent folder was renamed
        let actualPath = currentPath;
        for (const [oldPath, newPath] of newPathsMap.entries()) {
          const normalizedOldPath = this.normalizePath(oldPath);
          const normalizedNewPath = this.normalizePath(newPath);
          
          if (currentPath === normalizedOldPath) {
            // This folder was renamed - get actual path from vault
            const folder = this.app.vault.getAbstractFileByPath(normalizedNewPath);
            if (folder instanceof TFolder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = normalizedNewPath;
            }
            break;
          } else if (currentPath.startsWith(normalizedOldPath + '/')) {
            // This is a nested folder inside a renamed folder
            const relativePath = currentPath.substring(normalizedOldPath.length);
            const computedNewPath = normalizedNewPath + relativePath;
            // Get actual path from vault
            const folder = this.app.vault.getAbstractFileByPath(computedNewPath);
            if (folder instanceof TFolder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = computedNewPath;
            }
            break;
          }
        }

        // Update folder path in DOM if it changed
        if (actualPath !== currentPath) {
          folderNode.dataset.folderPath = actualPath;
          const trackersContainer = folderNode.querySelector<HTMLElement>(`.tracker-notes__trackers`);
          if (trackersContainer) {
            trackersContainer.dataset.folderPath = actualPath;
          }
        }

        // Update handlers to use actual path
        this.updateFolderButtonHandlers(folderNode, actualPath);

        // Update all tracker paths inside this folder
        const trackers = folderNode.querySelectorAll<HTMLElement>(`.tracker-notes__tracker`);
        for (const tracker of Array.from(trackers)) {
          const trackerPath = this.normalizePath(tracker.dataset.filePath || '');
          if (!trackerPath) continue;

          // Check if this tracker is inside a renamed folder
          let actualTrackerPath = trackerPath;
          for (const [oldPath, newPath] of newPathsMap.entries()) {
            const normalizedOldPath = this.normalizePath(oldPath);
            const normalizedNewPath = this.normalizePath(newPath);
            
            if (trackerPath.startsWith(normalizedOldPath + '/')) {
              // This tracker is inside a renamed folder
              const relativePath = trackerPath.substring(normalizedOldPath.length);
              const computedNewPath = normalizedNewPath + relativePath;
              // Get actual path from vault
              const file = this.app.vault.getAbstractFileByPath(computedNewPath);
              if (file instanceof TFile) {
                actualTrackerPath = this.normalizePath(file.path);
              } else {
                actualTrackerPath = computedNewPath;
              }
              break;
            }
          }

          // Update tracker path in DOM if it changed
          if (actualTrackerPath !== trackerPath) {
            tracker.dataset.filePath = actualTrackerPath;
            // Update href in link if present
            const link = tracker.querySelector<HTMLAnchorElement>('a.internal-link');
            if (link) {
              link.href = actualTrackerPath;
              link.setAttribute('data-href', actualTrackerPath);
            }
          }
        }
      }
    }
  }

  // Methods for safe file modification (ignoring internal changes)

  /**
   * Gets icon for a path from Iconize plugin
   * @param path - Path to file or folder
   * @param isFile - Whether the path is a file (true) or folder (false)
   */
  getIconForPath(path: string, isFile: boolean = false): string | null {
    const icon = this.iconizeService.getIcon(path, isFile);
    return icon;
  }

  /**
   * Renders icon in a container element
   */
  renderIcon(icon: string | null, container: HTMLElement): void {
    this.iconizeService.renderIcon(icon, container);
  }
}


