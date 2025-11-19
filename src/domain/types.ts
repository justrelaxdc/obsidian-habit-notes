import type { TFile } from "obsidian";

export type TrackerSettings = {
  trackersFolder: string;
  dateFormat: string;
  daysToShow: number;
  showChartByDefault: boolean;
  showStatsByDefault: boolean;
  hideChartOnMobile: boolean;
  hideStatsOnMobile: boolean;
};

export const DEFAULT_SETTINGS: TrackerSettings = {
  trackersFolder: "0. Files/Trackers",
  dateFormat: "YYYY-MM-DD",
  daysToShow: 30,
  showChartByDefault: true,
  showStatsByDefault: false,
  hideChartOnMobile: false,
  hideStatsOnMobile: false,
};

export interface FolderNode {
  name: string;
  path: string;
  level: number;
  files: TFile[];
  children: FolderNode[];
}

export interface TrackerFileOptions {
  mode?: string;
  maxRating?: string;
  minValue?: string;
  maxValue?: string;
  step?: string;
  minLimit?: string;
  maxLimit?: string;
  unit?: string;
  name?: string;
}

