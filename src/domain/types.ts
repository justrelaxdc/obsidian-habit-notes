import type { TFile } from "obsidian";
import type { TrackerTypeValue } from "../constants";

export type TrackerSettings = {
  trackersFolder: string;
  dateFormat: string;
  daysToShow: number;
  showChartByDefault: boolean;
  showStatsByDefault: boolean;
  hideChartOnMobile: boolean;
  hideStatsOnMobile: boolean;
  hideTrackerTitle: boolean;
  disableLimitReaction: boolean;
  customSortOrder?: Record<string, string[]>;
};

export const DEFAULT_SETTINGS: TrackerSettings = {
  trackersFolder: "0. Files/Trackers",
  dateFormat: "YYYY-MM-DD",
  daysToShow: 30,
  showChartByDefault: true,
  showStatsByDefault: false,
  hideChartOnMobile: false,
  hideStatsOnMobile: false,
  hideTrackerTitle: false,
  disableLimitReaction: false,
};

export interface FolderNode {
  name: string;
  path: string;
  level: number;
  files: TFile[];
  children: FolderNode[];
}

export interface TrackerFileOptions {
  mode?: TrackerTypeValue;
  trackingStartDate?: string; // YYYY-MM-DD format
  minValue?: string;
  maxValue?: string;
  step?: string;
  minLimit?: string;
  maxLimit?: string;
  unit?: string;
}

/**
 * Tracker data entry value
 */
export type TrackerValue = string | number;

/**
 * Map of date strings to tracker values
 */
export type TrackerEntries = Map<string, TrackerValue>;

/**
 * Callback guards for file modifications
 */
export interface ModifyGuards {
  onBeforeModify?: (path: string) => void;
  onAfterModify?: (path: string) => void;
}

