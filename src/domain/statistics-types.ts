/**
 * Statistics types for tracker calculations and display
 */

/**
 * Base statistics that are common to all tracker types
 */
export interface BaseStatistics {
  /** Total number of entries in the tracker */
  totalRecords: number;
  /** Number of days in the period */
  periodDays: number;
  /** Actual days count (considering tracking start date) */
  actualDaysCount: number;
}

/**
 * Statistics specific to habits (good-habit, bad-habit)
 */
export interface HabitStatistics extends BaseStatistics {
  /** Completion rate as percentage (0-100) */
  completionRate: number;
  /** Number of active days (days with success) */
  activeDays: number;
  /** Sum of successful days */
  sum: number;
  /** Average completion rate */
  avg: number;
}

/**
 * Statistics specific to metrics (number, scale, plusminus, text)
 */
export interface MetricStatistics extends BaseStatistics {
  /** Sum of all values in the period */
  sum: number;
  /** Average value */
  avg: number;
  /** Minimum value */
  min: number | null;
  /** Maximum value */
  max: number | null;
  /** Median value */
  median: number | null;
  /** Number of days with non-zero values */
  activeDays: number;
}

/**
 * Streak information
 */
export interface StreakInfo {
  /** Current streak (consecutive days from end date) */
  current: number;
  /** Best streak ever recorded */
  best: number;
}

/**
 * Complete statistics result combining base stats, type-specific stats, and streaks
 */
export interface StatisticsResult {
  /** Base statistics */
  base: BaseStatistics;
  /** Habit-specific statistics (null for metrics) */
  habit: HabitStatistics | null;
  /** Metric-specific statistics (null for habits) */
  metric: MetricStatistics | null;
  /** Streak information */
  streaks: StreakInfo;
  /** Tracker type */
  trackerType: string;
}

