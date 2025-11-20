import { TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { CSS_CLASSES, TrackerType, ViewMode } from "../constants";
import type { ControlsRenderer } from "./controls-renderer";
import type { HeatmapService } from "./heatmap-service";

/**
 * Service for rendering tracker items
 */
export class TrackerRenderer {
  constructor(
    private readonly settings: TrackerSettings,
    private readonly getFileTypeFromFrontmatter: (file: TFile) => Promise<TrackerFileOptions>,
    private readonly readValueForDate: (file: TFile, dateIso: string) => Promise<string | number | null>,
    private readonly controlsRenderer: ControlsRenderer,
    private readonly renderChart?: (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, entries?: Map<string, string | number>) => Promise<void>,
    private readonly renderStats?: (container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string, entries?: Map<string, string | number>) => Promise<void>,
    private readonly isMobileDevice?: () => boolean,
    private readonly onEditTracker?: (file: TFile) => void
  ) {}

  /**
   * Renders a tracker item
   */
  async renderTracker(
    parentEl: HTMLElement,
    file: TFile,
    dateIso: string,
    view: string,
    opts: Record<string, string>,
    existingTracker?: HTMLElement,
  ): Promise<void> {
    // Создаем trackerItem вне DOM если это новый трекер
    let trackerItem: HTMLElement;
    let isNewTracker = false;
    
    if (existingTracker) {
      trackerItem = existingTracker;
      // Удаляем только содержимое, сохраняя dataset
      const header = trackerItem.querySelector(`.${CSS_CLASSES.TRACKER_HEADER}`);
      const controls = trackerItem.querySelector(`.${CSS_CLASSES.TRACKER_CONTROLS}`);
      const chart = trackerItem.querySelector(`.${CSS_CLASSES.CHART}`);
      const stats = trackerItem.querySelector(`.${CSS_CLASSES.STATS}`);
      
      header?.remove();
      controls?.remove();
      chart?.remove();
      stats?.remove();
    } else {
      // Создаем вне DOM
      trackerItem = document.createElement('div');
      isNewTracker = true;
    }
    
    trackerItem.classList.add(CSS_CLASSES.TRACKER);
    trackerItem.dataset.filePath = file.path;
    
    // Заголовок с названием трекера
    const header = trackerItem.createDiv({ cls: CSS_CLASSES.TRACKER_HEADER });
    // Получаем единицу измерения для отображения в названии
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const baseName = file.basename;
    const unit = fileOpts.unit || "";
    const displayName = unit ? `${baseName} (${unit})` : baseName;
    const titleLink = header.createEl("a", { 
      text: displayName, 
      cls: `${CSS_CLASSES.TRACKER_TITLE} internal-link`,
      href: file.path
    });
    titleLink.setAttribute("data-href", file.path);
    
    // Кнопка "Настройки" для редактирования параметров трекера
    if (this.onEditTracker) {
      const settingsButton = header.createEl("button", {
        text: "⚙️",
        cls: CSS_CLASSES.SETTINGS_BTN
      });
      settingsButton.title = "Настройки трекера";
      settingsButton.onclick = () => {
        this.onEditTracker!(file);
      };
    }
    
    const controlsContainer = trackerItem.createDiv({ cls: CSS_CLASSES.TRACKER_CONTROLS });

    if (view === ViewMode.DISPLAY) {
      const value = await this.readValueForDate(file, dateIso);
      trackerItem.createEl("div", { text: `${dateIso}: ${value ?? "—"}` });
      
      // Показываем дополнительные визуализации если запрошено
      const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
      const trackerType = (fileOpts.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
      
      // Используем настройки по умолчанию, если параметры не заданы напрямую
      const shouldShowChart = (opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault)) && 
                               !(this.isMobileDevice?.() && this.settings.hideChartOnMobile);
      const shouldShowStats = (opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault)) && 
                              !(this.isMobileDevice?.() && this.settings.hideStatsOnMobile);
      
      if (shouldShowChart && this.renderChart) {
        await this.renderChart(trackerItem, file, dateIso, daysToShow);
      }
      if (shouldShowStats && this.renderStats) {
        await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
      }
      return;
    }

    // control view - рендерим контролы
    // Всегда определяем тип из frontmatter (игнорируем mode из opts)
    // Убираем mode из opts, чтобы использовать только из fileOpts
    const { mode, ...optsWithoutMode } = opts;
    const mergedOpts = { ...optsWithoutMode, ...fileOpts };
    
    await this.controlsRenderer.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);

    // Показываем дополнительные визуализации если запрошено
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    const trackerType = (fileOpts.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
    
    // Используем настройки по умолчанию, если параметры не заданы напрямую
    const shouldShowChart = (opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault)) && 
                             !(this.isMobileDevice?.() && this.settings.hideChartOnMobile);
    const shouldShowStats = (opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault)) && 
                            !(this.isMobileDevice?.() && this.settings.hideStatsOnMobile);
    
    if (shouldShowChart && this.renderChart) {
      await this.renderChart(trackerItem, file, dateIso, daysToShow);
    }
    if (shouldShowStats && this.renderStats) {
      await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
    }
    
    // Добавляем в DOM только если это новый трекер (одна операция)
    if (isNewTracker) {
      parentEl.appendChild(trackerItem);
    }
  }
}

