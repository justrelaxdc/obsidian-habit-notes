import { useRef, useEffect, useCallback, useMemo } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { Chart, registerables } from "chart.js";
import { CSS_CLASSES, CHART_CONFIG, TrackerType } from "../../constants";
import { chartService } from "../../services/chart-service";
import { DateService } from "../../services/date-service";
import { getThemeColors } from "../../utils/theme";
import type { ChartWrapperProps } from "../types";
import type { TrackerChartInstance } from "../../domain/chart-types";
import { trackerStore } from "../../store";

// Register Chart.js components
Chart.register(...registerables);

/**
 * Chart wrapper component for Chart.js integration
 * Accesses entries via computed signal internally for proper reactivity
 */
export function ChartWrapper({
  file,
  plugin,
  dateIso,
  daysToShow,
  fileOptions,
  onDateClick,
}: ChartWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<TrackerChartInstance | null>(null);

  // Access entries via computed signal - only re-renders when this tracker's entries change
  const entries = useComputed(() => {
    const state = trackerStore.getTrackerState(file.path);
    return state?.entries ?? new Map();
  });

  // Get tracker type and options
  const trackerType = (fileOptions?.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
  const unit = fileOptions?.unit || "";
  const minLimit = fileOptions?.minLimit ? parseFloat(fileOptions.minLimit) : null;
  const maxLimit = fileOptions?.maxLimit ? parseFloat(fileOptions.maxLimit) : null;
  const scaleMinValue = fileOptions?.minValue ? parseFloat(fileOptions.minValue) : null;
  const scaleMaxValue = fileOptions?.maxValue ? parseFloat(fileOptions.maxValue) : null;

  // Get start tracking date - use useMemo to track entries and fileOptions changes
  const startTrackingDateStr = useMemo(() => {
    return plugin.getStartTrackingDate(entries.value, fileOptions);
  }, [plugin, entries.value, fileOptions]);

  // Handle chart click
  const handleChartClick = useCallback((dateStr: string) => {
    if (onDateClick) {
      onDateClick(dateStr);
    }
  }, [onDateClick]);

  // Track previous values to determine if we can update vs recreate
  const prevConfigRef = useRef<{
    trackerType: string;
    unit: string;
    minLimit: number | null;
    maxLimit: number | null;
    scaleMinValue: number | null;
    scaleMaxValue: number | null;
    dateIso: string;
    daysToShow: number;
    yAxisMin: number;
    yAxisMax: number;
  } | null>(null);

  // Cleanup chart on unmount only - separate from create/update
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        // Cleanup ResizeObserver if exists
        const resizeObserver = (chartRef.current as any).__resizeObserver;
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  // Create/update chart
  useEffect(() => {
    if (!canvasRef.current) return;

    const colors = getThemeColors();
    const todayStr = DateService.format(DateService.now(), plugin.settings.dateFormat);

    // Prepare chart data
    const chartData = chartService.prepareChartData(
      entries.value,
      file,
      plugin.settings,
      {
        dateIso,
        daysToShow,
        metricType: trackerType,
        unit,
        minLimit,
        maxLimit,
        scaleMinValue,
        scaleMaxValue,
      },
      startTrackingDateStr,
      todayStr
    );

    const currentConfig = {
      trackerType,
      unit,
      minLimit,
      maxLimit,
      scaleMinValue,
      scaleMaxValue,
      dateIso,
      daysToShow,
      yAxisMin: chartData.yAxisMin,
      yAxisMax: chartData.yAxisMax,
    };

    // Check if we can update existing chart or need to recreate
    // Only config changes require recreation; data changes can be updated
    // Also recreate when Y-axis bounds change (e.g., value exceeds current limits)
    const canUpdate = chartRef.current && prevConfigRef.current &&
      prevConfigRef.current.trackerType === currentConfig.trackerType &&
      prevConfigRef.current.unit === currentConfig.unit &&
      prevConfigRef.current.minLimit === currentConfig.minLimit &&
      prevConfigRef.current.maxLimit === currentConfig.maxLimit &&
      prevConfigRef.current.scaleMinValue === currentConfig.scaleMinValue &&
      prevConfigRef.current.scaleMaxValue === currentConfig.scaleMaxValue &&
      prevConfigRef.current.dateIso === currentConfig.dateIso &&
      prevConfigRef.current.daysToShow === currentConfig.daysToShow &&
      prevConfigRef.current.yAxisMin === currentConfig.yAxisMin &&
      prevConfigRef.current.yAxisMax === currentConfig.yAxisMax;

    if (canUpdate && chartRef.current) {
      // Only entries changed - update data directly
      // This is much faster than recreating the entire chart config
      const dataset = chartRef.current.data.datasets[0] as any;
      if (dataset) {
        dataset.data = chartData.values;
        dataset.pointBackgroundColor = chartData.pointBackgroundColors;
        dataset.pointBorderColor = chartData.pointBorderColors;
        dataset.pointRadius = chartData.pointRadii;
        dataset.pointBorderWidth = chartData.pointBorderWidths;
      }
      chartRef.current.data.labels = chartData.labels;
      chartRef.current.dateStrings = chartData.dateStrings;
      
      // Update annotation indices for vertical lines
      chartRef.current.startTrackingIndex = chartData.startTrackingIndex;
      chartRef.current.activeDateIndex = chartData.activeDateIndex;
      chartRef.current.minLimit = minLimit;
      chartRef.current.maxLimit = maxLimit;
      
      // Update chart with minimal animation
      chartRef.current.update('none');
      
      // Store current config for next update comparison
      prevConfigRef.current = currentConfig;
      return;
    }
    
    // Config changed or chart doesn't exist - need to recreate
    {
      // Create chart config
      const config = chartService.createChartConfig(
        chartData,
        colors,
        {
          dateIso,
          daysToShow,
          metricType: trackerType,
          unit,
          minLimit,
          maxLimit,
          scaleMinValue,
          scaleMaxValue,
        },
        handleChartClick
      );

      // Destroy existing chart if config changed (recreate needed)
      if (chartRef.current) {
        // Cleanup ResizeObserver if exists
        const resizeObserver = (chartRef.current as any).__resizeObserver;
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        chartRef.current.destroy();
        chartRef.current = null;
      }

      // Create new chart
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, config) as TrackerChartInstance;
        // Store date strings and annotation indices for click handling and annotations
        chartRef.current.dateStrings = chartData.dateStrings;
        chartRef.current.startTrackingIndex = chartData.startTrackingIndex;
        chartRef.current.activeDateIndex = chartData.activeDateIndex;
        chartRef.current.minLimit = minLimit;
        chartRef.current.maxLimit = maxLimit;
        
        // Setup ResizeObserver for responsive charts
        const chartContainer = canvasRef.current.parentElement;
        if (chartContainer) {
          const resizeObserver = new ResizeObserver(() => {
            if (chartRef.current) {
              chartRef.current.resize();
            }
          });
          resizeObserver.observe(chartContainer);
          
          // Store observer reference for cleanup
          (chartRef.current as any).__resizeObserver = resizeObserver;
        }
      }

      // Store current config for next update comparison
      prevConfigRef.current = currentConfig;
    }
  }, [
    file,
    plugin,
    dateIso,
    daysToShow,
    entries.value,
    trackerType,
    unit,
    minLimit,
    maxLimit,
    scaleMinValue,
    scaleMaxValue,
    startTrackingDateStr,
    handleChartClick,
  ]);

  return (
    <div class={CSS_CLASSES.CHART}>
      <canvas ref={canvasRef} />
    </div>
  );
}

