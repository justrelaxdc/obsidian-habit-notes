import { useCallback, useRef, useMemo } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { CSS_CLASSES, TrackerType } from "../../constants";
import { DateService } from "../../services/date-service";
import { isTrackerValueTrue } from "../../utils/validation";
import type { HeatmapProps } from "../types";
import { logError } from "../../utils/notifications";
import { trackerStore } from "../../store";

interface HeatmapDay {
  dateStr: string;
  dayNum: number;
  hasValue: boolean;
  isStartDay: boolean;
  isBeforeStart: boolean;
  isAfterToday: boolean;
}

/**
 * Heatmap control for habits
 * Accesses entries via computed signal internally for proper reactivity
 */
export function Heatmap({ 
  file, 
  dateIso, 
  plugin, 
  daysToShow,
  trackerType,
  startTrackingDate,
}: HeatmapProps) {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0, isScrolling: false });

  // Access entries via computed signal - only re-renders when this tracker's entries change
  const entries = useComputed(() => {
    const state = trackerStore.getTrackerState(file.path);
    return state?.entries ?? new Map();
  });

  // Generate heatmap days - optimized to only recalculate when relevant entries change
  // Create a hash of entries for the date range to detect actual changes
  // Use useMemo to track dateIso prop changes
  const entriesHash = useMemo(() => {
    const endDate = DateService.parse(dateIso, plugin.settings.dateFormat);
    const dateStrs: string[] = [];
    for (let i = 0; i < daysToShow; i++) {
      const date = endDate.clone().subtract(i, "days");
      const dateStr = DateService.format(date, plugin.settings.dateFormat);
      dateStrs.push(dateStr);
    }
    // Create hash from relevant entries only
    return dateStrs.map(d => `${d}:${entries.value.get(d) ?? ''}`).join('|');
  }, [dateIso, daysToShow, entries.value, plugin.settings.dateFormat]);

  const days = useMemo<HeatmapDay[]>(() => {
    const endDate = DateService.parse(dateIso, plugin.settings.dateFormat);
    const today = DateService.now();
    const todayStart = DateService.startOfDay(today);
    const todayStr = DateService.format(todayStart, plugin.settings.dateFormat);
    
    // Parse start tracking date once outside the loop
    let startDateObj: ReturnType<typeof DateService.parseMultiple> | null = null;
    if (startTrackingDate) {
      try {
        startDateObj = DateService.parseMultiple(startTrackingDate, [
          plugin.settings.dateFormat,
          "YYYY-MM-DD",
          "DD.MM.YYYY",
          "MM/DD/YYYY",
        ]);
      } catch (e) {
        // Ignore parsing errors - startDateObj remains null
      }
    }
    
    const result: HeatmapDay[] = [];
    
    // Go from newest to oldest (will be displayed with flex-direction: row-reverse)
    for (let i = 0; i < daysToShow; i++) {
      const date = endDate.clone().subtract(i, "days");
      const dateStr = DateService.format(date, plugin.settings.dateFormat);
      const dayNum = date.getDate();
      
      const value = entries.value.get(dateStr);
      const hasValue = isTrackerValueTrue(value);
      const isStartDay = dateStr === startTrackingDate;
      
      let isBeforeStart = false;
      let isAfterToday = false;
      
      // Check if date is after today
      if (DateService.isAfter(date, todayStart)) {
        isAfterToday = true;
      } else if (startDateObj) {
        // Check if date is before start tracking date (using pre-parsed date)
        if (DateService.isBefore(date, startDateObj)) {
          isBeforeStart = true;
        }
      }
      
      result.push({
        dateStr,
        dayNum,
        hasValue,
        isStartDay,
        isBeforeStart,
        isAfterToday,
      });
    }
    
    return result;
  }, [dateIso, daysToShow, entriesHash, plugin.settings.dateFormat, startTrackingDate]);

  // Handle day click using event delegation for better performance
  const handleContainerClick = useCallback(async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains(CSS_CLASSES.HEATMAP_DAY)) return;
    
    const dateStr = target.dataset.dateStr;
    if (!dateStr) return;
    
    // Find the day data
    const day = days.find(d => d.dateStr === dateStr);
    if (!day) return;
    
    // Don't allow clicking on future days or days before tracking start
    if (day.isAfterToday || day.isBeforeStart) {
      return;
    }
    
    const isChecked = day.hasValue;
    const newValue = isChecked ? 0 : 1;
    
    try {
      await plugin.writeLogLine(file, day.dateStr, String(newValue));
    } catch (err) {
      logError("Heatmap: write error", err);
    }
  }, [plugin, file, days]);

  // Touch event handlers to prevent sidebar opening on horizontal scroll
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        isScrolling: false,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1 && touchStartRef.current.x !== 0) {
      const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
      
      // Block propagation only for horizontal scrolling
      if (deltaX > deltaY * 1.5 && deltaX > 10) {
        touchStartRef.current.isScrolling = true;
        e.stopPropagation();
      } else {
        touchStartRef.current.isScrolling = false;
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartRef.current.isScrolling) {
      e.stopPropagation();
    }
    touchStartRef.current = { x: 0, y: 0, isScrolling: false };
  }, []);

  // Build class names for a day
  const getDayClassName = useCallback((day: HeatmapDay): string => {
    const classes = [CSS_CLASSES.HEATMAP_DAY, trackerType];
    if (day.hasValue) classes.push("has-value");
    if (day.isStartDay) classes.push("start-day");
    if (day.isBeforeStart) classes.push("before-start");
    if (day.isAfterToday) classes.push("after-today");
    return classes.join(" ");
  }, [trackerType]);

  return (
    <div
      ref={heatmapRef}
      class={CSS_CLASSES.HEATMAP}
      onClick={handleContainerClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {days.map((day) => (
        <div
          key={day.dateStr}
          class={getDayClassName(day)}
          data-date-str={day.dateStr}
        >
          {day.dayNum}
        </div>
      ))}
    </div>
  );
}

