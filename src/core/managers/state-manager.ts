import type { TFile, TFolder, App } from "obsidian";
import type { TrackerFileOptions } from "../../domain/types";
import type { TrackerFileService } from "../../services/tracker-file-service";
import type { FolderTreeService } from "../../services/folder-tree-service";
import { MAX_CACHE_SIZE } from "../../constants";

export interface TrackerState {
  entries: Map<string, string | number>;
  fileOpts: TrackerFileOptions;
}

/**
 * Manages tracker state caching with LRU eviction policy
 */
export class StateManager {
  private trackerState: Map<string, TrackerState> = new Map();
  private accessOrder: string[] = []; // LRU tracking: most recently used at the end

  constructor(
    private readonly app: App,
    private readonly trackerFileService: TrackerFileService,
    private readonly folderTreeService: FolderTreeService
  ) {}

  /**
   * Update access order for LRU cache
   */
  private updateAccessOrder(filePath: string): void {
    const index = this.accessOrder.indexOf(filePath);
    if (index !== -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(filePath);
  }

  /**
   * Evict least recently used cache entry if cache is full
   */
  private evictIfNeeded(): void {
    if (this.trackerState.size >= MAX_CACHE_SIZE) {
      const lruKey = this.accessOrder.shift();
      if (lruKey) {
        this.trackerState.delete(lruKey);
      }
    }
  }

  /**
   * Ensure tracker state is loaded for a file
   */
  async ensureTrackerState(file: TFile): Promise<TrackerState> {
    const existing = this.trackerState.get(file.path);
    if (existing) {
      // Update access order for LRU
      this.updateAccessOrder(file.path);
      return existing;
    }
    
    // Evict LRU entry if cache is full
    this.evictIfNeeded();
    
    const [entries, fileOpts] = await Promise.all([
      this.trackerFileService.readAllEntries(file),
      this.trackerFileService.getFileTypeFromFrontmatter(file)
    ]);
    const state = { entries, fileOpts };
    this.trackerState.set(file.path, state);
    this.updateAccessOrder(file.path);
    return state;
  }

  /**
   * Clear tracker state for a specific path
   */
  clearTrackerState(path: string): void {
    this.trackerState.delete(path);
    const index = this.accessOrder.indexOf(path);
    if (index !== -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  /**
   * Clears all backend state (trackerState, FolderTreeService cache)
   * Use sparingly - prefer selective cache invalidation
   */
  async clearAllCaches(): Promise<void> {
    this.trackerState.clear();
    this.accessOrder = [];
    this.folderTreeService.invalidate();
  }

  /**
   * Invalidate cache for a folder and all its contents
   */
  invalidateCacheForFolder(folderPath: string, normalizePath: (p: string) => string): void {
    const normalizedPath = normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (folder instanceof this.app.vault.adapter.constructor) {
      // This is a workaround since we can't import TFolder here directly
    }
    // Use duck typing to check if it's a folder
    if (folder && 'children' in folder) {
      this.clearCacheForFolder(folder as TFolder);
    }
  }

  private clearCacheForFolder(folder: TFolder): void {
    for (const child of folder.children) {
      if ('extension' in child && (child as TFile).extension === 'md') {
        this.clearTrackerState(child.path);
      } else if ('children' in child) {
        this.clearCacheForFolder(child as TFolder);
      }
    }
  }

  /**
   * Move tracker state from old path to new path
   */
  moveTrackerState(oldPath: string, newPath: string): void {
    if (oldPath === newPath) return;
    const state = this.trackerState.get(oldPath);
    if (state) {
      this.trackerState.delete(oldPath);
      this.trackerState.set(newPath, state);
      
      // Update access order
      const index = this.accessOrder.indexOf(oldPath);
      if (index !== -1) {
        this.accessOrder[index] = newPath;
      }
    } else {
      this.trackerState.delete(newPath);
      const index = this.accessOrder.indexOf(newPath);
      if (index !== -1) {
        this.accessOrder.splice(index, 1);
      }
    }
  }

  /**
   * Updates trackerState after renaming multiple files/folders
   */
  updateTrackerStateAfterRename(newPathsMap: Map<string, string>): void {
    for (const [oldPath, newPath] of newPathsMap.entries()) {
      this.moveTrackerState(oldPath, newPath);
    }
  }

  /**
   * Updates trackerState for all trackers inside renamed folders
   */
  updateTrackerStateForRenamedFolders(
    folderPathsMap: Map<string, string>,
    normalizePath: (p: string) => string
  ): void {
    const filePathsMap = new Map<string, string>();
    
    for (const [oldFolderPath, newFolderPath] of folderPathsMap.entries()) {
      const oldFolder = this.app.vault.getAbstractFileByPath(oldFolderPath);
      if (!oldFolder || !('children' in oldFolder)) continue;
      
      const getAllFiles = (folder: TFolder): TFile[] => {
        const files: TFile[] = [];
        for (const child of folder.children) {
          if ('extension' in child && (child as TFile).extension === 'md') {
            files.push(child as TFile);
          } else if ('children' in child) {
            files.push(...getAllFiles(child as TFolder));
          }
        }
        return files;
      };
      
      const files = getAllFiles(oldFolder as TFolder);
      const normalizedOldPath = normalizePath(oldFolderPath);
      const normalizedNewPath = normalizePath(newFolderPath);
      
      for (const file of files) {
        const normalizedFilePath = normalizePath(file.path);
        if (normalizedFilePath.startsWith(normalizedOldPath + '/')) {
          const relativePath = normalizedFilePath.substring(normalizedOldPath.length);
          const newFilePath = normalizedNewPath + relativePath;
          filePathsMap.set(file.path, newFilePath);
        }
      }
    }
    
    this.updateTrackerStateAfterRename(filePathsMap);
  }
}

