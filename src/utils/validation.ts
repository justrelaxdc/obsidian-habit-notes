import { ViewMode, TrackerType } from "../constants";
import type { ViewModeValue, TrackerTypeValue } from "../constants";
import type { TrackerBlockOptions } from "../domain/options-types";

/**
 * Validates and sanitizes tracker block options
 * 
 * @param options - Raw options from code block
 * @returns Validated options with sanitized values
 */
export function validateTrackerOptions(options: Record<string, string>): TrackerBlockOptions {
  const validated: TrackerBlockOptions = {};
  
  // File/folder path
  if (options.file) {
    validated.file = options.file.trim();
  }
  if (options.folder) {
    validated.folder = options.folder.trim();
  }
  
  // View mode
  if (options.view) {
    const view = options.view.toLowerCase();
    if (view === ViewMode.CONTROL || view === ViewMode.DISPLAY) {
      validated.view = view as ViewModeValue;
    }
  }
  
  // Tracker type
  if (options.mode) {
    const mode = options.mode.toLowerCase();
    const validTypes = Object.values(TrackerType);
    if (validTypes.includes(mode as TrackerTypeValue)) {
      validated.mode = mode as TrackerTypeValue;
    }
  }
  
  // Date
  if (options.date) {
    validated.date = options.date.trim();
  }
  
  // Numeric options
  if (options.days) {
    const days = parseInt(options.days);
    if (!isNaN(days) && days > 0) {
      validated.days = String(days);
    }
  }
  
  if (options.maxRating) {
    const maxRating = parseInt(options.maxRating);
    if (!isNaN(maxRating) && maxRating > 0) {
      validated.maxRating = String(maxRating);
    }
  }
  
  // Float options
  if (options.minValue !== undefined) {
    const minValue = parseFloat(options.minValue);
    if (!isNaN(minValue)) {
      validated.minValue = String(minValue);
    }
  }
  
  if (options.maxValue !== undefined) {
    const maxValue = parseFloat(options.maxValue);
    if (!isNaN(maxValue)) {
      validated.maxValue = String(maxValue);
    }
  }
  
  if (options.step) {
    const step = parseFloat(options.step);
    if (!isNaN(step) && step > 0) {
      validated.step = String(step);
    }
  }
  
  if (options.minLimit !== undefined) {
    const minLimit = parseFloat(options.minLimit);
    if (!isNaN(minLimit)) {
      validated.minLimit = String(minLimit);
    }
  }
  
  if (options.maxLimit !== undefined) {
    const maxLimit = parseFloat(options.maxLimit);
    if (!isNaN(maxLimit)) {
      validated.maxLimit = String(maxLimit);
    }
  }
  
  // Boolean options
  if (options.showChart) {
    validated.showChart = options.showChart.toLowerCase();
  }
  
  if (options.showStats) {
    validated.showStats = options.showStats.toLowerCase();
  }
  
  // Text options
  if (options.unit) {
    validated.unit = options.unit.trim();
  }
  
  return validated;
}

/**
 * Validates a tracker file name
 * 
 * @param name - File name to validate
 * @returns Sanitized file name
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, "_");
}

/**
 * Validates a number within a range
 * 
 * @param value - Value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param defaultValue - Default value if validation fails
 * @returns Validated number
 */
export function validateNumberInRange(
  value: string | number | undefined,
  min: number,
  max: number,
  defaultValue: number
): number {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  
  const num = typeof value === 'number' ? value : parseFloat(value);
  
  if (isNaN(num)) {
    return defaultValue;
  }
  
  return Math.max(min, Math.min(max, num));
}

/**
 * Checks if a value represents a truthy state for tracking
 * 
 * @param value - Value to check
 * @returns True if value is considered "completed" or "present"
 */
export function isTrackerValueTrue(value: string | number | null | undefined): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  
  if (typeof value === 'number') {
    return value !== 0;
  }
  
  const str = String(value);
  return str === '1' || str === 'true' || str.trim() !== '';
}

