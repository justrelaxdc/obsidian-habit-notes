import type { TrackerFileOptions } from "../domain/types";
import type { StatisticsResult, HabitStatistics, MetricStatistics } from "../domain/statistics-types";
import { TrackerType, STATS_LABELS, UI_CONSTANTS } from "../constants";

/**
 * Service for rendering statistics display
 */
export class StatisticsRenderer {
  /**
   * Helper to get completion rate color class
   */
  private getCompletionColorClass(rate: number): string {
    if (rate >= 80) return "tracker-notes__stats-value--success";
    if (rate >= 50) return "tracker-notes__stats-value--warning";
    return "tracker-notes__stats-value--error";
  }

  /**
   * Helper to format value with unit
   */
  private formatValue(value: number, decimals: number = 1, unit: string = ""): string {
    const formatted = value.toFixed(decimals);
    return unit ? `${formatted} ${unit}` : formatted;
  }

  /**
   * Helper to get days label (singular/plural)
   */
  private getDaysLabel(count: number): string {
    if (count === 1) return STATS_LABELS.DAYS_SINGULAR;
    if (count < 5) return STATS_LABELS.DAYS_PLURAL_2_4;
    return STATS_LABELS.DAYS_PLURAL_5_PLUS;
  }

  /**
   * Creates a metric item (label + value) with optional icon
   */
  private createMetricItem(
    container: HTMLElement,
    label: string,
    value: string,
    valueClass?: string,
    icon?: string
  ): HTMLElement {
    const item = container.createDiv({ cls: "tracker-notes__stats-metric" });
    
    if (icon) {
      const iconEl = item.createSpan({ 
        text: icon, 
        cls: "tracker-notes__stats-icon" 
      });
    }
    
    const labelEl = item.createSpan({ 
      text: label, 
      cls: "tracker-notes__stats-label" 
    });
    labelEl.createSpan({ text: ": " });
    const valueEl = item.createSpan({ 
      text: value, 
      cls: `tracker-notes__stats-value ${valueClass || ""}`.trim()
    });
    return item;
  }

  /**
   * Creates a section with title (card style)
   */
  private createSection(container: HTMLElement, title?: string): HTMLElement {
    const section = container.createDiv({ cls: "tracker-notes__stats-section tracker-notes__stats-card" });
    if (title) {
      const titleEl = section.createDiv({ 
        cls: "tracker-notes__stats-section-title" 
      });
      titleEl.createSpan({ text: title });
    }
    return section;
  }

  /**
   * Renders completion rate with progress bar
   */
  private renderCompletionRate(
    container: HTMLElement,
    rate: number,
    activeDays: number,
    totalDays: number,
    label: string
  ): void {
    const item = container.createDiv({ cls: "tracker-notes__stats-metric tracker-notes__stats-metric--completion" });
    
    const header = item.createDiv({ cls: "tracker-notes__stats-completion-header" });
    
    // Icon
    header.createSpan({ 
      text: "✅", 
      cls: "tracker-notes__stats-icon" 
    });
    
    const labelEl = header.createSpan({ 
      text: label, 
      cls: "tracker-notes__stats-label" 
    });
    labelEl.createSpan({ text: ": " });
    
    const rateValue = Math.round(rate);
    const valueEl = header.createSpan({ 
      text: `${rateValue}%`, 
      cls: `tracker-notes__stats-value ${this.getCompletionColorClass(rateValue)}` 
    });
    header.createSpan({ 
      text: ` (${activeDays}/${totalDays})`, 
      cls: "tracker-notes__stats-value-sub" 
    });
    
    // Progress bar
    const progressBar = item.createDiv({ cls: "tracker-notes__stats-progress-bar" });
    const progressFill = progressBar.createDiv({ 
      cls: "tracker-notes__stats-progress-fill" 
    });
    progressFill.style.width = `${rate}%`;
    progressFill.classList.add(this.getCompletionColorClass(rateValue));
  }

  /**
   * Renders streak information
   */
  private renderStreak(
    container: HTMLElement,
    streak: number,
    label: string,
    isCurrent: boolean = false
  ): void {
    const item = container.createDiv({ 
      cls: `tracker-notes__stats-metric tracker-notes__stats-metric--streak ${isCurrent ? "tracker-notes__stats-metric--current" : ""}` 
    });
    
    // Icon
    const icon = isCurrent ? "🔥" : "⭐";
    item.createSpan({ 
      text: icon, 
      cls: "tracker-notes__stats-icon tracker-notes__stats-icon--streak" 
    });
    
    const labelEl = item.createSpan({ 
      text: label, 
      cls: "tracker-notes__stats-label" 
    });
    labelEl.createSpan({ text: ": " });
    
    const daysLabel = this.getDaysLabel(streak);
    const valueEl = item.createSpan({ 
      text: `${streak} ${daysLabel}`, 
      cls: "tracker-notes__stats-value"
    });
  }

