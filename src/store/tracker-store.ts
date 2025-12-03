import { signal, computed } from "@preact/signals";
import type { TrackerSettings, TrackerEntries, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";

/**
 * Iconize data structure
 */
export interface IconizeData {
  settings?: any;
  [path: string]: string | any;
}

/**
 * Tracker state for a single tracker file
 */
export interface TrackerFileState {
  entries: TrackerEntries;
  fileOptions: TrackerFileOptions;
  lastUpdated: number;
}

/**
 * Global store using @preact/signals for reactive state management
 * This eliminates prop drilling and prevents unnecessary re-renders
 * 
 * NOTE: Date is NOT stored globally - each TrackerBlock has its own local date signal
 * to allow multiple blocks on the same page to have independent dates.
 */
class TrackerStore {
  // Plugin settings
  readonly settings = signal<TrackerSettings>(DEFAULT_SETTINGS);

  // Tracker entries per file path: Map<filePath, TrackerFileState>
  readonly trackerStates = signal<Map<string, TrackerFileState>>(new Map());

  // Iconize data for file/folder icons
  readonly iconizeData = signal<IconizeData | null>(null);

  // Loading state for individual trackers
  readonly loadingTrackers = signal<Set<string>>(new Set());

  // Per-file version counters to force re-renders when entries change
  // Only the affected tracker re-renders, not all trackers
  readonly entriesVersions = signal<Map<string, number>>(new Map());

  /**
   * Update settings
   * Creates a new object to ensure signal detects the change
   */
  setSettings(settings: TrackerSettings): void {
    this.settings.value = { ...settings };
  }

  /**
   * Get tracker state for a file
   */
  getTrackerState(filePath: string): TrackerFileState | undefined {
    return this.trackerStates.value.get(filePath);
  }

  /**
   * Set tracker state for a file
   */
  setTrackerState(filePath: string, state: TrackerFileState): void {
    const newMap = new Map(this.trackerStates.value);
    newMap.set(filePath, state);
    this.trackerStates.value = newMap;
  }

  /**
   * Update entries for a specific tracker
   */
  updateTrackerEntries(filePath: string, entries: TrackerEntries): void {
    const currentState = this.trackerStates.value.get(filePath);
    if (currentState) {
      const newMap = new Map(this.trackerStates.value);
      newMap.set(filePath, {
        ...currentState,
        entries,
        lastUpdated: Date.now(),
      });
      this.trackerStates.value = newMap;
      this.incrementEntriesVersion(filePath);
    }
  }

  /**
   * Update a single entry value for a tracker
   */
  updateSingleEntry(filePath: string, dateIso: string, value: string | number): void {
    const currentState = this.trackerStates.value.get(filePath);
    if (currentState) {
      const newEntries = new Map(currentState.entries);
      newEntries.set(dateIso, value);
      
      const newMap = new Map(this.trackerStates.value);
      newMap.set(filePath, {
        ...currentState,
        entries: newEntries,
        lastUpdated: Date.now(),
      });
      this.trackerStates.value = newMap;
      this.incrementEntriesVersion(filePath);
    }
  }

  /**
   * Delete an entry from a tracker
   */
  deleteEntry(filePath: string, dateIso: string): void {
    const currentState = this.trackerStates.value.get(filePath);
    if (currentState) {
      const newEntries = new Map(currentState.entries);
      newEntries.delete(dateIso);
      
      const newMap = new Map(this.trackerStates.value);
      newMap.set(filePath, {
        ...currentState,
        entries: newEntries,
        lastUpdated: Date.now(),
      });
      this.trackerStates.value = newMap;
      this.incrementEntriesVersion(filePath);
    }
  }

  /**
   * Increment version counter for a specific file
   */
  private incrementEntriesVersion(filePath: string): void {
    const newVersions = new Map(this.entriesVersions.value);
    const currentVersion = newVersions.get(filePath) ?? 0;
    newVersions.set(filePath, currentVersion + 1);
    this.entriesVersions.value = newVersions;
  }

  /**
   * Get version counter for a specific file
   */
  getEntriesVersion(filePath: string): number {
    return this.entriesVersions.value.get(filePath) ?? 0;
  }

  /**
   * Clear tracker state for a file
   */
  clearTrackerState(filePath: string): void {
    const newMap = new Map(this.trackerStates.value);
    newMap.delete(filePath);
    this.trackerStates.value = newMap;
    // Also clear version counter
    const newVersions = new Map(this.entriesVersions.value);
    newVersions.delete(filePath);
    this.entriesVersions.value = newVersions;
  }

  /**
   * Move tracker state from old path to new path (for rename operations)
   */
  moveTrackerState(oldPath: string, newPath: string): void {
    const state = this.trackerStates.value.get(oldPath);
    if (state) {
      const newMap = new Map(this.trackerStates.value);
      newMap.delete(oldPath);
      newMap.set(newPath, state);
      this.trackerStates.value = newMap;
    }
  }

  /**
   * Set loading state for a tracker
   */
  setTrackerLoading(filePath: string, isLoading: boolean): void {
    const newSet = new Set(this.loadingTrackers.value);
    if (isLoading) {
      newSet.add(filePath);
    } else {
      newSet.delete(filePath);
    }
    this.loadingTrackers.value = newSet;
  }

  /**
   * Check if tracker is loading
   */
  isTrackerLoading(filePath: string): boolean {
    return this.loadingTrackers.value.has(filePath);
  }

  /**
   * Update iconize data
   */
  setIconizeData(data: IconizeData | null): void {
    this.iconizeData.value = data;
  }

  /**
   * Get icon for a path
   */
  getIcon(path: string): string | null {
    const data = this.iconizeData.value;
    if (!data) return null;

    const normalizedPath = this.normalizePath(path);

    // Try exact match first
    if (data[normalizedPath]) {
      return data[normalizedPath];
    }

    // Try with leading slash
    const pathWithSlash = `/${normalizedPath}`;
    if (data[pathWithSlash]) {
      return data[pathWithSlash];
    }

    // For files, try without extension
    if (normalizedPath.endsWith(".md")) {
      const pathWithoutExt = normalizedPath.slice(0, -3);
      if (data[pathWithoutExt]) {
        return data[pathWithoutExt];
      }
      if (data[`/${pathWithoutExt}`]) {
        return data[`/${pathWithoutExt}`];
      }
    }

    return null;
  }

  /**
   * Normalize path for iconize format
   */
  private normalizePath(path: string): string {
    if (!path) return "";
    return path
      .replace(/\\/g, "/")
      .replace(/\/+/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
  }

  /**
   * Clear all state (for plugin unload)
   */
  clear(): void {
    this.trackerStates.value = new Map();
    this.loadingTrackers.value = new Set();
    this.iconizeData.value = null;
    this.entriesVersions.value = new Map();
  }
}

// Singleton instance of the store
export const trackerStore = new TrackerStore();

/**
 * Computed signal for getting all entries for a tracker
 */
export function useTrackerEntries(filePath: string) {
  return computed(() => {
    // Access per-file version to trigger recomputation only for this tracker
    trackerStore.getEntriesVersion(filePath);
    const state = trackerStore.trackerStates.value.get(filePath);
    return state?.entries ?? new Map();
  });
}

/**
 * Computed signal for getting file options for a tracker
 */
export function useTrackerOptions(filePath: string) {
  return computed(() => {
    const state = trackerStore.trackerStates.value.get(filePath);
    return state?.fileOptions ?? null;
  });
}

