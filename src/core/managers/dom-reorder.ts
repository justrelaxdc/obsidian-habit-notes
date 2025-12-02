import type { TFile, TFolder } from "obsidian";
import type { TrackerBlockRenderChild } from "../../ui/tracker-block-render-child";
import { CSS_CLASSES } from "../../constants";
import { logWarning } from "../../utils/notifications";

/**
 * Manages DOM reordering for trackers and folders
 */
export class DomReorderManager {
  constructor(
    private readonly getActiveBlocks: () => Set<TrackerBlockRenderChild>,
    private readonly normalizePath: (path: string) => string,
    private readonly isFolderRelevant: (targetPath: string, blockPath: string) => boolean
  ) {}

  /**
   * Reorders tracker DOM elements in place without full re-rendering
   */
  async swapTrackerElementsInDOM(
    folderPath: string,
    trackersInNewOrder: TFile[]
  ): Promise<void> {
    const normalizedFolderPath = this.normalizePath(folderPath);
    const activeBlocks = this.getActiveBlocks();

    const relevantBlocks = Array.from(activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedFolderPath, blockPath);
    });

    for (const block of relevantBlocks) {
      const trackersContainers = block.containerEl.querySelectorAll<HTMLElement>(
        `.tracker-notes__trackers[data-folder-path="${normalizedFolderPath}"]`
      );

      for (const trackersContainer of Array.from(trackersContainers)) {
        const trackerElementsMap = new Map<string, HTMLElement>();
        
        for (const file of trackersInNewOrder) {
          const trackerElement = trackersContainer.querySelector<HTMLElement>(
            `.tracker-notes__tracker[data-file-path="${file.path}"]`
          );
          if (trackerElement) {
            trackerElementsMap.set(file.path, trackerElement);
          }
        }

        const sortedTrackerElements: HTMLElement[] = [];
        for (const file of trackersInNewOrder) {
          const element = trackerElementsMap.get(file.path);
          if (element) {
            sortedTrackerElements.push(element);
          }
        }

        for (const element of sortedTrackerElements) {
          if (element.parentElement) {
            element.remove();
          }
        }

        for (const element of sortedTrackerElements) {
          trackersContainer.appendChild(element);
        }
      }
    }
  }

  /**
   * Reorders folder DOM elements in place without full re-rendering
   */
  async reorderFolderElementsInDOM(
    parentFolderPath: string,
    foldersInNewOrder: TFolder[]
  ): Promise<void> {
    const normalizedParentPath = this.normalizePath(parentFolderPath);
    const activeBlocks = this.getActiveBlocks();

    const relevantBlocks = Array.from(activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedParentPath, blockPath);
    });

    for (const block of relevantBlocks) {
      const hierarchyContainer = block.containerEl.querySelector<HTMLElement>(
        `.tracker-notes__hierarchy`
      );
      if (!hierarchyContainer) continue;

      let parentContainer: HTMLElement | null = null;
      
      if (!parentFolderPath || parentFolderPath === '' || parentFolderPath === '/') {
        parentContainer = hierarchyContainer;
      } else {
        const allFolderNodes = hierarchyContainer.querySelectorAll<HTMLElement>(`.tracker-notes__folder-node`);
        for (const folderNode of Array.from(allFolderNodes)) {
          const nodeFolderPath = this.normalizePath(folderNode.dataset.folderPath || '');
          if (nodeFolderPath === normalizedParentPath) {
            parentContainer = folderNode;
            break;
          }
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
        
        if (!parentContainer) {
          parentContainer = hierarchyContainer;
        }
      }

      if (!parentContainer) {
        logWarning(`Tracker: Could not find parent container for ${parentFolderPath}`);
        continue;
      }

      const siblings = Array.from(parentContainer.children) as HTMLElement[];
      const folderSiblings = siblings.filter(el => 
        el.classList.contains('tracker-notes__folder-node')
      );

      const folderElementsMap = new Map<string, HTMLElement>();
      
      for (const folderNode of folderSiblings) {
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

      const sortedFolderElements: HTMLElement[] = [];
      for (const folder of foldersInNewOrder) {
        const element = folderElementsMap.get(folder.path);
        if (element) {
          sortedFolderElements.push(element);
        }
      }

      if (sortedFolderElements.length === 0) {
        logWarning(`Tracker: No folder elements found in DOM. Parent: ${parentFolderPath}`);
        continue;
      }

      if (sortedFolderElements.length < foldersInNewOrder.length) {
        logWarning(`Tracker: Some folders not found in DOM. Expected ${foldersInNewOrder.length}, found ${sortedFolderElements.length}. Parent: ${parentFolderPath}`);
      }

      for (const element of sortedFolderElements) {
        if (element.parentElement) {
          element.remove();
        }
      }

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
        for (const element of sortedFolderElements) {
          parentContainer.insertBefore(element, insertBefore);
        }
      } else {
        for (const element of sortedFolderElements) {
          parentContainer.appendChild(element);
        }
      }
    }
  }

  /**
   * Updates button handlers for all folders and trackers in DOM after folder renaming
   */
  async updateAllFolderButtonHandlersAfterRename(
    newPathsMap: Map<string, string>,
    getAbstractFileByPath: (path: string) => any,
    moveFolderUp: (path: string) => Promise<void>,
    moveFolderDown: (path: string) => Promise<void>
  ): Promise<void> {
    const activeBlocks = this.getActiveBlocks();
    
    for (const block of Array.from(activeBlocks)) {
      const hierarchyContainer = block.containerEl.querySelector<HTMLElement>(`.tracker-notes__hierarchy`);
      if (!hierarchyContainer) continue;

      const allFolderNodes = hierarchyContainer.querySelectorAll<HTMLElement>(`.tracker-notes__folder-node`);
      
      for (const folderNode of Array.from(allFolderNodes)) {
        const currentPath = this.normalizePath(folderNode.dataset.folderPath || '');
        if (!currentPath) continue;

        let actualPath = currentPath;
        for (const [oldPath, newPath] of newPathsMap.entries()) {
          const normalizedOldPath = this.normalizePath(oldPath);
          const normalizedNewPath = this.normalizePath(newPath);
          
          if (currentPath === normalizedOldPath) {
            const folder = getAbstractFileByPath(normalizedNewPath);
            if (folder && 'children' in folder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = normalizedNewPath;
            }
            break;
          } else if (currentPath.startsWith(normalizedOldPath + '/')) {
            const relativePath = currentPath.substring(normalizedOldPath.length);
            const computedNewPath = normalizedNewPath + relativePath;
            const folder = getAbstractFileByPath(computedNewPath);
            if (folder && 'children' in folder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = computedNewPath;
            }
            break;
          }
        }

        if (actualPath !== currentPath) {
          folderNode.dataset.folderPath = actualPath;
          const trackersContainer = folderNode.querySelector<HTMLElement>(`.tracker-notes__trackers`);
          if (trackersContainer) {
            trackersContainer.dataset.folderPath = actualPath;
          }
        }

        this.updateFolderButtonHandlers(folderNode, actualPath, moveFolderUp, moveFolderDown);

        const trackers = folderNode.querySelectorAll<HTMLElement>(`.tracker-notes__tracker`);
        for (const tracker of Array.from(trackers)) {
          const trackerPath = this.normalizePath(tracker.dataset.filePath || '');
          if (!trackerPath) continue;

          let actualTrackerPath = trackerPath;
          for (const [oldPath, newPath] of newPathsMap.entries()) {
            const normalizedOldPath = this.normalizePath(oldPath);
            const normalizedNewPath = this.normalizePath(newPath);
            
            if (trackerPath.startsWith(normalizedOldPath + '/')) {
              const relativePath = trackerPath.substring(normalizedOldPath.length);
              const computedNewPath = normalizedNewPath + relativePath;
              const file = getAbstractFileByPath(computedNewPath);
              if (file && 'extension' in file) {
                actualTrackerPath = this.normalizePath(file.path);
              } else {
                actualTrackerPath = computedNewPath;
              }
              break;
            }
          }

          if (actualTrackerPath !== trackerPath) {
            tracker.dataset.filePath = actualTrackerPath;
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

  /**
   * Updates onclick handlers for folder buttons
   */
  private updateFolderButtonHandlers(
    folderElement: HTMLElement,
    newPath: string,
    moveFolderUp: (path: string) => Promise<void>,
    moveFolderDown: (path: string) => Promise<void>
  ): void {
    const orderBtnsContainer = folderElement.querySelector<HTMLElement>(`.${CSS_CLASSES.ORDER_BTN_CONTAINER}`);
    if (orderBtnsContainer) {
      const upButton = orderBtnsContainer.querySelector<HTMLButtonElement>(`.${CSS_CLASSES.ORDER_BTN_UP}`);
      if (upButton) {
        upButton.onclick = async (e) => {
          e.stopPropagation();
          await moveFolderUp(newPath);
        };
      }

      const downButton = orderBtnsContainer.querySelector<HTMLButtonElement>(`.${CSS_CLASSES.ORDER_BTN_DOWN}`);
      if (downButton) {
        downButton.onclick = async (e) => {
          e.stopPropagation();
          await moveFolderDown(newPath);
        };
      }
    }
  }
}

