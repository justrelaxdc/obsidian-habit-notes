import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile, TFolder } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { resolveDateIso } from "../utils/date";
import { countWords, parseMaybeNumber } from "../utils/misc";
import { isTrackerValueTrue } from "../utils/validation";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/tracker.css";
import { DateService } from "../services/date-service";
import { HeatmapService } from "../services/heatmap-service";
import { ControlsRenderer } from "../services/controls-renderer";
import { TrackerRenderer } from "../services/tracker-renderer";
import { VisualizationService } from "../services/visualization-service";
import { StatisticsService } from "../services/statistics-service";
import { StatisticsRenderer } from "../services/statistics-renderer";
import { TrackerOrderService } from "../services/tracker-order-service";
import { IconizeService } from "../services/iconize-service";
import { FILE_UPDATE_DELAY_MS, ANIMATION_DURATION_MS, ANIMATION_DURATION_SHORT_MS, SCROLL_RESTORE_DELAY_2_MS, IMMEDIATE_TIMEOUT_MS, MOBILE_BREAKPOINT, CHART_CONFIG, NOTICE_TIMEOUT_MS, UI_CONSTANTS, ERROR_MESSAGES, MODAL_LABELS, CSS_CLASSES, DEBOUNCE_DELAY_MS } from "../constants";
import { getThemeColors, colorToRgba } from "../utils/theme";
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
  private heatmapService: HeatmapService;
  private controlsRenderer: ControlsRenderer;
  private trackerRenderer: TrackerRenderer;
  private visualizationService: VisualizationService;
  private statisticsService: StatisticsService;
  private statisticsRenderer: StatisticsRenderer;
  private trackerOrderService: TrackerOrderService;
  private iconizeService: IconizeService;

  private isMobileDevice(): boolean {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.folderTreeService = new FolderTreeService(this.app);
    this.folderTreeService.updateSettings(this.settings);
    this.trackerFileService = new TrackerFileService(this.app);
    this.visualizationService = new VisualizationService();
    this.statisticsService = new StatisticsService();
    this.statisticsRenderer = new StatisticsRenderer();
    this.trackerOrderService = new TrackerOrderService(this.app);
    this.iconizeService = new IconizeService(this.app);
    
    // Load Iconize data asynchronously
    this.iconizeService.loadIconizeData().then(() => {
      // Start watching for icon data file changes
      this.iconizeService.startWatching();
    }).catch(() => {
      // Silently fail if Iconize is not installed
    });
    
    // Initialize rendering services
    this.heatmapService = new HeatmapService(
      this.settings,
      (file: TFile) => this.readAllEntries(file),
      (file: TFile, dateIso: string, value: string) => this.writeLogLine(file, dateIso, value),
      (entries: Map<string, string | number>, fileOpts?: TrackerFileOptions) => {
        return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
      },
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: Map<string, string | number>) => 
        this.updateChart(chartDiv, file, dateIso, daysToShow, entries),
      (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: Map<string, string | number>) => 
        this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries)
    );
    
    this.controlsRenderer = new ControlsRenderer(
      this.settings,
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (file: TFile, dateIso: string) => this.readValueForDate(file, dateIso),
      (file: TFile) => this.readAllEntries(file),
      (file: TFile, dateIso: string, value: string) => this.writeLogLine(file, dateIso, value),
      this.heatmapService,
      (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: Map<string, string | number>) => 
        this.updateChart(chartDiv, file, dateIso, daysToShow, entries),
      (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: Map<string, string | number>) => 
        this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries)
    );
    
    this.trackerRenderer = new TrackerRenderer(
      this.settings,
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (file: TFile, dateIso: string) => this.readValueForDate(file, dateIso),
      this.controlsRenderer,
      (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) => 
        this.renderChart(container, file, dateIso, daysToShow, entries),
      (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) => 
        this.renderStats(container, file, dateIso, daysToShow, trackerType, entries),
      () => this.isMobileDevice(),
      (file: TFile) => this.editTracker(file),
      (file: TFile) => this.moveTrackerUp(file),
      (file: TFile) => this.moveTrackerDown(file),
      (path: string, isFile: boolean) => this.getIconForPath(path, isFile),
      (icon: string | null, container: HTMLElement) => this.renderIcon(icon, container)
    );
    
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


  async refreshTrackersForFile(file: TFile) {
    const refreshPromises: Promise<void>[] = [];
    for (const block of Array.from(this.activeBlocks)) {
      const trackers = block.containerEl.querySelectorAll<HTMLElement>(
        `.tracker-notes__tracker[data-file-path="${file.path}"]`,
      );
      if (trackers.length === 0) continue;

      const opts = block.getOptions();
      const view = (opts.view ?? "control").toLowerCase();
      const dateInput = block.containerEl.querySelector(".tracker-notes__date-input") as
        | HTMLInputElement
        | null;
      const activeDateIso =
        dateInput?.value || resolveDateIso(opts.date, this.settings.dateFormat);

      trackers.forEach((trackerItem) => {
        const parent = trackerItem.parentElement as HTMLElement | null;
        if (!parent) return;
        
        refreshPromises.push(
          (async () => {
            // Get frontmatter to check for changes
            const fileOpts = await this.getFileTypeFromFrontmatter(file);
            const baseName = file.basename;
            const unit = fileOpts.unit || "";
            const displayName = unit ? `${baseName} (${unit})` : baseName;
            
            // Check if path changed (rename occurred)
            const oldPath = trackerItem.dataset.filePath;
            const pathChanged = oldPath && oldPath !== file.path;
            
            // Update name in header
            const titleContainer = trackerItem.querySelector(`.${CSS_CLASSES.TRACKER_TITLE}`) as HTMLElement;
            if (titleContainer) {
              // If path changed, update icon as well
              if (pathChanged) {
                // Remove old icon if exists
                const oldIcon = titleContainer.querySelector('.iconize-icon, span[style*="margin-right"]');
                if (oldIcon) {
                  oldIcon.remove();
                }
                // Get and render new icon for new path
                const trackerIcon = this.getIconForPath(file.path, true);
                if (trackerIcon && this.renderIcon) {
                  this.renderIcon(trackerIcon, titleContainer);
                }
              }
              
              // Update only title link text and attributes
              const titleLink = titleContainer.querySelector('a.internal-link') as HTMLAnchorElement;
              if (titleLink) {
                titleLink.textContent = displayName;
                titleLink.setAttribute('href', file.path);
                titleLink.setAttribute('data-href', file.path);
              } else {
                // If titleLink doesn't exist, create it
                const link = titleContainer.createEl('a', {
                  text: displayName,
                  cls: 'internal-link',
                  href: file.path
                });
                link.setAttribute('data-href', file.path);
              }
            }
            
            // Update dataset.filePath in case of rename
            trackerItem.dataset.filePath = file.path;
            
            // Read data once
            const entries = await this.readAllEntries(file);
            
            // Update visualizations with current data
            const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
            const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
            
            const chartDiv = trackerItem.querySelector(".tracker-notes__chart") as HTMLElement;
            if (chartDiv) {
              await this.updateChart(chartDiv, file, activeDateIso, daysToShow, entries);
            }
            
            const statsDiv = trackerItem.querySelector(".tracker-notes__stats") as HTMLElement;
            if (statsDiv) {
              await this.updateStats(statsDiv, file, activeDateIso, daysToShow, trackerType, entries);
            }
            
            // Update heatmap for habit trackers
            if (trackerType === "good-habit" || trackerType === "bad-habit") {
              const heatmapDiv = trackerItem.querySelector(".tracker-notes__heatmap") as HTMLElement;
              if (heatmapDiv) {
                await this.heatmapService.updateTrackerHeatmap(heatmapDiv, file, activeDateIso, daysToShow, trackerType);
                // Обновляем dataset.trackerMode в controlsContainer для корректной работы проверки в renderControlsForDate
                const controlsContainer = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
                if (controlsContainer) {
                  controlsContainer.dataset.trackerMode = trackerType;
                }
              }
            } else if (view === "control") {
              // For metrics recreate controls to use current settings from frontmatter
              // This is especially important for scale, where minValue/maxValue may have changed
              const controlsContainer = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
              if (controlsContainer) {
                const { mode, ...optsWithoutMode } = opts;
                const mergedOpts = { ...optsWithoutMode, ...fileOpts };
                await this.controlsRenderer.renderControlsForDate(controlsContainer, file, activeDateIso, mergedOpts);
              }
            }
            // If name changed, update tracker position alphabetically
            const newBasename = file.basename;
            if (newBasename !== baseName) {
              const allTrackers = Array.from(parent.children).filter(
                (el) => el.classList.contains('tracker-notes__tracker')
              ) as HTMLElement[];
              
              // Find correct position for insertion
              let correctInsertBefore: HTMLElement | null = null;
              for (const tracker of allTrackers) {
                if (tracker === trackerItem) continue;
                const trackerPath = tracker.dataset.filePath;
                if (!trackerPath) continue;
                const trackerFile = this.app.vault.getAbstractFileByPath(trackerPath);
                if (trackerFile instanceof TFile) {
                  if (trackerFile.basename.localeCompare(newBasename, undefined, { sensitivity: "base" }) > 0) {
                    correctInsertBefore = tracker;
                    break;
                  }
                }
              }
              
              // Move tracker
              if (correctInsertBefore && correctInsertBefore !== trackerItem) {
                parent.insertBefore(trackerItem, correctInsertBefore);
              } else if (!correctInsertBefore) {
                // Should be last
                parent.appendChild(trackerItem);
              }
            }
          })(),
        );
      });
    }

    if (refreshPromises.length > 0) {
      await Promise.allSettled(refreshPromises);
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

  async updateTrackerDate(trackerItem: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    const controlsContainerEl = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
    const controlsContainer = controlsContainerEl || trackerItem;
    
    // Получаем тип из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Читаем данные один раз
    const entries = await this.readAllEntries(file);
    
    // Проверяем, есть ли уже хитмап (для трекеров он находится в controlsContainer)
    const existingHeatmap = controlsContainer.querySelector(".tracker-notes__heatmap") as HTMLElement;
    
    if (trackerType === "good-habit" || trackerType === "bad-habit") {
      // Для трекеров обновляем хитмап на месте, не пересоздавая контролы
      if (existingHeatmap) {
        await this.heatmapService.updateTrackerHeatmap(existingHeatmap, file, dateIso, daysToShow, trackerType);
      } else {
        // Если хитмапа нет, пересоздаем контролы
        controlsContainer.empty();
        const { mode, ...optsWithoutMode } = opts;
        const mergedOpts = { ...optsWithoutMode, ...fileOpts };
        await this.controlsRenderer.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
      }
    } else {
      // Для метрик всегда пересоздаем контролы с новой датой
      // Это гарантирует, что обработчики событий будут использовать актуальную дату
      controlsContainer.empty();
      const { mode, ...optsWithoutMode } = opts;
      const mergedOpts = { ...optsWithoutMode, ...fileOpts };
      await this.controlsRenderer.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
    }
    
    // Обновляем визуализации с новой датой и локальными данными
    // Обновляем график если он есть
    const chartDiv = trackerItem.querySelector(".tracker-notes__chart");
    if (chartDiv) {
      await this.updateChart(chartDiv as HTMLElement, file, dateIso, daysToShow, entries);
    }
    
    // Обновляем статистику если она есть
    const statsDiv = trackerItem.querySelector(".tracker-notes__stats");
    if (statsDiv) {
      await this.updateStats(statsDiv as HTMLElement, file, dateIso, daysToShow, trackerType, entries);
    }
  }

  // ---- Visualization ---------------------------------------------------------



  async renderChart(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) {
    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const unit = fileOpts.unit || "";
    
    // Для типов good-habit и bad-habit показываем хитмап вместо графика
    if (metricType === "good-habit" || metricType === "bad-habit") {
      const endDate = dateIso || resolveDateIso("today", this.settings.dateFormat);
      const days = daysToShow || this.settings.daysToShow;
      await this.heatmapService.renderTrackerHeatmap(container, file, endDate, days, metricType);
      return;
    }
    
    // Удаляем старый график, если он существует
    const existingChart = container.querySelector(".tracker-notes__chart");
    if (existingChart) {
      const chartInstance = (existingChart as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
      existingChart.remove();
    }

    const chartDiv = container.createDiv({ cls: "tracker-notes__chart" });
    const canvas = chartDiv.createEl("canvas");
    
    // Получаем цвета из темы Obsidian
    const colors = getThemeColors();
    
    // Получаем текущую дату
    const today = DateService.now();
    const todayStr = DateService.format(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    const activeDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : today;
    const activeDateStr = DateService.format(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    const endDate = activeDate.clone().add(5, 'days');
    const days = daysToShow || this.settings.daysToShow;
    const startDate = endDate.clone().subtract(days - 1, 'days');
    const entriesMap = entries ?? await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.trackerFileService.getStartTrackingDate(entriesMap, this.settings, fileOpts);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = startDate.clone().add(i, 'days');
      const dateStr = DateService.format(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
      }
      // Сохраняем индекс активной даты (даты, выбранной в трекере)
      if (dateStr === activeDateStr) {
        activeDateIndex = i;
      }
      
      // Форматируем дату для подписи
      let label = '';
      const m = (window as any).moment;
      if (m) {
        label = m(date.toDate()).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("en", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entriesMap.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
          numVal = countWords(String(val));
        } else if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      values.push(numVal);
      maxValue = Math.max(maxValue, numVal);
      
      // Определяем цвет точки: зеленый если в диапазоне, красный если вне диапазона (начиная со дня старта)
      // Для нейтральных точек (до дня старта, после текущей даты или когда лимиты не заданы) используем accentColor без границы
      let pointColor = colors.accentColor;
      let pointBorder = colors.accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          pointColor = colors.successColor;
          pointBorder = colors.successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = colors.errorColor;
          pointBorder = colors.errorColor;
        }
      }
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
    }
    
    // Создаем массив радиусов точек и обводок - все точки одинаковые, активная дата отмечается вертикальной линией
    const pointRadii: number[] = [];
    const pointBorderWidths: number[] = [];
    
    for (let i = 0; i < days; i++) {
      // Все точки одинаковые, не меняем border для активной точки
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    
    // Автоматически настраиваем min/max оси Y на основе лимитов и значений scale
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    
    // Находим минимальное значение из всех доступных (лимиты и scale)
    const allMinValues: number[] = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    
    // Находим максимальное значение из всех доступных (лимиты и scale)
    const allMaxValues: number[] = [maxValue]; // Добавляем максимальное значение из данных
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    // Если задан только minLimit (без maxLimit), используем minLimit * 2 как верхнюю границу
    if (minLimit !== null && maxLimit === null) {
      allMaxValues.push(minLimit * 2);
    } else if (minLimit !== null) {
      // Если заданы оба лимита, добавляем minLimit для корректного отображения
      allMaxValues.push(minLimit);
    }
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    if (scaleMinValue !== null) allMaxValues.push(scaleMinValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Если все значения нулевые и нет лимитов, устанавливаем минимальный диапазон для отображения
    if (yAxisMax === 0 && minLimit === null && maxLimit === null && scaleMinValue === null && scaleMaxValue === null) {
      yAxisMax = 1; // Минимальный диапазон для отображения нулевых значений
    }
    
    // Если max не больше min (например, только minLimit задан), расширяем диапазон вверх
    if (yAxisMax <= yAxisMin) {
      const padding = Math.max(1, Math.abs(yAxisMin) * CHART_CONFIG.PADDING_FACTOR || 1);
      yAxisMax = yAxisMin + padding;
    }
    
    // Создаем градиент для заливки
    const ctx = canvas.getContext('2d');
    let gradient: CanvasGradient | null = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, CHART_CONFIG.GRADIENT_HEIGHT);
      gradient.addColorStop(0, colorToRgba(colors.accentColor, CHART_CONFIG.OPACITY_LIGHT));
      gradient.addColorStop(1, colorToRgba(colors.accentColor, 0));
    }
    
    // Determine chart label based on metric type and unit
    let chartLabel: string;
    if (unit) {
      // Делаем первую букву заглавной для единицы измерения
      chartLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
    } else {
      chartLabel = metricType === "text" ? "Word count" : "Value";
    }
    
    // Получаем цвет для вертикальной линии (используем accent цвет с прозрачностью)
    const startLineColor = colors.startLineColor;
    
    // Функция для рисования пунктирной вертикальной линии начала отслеживания
    const drawStartLine = (chart: any, index: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const xScale = chart.scales.x;
      const xPos = xScale.getPixelForValue(index);
      
      if (xPos < chartArea.left || xPos > chartArea.right) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      // Пунктирная линия для даты начала отслеживания
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    };
    
    // Функция для рисования сплошной вертикальной линии для выбранного дня
    const drawActiveDateLine = (chart: any, index: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const xScale = chart.scales.x;
      const xPos = xScale.getPixelForValue(index);
      
      if (xPos < chartArea.left || xPos > chartArea.right) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      // Сплошная линия для выбранного дня
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    };
    
    // Валидация данных перед созданием графика
    const hasInvalidValues = values.some(v => !isFinite(v) || isNaN(v));
    if (hasInvalidValues) {
      console.error("Tracker: Invalid values in chart data", { values, labels, dateStrings });
      // Заменяем невалидные значения на 0
      const validValues = values.map(v => isFinite(v) && !isNaN(v) ? v : 0);
      values.length = 0;
      values.push(...validValues);
    }
    
    // Проверяем что все массивы имеют одинаковую длину
    if (labels.length !== values.length || values.length !== dateStrings.length) {
      console.error("Tracker: Mismatched array lengths", { 
        labels: labels.length, 
        values: values.length, 
        dateStrings: dateStrings.length 
      });
    }
    
    // Конфигурация графика Chart.js с поддержкой темы Obsidian
    const chartConfig = {
      type: 'line' as const,
      data: {
        labels: labels,
        datasets: [{
          label: chartLabel,
          data: values,
          borderColor: colors.accentColor,
          backgroundColor: gradient || colorToRgba(colors.accentColor, CHART_CONFIG.OPACITY_DARK),
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          tension: 0.4,
          pointRadius: pointRadii,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderColor: pointBorderColors,
          pointBorderWidth: pointBorderWidths,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          // Явно отключаем изменение цветов при наведении - используем функции, которые возвращают те же цвета
          pointHoverBackgroundColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBackgroundColors[index] || pointBackgroundColors[0] || colors.accentColor;
          },
          pointHoverBorderColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderColors[index] || pointBorderColors[0] || colors.accentColor;
          },
          pointHoverBorderWidth: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderWidths[index] || pointBorderWidths[0] || CHART_CONFIG.POINT_BORDER_WIDTH;
          },
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: colors.bgPrimary,
            titleColor: colors.textMuted,
            bodyColor: colors.textMuted,
            borderColor: colors.borderColor,
            borderWidth: 1,
            padding: 8,
            displayColors: false,
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                if (unit) {
                  // Делаем первую букву заглавной для единицы измерения
                  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);
                  return `${capitalizedUnit}: ${value}`;
                }
                return `${chartLabel}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: colorToRgba(colors.borderColor, CHART_CONFIG.OPACITY_MEDIUM),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: 11
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10,
            }
          },
          y: {
            grid: {
              display: true,
              color: colorToRgba(colors.borderColor, CHART_CONFIG.OPACITY_MEDIUM),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: 11
              }
            },
            beginAtZero: !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue, // Начинать с нуля только если нет лимитов и scale значений
            min: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMin : undefined,
            max: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMax : undefined
          }
        },
        interaction: {
          intersect: false,
          mode: 'index' as const
        },
        elements: {
          point: {
            hoverBackgroundColor: undefined, // Отключаем дефолтный hover цвет
            hoverBorderColor: undefined, // Отключаем дефолтный hover цвет
            hoverRadius: 5,
            hoverBorderWidth: undefined // Отключаем дефолтный hover border width
          }
        },
        onClick: (event: any, elements: any[], chart: any) => {
          // Обработчик клика на точки графика
          if (elements && elements.length > 0) {
            const element = elements[0];
            const pointIndex = element.index;
            
            // Получаем массив дат из экземпляра графика
            const dateStrings = (chart as any).dateStrings;
            if (!dateStrings) return;
            
            // Получаем дату для этой точки из массива dateStrings
            if (pointIndex >= 0 && pointIndex < dateStrings.length) {
              const clickedDateStr = dateStrings[pointIndex];
              
              // Находим dateInput в header блока
              const mainContainer = container.closest('.tracker-notes');
              const blockContainer = mainContainer?.parentElement;
              const dateInput = blockContainer?.querySelector('.tracker-notes__date-input') as HTMLInputElement;
              
              if (dateInput) {
                // Преобразуем дату в формат ISO (YYYY-MM-DD) для input type="date"
                let dateIsoValue: string;
                
                try {
                  const dateObj = DateService.parse(clickedDateStr, this.settings.dateFormat);
                  if (dateObj.isValid()) {
                    dateIsoValue = DateService.format(dateObj, 'YYYY-MM-DD');
                  } else {
                    return;
                  }
                  
                  // Устанавливаем новое значение и вызываем событие change для обновления всех трекеров
                  if (dateIsoValue) {
                    dateInput.value = dateIsoValue;
                    dateInput.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                } catch (error) {
                  console.error('Tracker: Error converting date', clickedDateStr, error);
                }
              }
            }
          }
        },
        onResize: (chart: any) => {
          // Перерисовываем вертикальную линию при изменении размера
          const startIndex = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : colors.startLineColor;
          // Перерисовываем сплошную вертикальную линию для выбранного дня при изменении размера
          const activeIdx = (chart as any).activeDateIndex !== undefined 
            ? (chart as any).activeDateIndex 
            : activeDateIndex;
          // Перерисовываем пунктирную вертикальную линию только если она не совпадает с выбранной датой
          if (startIndex !== null && startIndex !== undefined && startIndex !== activeIdx) {
            drawStartLine(chart, startIndex, lineColor);
          }
          // Перерисовываем сплошную вертикальную линию для выбранного дня (в приоритете)
          if (activeIdx !== null && activeIdx !== undefined) {
            drawActiveDateLine(chart, activeIdx, lineColor);
          }
          // Перерисовываем горизонтальные линии при изменении размера
          const minLimitValue = (chart as any).minLimit !== undefined ? (chart as any).minLimit : minLimit;
          const maxLimitValue = (chart as any).maxLimit !== undefined ? (chart as any).maxLimit : maxLimit;
          if (minLimitValue !== null && minLimitValue !== undefined) {
            drawLimitLine(chart, minLimitValue, lineColor);
          }
          if (maxLimitValue !== null && maxLimitValue !== undefined) {
            drawLimitLine(chart, maxLimitValue, lineColor);
          }
        }
      },
      plugins: [{
        id: 'startLinePlugin',
        beforeDraw: (chart: any) => {
          // Рисуем линии в beforeDraw, чтобы они были под точками (низкий z-index)
          const startIdx = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          // Получаем цвет из экземпляра графика или используем текущий
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : colors.startLineColor;
          // Рисуем сплошную вертикальную линию для выбранного дня
          const activeIdx = (chart as any).activeDateIndex !== undefined 
            ? (chart as any).activeDateIndex 
            : activeDateIndex;
          // Рисуем пунктирную вертикальную линию на дате начала отслеживания только если она не совпадает с выбранной датой
          if (startIdx !== null && startIdx !== undefined && startIdx !== activeIdx) {
            drawStartLine(chart, startIdx, lineColor);
          }
          // Рисуем сплошную вертикальную линию для выбранного дня (в приоритете)
          if (activeIdx !== null && activeIdx !== undefined) {
            drawActiveDateLine(chart, activeIdx, lineColor);
          }
          // Рисуем горизонтальные линии для лимитов успешности
          const minLimitValue = (chart as any).minLimit !== undefined ? (chart as any).minLimit : minLimit;
          const maxLimitValue = (chart as any).maxLimit !== undefined ? (chart as any).maxLimit : maxLimit;
          if (minLimitValue !== null && minLimitValue !== undefined) {
            drawLimitLine(chart, minLimitValue, lineColor);
          }
          if (maxLimitValue !== null && maxLimitValue !== undefined) {
            drawLimitLine(chart, maxLimitValue, lineColor);
          }
        }
      }]
    };
    
    // Функция для рисования горизонтальной линии
    const drawLimitLine = (chart: any, value: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const yScale = chart.scales.y;
      const yPos = yScale.getPixelForValue(value);
      
      if (yPos < chartArea.top || yPos > chartArea.bottom) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(chartArea.left, yPos);
      ctx.lineTo(chartArea.right, yPos);
      ctx.stroke();
      ctx.restore();
    };
    
    try {
      const chartInstance = new Chart(canvas, chartConfig);
      // Сохраняем экземпляр для последующего уничтожения
      (chartDiv as any).chartInstance = chartInstance;
      // Сохраняем индекс начала отслеживания и цвет в экземпляре графика
      (chartInstance as any).startTrackingIndex = startTrackingIndex;
      (chartInstance as any).startLineColor = colors.startLineColor;
      // Сохраняем массив дат для обработки клика
      (chartInstance as any).dateStrings = dateStrings;
      // Сохраняем лимиты успешности в экземпляре графика
      (chartInstance as any).minLimit = minLimit;
      (chartInstance as any).maxLimit = maxLimit;
    } catch (error) {
      console.error("Tracker: error creating chart", error);
      chartDiv.setText("Chart display error");
    }
  }

  async updateChart(chartDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) {
    const chartInstance = (chartDiv as any).chartInstance;
    if (!chartInstance) {
      // Если графика нет, создаем новый
      await this.renderChart(chartDiv.parentElement!, file, dateIso, daysToShow, entries);
      return;
    }

    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Для типов good-habit и bad-habit не обновляем график (они используют хитмап)
    if (metricType === "good-habit" || metricType === "bad-habit") {
      return;
    }

    // Получаем текущую дату
    const today = DateService.now();
    const todayStr = DateService.format(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    const activeDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : today;
    const activeDateStr = DateService.format(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    const endDate = activeDate.clone().add(5, 'days');
    const days = daysToShow || this.settings.daysToShow;
    const startDate = endDate.clone().subtract(days - 1, 'days');
    // Используем переданные entries или читаем из файла
    const entriesToUse = entries ?? await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = await this.getStartTrackingDate(entriesToUse, file);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Получаем цвета из темы Obsidian
    const colors = getThemeColors();
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = startDate.clone().add(i, 'days');
      const dateStr = DateService.format(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
      }
      // Сохраняем индекс активной даты (даты, выбранной в трекере)
      if (dateStr === activeDateStr) {
        activeDateIndex = i;
      }
      
      // Форматируем дату для подписи
      let label = '';
      const m = (window as any).moment;
      if (m) {
        label = m(date.toDate()).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("en", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entriesToUse.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
          numVal = countWords(String(val));
        } else if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      values.push(numVal);
      maxValue = Math.max(maxValue, numVal);
      
      // Определяем цвет точки: зеленый если в диапазоне, красный если вне диапазона (начиная со дня старта)
      // Для нейтральных точек (до дня старта, после текущей даты или когда лимиты не заданы) используем accentColor без границы
      let pointColor = colors.accentColor;
      let pointBorder = colors.accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          pointColor = colors.successColor;
          pointBorder = colors.successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = colors.errorColor;
          pointBorder = colors.errorColor;
        }
      }
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
    }
    
    // Создаем массив радиусов точек и обводок - все точки одинаковые, активная дата отмечается вертикальной линией
    const pointRadii: number[] = [];
    const pointBorderWidths: number[] = [];
    
    for (let i = 0; i < days; i++) {
      // Все точки одинаковые, не меняем border для активной точки
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    
    // Автоматически настраиваем min/max оси Y на основе лимитов и значений scale
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    
    // Находим минимальное значение из всех доступных (лимиты и scale)
    const allMinValues: number[] = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    
    // Находим максимальное значение из всех доступных (лимиты и scale)
    const allMaxValues: number[] = [maxValue]; // Добавляем максимальное значение из данных
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    // Если задан только minLimit (без maxLimit), используем minLimit * 2 как верхнюю границу
    if (minLimit !== null && maxLimit === null) {
      allMaxValues.push(minLimit * 2);
    } else if (minLimit !== null) {
      // Если заданы оба лимита, добавляем minLimit для корректного отображения
      allMaxValues.push(minLimit);
    }
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    if (scaleMinValue !== null) allMaxValues.push(scaleMinValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Если все значения нулевые и нет лимитов, устанавливаем минимальный диапазон для отображения
    if (yAxisMax === 0 && minLimit === null && maxLimit === null && scaleMinValue === null && scaleMaxValue === null) {
      yAxisMax = 1; // Минимальный диапазон для отображения нулевых значений
    }
    
    // Если max не больше min (например, задан только minLimit), расширяем диапазон вверх
    if (yAxisMax <= yAxisMin) {
      const padding = Math.max(1, Math.abs(yAxisMin) * CHART_CONFIG.PADDING_FACTOR || 1);
      yAxisMax = yAxisMin + padding;
    }
    
    // Сохраняем индекс начала отслеживания и цвет в экземпляре графика для использования плагином
    (chartInstance as any).startTrackingIndex = startTrackingIndex;
    (chartInstance as any).startLineColor = colors.startLineColor;
    // Сохраняем массив дат для обработки клика
    (chartInstance as any).dateStrings = dateStrings;
    // Сохраняем лимиты успешности в экземпляре графика
    (chartInstance as any).minLimit = minLimit;
    (chartInstance as any).maxLimit = maxLimit;
    // Сохраняем индекс активной даты для использования в hover функциях
    (chartInstance as any).activeDateIndex = activeDateIndex;
    
    // Обновляем данные графика
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = values;
    chartInstance.data.datasets[0].pointBackgroundColor = pointBackgroundColors;
    chartInstance.data.datasets[0].pointBorderColor = pointBorderColors;
    chartInstance.data.datasets[0].pointRadius = pointRadii;
    chartInstance.data.datasets[0].pointBorderWidth = pointBorderWidths;
    
    // Обновляем настройки оси Y
    if (chartInstance.options && chartInstance.options.scales && chartInstance.options.scales.y) {
      chartInstance.options.scales.y.beginAtZero = !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue;
      chartInstance.options.scales.y.min = (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMin : undefined;
      chartInstance.options.scales.y.max = (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMax : undefined;
    }
    
    chartInstance.update('none'); // 'none' для мгновенного обновления без анимации
  }

  async updateStats(statsDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) {
    // Используем переданные entries или читаем из файла
    const entriesToUse = entries ?? await this.readAllEntries(file);
    
    // Получаем тип трекера из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = trackerType || (fileOpts.mode ?? "good-habit").toLowerCase();
    
    const endDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : DateService.now();
    const days = daysToShow || this.settings.daysToShow;
    const dateIsoFormatted = DateService.format(endDate, this.settings.dateFormat);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = await this.getStartTrackingDate(entriesToUse, file);
    
    // Используем StatisticsService для расчета статистики
    const result = this.statisticsService.calculateStatistics(
      entriesToUse,
      this.settings,
      dateIsoFormatted,
      days,
      metricType,
      endDate,
      file,
      startTrackingDateStr
    );
    
    // Используем StatisticsRenderer для отображения статистики
    this.statisticsRenderer.renderStats(statsDiv, result, fileOpts);
  }

  async renderStats(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) {
    const statsDiv = container.createDiv({ cls: "tracker-notes__stats" });
    await this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries);
  }
  
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
  
  async getStartTrackingDate(entries: Map<string, string | number>, file?: TFile): Promise<string | null> {
    if (!file) {
      return DateService.format(DateService.now(), this.settings.dateFormat);
    }
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
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
    return state.entries;
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string, file: TFile) {
    this.folderTreeService.invalidate(folderPath);
    // Загружаем данные в бекенд (первичная загрузка)
    await this.ensureTrackerState(file);
    const normalizedFolderPath = this.normalizePath(folderPath);
    
    // Обновляем customSortOrder: добавляем новый трекер в начало
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
    
    // Динамически добавляем новый трекер без полной перерисовки
    for (const block of Array.from(this.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = this.normalizePath(blockFolderPath);
      if (!this.isFolderRelevant(normalizedFolderPath, normalizedBlockPath)) continue;
      
      const opts = block.getOptions();
      const view = (opts.view ?? "control").toLowerCase();
      const dateInput = block.containerEl.querySelector(".tracker-notes__date-input") as HTMLInputElement | null;
      const activeDateIso = dateInput?.value || resolveDateIso(opts.date, this.settings.dateFormat);
      
      const trackersContainers = Array.from(
        block.containerEl.querySelectorAll<HTMLElement>(
          `.tracker-notes__trackers[data-folder-path="${normalizedFolderPath}"]`
        )
      );
      
      // Если контейнер не найден (например, новая папка), перерисовываем весь блок
      if (trackersContainers.length === 0) {
        await block.render();
        continue;
      }
      
      for (const trackersContainer of trackersContainers) {
        // Получаем все трекеры в папке в правильном порядке согласно customSortOrder
        const folder = this.app.vault.getAbstractFileByPath(normalizedFolderPath);
        if (!folder || !(folder instanceof TFolder)) continue;
        
        const allTrackers = folder.children.filter(
          f => f instanceof TFile && f.extension === "md"
        ) as TFile[];
        
        const sortedTrackers = this.sortItemsByOrder(allTrackers, normalizedFolderPath);
        
        // Находим позицию нового трекера в отсортированном списке
        const newTrackerIndex = sortedTrackers.findIndex(t => t.path === file.path);
        if (newTrackerIndex < 0) continue; // Трекер не найден, пропускаем
        
        // Рендерим новый трекер
        await this.trackerRenderer.renderTracker(trackersContainer, file, activeDateIso, view, opts);
        
        const newTracker = trackersContainer.querySelector(
          `.tracker-notes__tracker[data-file-path="${file.path}"]`
        ) as HTMLElement;
        
        if (!newTracker || newTracker.parentElement !== trackersContainer) continue;
        
        // Находим элемент, перед которым нужно вставить новый трекер
        let insertBefore: HTMLElement | null = null;
        
        if (newTrackerIndex === 0) {
          // Новый трекер должен быть первым - вставляем в начало
          const firstChild = trackersContainer.firstElementChild;
          if (firstChild && firstChild !== newTracker) {
            insertBefore = firstChild as HTMLElement;
          }
        } else if (newTrackerIndex < sortedTrackers.length) {
          // Находим элемент, который должен идти после нового трекера
          const nextTracker = sortedTrackers[newTrackerIndex];
          if (nextTracker) {
            insertBefore = trackersContainer.querySelector(
              `.tracker-notes__tracker[data-file-path="${nextTracker.path}"]`
            ) as HTMLElement | null;
          }
        }
        
        // Вставляем новый трекер в правильную позицию
        if (insertBefore && insertBefore !== newTracker) {
          trackersContainer.insertBefore(newTracker, insertBefore);
        } else if (newTrackerIndex === 0) {
          // Если трекер должен быть первым, вставляем в начало
          const firstChild = trackersContainer.firstElementChild;
          if (firstChild !== newTracker) {
            trackersContainer.insertBefore(newTracker, firstChild);
          }
        }
      }
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


