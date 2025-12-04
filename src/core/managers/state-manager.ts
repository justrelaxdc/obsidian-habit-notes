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
 * Uses Map insertion order for O(1) LRU eviction - oldest entries are at the front
 */
export class StateManager {
  // Map maintains insertion order - oldest entries are first
  // When accessing an entry, we delete and re-insert to move it to the end
  private trackerState: Map<string, TrackerState> = new Map();

  constructor(
    private readonly app: App,
    private readonly trackerFileService: TrackerFileService,
    private readonly folderTreeService: FolderTreeService
  ) {}

  /**
   * Evict least recently used cache entry - O(1) operation
   * Map maintains insertion order, so first entry is oldest
   */
  private evictIfNeeded(): void {
    if (this.trackerState.size >= MAX_CACHE_SIZE) {
      // Get first (oldest) entry and remove it
      const firstKey = this.trackerState.keys().next().value;
      if (firstKey) {
        this.trackerState.delete(firstKey);
      }
    }
  }

  /**
   * Ensure tracker state is loaded for a file
   */
  async ensureTrackerState(file: TFile): Promise<TrackerState> {
    const existing = this.trackerState.get(file.path);
    if (existing) {
      // Move to end (most recently used) by deleting and re-inserting - O(1)
      this.trackerState.delete(file.path);
      this.trackerState.set(file.path, existing);
      return existing;
    }
    
    // Evict LRU entry if cache is full - O(1)
    this.evictIfNeeded();
    
    // Read both entries and fileOpts in a single file read operation
    const { entries, fileOpts } = await this.trackerFileService.readTrackerFile(file);
    const state = { entries, fileOpts };
    // New entries are added at the end (most recently used)
    this.trackerState.set(file.path, state);
    return state;
  }

  /**
   * Clear tracker state for a specific path - O(1)
   */
  clearTrackerState(path: string): void {
    this.trackerState.delete(path);
  }

  /**
   * Clears all backend state (trackerState, FolderTreeService cache)
   * Use sparingly - prefer selective cache invalidation
   */
  async clearAllCaches(): Promise<void> {
    this.trackerState.clear();
    this.folderTreeService.invalidate();
  }

  /**
   * Invalidate cache for a folder and all its contents
   */
  invalidateCacheForFolder(folderPath: string, normalizePath: (p: string) => string): void {
    const normalizedPath = normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    // Use instanceof for type safety instead of duck typing
    if (folder instanceof TFolder) {
      this.clearCacheForFolder(folder);
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
   * Move tracker state from old path to new path - O(1)
   */
  moveTrackerState(oldPath: string, newPath: string): void {
    if (oldPath === newPath) return;
    
    const state = this.trackerState.get(oldPath);
    
    if (state) {
      // Move state to new path (delete old, insert new at end)
      this.trackerState.delete(oldPath);
      this.trackerState.set(newPath, state);
    } else {
      // Just clean up any stale entries
      this.trackerState.delete(newPath);
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
