import type { TrackerBlockRenderChild } from "../../ui/tracker-block-render-child";
import { SCROLL_RESTORE_DELAY_2_MS, IMMEDIATE_TIMEOUT_MS, UI_CONSTANTS } from "../../constants";
import { logError } from "../../utils/notifications";

/**
 * Manages active tracker blocks and their lifecycle
 */
export class BlockManager {
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();
  private deletionTimers: Set<ReturnType<typeof setTimeout>> = new Set();

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Obsidian Workspace API not fully typed
    private readonly getWorkspace: () => any
  ) {}

  /**
   * Add a block to active blocks set
   */
  addBlock(block: TrackerBlockRenderChild): void {
    this.activeBlocks.add(block);
  }

  /**
   * Remove a block from active blocks set
   */
  removeBlock(block: TrackerBlockRenderChild): void {
    this.activeBlocks.delete(block);
  }

  /**
   * Clear all active blocks
   */
  clearAllBlocks(): void {
    // Clear all deletion timers
    this.deletionTimers.forEach(timer => clearTimeout(timer));
    this.deletionTimers.clear();
    
    this.activeBlocks.forEach(block => block.unload());
    this.activeBlocks.clear();
  }

  /**
   * Check if a folder path is relevant to a block path
   */
  isFolderRelevant(targetPath: string, blockPath: string): boolean {
    if (blockPath === targetPath) return true;
    if (!blockPath || !targetPath) return true;
    return targetPath.startsWith(`${blockPath}/`) || blockPath.startsWith(`${targetPath}/`);
  }

  /**
   * Refresh blocks for a specific folder
   */
  async refreshBlocksForFolder(
    folderPath: string,
    normalizePath: (path: string) => string
  ): Promise<void> {
    const normalizedPath = normalizePath(folderPath);
    const blocksToRefresh = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedPath, blockPath);
    });

    for (const block of blocksToRefresh) {
      try {
        await block.render();
      } catch (error) {
        logError("Tracker: error updating block", error);
      }
    }
  }

  // Note: refreshTrackersForFile removed - using signals for reactivity

  /**
   * Refresh all active blocks with scroll position preservation
   * Uses targeted queries instead of querySelectorAll('*') for better performance
   */
  async refreshAllBlocks(): Promise<void> {
    const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
    
    // Save scroll position for a container if it's scrollable
    const saveScrollIfScrollable = (el: HTMLElement | null) => {
      if (!el) return;
      const style = window.getComputedStyle(el);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll' ||
          style.overflowX === 'auto' || style.overflowX === 'scroll') {
        scrollPositions.set(el, {
          top: el.scrollTop,
          left: el.scrollLeft
        });
      }
    };
    
    const workspace = this.getWorkspace();
    for (const leaf of workspace.getLeavesOfType('markdown')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Obsidian MarkdownView type not fully typed
      const view = leaf.view as any;
      if (view && view.containerEl) {
        // Check container itself
        saveScrollIfScrollable(view.containerEl);
        
        // Known Obsidian scroll containers - use targeted queries
        const cmScroller = view.containerEl.querySelector('.cm-scroller') as HTMLElement;
        saveScrollIfScrollable(cmScroller);
        
        const previewView = view.containerEl.querySelector('.markdown-preview-view') as HTMLElement;
        saveScrollIfScrollable(previewView);
        
        // Check for other common scroll containers without querying all elements
        const cmContent = view.containerEl.querySelector('.cm-content') as HTMLElement;
        saveScrollIfScrollable(cmContent);
        
        const markdownSourceView = view.containerEl.querySelector('.markdown-source-view') as HTMLElement;
        saveScrollIfScrollable(markdownSourceView);
      }
    }
    
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        logError("Tracker: error updating block", error);
      }
    }
    
    const restoreScroll = () => {
      window.scrollTo(windowScroll.left, windowScroll.top);
      
      for (const [container, position] of scrollPositions.entries()) {
        if (container && container.isConnected) {
          try {
            container.scrollTop = position.top;
            container.scrollLeft = position.left;
          } catch {
            // Ignore errors if element is no longer available
          }
        }
      }
    };
    
    requestAnimationFrame(() => {
      restoreScroll();
      setTimeout(restoreScroll, SCROLL_RESTORE_DELAY_2_MS);
    });
  }

  /**
   * Handle tracker deletion animation
   */
  async onTrackerDeleted(filePath: string): Promise<void> {
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
          
          const timer = setTimeout(() => {
            if (tracker.isConnected) {
              tracker.remove();
            }
            this.deletionTimers.delete(timer);
          }, UI_CONSTANTS.TRANSITION_OPACITY_DURATION_MS);
          
          this.deletionTimers.add(timer);
        }
      }
    }
  }
}

