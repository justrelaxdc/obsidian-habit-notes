import type { TFile } from "obsidian";
import type TrackerPlugin from "../core/tracker-plugin";
import type { FolderNode, TrackerFileOptions, TrackerEntries } from "../domain/types";
import type { TrackerTypeValue, ViewModeValue } from "../constants";

/**
 * Context value for tracker components
 * Only contains onDateChange callback - other values are passed as props
 */
export interface TrackerContextValue {
  onDateChange: (newDate: string) => void;
}

/**
 * Props for TrackerBlock component
 */
export interface TrackerBlockProps {
  plugin: TrackerPlugin;
  folderTree: FolderNode | null;
  initialDateIso: string;
  viewMode: ViewModeValue;
  opts: Record<string, string>;
  folderPath: string;
}

/**
 * Props for FolderNode component
 */
export interface FolderNodeProps {
  node: FolderNode;
  plugin: TrackerPlugin;
  dateIso: string;
  viewMode: ViewModeValue;
  opts: Record<string, string>;
}

/**
 * Props for TrackerItem component
 */
export interface TrackerItemProps {
  file: TFile;
  plugin: TrackerPlugin;
  dateIso: string;
  viewMode: ViewModeValue;
  opts: Record<string, string>;
}

/**
 * Props for TrackerHeader component
 */
export interface TrackerHeaderProps {
  file: TFile;
  displayName: string;
  plugin: TrackerPlugin;
  onEdit?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  limitProgress?: {
    width: string;
    color: string;
  } | null;
}

/**
 * Props for DatePicker component
 */
export interface DatePickerProps {
  dateIso: string;
  onDateChange: (newDate: string) => void;
  onNavigate: (days: number) => void;
  isUpdating: boolean;
}

/**
 * Props for control components
 * Note: entries is accessed via computed signal internally, not passed as prop
 */
export interface BaseControlProps {
  file: TFile;
  dateIso: string;
  plugin: TrackerPlugin;
  fileOptions: TrackerFileOptions;
}

/**
 * Props for Heatmap component
 */
export interface HeatmapProps extends BaseControlProps {
  daysToShow: number;
  trackerType: TrackerTypeValue;
  startTrackingDate: string | null;
}

/**
 * Props for NumberControl component
 */
export interface NumberControlProps extends BaseControlProps {}

/**
 * Props for PlusMinusControl component
 */
export interface PlusMinusControlProps extends BaseControlProps {}

/**
 * Props for TextControl component
 */
export interface TextControlProps extends BaseControlProps {}

/**
 * Props for ScaleControl component
 */
export interface ScaleControlProps extends BaseControlProps {}

/**
 * Props for Statistics component
 * Note: entries is accessed via computed signal internally, not passed as prop
 */
export interface StatisticsProps {
  file: TFile;
  plugin: TrackerPlugin;
  dateIso: string;
  daysToShow: number;
  trackerType: TrackerTypeValue;
  fileOptions: TrackerFileOptions;
}

/**
 * Props for ChartWrapper component
 * Note: entries is accessed via computed signal internally, not passed as prop
 */
export interface ChartWrapperProps {
  file: TFile;
  plugin: TrackerPlugin;
  dateIso: string;
  daysToShow: number;
  fileOptions: TrackerFileOptions;
  onDateClick?: (dateStr: string) => void;
}

