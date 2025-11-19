import type { TrackerTypeValue, ViewModeValue } from "../constants";

/**
 * Options for tracker code block
 */
export interface TrackerBlockOptions {
  /** Path to tracker file or folder */
  file?: string;
  folder?: string;
  
  /** Display mode */
  view?: ViewModeValue;
  
  /** Tracker type (overrides file frontmatter) */
  mode?: TrackerTypeValue;
  
  /** Date to display */
  date?: string;
  
  /** Number of days to show in charts/heatmaps */
  days?: string;
  
  /** Maximum rating (for rating type) */
  maxRating?: string;
  
  /** Minimum value (for scale type) */
  minValue?: string;
  
  /** Maximum value (for scale type) */
  maxValue?: string;
  
  /** Step value (for scale and plusminus types) */
  step?: string;
  
  /** Show chart visualization */
  showChart?: string;
  
  /** Show statistics */
  showStats?: string;
  
  /** Minimum limit for success */
  minLimit?: string;
  
  /** Maximum limit for success */
  maxLimit?: string;
  
  /** Unit of measurement */
  unit?: string;
}

/**
 * Parsed and validated tracker options
 */
export interface ParsedTrackerOptions {
  view: ViewModeValue;
  dateIso: string;
  daysToShow: number;
  shouldShowChart: boolean;
  shouldShowStats: boolean;
}

