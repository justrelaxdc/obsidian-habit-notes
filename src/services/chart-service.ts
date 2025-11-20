import { Chart } from "chart.js";
import type { TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import type { 
  PreparedChartData, 
  ChartConfigOptions, 
  ThemeColors,
  TrackerChartInstance 
} from "../domain/chart-types";
import { CHART_CONFIG, DATE_FORMATS, TrackerType } from "../constants";
import { getThemeColors, colorToRgba } from "../utils/theme";
import { formatDate, parseDate, addDays } from "../utils/date";
import { countWords } from "../utils/misc";
import { DateService } from "./date-service";

/**
 * Service for managing Chart.js visualizations
 */
export class ChartService {
  /**
   * Prepares chart data from file entries
   */
  prepareChartData(
    entries: Map<string, string | number>,
    file: TFile,
    settings: TrackerSettings,
    options: ChartConfigOptions,
    startTrackingDateStr: string | null,
    todayStr: string
  ): PreparedChartData {
    const { dateIso, daysToShow, metricType, minLimit, maxLimit, scaleMinValue, scaleMaxValue } = options;
    
    // Parse dates
    const activeDate = dateIso 
      ? DateService.parse(dateIso, DATE_FORMATS.ISO)
      : DateService.now();
    
    // Calculate date range (show some days ahead)
    const endDate = activeDate.clone().add(CHART_CONFIG.FUTURE_DAYS_OFFSET, 'days');
    const startDate = endDate.clone().subtract(daysToShow - 1, 'days');
    
    const activeDateStr = DateService.format(activeDate, settings.dateFormat);
    
    // Get theme colors
    const colors = getThemeColors();
    
    // Prepare data arrays
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const pointRadii: number[] = [];
    const pointBorderWidths: number[] = [];
    const dateStrings: string[] = [];
    let maxValue = 0;
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    for (let i = 0; i < daysToShow; i++) {
      const date = startDate.clone().add(i, 'days');
      const dateStr = DateService.format(date, settings.dateFormat);
      
      // Track special indices
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
      }
      if (dateStr === activeDateStr) {
        activeDateIndex = i;
      }
      
      // Format label
      let label = '';
      const m = (window as any).moment;
      if (m) {
        label = m(date.toDate()).format(DATE_FORMATS.DISPLAY_SHORT);
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("ru", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr);
      
      // Get value
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
      values.push(numVal);
      maxValue = Math.max(maxValue, numVal);
      
      // Determine point colors
      let pointColor = colors.accentColor;
      let pointBorder = colors.accentColor;
      
      const isAfterToday = dateStr > todayStr;
      const hasLimits = minLimit !== null || maxLimit !== null;
      
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && 
                         (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          pointColor = colors.successColor;
          pointBorder = colors.successColor;
        } else {
          pointColor = colors.errorColor;
          pointBorder = colors.errorColor;
        }
      }
      
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    
    // Calculate Y axis bounds
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    
    const allMinValues: number[] = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    
    const allMaxValues: number[] = [maxValue];
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    return {
      labels,
      values,
      pointBackgroundColors,
      pointBorderColors,
      pointRadii,
      pointBorderWidths,
      dateStrings,
      startTrackingIndex,
      activeDateIndex,
      maxValue,
      yAxisMin,
      yAxisMax,
    };
  }
  
  /**
   * Creates Chart.js configuration
   */
  createChartConfig(
    data: PreparedChartData,
    colors: ThemeColors,
    options: ChartConfigOptions,
    onChartClick: (dateStr: string) => void
  ): any {
    const { metricType, unit, minLimit, maxLimit, scaleMinValue, scaleMaxValue } = options;
    
    // Determine chart label
    let chartLabel: string;
    if (unit) {
      chartLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
    } else {
      chartLabel = metricType === TrackerType.TEXT ? "Кол-во слов" : "Значение";
    }
    
    const config: any = {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: chartLabel,
          data: data.values,
          borderColor: colors.accentColor,
          backgroundColor: colorToRgba(colors.accentColor, 0.1),
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          tension: CHART_CONFIG.LINE_TENSION,
          pointRadius: data.pointRadii,
          pointBackgroundColor: data.pointBackgroundColors,
          pointBorderColor: data.pointBorderColors,
          pointBorderWidth: data.pointBorderWidths,
          pointHoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
          pointHitRadius: CHART_CONFIG.POINT_HIT_RADIUS,
          pointHoverBackgroundColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return data.pointBackgroundColors[index] || colors.accentColor;
          },
          pointHoverBorderColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return data.pointBorderColors[index] || colors.accentColor;
          },
          pointHoverBorderWidth: (ctx: any) => {
            const index = ctx.dataIndex;
            return data.pointBorderWidths[index] || CHART_CONFIG.POINT_BORDER_WIDTH;
          },
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: colors.bgPrimary,
            titleColor: colors.textMuted,
            bodyColor: colors.textMuted,
            borderColor: colors.borderColor,
            borderWidth: 1,
            padding: 8,
            displayColors: false,
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                if (unit) {
                  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);
                  return `${capitalizedUnit}: ${value}`;
                }
                return `${chartLabel}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: colorToRgba(colors.borderColor, 0.3),
              lineWidth: CHART_CONFIG.GRID_LINE_WIDTH,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: CHART_CONFIG.FONT_SIZE_SMALL
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: CHART_CONFIG.MAX_TICKS_LIMIT,
            }
          },
          y: {
            grid: {
              display: true,
              color: colorToRgba(colors.borderColor, 0.3),
              lineWidth: CHART_CONFIG.GRID_LINE_WIDTH,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: CHART_CONFIG.FONT_SIZE_SMALL
              }
            },
            beginAtZero: !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue,
            min: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) 
              ? data.yAxisMin 
              : undefined,
            max: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) 
              ? data.yAxisMax 
              : undefined
          }
        },
        interaction: {
          intersect: false,
          mode: 'index' as const
        },
        elements: {
          point: {
            hoverBackgroundColor: undefined,
            hoverBorderColor: undefined,
            hoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
            hoverBorderWidth: undefined
          }
        },
        onClick: (event: any, elements: any[], chart: any) => {
          if (elements && elements.length > 0) {
            const element = elements[0];
            const pointIndex = element.index;
            const dateStrings = (chart as TrackerChartInstance).dateStrings;
            
            if (dateStrings && pointIndex >= 0 && pointIndex < dateStrings.length) {
              const clickedDateStr = dateStrings[pointIndex];
              onChartClick(clickedDateStr);
            }
          }
        },
        onResize: (chart: any) => {
          this.drawChartAnnotations(chart, data, colors, minLimit, maxLimit);
        }
      },
      plugins: [{
        id: 'startLinePlugin',
        beforeDraw: (chart: any) => {
          this.drawChartAnnotations(chart, data, colors, minLimit, maxLimit);
        }
      }]
    };
    
    return config;
  }
  
  /**
   * Draws annotations (vertical lines, limit lines) on chart
   */
  private drawChartAnnotations(
    chart: TrackerChartInstance,
    data: PreparedChartData,
    colors: ThemeColors,
    minLimit: number | null,
    maxLimit: number | null
  ): void {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    
    // Draw start tracking line (dashed)
    if (data.startTrackingIndex !== null && data.startTrackingIndex !== data.activeDateIndex) {
      this.drawVerticalLine(
        chart,
        data.startTrackingIndex,
        colors.startLineColor,
        true // dashed
      );
    }
    
    // Draw active date line (solid, on top)
    if (data.activeDateIndex !== null) {
      this.drawVerticalLine(
        chart,
        data.activeDateIndex,
        colors.startLineColor,
        false // solid
      );
    }
    
    // Draw limit lines
    if (minLimit !== null) {
      this.drawHorizontalLine(chart, minLimit, colors.startLineColor);
    }
    if (maxLimit !== null) {
      this.drawHorizontalLine(chart, maxLimit, colors.startLineColor);
    }
  }
  
  /**
   * Draws a vertical line on chart
   */
  private drawVerticalLine(
    chart: TrackerChartInstance,
    index: number,
    color: string,
    dashed: boolean
  ): void {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    
    const xScale = chart.scales.x;
    const xPos = xScale.getPixelForValue(index);
    
    if (xPos < chartArea.left || xPos > chartArea.right) return;
    
    ctx.save();
    ctx.strokeStyle = colorToRgba(color, 0.6);
    ctx.lineWidth = 2;
    ctx.setLineDash(dashed ? [5, 5] : []);
    ctx.beginPath();
    ctx.moveTo(xPos, chartArea.top);
    ctx.lineTo(xPos, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  }
  
  /**
   * Draws a horizontal line on chart
   */
  private drawHorizontalLine(
    chart: TrackerChartInstance,
    value: number,
    color: string
  ): void {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    
    const yScale = chart.scales.y;
    const yPos = yScale.getPixelForValue(value);
    
    if (yPos < chartArea.top || yPos > chartArea.bottom) return;
    
    ctx.save();
    ctx.strokeStyle = colorToRgba(color, 0.6);
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(chartArea.left, yPos);
    ctx.lineTo(chartArea.right, yPos);
    ctx.stroke();
    ctx.restore();
  }
}

