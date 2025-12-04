import type { Chart, Plugin, ChartConfiguration, ChartData, ChartOptions } from "chart.js";

/**
 * Theme colors extracted from Obsidian CSS variables
 */
export interface ThemeColors {
  accentColor: string;
  textMuted: string;
  textFaint: string;
  borderColor: string;
  bgPrimary: string;
  errorColor: string;
  successColor: string;
  startLineColor: string;
}

/**
 * Data for a single chart point
 */
export interface ChartPoint {
  label: string;
  value: number;
  dateStr: string;
  color: string;
  borderColor: string;
  isStartDay: boolean;
  isActiveDay: boolean;
}

/**
 * Prepared chart data ready for rendering
 */
export interface PreparedChartData {
  labels: string[];
  values: number[];
  pointBackgroundColors: string[];
  pointBorderColors: string[];
  pointRadii: number[];
  pointBorderWidths: number[];
  dateStrings: string[];
  startTrackingIndex: number | null;
  activeDateIndex: number | null;
  maxValue: number;
  yAxisMin: number;
  yAxisMax: number;
}

/**
 * Chart configuration options
 */
export interface ChartConfigOptions {
  dateIso?: string;
  daysToShow: number;
  metricType: string;
  unit?: string;
  minLimit: number | null;
  maxLimit: number | null;
  scaleMinValue: number | null;
  scaleMaxValue: number | null;
}

/**
 * Extended Chart instance with custom properties
 */
export interface TrackerChartInstance extends Chart {
  startTrackingIndex?: number | null;
  startLineColor?: string;
  activeDateIndex?: number | null;
  dateStrings?: string[];
  minLimit?: number | null;
  maxLimit?: number | null;
}

/**
 * Chart plugin context
 */
export interface ChartPluginContext {
  chart: TrackerChartInstance;
  ctx: CanvasRenderingContext2D;
  chartArea: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Custom Chart.js plugin for tracker visualizations
 */
export type TrackerChartPlugin = Plugin<"line">;

/**
 * Chart.js configuration for tracker visualizations
 * Extends Chart.js ChartConfiguration with line chart type
 */
export interface ChartJsConfig extends ChartConfiguration<"line"> {
  type: "line";
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  plugins?: Plugin<"line">[];
}

