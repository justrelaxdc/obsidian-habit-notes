import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile, TFolder } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { resolveDateIso } from "../utils/date";
import { countWords, parseMaybeNumber } from "../utils/misc";
import { isTrackerValueTrue } from "../utils/validation";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/tracker.css";
import { DateService } from "../services/date-service";
import { HeatmapService } from "../services/heatmap-service";
import { ControlsRenderer } from "../services/controls-renderer";
import { TrackerRenderer } from "../services/tracker-renderer";
import { VisualizationService } from "../services/visualization-service";
import { TrackerOrderService } from "../services/tracker-order-service";
import { IconizeService } from "../services/iconize-service";
import { FILE_UPDATE_DELAY_MS, ANIMATION_DURATION_MS, ANIMATION_DURATION_SHORT_MS, SCROLL_RESTORE_DELAY_2_MS, IMMEDIATE_TIMEOUT_MS, MOBILE_BREAKPOINT, CHART_CONFIG, NOTICE_TIMEOUT_MS, UI_CONSTANTS, ERROR_MESSAGES, MODAL_LABELS } from "../constants";
import { getThemeColors, colorToRgba } from "../utils/theme";
import { showNoticeIfNotMobile } from "../utils/notifications";
import { removePrefix, parseFilename } from "../utils/filename-parser";

export default class TrackerPlugin extends Plugin {
  settings: TrackerSettings;
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();
  private folderTreeService: FolderTreeService;
  private trackerFileService: TrackerFileService;
  private styleEl?: HTMLStyleElement;
  private trackerState: Map<string, { entries: Map<string, string | number>; fileOpts: TrackerFileOptions }> = new Map();
  private currentNotePath: string | null = null;
  private heatmapService: HeatmapService;
  private controlsRenderer: ControlsRenderer;
  private trackerRenderer: TrackerRenderer;
  private visualizationService: VisualizationService;
  private trackerOrderService: TrackerOrderService;
  private iconizeService: IconizeService;