  /**
   * Renders statistics for habits
   */
  renderHabitStats(
    statsDiv: HTMLElement,
    result: StatisticsResult,
    fileOpts?: TrackerFileOptions
  ): void {
    // Clear existing content
    statsDiv.empty();
    
    if (!result.habit) return;
    
    const stats = result.habit;
    const isBadHabit = result.trackerType.toLowerCase() === TrackerType.BAD_HABIT;
    
    // Period section
    const periodSection = this.createSection(statsDiv, "PERIOD");
    
    // Completion rate with progress bar
    const completionLabel = isBadHabit 
      ? "Days without" 
      : STATS_LABELS.COMPLETION_RATE;
    
    this.renderCompletionRate(
      periodSection,
      stats.completionRate,
      stats.activeDays,
      stats.actualDaysCount,
      completionLabel
    );
    
    // Streaks section - always show
    const streaksSection = this.createSection(statsDiv, "STREAKS");
    
    this.renderStreak(
      streaksSection,
      result.streaks.current,
      STATS_LABELS.CURRENT_STREAK,
      true
    );
    
    this.renderStreak(
      streaksSection,
      result.streaks.best,
      STATS_LABELS.BEST_STREAK,
      false
    );
  }

  /**
   * Renders statistics for metrics
   */
  renderMetricStats(
    statsDiv: HTMLElement,
    result: StatisticsResult,
    fileOpts?: TrackerFileOptions
  ): void {
    // Clear existing content
    statsDiv.empty();
    
    if (!result.metric) return;
    
    const stats = result.metric;
    const unit = fileOpts?.unit || "";
    
    // Period section
    const periodSection = this.createSection(statsDiv, "PERIOD");
    
    // Active days (moved to top)
    this.createMetricItem(
      periodSection,
      STATS_LABELS.ACTIVE_DAYS,
      `${stats.activeDays}/${stats.actualDaysCount}`,
      undefined,
      "📅"
    );
    
    // Sum for period
    this.createMetricItem(
      periodSection,
      STATS_LABELS.LAST_DAYS,
      this.formatValue(stats.sum, 1, unit),
      undefined,
      "📈"
    );
    
    // Average
    this.createMetricItem(
      periodSection,
      STATS_LABELS.AVERAGE,
      this.formatValue(stats.avg, 1, unit),
      undefined,
      "📊"
    );
    
    // Min/Max
    if (stats.min !== null && stats.max !== null) {
      const minMaxItem = periodSection.createDiv({ cls: "tracker-notes__stats-metric tracker-notes__stats-metric--minmax" });
      minMaxItem.createSpan({ 
        text: "📉", 
        cls: "tracker-notes__stats-icon" 
      });
      minMaxItem.createSpan({ 
        text: `${STATS_LABELS.MIN}: `, 
        cls: "tracker-notes__stats-label" 
      });
      minMaxItem.createSpan({ 
        text: this.formatValue(stats.min, 1, unit), 
        cls: "tracker-notes__stats-value" 
      });
      minMaxItem.createSpan({ text: " | " });
      minMaxItem.createSpan({ 
        text: `${STATS_LABELS.MAX}: `, 
        cls: "tracker-notes__stats-label" 
      });
      minMaxItem.createSpan({ 
        text: this.formatValue(stats.max, 1, unit), 
        cls: "tracker-notes__stats-value" 
      });
    }
    
    // Median
    if (stats.median !== null) {
      this.createMetricItem(
        periodSection,
        STATS_LABELS.MEDIAN,
        this.formatValue(stats.median, 1, unit),
        undefined,
        "📊"
      );
    }
  }

  /**
   * Renders statistics based on tracker type
   */
  renderStats(
    statsDiv: HTMLElement,
    result: StatisticsResult,
    fileOpts?: TrackerFileOptions
  ): void {
    const metricType = result.trackerType.toLowerCase();
    const isHabit = metricType === TrackerType.GOOD_HABIT || metricType === TrackerType.BAD_HABIT;
    
    if (isHabit) {
      this.renderHabitStats(statsDiv, result, fileOpts);
    } else {
      this.renderMetricStats(statsDiv, result, fileOpts);
    }
  }
}

