import type { TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import type { HabitStatistics, MetricStatistics, StreakInfo, StatisticsResult } from "../domain/statistics-types";
import { TrackerType, MAX_DAYS_BACK } from "../constants";
import { DateService } from "./date-service";
import { isTrackerValueTrue } from "../utils/validation";
import { countWords } from "../utils/misc";

/**
 * Service for calculating statistics for trackers
 */
export class StatisticsService {
  /**
   * Gets entry value by date, trying multiple date formats
   */
  private getEntryValueByDate(
    entries: Map<string, string | number>,
    date: any,
    settings: TrackerSettings
  ): string | number | undefined {
    const formats = [
      settings.dateFormat,
      'YYYY-MM-DD',
      'DD.MM.YYYY',
      'MM/DD/YYYY'
    ];
    
    const triedFormats: string[] = [];
    for (const format of formats) {
      const dateStr = DateService.format(date, format);
      triedFormats.push(`${format}:${dateStr}`);
      const val = entries.get(dateStr);
      if (val !== undefined) {
        return val;
      }
    }
    
    return undefined;
  }

  /**
   * Determines the start tracking date with priorities:
   * 1. trackingStartDate from frontmatter
   * 2. File creation date
   * 3. First date from entries
   * 4. Fallback: 365 days ago from current date
   */
  private determineStartTrackingDate(
    startTrackingDateStr: string | null | undefined,
    file: TFile | undefined,
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    currentDate: any
  ): any {
    let startTrackingDate = null;
    
    // Priority 1: Date from frontmatter (trackingStartDate)
    if (startTrackingDateStr) {
      startTrackingDate = DateService.parseMultiple(startTrackingDateStr, [
        'YYYY-MM-DD',
        settings.dateFormat,
        'DD.MM.YYYY',
        'MM/DD/YYYY'
      ]);
      if (startTrackingDate.isValid()) {
        startTrackingDate = DateService.startOfDay(startTrackingDate);
      } else {
        startTrackingDate = null;
      }
    }
    
    // Priority 2: File creation date
    if (!startTrackingDate && file?.stat?.ctime) {
      startTrackingDate = DateService.startOfDay(DateService.fromDate(new Date(file.stat.ctime)));
    }

    // Priority 3: First date from entries
    if (entries.size > 0) {
      const sortedDates = Array.from(entries.keys()).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = DateService.parseMultiple(firstDateStr, [
        settings.dateFormat,
        'YYYY-MM-DD',
        'DD.MM.YYYY',
        'MM/DD/YYYY'
      ]);
      if (firstDate.isValid()) {
        const firstDateNormalized = DateService.startOfDay(firstDate);
        if (!startTrackingDate || DateService.isBefore(firstDateNormalized, startTrackingDate)) {
          startTrackingDate = firstDateNormalized;
        }
      }
    }

    // Fallback: 365 days ago
    if (!startTrackingDate) {
      startTrackingDate = DateService.startOfDay(DateService.subtractDays(currentDate, 365));
    }

    return startTrackingDate;
  }

  /**
   * Calculates statistics for habits (good-habit and bad-habit)
   */
  calculateHabitStatistics(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    dateIso: string,
    daysToShow: number,
    trackerType: string,
    startTrackingDateStr?: string | null
  ): HabitStatistics {
    const endDate = DateService.parse(dateIso, settings.dateFormat);
    const startDate = endDate.clone().subtract(daysToShow - 1, 'days');
    
    // Determine actual start date considering tracking start date
    let actualStartDate = startDate;
    if (startTrackingDateStr) {
      const trackingStartDate = DateService.parseMultiple(startTrackingDateStr, [
        settings.dateFormat,
        'YYYY-MM-DD',
        'YYYY/MM/DD',
        'DD.MM.YYYY'
      ]);
      if (trackingStartDate.isValid() && DateService.isAfter(trackingStartDate, startDate)) {
        actualStartDate = trackingStartDate;
      }
    }
    
    const periodDays: number[] = [];
    const metricType = trackerType.toLowerCase();
    const isBadHabit = metricType === TrackerType.BAD_HABIT;
    let actualDaysCount = 0;
    
    // Iterate through all days from actualStartDate to endDate
    let currentDate = actualStartDate.clone();
    while (!DateService.isAfter(currentDate, endDate)) {
      const dateStr = DateService.format(currentDate, settings.dateFormat);
      const val = entries.get(dateStr);
      let numVal = 0;
      
      if (val != null) {
        if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      
      // For bad habits: invert logic - absence or 0 = success (1), presence = failure (0)
      // For good habits: presence = success (1), absence = failure (0)
      if (isBadHabit) {
        // Bad habit: success = no value or value is 0/false
        numVal = (numVal === 0 || val == null) ? 1 : 0;
      } else {
        // Good habit: success = value exists and is truthy
        numVal = (val != null && numVal > 0) ? 1 : 0;
      }
      
      periodDays.push(numVal);
      actualDaysCount++;
      currentDate = currentDate.add(1, 'days');
    }
    
    const sum = periodDays.reduce((a, b) => a + b, 0);
    const avg = actualDaysCount > 0 ? sum / actualDaysCount : 0;
    const totalRecords = entries.size;
    
    // For habits: calculate completion rate and active days
    // activeDays = days with success (value = 1)
    const activeDays = periodDays.filter(v => v > 0).length;
    const completionRate = actualDaysCount > 0 ? (activeDays / actualDaysCount) * 100 : 0;
    
    return {
      totalRecords,
      periodDays,
      actualDaysCount,
      completionRate,
      activeDays,
      sum,
      avg
    };
  }

  /**
   * Calculates statistics for metrics (number, scale, plusminus, text)
   */
  calculateMetricStatistics(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    dateIso: string,
    daysToShow: number,
    trackerType: string,
    startTrackingDateStr?: string | null
  ): MetricStatistics {
    const endDate = DateService.parse(dateIso, settings.dateFormat);
    const startDate = endDate.clone().subtract(daysToShow - 1, 'days');
    
    // Determine actual start date considering tracking start date
    let actualStartDate = startDate;
    if (startTrackingDateStr) {
      const trackingStartDate = DateService.parseMultiple(startTrackingDateStr, [
        settings.dateFormat,
        'YYYY-MM-DD',
        'YYYY/MM/DD',
        'DD.MM.YYYY'
      ]);
      if (trackingStartDate.isValid() && DateService.isAfter(trackingStartDate, startDate)) {
        actualStartDate = trackingStartDate;
      }
    }
    
    const periodDays: number[] = [];
    const metricType = trackerType.toLowerCase();
    let actualDaysCount = 0;
    
    // Iterate through all days from actualStartDate to endDate
    let currentDate = actualStartDate.clone();
    while (!DateService.isAfter(currentDate, endDate)) {
      const dateStr = DateService.format(currentDate, settings.dateFormat);
      const val = entries.get(dateStr);
      let numVal = 0;
      
      if (val != null) {
        if (metricType === TrackerType.TEXT) {
          numVal = countWords(String(val));
        } else if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      
      periodDays.push(numVal);
      actualDaysCount++;
      currentDate = currentDate.add(1, 'days');
    }
    
    const sum = periodDays.reduce((a, b) => a + b, 0);
    const avg = actualDaysCount > 0 ? sum / actualDaysCount : 0;
    const totalRecords = entries.size;
    
    // For metrics: calculate min, max, median
    let min: number | null = null;
    let max: number | null = null;
    let median: number | null = null;
    const nonZeroValues = periodDays.filter(v => v > 0);
    
    if (periodDays.length > 0) {
      const sortedValues = [...periodDays].sort((a, b) => a - b);
      min = sortedValues[0];
      max = sortedValues[sortedValues.length - 1];
      
      // Calculate median for all values (including zeros)
      const mid = Math.floor(sortedValues.length / 2);
      if (sortedValues.length % 2 === 0) {
        median = (sortedValues[mid - 1] + sortedValues[mid]) / 2;
      } else {
        median = sortedValues[mid];
      }
    }
    
    const activeDays = nonZeroValues.length;
    
    return {
      totalRecords,
      periodDays,
      actualDaysCount,
      sum,
      avg,
      min,
      max,
      median,
      activeDays
    };
  }

  /**
   * Calculates streak information (current and best streak)
   */
  calculateStreaks(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    endDate: Date | any,
    trackerType: string,
    file?: TFile,
    startTrackingDateStr?: string | null
  ): StreakInfo {
    const metricType = trackerType.toLowerCase();
    const isBadHabit = metricType === TrackerType.BAD_HABIT;
    
    // Normalize end date - endDate is already a DateWrapper from DateService.parse/now
    let currentDate: any;
    if (endDate instanceof Date) {
      currentDate = DateService.fromDate(endDate);
    } else if (endDate && typeof endDate.isValid === 'function' && typeof endDate.clone === 'function') {
      // It's already a DateWrapper - just clone it
      currentDate = endDate.clone();
    } else {
      // Try to parse as string or create from Date
      currentDate = DateService.fromDate(new Date(endDate));
    }
    
    // Ensure currentDate is valid before normalizing
    if (!currentDate || !currentDate.isValid || !currentDate.isValid()) {
      return { current: 0, best: 0 };
    }
    
    currentDate = DateService.startOfDay(currentDate);
    
    // Determine start tracking date
    const startTrackingDate = this.determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );

    // Ensure startTrackingDate is valid
    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return { current: 0, best: 0 };
    }

    // Calculate current streak
    let currentStreak = 0;
    let daysChecked = 0;
    let checkDate = currentDate.clone();

    while (daysChecked < MAX_DAYS_BACK) {
      // Check if we've gone beyond the start tracking date
      if (DateService.isBefore(checkDate, startTrackingDate)) {
        break;
      }

      // Get value for this date
      const val = this.getEntryValueByDate(entries, checkDate, settings);
      let isSuccess = false;

      if (isBadHabit) {
        // For bad-habit: success = absence of record OR value is 0/false
        // But only if the date is >= startTrackingDate (already checked above)
        if (val == null || val === undefined) {
          // Absence of record is success for bad-habit, but only for days in tracking period
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        // For good-habit and metrics: success = presence of record with truthy value
        if (val != null && val !== undefined) {
          isSuccess = isTrackerValueTrue(val);
        }
      }

      if (isSuccess) {
        currentStreak++;
      } else {
        break;
      }

      checkDate = checkDate.subtract(1, "days");
      daysChecked++;
    }

    // Calculate best streak
    let bestStreak = 0;
    let bestCurrentStreak = 0;
    daysChecked = 0;
    
    // Start from endDate (same as current streak calculation) and go backwards
    let bestCheckDate = currentDate.clone();
    
    // Go through all days from start tracking date to endDate
    while (!DateService.isBefore(bestCheckDate, startTrackingDate) && daysChecked < MAX_DAYS_BACK) {
      const val = this.getEntryValueByDate(entries, bestCheckDate, settings);
      let isSuccess = false;
      
      if (isBadHabit) {
        if (val == null || val === undefined) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== undefined) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      
      if (isSuccess) {
        bestCurrentStreak++;
        bestStreak = Math.max(bestStreak, bestCurrentStreak);
      } else {
        bestCurrentStreak = 0;
      }

      bestCheckDate = bestCheckDate.subtract(1, "days");
      daysChecked++;
    }

    return {
      current: currentStreak,
      best: bestStreak
    };
  }

  /**
   * Calculates complete statistics for a tracker
   */
  calculateStatistics(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    dateIso: string,
    daysToShow: number,
    trackerType: string,
    endDate: Date | any,
    file?: TFile,
    startTrackingDateStr?: string | null
  ): StatisticsResult {
    const metricType = trackerType.toLowerCase();
    const isHabit = metricType === TrackerType.GOOD_HABIT || metricType === TrackerType.BAD_HABIT;
    
    // Calculate streaks
    const streaks = this.calculateStreaks(
      entries,
      settings,
      endDate,
      trackerType,
      file,
      startTrackingDateStr
    );
    
    // Calculate type-specific statistics
    let habit: HabitStatistics | null = null;
    let metric: MetricStatistics | null = null;
    let base: { totalRecords: number; periodDays: number[]; actualDaysCount: number };
    
    if (isHabit) {
      habit = this.calculateHabitStatistics(
        entries,
        settings,
        dateIso,
        daysToShow,
        trackerType,
        startTrackingDateStr
      );
      base = {
        totalRecords: habit.totalRecords,
        periodDays: habit.periodDays,
        actualDaysCount: habit.actualDaysCount
      };
    } else {
      metric = this.calculateMetricStatistics(
        entries,
        settings,
        dateIso,
        daysToShow,
        trackerType,
        startTrackingDateStr
      );
      base = {
        totalRecords: metric.totalRecords,
        periodDays: metric.periodDays,
        actualDaysCount: metric.actualDaysCount
      };
    }
    
    return {
      base,
      habit,
      metric,
      streaks,
      trackerType
    };
  }
}

