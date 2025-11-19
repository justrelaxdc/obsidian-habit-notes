import { TrackerType, TRACKER_TYPE_LABELS, MODAL_LABELS } from "../../constants";
import type { TrackerTypeValue } from "../../constants";

/**
 * Creates a tracker type dropdown with grouped options
 * 
 * @param selectElement - The select element to populate
 * @param defaultValue - Default selected value
 */
export function populateTrackerTypeSelector(
  selectElement: HTMLSelectElement,
  defaultValue: TrackerTypeValue = TrackerType.GOOD_HABIT
): void {
  // Clear existing options
  selectElement.innerHTML = "";
  
  // Create Habits group
  const habitsGroup = document.createElement("optgroup");
  habitsGroup.label = MODAL_LABELS.HABITS_GROUP;
  
  const goodHabitOption = document.createElement("option");
  goodHabitOption.value = TrackerType.GOOD_HABIT;
  goodHabitOption.textContent = TRACKER_TYPE_LABELS[TrackerType.GOOD_HABIT];
  habitsGroup.appendChild(goodHabitOption);
  
  const badHabitOption = document.createElement("option");
  badHabitOption.value = TrackerType.BAD_HABIT;
  badHabitOption.textContent = TRACKER_TYPE_LABELS[TrackerType.BAD_HABIT];
  habitsGroup.appendChild(badHabitOption);
  
  selectElement.appendChild(habitsGroup);
  
  // Create Metrics group
  const metricsGroup = document.createElement("optgroup");
  metricsGroup.label = MODAL_LABELS.METRICS_GROUP;
  
  const numberOption = document.createElement("option");
  numberOption.value = TrackerType.NUMBER;
  numberOption.textContent = TRACKER_TYPE_LABELS[TrackerType.NUMBER];
  metricsGroup.appendChild(numberOption);
  
  const scaleOption = document.createElement("option");
  scaleOption.value = TrackerType.SCALE;
  scaleOption.textContent = TRACKER_TYPE_LABELS[TrackerType.SCALE];
  metricsGroup.appendChild(scaleOption);
  
  const plusminusOption = document.createElement("option");
  plusminusOption.value = TrackerType.PLUSMINUS;
  plusminusOption.textContent = TRACKER_TYPE_LABELS[TrackerType.PLUSMINUS];
  metricsGroup.appendChild(plusminusOption);
  
  const textOption = document.createElement("option");
  textOption.value = TrackerType.TEXT;
  textOption.textContent = TRACKER_TYPE_LABELS[TrackerType.TEXT];
  metricsGroup.appendChild(textOption);
  
  selectElement.appendChild(metricsGroup);
  
  // Set default value
  selectElement.value = defaultValue;
}

/**
 * Checks if a tracker type is a metric (vs a habit)
 * 
 * @param type - Tracker type to check
 * @returns True if type is a metric
 */
export function isMetricType(type: string): boolean {
  return [
    TrackerType.NUMBER,
    TrackerType.PLUSMINUS,
    TrackerType.RATING,
    TrackerType.TEXT,
    TrackerType.SCALE,
  ].includes(type as TrackerTypeValue);
}

/**
 * Checks if a tracker type is a habit (good or bad)
 * 
 * @param type - Tracker type to check
 * @returns True if type is a habit
 */
export function isHabitType(type: string): boolean {
  return type === TrackerType.GOOD_HABIT || type === TrackerType.BAD_HABIT;
}

