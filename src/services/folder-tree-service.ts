import { App, TFile, TFolder } from "obsidian";
import type { FolderNode, TrackerSettings } from "../domain/types";
import { SORT_ORDER_CLEANUP_DELAY_MS, ARCHIVE_FOLDER_NAME } from "../constants";
import { normalizePath } from "../utils/path";

export class FolderTreeService {
  private readonly cache = new Map<string, FolderNode | null>();
  private customSortOrder: Record<string, string[]> | undefined = undefined;
  private settings: TrackerSettings | null = null;
  private pendingCleanup: Set<string> = new Set();
  private cleanupDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly app: App) {}

  /**
   * Updates settings for sorting
   */
  updateSettings(settings: TrackerSettings): void {
    this.settings = settings;
    this.customSortOrder = settings.customSortOrder;
  }

  /**
   * Schedule lazy cleanup of sort order for a folder path
   * Cleanup is debounced to avoid excessive saves
   */
  private scheduleLazyCleanup(folderPath: string, existingNames: Set<string>): void {
    if (!this.settings || !this.customSortOrder) return;
    
    const normalizedPath = normalizePath(folderPath);
    const sortOrder = this.customSortOrder[normalizedPath];
    if (!sortOrder) return;
    
    // Check if cleanup is needed (if any names in sortOrder don't exist)
    const needsCleanup = sortOrder.some(name => !existingNames.has(name));
    if (!needsCleanup) return;
    
    // Mark this path for cleanup
    this.pendingCleanup.add(normalizedPath);
    
    // Debounce the actual cleanup/save operation
    if (this.cleanupDebounceTimer) {
      clearTimeout(this.cleanupDebounceTimer);
    }
    this.cleanupDebounceTimer = setTimeout(() => {
      this.performLazyCleanup();
    }, SORT_ORDER_CLEANUP_DELAY_MS);
  }

  /**
   * Perform the actual cleanup of stale sort order entries
   */
  private performLazyCleanup(): void {
    if (!this.settings || !this.customSortOrder || this.pendingCleanup.size === 0) {
      this.pendingCleanup.clear();
      return;
    }

    for (const folderPath of this.pendingCleanup) {
      const sortOrder = this.customSortOrder[folderPath];
      if (!sortOrder) continue;
      
      // Get current items in the folder
      const folder = this.app.vault.getAbstractFileByPath(folderPath);
      if (!folder || !(folder instanceof TFolder)) {
        // Folder no longer exists - remove the entire sort order
        delete this.customSortOrder[folderPath];
        continue;
      }
      
      const existingNames = new Set<string>();
      for (const child of folder.children) {
        if (child instanceof TFile) {
          existingNames.add(child.basename);
        } else if (child instanceof TFolder) {
          existingNames.add(child.name);
        }
      }
      
      // Filter out non-existent items
      const cleanedOrder = sortOrder.filter(name => existingNames.has(name));
        if (cleanedOrder.length !== sortOrder.length) {
        if (cleanedOrder.length === 0) {
          delete this.customSortOrder[folderPath];
        } else {
          this.customSortOrder[folderPath] = cleanedOrder;
        }
      }
    }
    
    this.pendingCleanup.clear();
    
    // Note: We don't save here because the plugin handles saving
    // The customSortOrder reference is shared with settings
  }

  private cacheKey(folderPath: string, maxDepth: number): string {
    return `${normalizePath(folderPath)}::${maxDepth}`;
  }

  getFolderTree(folderPath: string, maxDepth: number = 3): FolderNode | null {
    const key = this.cacheKey(folderPath, maxDepth);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      return null;
    }

    if (folder instanceof TFile) {
      return {
        name: folder.basename,
        path: folder.path,
        level: 0,
        files: [folder],
        children: [],
      };
    }

    if (folder instanceof TFolder) {
      const tree = this.buildFolderTree(folder, maxDepth, 0);
      this.cache.set(key, tree);
      return tree;
    }

    return null;
  }

  /**
   * Gets normalized full path from vault root
   * Returns the full normalized path as-is, without relative calculations
   */
  private getRelativePath(fullPath: string): string {
    return normalizePath(fullPath);
  }

  /**
   * Sorts items using custom sort order if available, otherwise alphabetically
   * Also schedules lazy cleanup of stale sort order entries
   */
  private sortItems<T extends TFile | TFolder>(
    items: T[],
    folderPath: string
  ): T[] {
    const relativePath = this.getRelativePath(folderPath);
    const sortOrder = this.customSortOrder?.[relativePath];
    
    if (!sortOrder || sortOrder.length === 0) {
      // No custom sort order - sort alphabetically
      return [...items].sort((a, b) => {
        const aName = a instanceof TFile ? a.basename : a.name;
        const bName = b instanceof TFile ? b.basename : b.name;
        return aName.localeCompare(bName, undefined, { sensitivity: "base" });
      });
    }
    
    // Create a map for quick lookup
    const itemMap = new Map<string, T>();
    const itemNames = new Set<string>();
    
    for (const item of items) {
      const itemName = item instanceof TFile ? item.basename : item.name;
      itemMap.set(itemName, item);
      itemNames.add(itemName);
    }
    
    // Schedule lazy cleanup of stale entries in sort order
    this.scheduleLazyCleanup(relativePath, itemNames);
    
    // Build sorted array based on custom order
    const sorted: T[] = [];
    const added = new Set<string>();
    
    // Add items in custom order
    for (const orderedName of sortOrder) {
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

  private buildFolderTree(folder: TFolder, maxDepth: number, currentLevel: number): FolderNode {
    const node: FolderNode = {
      name: folder.name,
      path: folder.path,
      level: currentLevel,
      files: [],
      children: [],
    };

    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === "md") {
        node.files.push(child);
      }
    }

    // Sort files using custom sort order or alphabetically
    node.files = this.sortItems(node.files, folder.path);

    if (currentLevel < maxDepth) {
      for (const child of folder.children) {
        if (child instanceof TFolder) {
          // Ignore folders containing archive folder name in name (case-insensitive)
          if (child.name.toLowerCase().includes(ARCHIVE_FOLDER_NAME)) {
            continue;
          }
          const childNode = this.buildFolderTree(child, maxDepth, currentLevel + 1);
          if (childNode.files.length > 0 || childNode.children.length > 0) {
            node.children.push(childNode);
          }
        }
      }

      // Sort folders using custom sort order or alphabetically
      // For folders, we need to use the parent folder path (folder.path) as the key
      node.children = this.sortItems(node.children, folder.path);
    }

    return node;
  }

  invalidate(folderPath?: string) {
    if (!folderPath) {
      this.cache.clear();
      return;
    }
    const normalized = normalizePath(folderPath);
    // Use iterator directly instead of Array.from to avoid temporary array allocation
    for (const key of this.cache.keys()) {
      const [cachedPath] = key.split("::");
      if (
        cachedPath === normalized ||
        cachedPath.startsWith(`${normalized}/`) ||
        normalized.startsWith(`${cachedPath}/`)
      ) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all timers and cleanup state (for plugin unload)
   */
  cleanup(): void {
    if (this.cleanupDebounceTimer) {
      clearTimeout(this.cleanupDebounceTimer);
      this.cleanupDebounceTimer = null;
    }
    this.pendingCleanup.clear();
  }
}

