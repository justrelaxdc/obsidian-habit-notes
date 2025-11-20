import { Notice, TFile } from "obsidian";
import type { TrackerSettings, TrackerEntries, TrackerFileOptions } from "../domain/types";
import { DateService } from "./date-service";
import { CSS_CLASSES } from "../constants";
import { isTrackerValueTrue } from "../utils/validation";
import { showNoticeIfNotMobile } from "../utils/notifications";

/**
 * Service for rendering and updating tracker heatmaps
 */
export class HeatmapService {
  constructor(
    private readonly settings: TrackerSettings,
    private readonly readAllEntries: (file: TFile) => Promise<TrackerEntries>,
    private readonly writeLogLine: (file: TFile, dateIso: string, value: string) => Promise<void>,
    private readonly getStartTrackingDate: (entries: TrackerEntries, fileOpts?: TrackerFileOptions) => string | null,
    private readonly getFileTypeFromFrontmatter: (file: TFile) => Promise<TrackerFileOptions>,
    private readonly updateChart?: (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: TrackerEntries) => Promise<void>,
    private readonly updateStats?: (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: TrackerEntries) => Promise<void>
  ) {}

  /**
   * Updates existing heatmap with new data
   */
  async updateTrackerHeatmap(
    heatmapDiv: HTMLElement,
    file: TFile,
    dateIso: string,
    daysToShow: number,
    trackerType: string
  ): Promise<void> {
    const endDate = DateService.parse(dateIso, this.settings.dateFormat);
    const startDate = endDate.clone().subtract(daysToShow - 1, 'days');
    
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const startTrackingDateStr = this.getStartTrackingDate(entries, fileOpts);
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = heatmapDiv.closest(`.${CSS_CLASSES.TRACKER}`) as HTMLElement;
    const mainContainer = trackerItem?.closest(`.${CSS_CLASSES.TRACKER_NOTES}`) as HTMLElement;
    
    // Функция для обновления только конкретного дня в хитмапе
    const updateHeatmapDay = (dateStr: string, dayDiv: HTMLElement) => {
      const value = entries.get(dateStr);
      const hasValue = isTrackerValueTrue(value);
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
    };
    
    // Функция для обновления всех классов start-day в хитмапе
    const updateAllStartDays = () => {
      const currentStartDateStr = this.getStartTrackingDate(entries, fileOpts);
      
      // Обновляем класс start-day для всех дней в хитмапе
      const allDayElements = Array.from(heatmapDiv.children) as HTMLElement[];
      for (const dayDiv of allDayElements) {
        const dayDateStr = dayDiv.dataset?.dateStr;
        if (dayDateStr) {
          if (dayDateStr === currentStartDateStr) {
            dayDiv.addClass("start-day");
          } else {
            dayDiv.removeClass("start-day");
          }
        }
      }
    };
    
    
    // Получаем существующие элементы дней
    // При flex-direction: row-reverse порядок визуального отображения инвертируется
    // Идем от новых к старым (от endDate к startDate), чтобы визуально новые дни были первыми
    const dayElements = Array.from(heatmapDiv.children) as HTMLElement[];
    const fragment = document.createDocumentFragment();
    
    // Идем от новых к старым (от endDate к startDate)
    for (let i = 0; i < daysToShow; i++) {
      const date = endDate.clone().subtract(i, 'days');
      const dateStr = DateService.format(date, this.settings.dateFormat);
      const dayNum = date.getDate();
      
      let dayDiv: HTMLElement;
      if (i < dayElements.length) {
        // Переиспользуем существующий элемент
        dayDiv = dayElements[i];
        dayDiv.setText(dayNum.toString());
        // Обновляем класс типа трекера
        dayDiv.removeClass("good-habit");
        dayDiv.removeClass("bad-habit");
        dayDiv.addClass(trackerType);
      } else {
        // Создаем новый элемент в fragment для batch добавления
        dayDiv = document.createElement('div');
        dayDiv.addClass(CSS_CLASSES.HEATMAP_DAY);
        dayDiv.setText(dayNum.toString());
        dayDiv.addClass(trackerType);
        fragment.appendChild(dayDiv);
      }
      
      // Сохраняем dateStr в data-атрибуте для event delegation
      dayDiv.dataset.dateStr = dateStr;
      
      // Обновляем визуальное состояние дня
      updateHeatmapDay(dateStr, dayDiv);
      
      // Обновляем класс start-day
      if (dateStr === startTrackingDateStr) {
        dayDiv.addClass("start-day");
      } else {
        dayDiv.removeClass("start-day");
      }
    }
    
    // Добавляем новые элементы одним батчем
    if (fragment.childNodes.length > 0) {
      heatmapDiv.appendChild(fragment);
    }
    
    // Удаляем лишние элементы если их больше чем нужно
    while (dayElements.length > daysToShow) {
      dayElements[dayElements.length - 1].remove();
      dayElements.pop();
    }
  }

