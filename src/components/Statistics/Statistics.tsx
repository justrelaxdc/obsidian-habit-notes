import { useMemo } from "preact/hooks";
import { CSS_CLASSES, TrackerType, STATS_LABELS } from "../../constants";
import { StatisticsService } from "../../services/statistics-service";
import { DateService } from "../../services/date-service";
import type { StatisticsProps } from "../types";
import type { StatisticsResult } from "../../domain/statistics-types";

/**
 * Helper to get completion rate color class
 */
function getCompletionColorClass(rate: number): string {
  if (rate >= 80) return "tracker-notes__stats-value--success";
  if (rate >= 50) return "tracker-notes__stats-value--warning";
  return "tracker-notes__stats-value--error";
}

/**
 * Helper to format value with unit
 */
function formatValue(value: number, decimals: number = 1, unit: string = ""): string {
  const formatted = value.toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Helper to get days label (singular/plural)
 */
function getDaysLabel(count: number): string {
  if (count === 1) return STATS_LABELS.DAYS_SINGULAR;
  if (count < 5) return STATS_LABELS.DAYS_PLURAL_2_4;
  return STATS_LABELS.DAYS_PLURAL_5_PLUS;
}

/**
 * Section card component
 */
interface SectionProps {
  title?: string;
  children: preact.ComponentChildren;
}

function Section({ title, children }: SectionProps) {
  return (
    <div class="tracker-notes__stats-section tracker-notes__stats-card">
      {title && (
        <div class="tracker-notes__stats-section-title">
          <span>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Metric item component
 */
interface MetricItemProps {
  label: string;
  value: string;
  valueClass?: string;
  icon?: string;
}

function MetricItem({ label, value, valueClass, icon }: MetricItemProps) {
  return (
    <div class="tracker-notes__stats-metric">
      {icon && <span class="tracker-notes__stats-icon">{icon}</span>}
      <span class="tracker-notes__stats-label">{label}: </span>
      <span class={`tracker-notes__stats-value ${valueClass || ""}`.trim()}>{value}</span>
    </div>
  );
}

/**
 * Completion rate component with progress bar
 */
interface CompletionRateProps {
  rate: number;
  activeDays: number;
  totalDays: number;
  label: string;
}

function CompletionRate({ rate, activeDays, totalDays, label }: CompletionRateProps) {
  const rateValue = Math.round(rate);
  const colorClass = getCompletionColorClass(rateValue);

  return (
    <div class="tracker-notes__stats-metric tracker-notes__stats-metric--completion">
      <div class="tracker-notes__stats-completion-header">
        <span class="tracker-notes__stats-icon">✅</span>
        <span class="tracker-notes__stats-label">{label}: </span>
        <span class={`tracker-notes__stats-value ${colorClass}`}>{rateValue}%</span>
        <span class="tracker-notes__stats-value-sub"> ({activeDays}/{totalDays})</span>
      </div>
      <div class="tracker-notes__stats-progress-bar">
        <div 
          class={`tracker-notes__stats-progress-fill ${colorClass}`}
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Streak component
 */
interface StreakProps {
  streak: number;
  label: string;
  isCurrent?: boolean;
}

function Streak({ streak, label, isCurrent = false }: StreakProps) {
  const icon = isCurrent ? "🔥" : "⭐";
  const daysLabel = getDaysLabel(streak);

  return (
    <div class={`tracker-notes__stats-metric tracker-notes__stats-metric--streak ${isCurrent ? "tracker-notes__stats-metric--current" : ""}`}>
      <span class="tracker-notes__stats-icon tracker-notes__stats-icon--streak">{icon}</span>
      <span class="tracker-notes__stats-label">{label}: </span>
      <span class="tracker-notes__stats-value">{streak} {daysLabel}</span>
    </div>
  );
}

/**
 * Habit statistics component
 */
interface HabitStatsProps {
  result: StatisticsResult;
}

function HabitStats({ result }: HabitStatsProps) {
  if (!result.habit) return null;

  const stats = result.habit;
  const isBadHabit = result.trackerType.toLowerCase() === TrackerType.BAD_HABIT;
  const completionLabel = isBadHabit ? "Days without" : STATS_LABELS.COMPLETION_RATE;

  return (
    <>
      <Section title="PERIOD">
        <CompletionRate
          rate={stats.completionRate}
          activeDays={stats.activeDays}
          totalDays={stats.actualDaysCount}
          label={completionLabel}
        />
      </Section>
      <Section title="STREAKS">
        <Streak
          streak={result.streaks.current}
          label={STATS_LABELS.CURRENT_STREAK}
          isCurrent
        />
        <Streak
          streak={result.streaks.best}
          label={STATS_LABELS.BEST_STREAK}
        />
      </Section>
    </>
  );
}

/**
 * Metric statistics component
 */
interface MetricStatsProps {
  result: StatisticsResult;
  unit: string;
}

function MetricStats({ result, unit }: MetricStatsProps) {
  if (!result.metric) return null;

  const stats = result.metric;

  return (
    <Section title="PERIOD">
      <MetricItem
        label={STATS_LABELS.ACTIVE_DAYS}
        value={`${stats.activeDays}/${stats.actualDaysCount}`}
        icon="📅"
      />
      <MetricItem
        label={STATS_LABELS.LAST_DAYS}
        value={formatValue(stats.sum, 1, unit)}
        icon="📈"
      />
      <MetricItem
        label={STATS_LABELS.AVERAGE}
        value={formatValue(stats.avg, 1, unit)}
        icon="📊"
      />
      {stats.min !== null && stats.max !== null && (
        <div class="tracker-notes__stats-metric tracker-notes__stats-metric--minmax">
          <span class="tracker-notes__stats-icon">📉</span>
          <span class="tracker-notes__stats-label">{STATS_LABELS.MIN}: </span>
          <span class="tracker-notes__stats-value">{formatValue(stats.min, 1, unit)}</span>
          <span> | </span>
          <span class="tracker-notes__stats-label">{STATS_LABELS.MAX}: </span>
          <span class="tracker-notes__stats-value">{formatValue(stats.max, 1, unit)}</span>
        </div>
      )}
      {stats.median !== null && (
        <MetricItem
          label={STATS_LABELS.MEDIAN}
          value={formatValue(stats.median, 1, unit)}
          icon="📊"
        />
      )}
    </Section>
  );
}

// Singleton instance - StatisticsService is stateless
const statisticsService = new StatisticsService();

/**
 * Main Statistics component
 */
export function Statistics({ 
  file, 
  plugin, 
  dateIso, 
  daysToShow, 
  trackerType, 
  entries, 
  fileOptions 
}: StatisticsProps) {
  // Calculate statistics
  const statisticsResult = useMemo<StatisticsResult | null>(() => {
    try {
      const endDate = DateService.parse(dateIso, plugin.settings.dateFormat);
      const startTrackingDateStr = plugin.getStartTrackingDate(entries, fileOptions);
      
      return statisticsService.calculateStatistics(
        entries,
        plugin.settings,
        dateIso,
        daysToShow,
        trackerType,
        endDate,
        file,
        startTrackingDateStr
      );
    } catch (error) {
      console.error("Statistics: error calculating statistics", error);
      return null;
    }
  }, [file, plugin, dateIso, daysToShow, trackerType, entries, fileOptions]);

  if (!statisticsResult) return null;

  const isHabit = trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;
  const unit = fileOptions?.unit || "";

  return (
    <div class={CSS_CLASSES.STATS}>
      {isHabit ? (
        <HabitStats result={statisticsResult} />
      ) : (
        <MetricStats result={statisticsResult} unit={unit} />
      )}
    </div>
  );
}

