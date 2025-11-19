import type { TFile } from "obsidian";
import type { TrackerFileOptions } from "../domain/types";
import { CACHE_TTL_MS, MAX_CACHE_SIZE } from "../constants";

interface CacheEntry {
  mtime: number;
  size: number;
  timestamp: number;
  frontmatter?: TrackerFileOptions;
  entries?: Map<string, string | number>;
  lastAccessed: number;
}

export class TrackerDataCache {
  private readonly cache = new Map<string, CacheEntry>();

  private getKey(file: TFile): string {
    return file.path;
  }

  private getMtime(file: TFile): number {
    return file.stat?.mtime ?? 0;
  }

  private getSize(file: TFile): number {
    return file.stat?.size ?? 0;
  }

  private ensureEntry(file: TFile): CacheEntry {
    const key = this.getKey(file);
    let entry = this.cache.get(key);
    if (!entry) {
      entry = { 
        mtime: this.getMtime(file),
        size: this.getSize(file),
        timestamp: Date.now(),
        lastAccessed: Date.now()
      };
      this.cache.set(key, entry);
    }
    return entry;
  }

  private isStale(file: TFile, entry?: CacheEntry): boolean {
    if (!entry) return true;
    
    // Check if entry is too old (TTL expired)
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      return true;
    }
    
    // Check if file has been modified
    if (entry.mtime !== this.getMtime(file)) {
      return true;
    }
    
    // Check if file size changed
    if (entry.size !== this.getSize(file)) {
      return true;
    }
    
    return false;
  }

  private evictLRU(): void {
    if (this.cache.size <= MAX_CACHE_SIZE) {
      return;
    }
    
    // Find least recently used entry
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  invalidate(path: string) {
    this.cache.delete(path);
  }

  invalidateAll() {
    this.cache.clear();
  }

  async getFrontmatter(
    file: TFile,
    loader: () => Promise<TrackerFileOptions>,
  ): Promise<TrackerFileOptions> {
    const key = this.getKey(file);
    const entry = this.cache.get(key);
    
    if (this.isStale(file, entry) || !entry?.frontmatter) {
      this.evictLRU();
      
      const freshEntry: CacheEntry = {
        mtime: this.getMtime(file),
        size: this.getSize(file),
        timestamp: Date.now(),
        lastAccessed: Date.now(),
        frontmatter: await loader(),
        entries: this.isStale(file, entry) ? undefined : entry?.entries,
      };
      this.cache.set(key, freshEntry);
      return freshEntry.frontmatter ?? {};
    }
    
    // Update last accessed time
    entry.lastAccessed = Date.now();
    return entry.frontmatter;
  }

  async getEntries(
    file: TFile,
    loader: () => Promise<Map<string, string | number>>,
  ): Promise<Map<string, string | number>> {
    const key = this.getKey(file);
    const entry = this.cache.get(key);
    
    if (this.isStale(file, entry) || !entry?.entries) {
      this.evictLRU();
      
      const freshEntry: CacheEntry = {
        mtime: this.getMtime(file),
        size: this.getSize(file),
        timestamp: Date.now(),
        lastAccessed: Date.now(),
        entries: await loader(),
        frontmatter: this.isStale(file, entry) ? undefined : entry?.frontmatter,
      };
      this.cache.set(key, freshEntry);
      return freshEntry.entries ?? new Map();
    }
    
    // Update last accessed time
    entry.lastAccessed = Date.now();
    return entry.entries;
  }
}