  private isMobileDevice(): boolean {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.folderTreeService = new FolderTreeService(this.app);
    this.trackerFileService = new TrackerFileService(this.app);
    this.visualizationService = new VisualizationService();
    this.trackerOrderService = new TrackerOrderService(this.app);
    this.iconizeService = new IconizeService(this.app);
    
    // Load Iconize data asynchronously
    this.iconizeService.loadIconizeData().catch(() => {
      // Silently fail if Iconize is not installed
    });
    
    // Initialize rendering services
    this.heatmapService = new HeatmapService(
      this.settings,
      (file: TFile) => this.readAllEntries(file),
      (file: TFile, dateIso: string, value: string) => this.writeLogLine(file, dateIso, value),
      (entries: Map<string, string | number>, fileOpts?: TrackerFileOptions) => {
        return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
      },
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: Map<string, string | number>) => 
        this.updateChart(chartDiv, file, dateIso, daysToShow, entries),
      (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: Map<string, string | number>) => 
        this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries)
    );
    
    this.controlsRenderer = new ControlsRenderer(
      this.settings,
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (file: TFile, dateIso: string) => this.readValueForDate(file, dateIso),
      (file: TFile) => this.readAllEntries(file),
      (file: TFile, dateIso: string, value: string) => this.writeLogLine(file, dateIso, value),
      this.heatmapService,
      (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: Map<string, string | number>) => 
        this.updateChart(chartDiv, file, dateIso, daysToShow, entries),
      (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: Map<string, string | number>) => 
        this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries)
    );
    
    this.trackerRenderer = new TrackerRenderer(
      this.settings,
      (file: TFile) => this.getFileTypeFromFrontmatter(file),
      (file: TFile, dateIso: string) => this.readValueForDate(file, dateIso),
      this.controlsRenderer,
      (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) => 
        this.renderChart(container, file, dateIso, daysToShow, entries),
      (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) => 
        this.renderStats(container, file, dateIso, daysToShow, trackerType, entries),
      () => this.isMobileDevice(),
      (file: TFile) => this.editTracker(file),
      (file: TFile) => this.moveTrackerUp(file),
      (file: TFile) => this.moveTrackerDown(file),
      (path: string, isFile: boolean) => this.getIconForPath(path, isFile),
      (icon: string | null, container: HTMLElement) => this.renderIcon(icon, container)
    );
    
    this.addStyleSheet();
    this.addSettingTab(new TrackerSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("tracker", this.processTrackerBlock.bind(this));
    this.registerMarkdownCodeBlockProcessor("habit", this.processTrackerBlock.bind(this));

    this.addCommand({
      id: "tracker-create",
      name: "Create new tracker",
      callback: () => this.createNewTracker()
    });
  }

  private isFileInTrackersFolder(file: TFile): boolean {
    const fileFolderPath = this.getFolderPathFromFile(file.path);
    const trackersFolderPath = this.normalizePath(this.settings.trackersFolder);
    if (!trackersFolderPath) {
      return fileFolderPath === "";
    }
    const normalizedFilePath = this.normalizePath(file.path);
    return fileFolderPath === trackersFolderPath || normalizedFilePath.startsWith(`${trackersFolderPath}/`);
  }

  getFolderPathFromFile(filePath: string): string {
    if (!filePath) return "";
    const normalizedPath = this.normalizePath(filePath);
    const lastSlash = normalizedPath.lastIndexOf("/");
    if (lastSlash === -1) {
      return "";
    }
    return normalizedPath.substring(0, lastSlash);
  }

  getFolderTree(folderPath: string) {
    return this.folderTreeService.getFolderTree(folderPath);
  }

  addStyleSheet() {
    if (this.styleEl) return;
    const styleEl = document.createElement("style");
    styleEl.textContent = trackerStyles;
    document.head.appendChild(styleEl);
    this.styleEl = styleEl;
    this.register(() => {
      styleEl.remove();
      if (this.styleEl === styleEl) {
        this.styleEl = undefined;
      }
    });
  }

  async onunload() {
    // Clear all active blocks
    this.activeBlocks.forEach(block => block.unload());
    this.activeBlocks.clear();
  }

  // ---- Code blocks ------------------------------------------------------------

  async processTrackerBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    // Check if note changed (new note opened)
    const notePath = ctx.sourcePath || null;
    if (notePath !== this.currentNotePath) {
      // New note opened - clear all caches to show fresh data
      this.clearAllCaches();
      this.currentNotePath = notePath;
    }
    
    const block = new TrackerBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.activeBlocks.add(block);
    await block.render();
  }

  removeActiveBlock(block: TrackerBlockRenderChild) {
    this.activeBlocks.delete(block);
  }

  private isFolderRelevant(targetPath: string, blockPath: string): boolean {
    if (blockPath === targetPath) return true;
    if (!blockPath || !targetPath) return true;
    return targetPath.startsWith(`${blockPath}/`) || blockPath.startsWith(`${targetPath}/`);
  }

  async refreshBlocksForFolder(folderPath: string) {
    const normalizedPath = this.normalizePath(folderPath);
    const blocksToRefresh = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedPath, blockPath);
    });

    for (const block of blocksToRefresh) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
  }

  async refreshTrackersForFile(file: TFile) {
    const refreshPromises: Promise<void>[] = [];
    for (const block of Array.from(this.activeBlocks)) {
      const trackers = block.containerEl.querySelectorAll<HTMLElement>(
        `.tracker-notes__tracker[data-file-path="${file.path}"]`,
      );
      if (trackers.length === 0) continue;

      const opts = block.getOptions();
      const view = (opts.view ?? "control").toLowerCase();
      const dateInput = block.containerEl.querySelector(".tracker-notes__date-input") as
        | HTMLInputElement
        | null;
      const activeDateIso =
        dateInput?.value || resolveDateIso(opts.date, this.settings.dateFormat);

      trackers.forEach((trackerItem) => {
        const parent = trackerItem.parentElement as HTMLElement | null;
        if (!parent) return;
        
        refreshPromises.push(
          (async () => {
            // Get frontmatter to check for changes
            const fileOpts = await this.getFileTypeFromFrontmatter(file);
            const baseName = removePrefix(file.basename);
            const unit = fileOpts.unit || "";
            const displayName = unit ? `${baseName} (${unit})` : baseName;
            
            // Update only name in header without full recreation
            const titleLink = trackerItem.querySelector('.tracker-notes__tracker-title') as HTMLElement;
            if (titleLink) {
              titleLink.textContent = displayName;
              titleLink.setAttribute('href', file.path);
              titleLink.setAttribute('data-href', file.path);
            }
            
            // Update dataset.filePath in case of rename
            trackerItem.dataset.filePath = file.path;
            
            // Read data once
            const entries = await this.readAllEntries(file);
            
            // Update visualizations with current data
            const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
            const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
            
            const chartDiv = trackerItem.querySelector(".tracker-notes__chart") as HTMLElement;
            if (chartDiv) {
              await this.updateChart(chartDiv, file, activeDateIso, daysToShow, entries);
            }
            
            const statsDiv = trackerItem.querySelector(".tracker-notes__stats") as HTMLElement;
            if (statsDiv) {
              await this.updateStats(statsDiv, file, activeDateIso, daysToShow, trackerType, entries);
            }
            
            // Update heatmap for habit trackers
            if (trackerType === "good-habit" || trackerType === "bad-habit") {
              const heatmapDiv = trackerItem.querySelector(".tracker-notes__heatmap") as HTMLElement;
              if (heatmapDiv) {
                await this.heatmapService.updateTrackerHeatmap(heatmapDiv, file, activeDateIso, daysToShow, trackerType);
              }
            } else if (view === "control") {
              // For metrics recreate controls to use current settings from frontmatter
              // This is especially important for scale, where minValue/maxValue may have changed
              const controlsContainer = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
              if (controlsContainer) {
                const { mode, ...optsWithoutMode } = opts;
                const mergedOpts = { ...optsWithoutMode, ...fileOpts };
                await this.controlsRenderer.renderControlsForDate(controlsContainer, file, activeDateIso, mergedOpts);
              }
            }
            // If name changed, update tracker position alphabetically
            const newBasename = removePrefix(file.basename);
            if (newBasename !== baseName) {
              const allTrackers = Array.from(parent.children).filter(
                (el) => el.classList.contains('tracker-notes__tracker')
              ) as HTMLElement[];
              
              // Find correct position for insertion
              let correctInsertBefore: HTMLElement | null = null;
              for (const tracker of allTrackers) {
                if (tracker === trackerItem) continue;
                const trackerPath = tracker.dataset.filePath;
                if (!trackerPath) continue;
                const trackerFile = this.app.vault.getAbstractFileByPath(trackerPath);
                if (trackerFile instanceof TFile) {
                  if (trackerFile.basename.localeCompare(newBasename, undefined, { sensitivity: "base" }) > 0) {
                    correctInsertBefore = tracker;
                    break;
                  }
                }
              }
              
              // Move tracker
              if (correctInsertBefore && correctInsertBefore !== trackerItem) {
                parent.insertBefore(trackerItem, correctInsertBefore);
              } else if (!correctInsertBefore) {
                // Should be last
                parent.appendChild(trackerItem);
              }
            }
          })(),
        );
      });
    }

    if (refreshPromises.length > 0) {
      await Promise.allSettled(refreshPromises);
    }
  }

  async refreshAllBlocks() {
    // Save scroll position for all possible containers
    const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
    
    // Function to find and save scroll of all elements with overflow
    const findAndSaveScrollContainers = (root: HTMLElement) => {
      // Check the element itself
      const style = window.getComputedStyle(root);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll' ||
          style.overflowX === 'auto' || style.overflowX === 'scroll') {
        scrollPositions.set(root, {
          top: root.scrollTop,
          left: root.scrollLeft
        });
      }
      
      // Check all child elements
      const allElements = root.querySelectorAll('*');
      for (const el of Array.from(allElements) as HTMLElement[]) {
        const elStyle = window.getComputedStyle(el);
        if (elStyle.overflow === 'auto' || elStyle.overflow === 'scroll' || 
            elStyle.overflowY === 'auto' || elStyle.overflowY === 'scroll' ||
            elStyle.overflowX === 'auto' || elStyle.overflowX === 'scroll') {
          scrollPositions.set(el, {
            top: el.scrollTop,
            left: el.scrollLeft
          });
        }
      }
    };
    
    // Save scroll for all active leaves
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      const view = leaf.view as any;
      if (view && view.containerEl) {
        findAndSaveScrollContainers(view.containerEl);
        
        // Also check Obsidian-specific containers
        const cmScroller = view.containerEl.querySelector('.cm-scroller') as HTMLElement;
        if (cmScroller) {
          scrollPositions.set(cmScroller, {
            top: cmScroller.scrollTop,
            left: cmScroller.scrollLeft
          });
        }
        
        const previewView = view.containerEl.querySelector('.markdown-preview-view') as HTMLElement;
        if (previewView) {
          scrollPositions.set(previewView, {
            top: previewView.scrollTop,
            left: previewView.scrollLeft
          });
        }
      }
    }
    
    // Also save window scroll
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    
    // Update all blocks
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
    
    // Restore scroll position after DOM update
    // Use multiple requestAnimationFrame and small delay to ensure DOM is fully updated
    const restoreScroll = () => {
      // Restore window scroll
      window.scrollTo(windowScroll.left, windowScroll.top);
      
      // Restore scroll for all containers
      for (const [container, position] of scrollPositions.entries()) {
        if (container && container.isConnected) {
          try {
            container.scrollTop = position.top;
            container.scrollLeft = position.left;
          } catch (e) {
            // Игнорируем ошибки, если элемент больше не доступен
          }
        }
      }
    };
    
    // Пробуем восстановить несколько раз с разными задержками
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreScroll();
        // Также пробуем восстановить после небольшой задержки
        setTimeout(() => {
          restoreScroll();
        }, IMMEDIATE_TIMEOUT_MS);
        setTimeout(() => {
          restoreScroll();
        }, SCROLL_RESTORE_DELAY_2_MS);
      });
    });
  }

  private normalizePath(path: string): string {
    if (!path) return "";
    return path
      .trim()
      .replace(/\\/g, "/")
      .replace(/\/+/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
  }

  // Helper function to get type from frontmatter file
  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    const state = await this.ensureTrackerState(file);
    return state.fileOpts;
  }

  async updateTrackerDate(trackerItem: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    const controlsContainerEl = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
    const controlsContainer = controlsContainerEl || trackerItem;
    
    // Получаем тип из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Читаем данные один раз
    const entries = await this.readAllEntries(file);
    
    // Проверяем, есть ли уже хитмап (для трекеров он находится в controlsContainer)
    const existingHeatmap = controlsContainer.querySelector(".tracker-notes__heatmap") as HTMLElement;
    
    if (trackerType === "good-habit" || trackerType === "bad-habit") {
      // Для трекеров обновляем хитмап на месте, не пересоздавая контролы
      if (existingHeatmap) {
        await this.heatmapService.updateTrackerHeatmap(existingHeatmap, file, dateIso, daysToShow, trackerType);
      } else {
        // Если хитмапа нет, пересоздаем контролы
        controlsContainer.empty();
        const { mode, ...optsWithoutMode } = opts;
        const mergedOpts = { ...optsWithoutMode, ...fileOpts };
        await this.controlsRenderer.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
      }
    } else {
      // Для метрик всегда пересоздаем контролы с новой датой
      // Это гарантирует, что обработчики событий будут использовать актуальную дату
      controlsContainer.empty();
      const { mode, ...optsWithoutMode } = opts;
      const mergedOpts = { ...optsWithoutMode, ...fileOpts };
      await this.controlsRenderer.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
    }
    
    // Обновляем визуализации с новой датой и локальными данными
    // Обновляем график если он есть
    const chartDiv = trackerItem.querySelector(".tracker-notes__chart");
    if (chartDiv) {
      await this.updateChart(chartDiv as HTMLElement, file, dateIso, daysToShow, entries);
    }
    
    // Обновляем статистику если она есть
    const statsDiv = trackerItem.querySelector(".tracker-notes__stats");
    if (statsDiv) {
      await this.updateStats(statsDiv as HTMLElement, file, dateIso, daysToShow, trackerType, entries);
    }
  }

  // ---- Visualization ---------------------------------------------------------



  async renderChart(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) {
    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const unit = fileOpts.unit || "";
    
    // Для типов good-habit и bad-habit показываем хитмап вместо графика
    if (metricType === "good-habit" || metricType === "bad-habit") {
      const endDate = dateIso || resolveDateIso("today", this.settings.dateFormat);
      const days = daysToShow || this.settings.daysToShow;
      await this.heatmapService.renderTrackerHeatmap(container, file, endDate, days, metricType);
      return;
    }
    
    // Удаляем старый график, если он существует
    const existingChart = container.querySelector(".tracker-notes__chart");
    if (existingChart) {
      const chartInstance = (existingChart as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
      existingChart.remove();
    }

    const chartDiv = container.createDiv({ cls: "tracker-notes__chart" });
    const canvas = chartDiv.createEl("canvas");
    
    // Получаем цвета из темы Obsidian
    const colors = getThemeColors();
    
    // Получаем текущую дату
    const today = DateService.now();
    const todayStr = DateService.format(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    const activeDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : today;
    const activeDateStr = DateService.format(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    const endDate = activeDate.clone().add(5, 'days');
    const days = daysToShow || this.settings.daysToShow;
    const startDate = endDate.clone().subtract(days - 1, 'days');
    const entriesMap = entries ?? await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.trackerFileService.getStartTrackingDate(entriesMap, this.settings, fileOpts);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = startDate.clone().add(i, 'days');
      const dateStr = DateService.format(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
      }
      // Сохраняем индекс активной даты (даты, выбранной в трекере)
      if (dateStr === activeDateStr) {
        activeDateIndex = i;
      }
      
      // Форматируем дату для подписи
      let label = '';
      const m = (window as any).moment;
      if (m) {
        label = m(date.toDate()).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("en", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entriesMap.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
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
      
      // Определяем цвет точки: зеленый если в диапазоне, красный если вне диапазона (начиная со дня старта)
      // Для нейтральных точек (до дня старта, после текущей даты или когда лимиты не заданы) используем accentColor без границы
      let pointColor = colors.accentColor;
      let pointBorder = colors.accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          pointColor = colors.successColor;
          pointBorder = colors.successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = colors.errorColor;
          pointBorder = colors.errorColor;
        }
      }
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
    }
    
    // Создаем массив радиусов точек и обводок - все точки одинаковые, активная дата отмечается вертикальной линией
    const pointRadii: number[] = [];
    const pointBorderWidths: number[] = [];
    
    for (let i = 0; i < days; i++) {
      // Все точки одинаковые, не меняем border для активной точки
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    
    // Автоматически настраиваем min/max оси Y на основе лимитов и значений scale
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    
    // Находим минимальное значение из всех доступных (лимиты и scale)
    const allMinValues: number[] = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    
    // Находим максимальное значение из всех доступных (лимиты и scale)
    const allMaxValues: number[] = [maxValue]; // Добавляем максимальное значение из данных
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    if (minLimit !== null) allMaxValues.push(minLimit);
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    if (scaleMinValue !== null) allMaxValues.push(scaleMinValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Если все значения нулевые и нет лимитов, устанавливаем минимальный диапазон для отображения
    if (yAxisMax === 0 && minLimit === null && maxLimit === null && scaleMinValue === null && scaleMaxValue === null) {
      yAxisMax = 1; // Минимальный диапазон для отображения нулевых значений
    }
    
    // Если max не больше min (например, только minLimit задан), расширяем диапазон вверх
    if (yAxisMax <= yAxisMin) {
      const padding = Math.max(1, Math.abs(yAxisMin) * CHART_CONFIG.PADDING_FACTOR || 1);
      yAxisMax = yAxisMin + padding;
    }
    
    // Создаем градиент для заливки
    const ctx = canvas.getContext('2d');
    let gradient: CanvasGradient | null = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, CHART_CONFIG.GRADIENT_HEIGHT);
      gradient.addColorStop(0, colorToRgba(colors.accentColor, CHART_CONFIG.OPACITY_LIGHT));
      gradient.addColorStop(1, colorToRgba(colors.accentColor, 0));
    }
    
    // Determine chart label based on metric type and unit
    let chartLabel: string;
    if (unit) {
      // Делаем первую букву заглавной для единицы измерения
      chartLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
    } else {
      chartLabel = metricType === "text" ? "Word count" : "Value";
    }
    
    // Получаем цвет для вертикальной линии (используем accent цвет с прозрачностью)
    const startLineColor = colors.startLineColor;
    
    // Функция для рисования пунктирной вертикальной линии начала отслеживания
    const drawStartLine = (chart: any, index: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const xScale = chart.scales.x;
      const xPos = xScale.getPixelForValue(index);
      
      if (xPos < chartArea.left || xPos > chartArea.right) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      // Пунктирная линия для даты начала отслеживания
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    };
    
    // Функция для рисования сплошной вертикальной линии для выбранного дня
    const drawActiveDateLine = (chart: any, index: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const xScale = chart.scales.x;
      const xPos = xScale.getPixelForValue(index);
      
      if (xPos < chartArea.left || xPos > chartArea.right) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      // Сплошная линия для выбранного дня
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    };
    
    // Валидация данных перед созданием графика
    const hasInvalidValues = values.some(v => !isFinite(v) || isNaN(v));
    if (hasInvalidValues) {
      console.error("Tracker: Invalid values in chart data", { values, labels, dateStrings });
      // Заменяем невалидные значения на 0
      const validValues = values.map(v => isFinite(v) && !isNaN(v) ? v : 0);
      values.length = 0;
      values.push(...validValues);
    }
    
    // Проверяем что все массивы имеют одинаковую длину
    if (labels.length !== values.length || values.length !== dateStrings.length) {
      console.error("Tracker: Mismatched array lengths", { 
        labels: labels.length, 
        values: values.length, 
        dateStrings: dateStrings.length 
      });
    }
    
    // Конфигурация графика Chart.js с поддержкой темы Obsidian
    const chartConfig = {
      type: 'line' as const,
      data: {
        labels: labels,
        datasets: [{
          label: chartLabel,
          data: values,
          borderColor: colors.accentColor,
          backgroundColor: gradient || colorToRgba(colors.accentColor, CHART_CONFIG.OPACITY_DARK),
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          tension: 0.4,
          pointRadius: pointRadii,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderColor: pointBorderColors,
          pointBorderWidth: pointBorderWidths,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          // Явно отключаем изменение цветов при наведении - используем функции, которые возвращают те же цвета
          pointHoverBackgroundColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBackgroundColors[index] || pointBackgroundColors[0] || colors.accentColor;
          },
          pointHoverBorderColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderColors[index] || pointBorderColors[0] || colors.accentColor;
          },
          pointHoverBorderWidth: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderWidths[index] || pointBorderWidths[0] || CHART_CONFIG.POINT_BORDER_WIDTH;
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
                  // Делаем первую букву заглавной для единицы измерения
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
              color: colorToRgba(colors.borderColor, CHART_CONFIG.OPACITY_MEDIUM),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: 11
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10,
            }
          },
          y: {
            grid: {
              display: true,
              color: colorToRgba(colors.borderColor, CHART_CONFIG.OPACITY_MEDIUM),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: colors.textFaint,
              font: {
                family: 'var(--font-text)',
                size: 11
              }
            },
            beginAtZero: !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue, // Начинать с нуля только если нет лимитов и scale значений
            min: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMin : undefined,
            max: (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMax : undefined
          }
        },
        interaction: {
          intersect: false,
          mode: 'index' as const
        },
        elements: {
          point: {
            hoverBackgroundColor: undefined, // Отключаем дефолтный hover цвет
            hoverBorderColor: undefined, // Отключаем дефолтный hover цвет
            hoverRadius: 5,
            hoverBorderWidth: undefined // Отключаем дефолтный hover border width
          }
        },
        onClick: (event: any, elements: any[], chart: any) => {
          // Обработчик клика на точки графика
          if (elements && elements.length > 0) {
            const element = elements[0];
            const pointIndex = element.index;
            
            // Получаем массив дат из экземпляра графика
            const dateStrings = (chart as any).dateStrings;
            if (!dateStrings) return;
            
            // Получаем дату для этой точки из массива dateStrings
            if (pointIndex >= 0 && pointIndex < dateStrings.length) {
              const clickedDateStr = dateStrings[pointIndex];
              
              // Находим dateInput в header блока
              const mainContainer = container.closest('.tracker-notes');
              const blockContainer = mainContainer?.parentElement;
              const dateInput = blockContainer?.querySelector('.tracker-notes__date-input') as HTMLInputElement;
              
              if (dateInput) {
                // Преобразуем дату в формат ISO (YYYY-MM-DD) для input type="date"
                let dateIsoValue: string;
                
                try {
                  const dateObj = DateService.parse(clickedDateStr, this.settings.dateFormat);
                  if (dateObj.isValid()) {
                    dateIsoValue = DateService.format(dateObj, 'YYYY-MM-DD');
                  } else {
                    return;
                  }
                  
                  // Устанавливаем новое значение и вызываем событие change для обновления всех трекеров
                  if (dateIsoValue) {
                    dateInput.value = dateIsoValue;
                    dateInput.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                } catch (error) {
                  console.error('Tracker: Error converting date', clickedDateStr, error);
                }
              }
            }
          }
        },
        onResize: (chart: any) => {
          // Перерисовываем вертикальную линию при изменении размера
          const startIndex = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : colors.startLineColor;
          // Перерисовываем сплошную вертикальную линию для выбранного дня при изменении размера
          const activeIdx = (chart as any).activeDateIndex !== undefined 
            ? (chart as any).activeDateIndex 
            : activeDateIndex;
          // Перерисовываем пунктирную вертикальную линию только если она не совпадает с выбранной датой
          if (startIndex !== null && startIndex !== undefined && startIndex !== activeIdx) {
            drawStartLine(chart, startIndex, lineColor);
          }
          // Перерисовываем сплошную вертикальную линию для выбранного дня (в приоритете)
          if (activeIdx !== null && activeIdx !== undefined) {
            drawActiveDateLine(chart, activeIdx, lineColor);
          }
          // Перерисовываем горизонтальные линии при изменении размера
          const minLimitValue = (chart as any).minLimit !== undefined ? (chart as any).minLimit : minLimit;
          const maxLimitValue = (chart as any).maxLimit !== undefined ? (chart as any).maxLimit : maxLimit;
          if (minLimitValue !== null && minLimitValue !== undefined) {
            drawLimitLine(chart, minLimitValue, lineColor);
          }
          if (maxLimitValue !== null && maxLimitValue !== undefined) {
            drawLimitLine(chart, maxLimitValue, lineColor);
          }
        }
      },
      plugins: [{
        id: 'startLinePlugin',
        beforeDraw: (chart: any) => {
          // Рисуем линии в beforeDraw, чтобы они были под точками (низкий z-index)
          const startIdx = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          // Получаем цвет из экземпляра графика или используем текущий
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : colors.startLineColor;
          // Рисуем сплошную вертикальную линию для выбранного дня
          const activeIdx = (chart as any).activeDateIndex !== undefined 
            ? (chart as any).activeDateIndex 
            : activeDateIndex;
          // Рисуем пунктирную вертикальную линию на дате начала отслеживания только если она не совпадает с выбранной датой
          if (startIdx !== null && startIdx !== undefined && startIdx !== activeIdx) {
            drawStartLine(chart, startIdx, lineColor);
          }
          // Рисуем сплошную вертикальную линию для выбранного дня (в приоритете)
          if (activeIdx !== null && activeIdx !== undefined) {
            drawActiveDateLine(chart, activeIdx, lineColor);
          }
          // Рисуем горизонтальные линии для лимитов успешности
          const minLimitValue = (chart as any).minLimit !== undefined ? (chart as any).minLimit : minLimit;
          const maxLimitValue = (chart as any).maxLimit !== undefined ? (chart as any).maxLimit : maxLimit;
          if (minLimitValue !== null && minLimitValue !== undefined) {
            drawLimitLine(chart, minLimitValue, lineColor);
          }
          if (maxLimitValue !== null && maxLimitValue !== undefined) {
            drawLimitLine(chart, maxLimitValue, lineColor);
          }
        }
      }]
    };
    
    // Функция для рисования горизонтальной линии
    const drawLimitLine = (chart: any, value: number, color: string) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (!chartArea) return;
      
      const yScale = chart.scales.y;
      const yPos = yScale.getPixelForValue(value);
      
      if (yPos < chartArea.top || yPos > chartArea.bottom) return;
      
      ctx.save();
      ctx.strokeStyle = colorToRgba(color, 0.6);
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(chartArea.left, yPos);
      ctx.lineTo(chartArea.right, yPos);
      ctx.stroke();
      ctx.restore();
    };
    
    try {
      const chartInstance = new Chart(canvas, chartConfig);
      // Сохраняем экземпляр для последующего уничтожения
      (chartDiv as any).chartInstance = chartInstance;
      // Сохраняем индекс начала отслеживания и цвет в экземпляре графика
      (chartInstance as any).startTrackingIndex = startTrackingIndex;
      (chartInstance as any).startLineColor = colors.startLineColor;
      // Сохраняем массив дат для обработки клика
      (chartInstance as any).dateStrings = dateStrings;
      // Сохраняем лимиты успешности в экземпляре графика
      (chartInstance as any).minLimit = minLimit;
      (chartInstance as any).maxLimit = maxLimit;
    } catch (error) {
      console.error("Tracker: error creating chart", error);
      chartDiv.setText("Chart display error");
    }
  }

  async updateChart(chartDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) {
    const chartInstance = (chartDiv as any).chartInstance;
    if (!chartInstance) {
      // Если графика нет, создаем новый
      await this.renderChart(chartDiv.parentElement!, file, dateIso, daysToShow, entries);
      return;
    }

    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Для типов good-habit и bad-habit не обновляем график (они используют хитмап)
    if (metricType === "good-habit" || metricType === "bad-habit") {
      return;
    }

    // Получаем текущую дату
    const today = DateService.now();
    const todayStr = DateService.format(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    const activeDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : today;
    const activeDateStr = DateService.format(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    const endDate = activeDate.clone().add(5, 'days');
    const days = daysToShow || this.settings.daysToShow;
    const startDate = endDate.clone().subtract(days - 1, 'days');
    // Используем переданные entries или читаем из файла
    const entriesToUse = entries ?? await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = await this.getStartTrackingDate(entriesToUse, file);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Получаем цвета из темы Obsidian
    const colors = getThemeColors();
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = startDate.clone().add(i, 'days');
      const dateStr = DateService.format(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
      }
      // Сохраняем индекс активной даты (даты, выбранной в трекере)
      if (dateStr === activeDateStr) {
        activeDateIndex = i;
      }
      
      // Форматируем дату для подписи
      let label = '';
      const m = (window as any).moment;
      if (m) {
        label = m(date.toDate()).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("en", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entriesToUse.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
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
      
      // Определяем цвет точки: зеленый если в диапазоне, красный если вне диапазона (начиная со дня старта)
      // Для нейтральных точек (до дня старта, после текущей даты или когда лимиты не заданы) используем accentColor без границы
      let pointColor = colors.accentColor;
      let pointBorder = colors.accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          pointColor = colors.successColor;
          pointBorder = colors.successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = colors.errorColor;
          pointBorder = colors.errorColor;
        }
      }
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
    }
    
    // Создаем массив радиусов точек и обводок - все точки одинаковые, активная дата отмечается вертикальной линией
    const pointRadii: number[] = [];
    const pointBorderWidths: number[] = [];
    
    for (let i = 0; i < days; i++) {
      // Все точки одинаковые, не меняем border для активной точки
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    
    // Автоматически настраиваем min/max оси Y на основе лимитов и значений scale
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    
    // Находим минимальное значение из всех доступных (лимиты и scale)
    const allMinValues: number[] = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    
    // Находим максимальное значение из всех доступных (лимиты и scale)
    const allMaxValues: number[] = [maxValue]; // Добавляем максимальное значение из данных
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    if (minLimit !== null) allMaxValues.push(minLimit);
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    if (scaleMinValue !== null) allMaxValues.push(scaleMinValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Если все значения нулевые и нет лимитов, устанавливаем минимальный диапазон для отображения
    if (yAxisMax === 0 && minLimit === null && maxLimit === null && scaleMinValue === null && scaleMaxValue === null) {
      yAxisMax = 1; // Минимальный диапазон для отображения нулевых значений
    }
    
    // Если max не больше min (например, задан только minLimit), расширяем диапазон вверх
    if (yAxisMax <= yAxisMin) {
      const padding = Math.max(1, Math.abs(yAxisMin) * CHART_CONFIG.PADDING_FACTOR || 1);
      yAxisMax = yAxisMin + padding;
    }
    
    // Сохраняем индекс начала отслеживания и цвет в экземпляре графика для использования плагином
    (chartInstance as any).startTrackingIndex = startTrackingIndex;
    (chartInstance as any).startLineColor = colors.startLineColor;
    // Сохраняем массив дат для обработки клика
    (chartInstance as any).dateStrings = dateStrings;
    // Сохраняем лимиты успешности в экземпляре графика
    (chartInstance as any).minLimit = minLimit;
    (chartInstance as any).maxLimit = maxLimit;
    // Сохраняем индекс активной даты для использования в hover функциях
    (chartInstance as any).activeDateIndex = activeDateIndex;
    
    // Обновляем данные графика
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = values;
    chartInstance.data.datasets[0].pointBackgroundColor = pointBackgroundColors;
    chartInstance.data.datasets[0].pointBorderColor = pointBorderColors;
    chartInstance.data.datasets[0].pointRadius = pointRadii;
    chartInstance.data.datasets[0].pointBorderWidth = pointBorderWidths;
    
    // Обновляем настройки оси Y
    if (chartInstance.options && chartInstance.options.scales && chartInstance.options.scales.y) {
      chartInstance.options.scales.y.beginAtZero = !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue;
      chartInstance.options.scales.y.min = (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMin : undefined;
      chartInstance.options.scales.y.max = (minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null) ? yAxisMax : undefined;
    }
    
    chartInstance.update('none'); // 'none' для мгновенного обновления без анимации
  }

  async updateStats(statsDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) {
    // Используем переданные entries или читаем из файла
    const entriesToUse = entries ?? await this.readAllEntries(file);
    
    // Получаем тип трекера из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = trackerType || (fileOpts.mode ?? "good-habit").toLowerCase();
    
    const endDate = dateIso 
      ? DateService.parse(dateIso, 'YYYY-MM-DD')
      : DateService.now();
    const days = daysToShow || this.settings.daysToShow;
    const dateIsoFormatted = DateService.format(endDate, this.settings.dateFormat);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = await this.getStartTrackingDate(entriesToUse, file);
    
    // Используем VisualizationService для расчета статистики
    const stats = this.visualizationService.calculateStats(
      entriesToUse,
      this.settings,
      dateIsoFormatted,
      days,
      metricType,
      startTrackingDateStr
    );
    
    // Вычисляем текущий стрик (последовательные дни с записью)
    const currentStreak = this.calculateStreak(entriesToUse, endDate, metricType, file);
    
    // Вычисляем лучший стрик
    const bestStreak = this.calculateBestStreak(entriesToUse, metricType, file);
    
    // Используем VisualizationService для обновления DOM
    this.visualizationService.updateStatsDisplay(statsDiv, stats, currentStreak, days, metricType, fileOpts, bestStreak);
  }

  async renderStats(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) {
    const statsDiv = container.createDiv({ cls: "tracker-notes__stats" });
    await this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType, entries);
  }
  
  private async ensureTrackerState(file: TFile, forceReload = false) {
    if (!forceReload) {
      const existing = this.trackerState.get(file.path);
      if (existing) {
        return existing;
      }
    } else {
      this.trackerState.delete(file.path);
    }
    
    const [entries, fileOpts] = await Promise.all([
      this.trackerFileService.readAllEntries(file),
      this.trackerFileService.getFileTypeFromFrontmatter(file)
    ]);
    const state = { entries, fileOpts };
    this.trackerState.set(file.path, state);
    return state;
  }
  
  private async reloadTrackerState(file: TFile): Promise<void> {
    await this.ensureTrackerState(file, true);
  }
  
  private clearTrackerState(path: string): void {
    this.trackerState.delete(path);
  }
  
  /**
   * Clears all caches (trackerState and FolderTreeService cache)
   * Called when switching to a new note to ensure fresh data
   */
  private clearAllCaches(): void {
    // Clear all tracker states
    this.trackerState.clear();
    // Clear all folder tree cache
    this.folderTreeService.invalidate();
  }
  
  invalidateCacheForFolder(folderPath: string): void {
    const normalizedPath = this.normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (folder instanceof TFolder) {
      this.clearCacheForFolder(folder);
    }
  }

  private clearCacheForFolder(folder: TFolder): void {
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === 'md') {
        this.clearTrackerState(child.path);
      } else if (child instanceof TFolder) {
        this.clearCacheForFolder(child);
      }
    }
  }
  
  private moveTrackerState(oldPath: string, newPath: string): void {
    if (oldPath === newPath) return;
    const state = this.trackerState.get(oldPath);
    if (state) {
      this.trackerState.delete(oldPath);
      this.trackerState.set(newPath, state);
    } else {
      this.trackerState.delete(newPath);
    }
  }
  
  handleTrackerRenamed(oldPath: string, file: TFile): void {
    this.moveTrackerState(oldPath, file.path);
  }
  
  async getStartTrackingDate(entries: Map<string, string | number>, file?: TFile): Promise<string | null> {
    if (!file) {
      return DateService.format(DateService.now(), this.settings.dateFormat);
    }
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }
  
  invalidateCacheForFile(file: TFile): void {
    this.clearTrackerState(file.path);
  }

  calculateStreak(entries: Map<string, string | number>, endDate: Date | any, trackerType?: string, file?: TFile): number {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file);
  }

  calculateBestStreak(entries: Map<string, string | number>, trackerType?: string, file?: TFile): number {
    return this.trackerFileService.calculateBestStreak(entries, this.settings, trackerType, file);
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const state = await this.ensureTrackerState(file);
    return state.entries;
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string, file: TFile) {
    this.folderTreeService.invalidate(folderPath);
    await this.reloadTrackerState(file);
    const normalizedFolderPath = this.normalizePath(folderPath);
    
    // Динамически добавляем новый трекер без полной перерисовки
    for (const block of Array.from(this.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = this.normalizePath(blockFolderPath);
      if (!this.isFolderRelevant(normalizedFolderPath, normalizedBlockPath)) continue;
      
      const opts = block.getOptions();
      const view = (opts.view ?? "control").toLowerCase();
      const dateInput = block.containerEl.querySelector(".tracker-notes__date-input") as HTMLInputElement | null;
      const activeDateIso = dateInput?.value || resolveDateIso(opts.date, this.settings.dateFormat);
      
      const trackersContainers = Array.from(
        block.containerEl.querySelectorAll<HTMLElement>(
          `.tracker-notes__trackers[data-folder-path="${normalizedFolderPath}"]`
        )
      );
      
      // Если контейнер не найден (например, новая папка), перерисовываем весь блок
      if (trackersContainers.length === 0) {
        await block.render();
        continue;
      }
      
      for (const trackersContainer of trackersContainers) {
        const existingTrackers = Array.from(trackersContainer.children).filter(
          (el) => el.classList.contains('tracker-notes__tracker')
        ) as HTMLElement[];
        
        let insertBefore: HTMLElement | null = null;
        for (const tracker of existingTrackers) {
          const trackerPath = tracker.dataset.filePath;
          if (!trackerPath) continue;
          const trackerFile = this.app.vault.getAbstractFileByPath(trackerPath);
          if (trackerFile instanceof TFile) {
            if (trackerFile.basename.localeCompare(file.basename, undefined, { sensitivity: "base" }) > 0) {
              insertBefore = tracker;
              break;
            }
          }
        }
        
        await this.trackerRenderer.renderTracker(trackersContainer, file, activeDateIso, view, opts);
        
        const newTracker = trackersContainer.querySelector(
          `.tracker-notes__tracker[data-file-path="${file.path}"]`
        ) as HTMLElement;
        if (newTracker && insertBefore && newTracker.parentElement === trackersContainer) {
          trackersContainer.insertBefore(newTracker, insertBefore);
        }
      }
    }
  }

  async onTrackerDeleted(filePath: string) {
    // Удаляем состояние для удаленного файла
    this.clearTrackerState(filePath);
    
    // Находим и удаляем все трекеры с этим путем из всех активных блоков
    for (const block of Array.from(this.activeBlocks)) {
      const trackersContainers = Array.from(
        block.containerEl.querySelectorAll<HTMLElement>(".tracker-notes__trackers")
      );
      if (trackersContainers.length === 0) continue;
      
      for (const trackersContainer of trackersContainers) {
        const trackersToDelete = Array.from(trackersContainer.querySelectorAll(
          `.tracker-notes__tracker[data-file-path="${filePath}"]`
        )) as HTMLElement[];
        
        if (trackersToDelete.length === 0) continue;
        
        for (const tracker of trackersToDelete) {
          tracker.style.transition = "opacity 0.2s ease";
          tracker.style.opacity = "0";
          
          setTimeout(() => {
            tracker.remove();
          }, UI_CONSTANTS.TRANSITION_OPACITY_DURATION_MS);
        }
      }
    }
  }


  // ---- Read/Write --------------------------------------------------------

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    return this.trackerFileService.ensureFileWithHeading(filePath, type);
  }

  // Парсит YAML frontmatter и возвращает объект данных
  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    return this.trackerFileService.parseFrontmatterData(frontmatter);
  }

  // Форматирует данные в YAML формат
  formatDataToYaml(data: Record<string, string | number>): string {
    return this.trackerFileService.formatDataToYaml(data);
  }

  async readValueForDate(file: TFile, dateIso: string): Promise<string | number | null> {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      const entries = await this.readAllEntries(file);
      const normalizedValue = parseMaybeNumber(value);
      entries.set(dateIso, normalizedValue);
      await this.trackerFileService.writeLogLine(file, dateIso, value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: write error", error);
      throw error;
    }
  }

  // Simple file picker: suggests recently opened/suitable files
  async pickTrackerFile(): Promise<TFile | null> {
    const files = this.app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith(this.settings.trackersFolder + "/"));
    if (files.length === 0) { new Notice(MODAL_LABELS.NO_TRACKERS_FOUND); return null; }
    if (files.length === 1) return files[0];

    return new Promise(resolve => {
      new FilePickerModal(this.app, files, resolve).open();
    });
  }

  async saveSettings() { await this.saveData(this.settings); }

  editTracker(file: TFile): void {
    new EditTrackerModal(this.app, this, file).open();
  }

  async moveTrackerUp(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    // Sort trackers by prefix
    trackers.sort((a, b) => {
      const aParsed = parseFilename(a.basename);
      const bParsed = parseFilename(b.basename);
      if (aParsed.prefix !== null && bParsed.prefix !== null) {
        return aParsed.prefix - bParsed.prefix;
      }
      if (aParsed.prefix !== null) return -1;
      if (bParsed.prefix !== null) return 1;
      return a.basename.localeCompare(b.basename, undefined, { sensitivity: "base" });
    });

    const currentIndex = trackers.findIndex(t => t.path === file.path);
    if (currentIndex <= 0) return; // Already first or not found

    // Swap with previous
    [trackers[currentIndex - 1], trackers[currentIndex]] = [trackers[currentIndex], trackers[currentIndex - 1]];

    await this.trackerOrderService.reorderTrackers(folderPath, trackers);
    this.folderTreeService.invalidate(folderPath);
    await this.refreshBlocksForFolder(folderPath);
  }

  async moveTrackerDown(file: TFile): Promise<void> {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof TFolder)) return;

    const trackers = folder.children.filter(
      f => f instanceof TFile && f.extension === "md"
    ) as TFile[];

    // Sort trackers by prefix
    trackers.sort((a, b) => {
      const aParsed = parseFilename(a.basename);
      const bParsed = parseFilename(b.basename);
      if (aParsed.prefix !== null && bParsed.prefix !== null) {
        return aParsed.prefix - bParsed.prefix;
      }
      if (aParsed.prefix !== null) return -1;
      if (bParsed.prefix !== null) return 1;
      return a.basename.localeCompare(b.basename, undefined, { sensitivity: "base" });
    });

    const currentIndex = trackers.findIndex(t => t.path === file.path);
    if (currentIndex < 0 || currentIndex >= trackers.length - 1) return; // Already last or not found

    // Swap with next
    [trackers[currentIndex], trackers[currentIndex + 1]] = [trackers[currentIndex + 1], trackers[currentIndex]];

    await this.trackerOrderService.reorderTrackers(folderPath, trackers);
    this.folderTreeService.invalidate(folderPath);
    await this.refreshBlocksForFolder(folderPath);
  }

  async moveFolderUp(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
    if (!parentFolder || !(parentFolder instanceof TFolder)) return;

    const folders = parentFolder.children.filter(
      f => f instanceof TFolder
    ) as TFolder[];

    // Sort folders by prefix
    folders.sort((a, b) => {
      const aParsed = parseFilename(a.name);
      const bParsed = parseFilename(b.name);
      if (aParsed.prefix !== null && bParsed.prefix !== null) {
        return aParsed.prefix - bParsed.prefix;
      }
      if (aParsed.prefix !== null) return -1;
      if (bParsed.prefix !== null) return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });

    const currentIndex = folders.findIndex(f => f.path === folderPath);
    if (currentIndex <= 0) return; // Already first or not found

    // Swap with previous
    [folders[currentIndex - 1], folders[currentIndex]] = [folders[currentIndex], folders[currentIndex - 1]];

    await this.trackerOrderService.reorderFolders(parentFolderPath, folders);
    this.folderTreeService.invalidate(parentFolderPath);
    await this.refreshBlocksForFolder(parentFolderPath);
  }

  async moveFolderDown(folderPath: string): Promise<void> {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
    if (!parentFolder || !(parentFolder instanceof TFolder)) return;

    const folders = parentFolder.children.filter(
      f => f instanceof TFolder
    ) as TFolder[];

    // Sort folders by prefix
    folders.sort((a, b) => {
      const aParsed = parseFilename(a.name);
      const bParsed = parseFilename(b.name);
      if (aParsed.prefix !== null && bParsed.prefix !== null) {
        return aParsed.prefix - bParsed.prefix;
      }
      if (aParsed.prefix !== null) return -1;
      if (bParsed.prefix !== null) return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });

    const currentIndex = folders.findIndex(f => f.path === folderPath);
    if (currentIndex < 0 || currentIndex >= folders.length - 1) return; // Already last or not found

    // Swap with next
    [folders[currentIndex], folders[currentIndex + 1]] = [folders[currentIndex + 1], folders[currentIndex]];

    await this.trackerOrderService.reorderFolders(parentFolderPath, folders);
    this.folderTreeService.invalidate(parentFolderPath);
    await this.refreshBlocksForFolder(parentFolderPath);
  }

  // Methods for safe file modification (ignoring internal changes)

  /**
   * Gets icon for a path from Iconize plugin
   * @param path - Path to file or folder
   * @param isFile - Whether the path is a file (true) or folder (false)
   */
  getIconForPath(path: string, isFile: boolean = false): string | null {
    const icon = this.iconizeService.getIcon(path, isFile);
    return icon;
  }

  /**
   * Renders icon in a container element
   */
  renderIcon(icon: string | null, container: HTMLElement): void {
    this.iconizeService.renderIcon(icon, container);
  }
}


