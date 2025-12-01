import type { TFile } from "obsidian";
import { CSS_CLASSES, TrackerType } from "../constants";

/**
 * Service for rendering visualizations (heatmaps)
 * Statistics calculation and rendering moved to StatisticsService and StatisticsRenderer
 */
export class VisualizationService {
  /**
   * Updates heatmap day visual state
   */
  updateHeatmapDayState(
    dayDiv: HTMLElement,
    dateStr: string,
    entries: Map<string, string | number>,
    startTrackingDateStr: string | null,
    trackerType: string
  ): void {
    const value = entries.get(dateStr);
    const hasValue = value === 1 || value === "1" || String(value) === "true";
    
    // Update has-value class
    if (hasValue) {
      dayDiv.addClass(CSS_CLASSES.HEATMAP_DAY_HAS_VALUE);
    } else {
      dayDiv.removeClass(CSS_CLASSES.HEATMAP_DAY_HAS_VALUE);
    }
    
    // Update tracker type class
    dayDiv.removeClass(TrackerType.GOOD_HABIT);
    dayDiv.removeClass(TrackerType.BAD_HABIT);
    dayDiv.addClass(trackerType);
    
    // Update start-day class
    if (dateStr === startTrackingDateStr) {
      dayDiv.addClass(CSS_CLASSES.HEATMAP_DAY_START);
    } else {
      dayDiv.removeClass(CSS_CLASSES.HEATMAP_DAY_START);
    }
  }
}

