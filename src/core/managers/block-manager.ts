import type { TFile } from "obsidian";
import type { TrackerBlockRenderChild } from "../../ui/tracker-block-render-child";
import { SCROLL_RESTORE_DELAY_2_MS, IMMEDIATE_TIMEOUT_MS, UI_CONSTANTS } from "../../constants";

/**
 * Manages active tracker blocks and their lifecycle
 */
export class BlockManager {
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();

  constructor(
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
        console.error("Tracker: error updating block", error);
      }
    }
  }

  /**
   * Refresh a specific tracker by calling its registered callback
   */
  refreshTrackersForFile(
    file: TFile,
    invalidateCacheForFile: (file: TFile) => void,
    refreshTracker: (filePath: string) => void
  ): void {
    invalidateCacheForFile(file);
    refreshTracker(file.path);
  }

  /**
   * Refresh all active blocks with scroll position preservation
   */
  async refreshAllBlocks(): Promise<void> {
    const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
    
    const findAndSaveScrollContainers = (root: HTMLElement) => {
      const style = window.getComputedStyle(root);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll' ||
          style.overflowX === 'auto' || style.overflowX === 'scroll') {
        scrollPositions.set(root, {
          top: root.scrollTop,
          left: root.scrollLeft
        });
      }
      
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
    
    const workspace = this.getWorkspace();
    for (const leaf of workspace.getLeavesOfType('markdown')) {
      const view = leaf.view as any;
      if (view && view.containerEl) {
        findAndSaveScrollContainers(view.containerEl);
        
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
    
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
    
    const restoreScroll = () => {
      window.scrollTo(windowScroll.left, windowScroll.top);
      
      for (const [container, position] of scrollPositions.entries()) {
        if (container && container.isConnected) {
          try {
            container.scrollTop = position.top;
            container.scrollLeft = position.left;
          } catch (e) {
            // Ignore errors if element is no longer available
          }
        }
      }
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreScroll();
        setTimeout(() => {
          restoreScroll();
        }, IMMEDIATE_TIMEOUT_MS);
        setTimeout(() => {
          restoreScroll();
        }, SCROLL_RESTORE_DELAY_2_MS);
      });
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
          
          setTimeout(() => {
            tracker.remove();
          }, UI_CONSTANTS.TRANSITION_OPACITY_DURATION_MS);
        }
      }
    }
  }
}