  /**
   * Renders a new heatmap or updates existing one
   */
  async renderTrackerHeatmap(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    daysToShow: number,
    trackerType: string
  ): Promise<void> {
    let heatmapDiv = container.querySelector(`.${CSS_CLASSES.HEATMAP}`) as HTMLElement;
    
    // Читаем entries при первом рендеринге и сохраняем в замыкании
    let entries = await this.readAllEntries(file);
    
    if (!heatmapDiv) {
      heatmapDiv = container.createDiv({ cls: CSS_CLASSES.HEATMAP });
      
      // Обработчики touch-событий для предотвращения открытия бокового меню при горизонтальном скролле
      let touchStartX = 0;
      let touchStartY = 0;
      let isScrolling = false;
      
      heatmapDiv.addEventListener('touchstart', (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isScrolling = false;
        }
      }, { passive: true });
      
      heatmapDiv.addEventListener('touchmove', (e: TouchEvent) => {
        if (e.touches.length === 1 && touchStartX !== 0) {
          const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
          const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
          
          // Блокируем распространение только при явном горизонтальном скролле
          // Если движение в основном горизонтальное (deltaX значительно больше deltaY), предотвращаем распространение
          if (deltaX > deltaY * 1.5 && deltaX > 10) {
            isScrolling = true;
            e.stopPropagation();
          } else {
            // При вертикальном или смешанном движении не блокируем, чтобы вертикальный скролл работал
            isScrolling = false;
          }
        }
      }, { passive: true });
      
      heatmapDiv.addEventListener('touchend', (e: TouchEvent) => {
        if (isScrolling) {
          e.stopPropagation();
        }
        touchStartX = 0;
        touchStartY = 0;
        isScrolling = false;
      }, { passive: true });
      
      // Event delegation: один обработчик на весь хитмап вместо N обработчиков на каждый день
      heatmapDiv.addEventListener('click', async (e) => {
        const dayDiv = (e.target as HTMLElement).closest(`.${CSS_CLASSES.HEATMAP_DAY}`) as HTMLElement;
        if (!dayDiv) return;
        
        const dateStr = dayDiv.dataset.dateStr;
        if (!dateStr) return;
        
        // Получаем текущее значение из локального entries
        const fileOptsForClick = await this.getFileTypeFromFrontmatter(file);
        const currentValue = entries.get(dateStr);
        const isChecked = isTrackerValueTrue(currentValue);
        const newValue = isChecked ? 0 : 1;
        
        // Обновляем локальный entries сразу
        entries.set(dateStr, newValue);
        
        // Записываем в файл асинхронно
        this.writeLogLine(file, dateStr, String(newValue)).catch(err => console.error("Tracker: ошибка записи", err));
        showNoticeIfNotMobile(`✓ Записано: ${dateStr}: ${newValue}`, 2000);
        
        // Обновляем только визуальное состояние этого дня
        if (newValue === 1) {
          dayDiv.addClass("has-value");
        } else {
          dayDiv.removeClass("has-value");
        }
        
        // Обновляем start-day маркеры
        const startTrackingDateStr = this.getStartTrackingDate(entries, fileOptsForClick);
        const allDayElements = Array.from(heatmapDiv.children) as HTMLElement[];
        for (const dayEl of allDayElements) {
          const dayDateStr = dayEl.dataset.dateStr;
          if (dayDateStr) {
            if (dayDateStr === startTrackingDateStr) {
              dayEl.addClass("start-day");
            } else {
              dayEl.removeClass("start-day");
            }
          }
        }
        
        // Обновляем график и статистику с локальными данными
        const trackerItem = heatmapDiv.closest(`.${CSS_CLASSES.TRACKER}`) as HTMLElement;
        const mainContainer = trackerItem?.closest(`.${CSS_CLASSES.TRACKER_NOTES}`) as HTMLElement;
        if (trackerItem) {
          const currentDateIso = (mainContainer?.querySelector(`.${CSS_CLASSES.DATE_INPUT}`) as HTMLInputElement)?.value || dateIso;
          if (this.updateChart) {
            const chartDiv = trackerItem.querySelector(`.${CSS_CLASSES.CHART}`);
            if (chartDiv) {
              await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, daysToShow, entries);
            }
          }
          if (this.updateStats) {
            const statsDiv = trackerItem.querySelector(`.${CSS_CLASSES.STATS}`);
            if (statsDiv) {
              await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, daysToShow, trackerType, entries);
            }
          }
        }
      });
    }
    
    await this.updateTrackerHeatmap(heatmapDiv, file, dateIso, daysToShow, trackerType);
  }
}

