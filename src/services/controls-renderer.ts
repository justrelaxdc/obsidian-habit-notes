import { Notice, TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { CSS_CLASSES, ANIMATION_DURATION_MS, TrackerType } from "../constants";
import { isTrackerValueTrue } from "../utils/validation";
import { showNoticeIfNotMobile } from "../utils/notifications";
import type { HeatmapService } from "./heatmap-service";

/**
 * Service for rendering tracker control inputs
 */
export class ControlsRenderer {
  constructor(
    private readonly settings: TrackerSettings,
    private readonly getFileTypeFromFrontmatter: (file: TFile) => Promise<TrackerFileOptions>,
    private readonly readValueForDate: (file: TFile, dateIso: string) => Promise<string | number | null>,
    private readonly readAllEntries: (file: TFile) => Promise<Map<string, string | number>>,
    private readonly writeLogLine: (file: TFile, dateIso: string, value: string) => Promise<void>,
    private readonly heatmapService?: HeatmapService,
    private readonly updateChart?: (chartDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, entries?: Map<string, string | number>) => Promise<void>,
    private readonly updateStats?: (statsDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string, entries?: Map<string, string | number>) => Promise<void>
  ) {}

  /**
   * Renders controls for a specific date
   */
  async renderControlsForDate(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    opts: Record<string, string>
  ): Promise<void> {
    // Всегда определяем тип из frontmatter, игнорируя mode из opts
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const mode = (fileOpts.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
    
    // Оптимизация: проверяем, изменился ли режим
    const currentMode = container.dataset.trackerMode;
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Для хитмапа можем обновить без полного пересоздания
    if (currentMode === mode && (mode === TrackerType.GOOD_HABIT || mode === TrackerType.BAD_HABIT)) {
      const heatmapDiv = container.querySelector(`.${CSS_CLASSES.HEATMAP}`) as HTMLElement;
      if (heatmapDiv && this.heatmapService) {
        await this.heatmapService.updateTrackerHeatmap(heatmapDiv, file, dateIso, daysToShow, mode);
        return;
      }
    }
    
    // Очищаем контейнер перед созданием новых элементов только если режим изменился
    container.empty();
    container.dataset.trackerMode = mode;
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = container.closest(`.${CSS_CLASSES.TRACKER}`) as HTMLElement;
    const mainContainer = trackerItem?.closest(`.${CSS_CLASSES.TRACKER_NOTES}`) as HTMLElement;
    
    // Читаем entries при первом рендеринге и сохраняем в замыкании
    let entries = await this.readAllEntries(file);
    
    // Функция для обновления визуализаций после записи данных
    // Используем уже полученные fileOpts и trackerType вместо повторного вызова getFileTypeFromFrontmatter
    const trackerType = (fileOpts.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
    const updateVisualizations = async (updatedEntries?: Map<string, string | number>) => {
      if (!trackerItem) return;
      // Обновляем локальный entries если передан обновленный
      if (updatedEntries) {
        entries = updatedEntries;
      }
      
      // Ищем date-input в общем header блока или используем переданную дату
      const currentDateIso = (mainContainer?.querySelector(`.${CSS_CLASSES.DATE_INPUT}`) as HTMLInputElement)?.value || dateIso;
      
      // Обновляем график/хитмап если он есть
      const chartDiv = trackerItem.querySelector(`.${CSS_CLASSES.CHART}`);
      if (chartDiv && this.updateChart) {
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, daysToShow, entries);
      }
      
      // Обновляем статистику если она есть
      if (this.updateStats) {
        const statsDiv = trackerItem.querySelector(`.${CSS_CLASSES.STATS}`);
        if (statsDiv) {
          await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, daysToShow, trackerType, entries);
        }
      }
    };
    
    if (mode === TrackerType.GOOD_HABIT || mode === TrackerType.BAD_HABIT) {
      // Для трекеров показываем только хитмап
      if (this.heatmapService) {
        await this.heatmapService.renderTrackerHeatmap(container, file, dateIso, daysToShow, mode);
      }
    } else if (mode === TrackerType.CHECKBOX) {
      await this.renderCheckbox(container, file, dateIso, entries, updateVisualizations);
    } else if (mode === TrackerType.NUMBER) {
      await this.renderNumber(container, file, dateIso, entries, updateVisualizations);
    } else if (mode === TrackerType.PLUSMINUS) {
      await this.renderPlusMinus(container, file, dateIso, fileOpts, entries, updateVisualizations);
    } else if (mode === TrackerType.RATING) {
      await this.renderRating(container, file, dateIso, opts, entries, updateVisualizations);
    } else if (mode === TrackerType.TEXT) {
      await this.renderText(container, file, dateIso, entries, updateVisualizations);
    } else if (mode === TrackerType.SCALE) {
      await this.renderScale(container, file, dateIso, opts, fileOpts, entries, updateVisualizations);
    } else {
      container.createEl("div", { 
        text: `Неизвестный mode: ${mode}. Доступны: ${TrackerType.GOOD_HABIT}, ${TrackerType.BAD_HABIT}, ${TrackerType.NUMBER}, ${TrackerType.PLUSMINUS}, ${TrackerType.RATING}, ${TrackerType.TEXT}, ${TrackerType.SCALE}` 
      });
    }
  }

  private async renderCheckbox(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    const wrap = container.createDiv({ cls: CSS_CLASSES.ROW });
    const label = wrap.createEl("label", { text: "Выполнено" });
    const input = wrap.createEl("input", { type: "checkbox" });
    label.prepend(input);
    const current = await this.readValueForDate(file, dateIso);
    input.checked = isTrackerValueTrue(current);
    input.onchange = async () => {
      const val = input.checked ? 1 : 0;
      // Обновляем локальный entries напрямую
      entries.set(dateIso, val);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, String(val)).catch(err => console.error("Tracker: ошибка записи", err));
      showNoticeIfNotMobile(`✓ Записано: ${dateIso}: ${val}`, 2000);
      // Визуальная обратная связь
      input.style.transform = "scale(1.1)";
      setTimeout(() => input.style.transform = "", ANIMATION_DURATION_MS);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
  }

  private async renderNumber(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    const wrap = container.createDiv({ cls: CSS_CLASSES.ROW });
    const input = wrap.createEl("input", { type: "number", placeholder: "0" }) as HTMLInputElement;
    const current = await this.readValueForDate(file, dateIso);
    if (current != null && !isNaN(Number(current))) input.value = String(current);
    
    const updateValue = async () => {
      const val = Number(input.value);
      if (input.value === "" || isNaN(val)) return;
      // Обновляем локальный entries напрямую
      entries.set(dateIso, val);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, String(val)).catch(err => console.error("Tracker: ошибка записи", err));
      showNoticeIfNotMobile(`✓ Записано: ${dateIso}: ${val}`, 2000);
      input.value = String(val);
      // Визуальная обратная связь
      input.style.transform = "scale(0.98)";
      setTimeout(() => input.style.transform = "", ANIMATION_DURATION_MS);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
    
    // Добавляем кнопку "Set" для фиксации значения
    const setButton = wrap.createEl("button", { text: "Set" });
    setButton.onclick = updateValue;
    
    input.onchange = updateValue;
    input.onkeypress = async (e) => {
      if (e.key === "Enter") {
        await updateValue();
      }
    };
  }

  private async renderPlusMinus(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    fileOpts: TrackerFileOptions,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    // Получаем step из frontmatter, по умолчанию 1
    const step = parseFloat(fileOpts.step || "1") || 1;
    
    const wrap = container.createDiv({ cls: CSS_CLASSES.ROW });
    const minus = wrap.createEl("button", { text: "−" });
    const valEl = wrap.createEl("span", { text: "0", cls: CSS_CLASSES.VALUE });
    const plus  = wrap.createEl("button", { text: "+" });
    let current = Number(await this.readValueForDate(file, dateIso) ?? 0);
    if (!isNaN(current)) valEl.setText(String(current));
    minus.onclick = async () => {
      current = (Number.isFinite(current) ? current : 0) - step;
      valEl.setText(String(current));
      valEl.addClass(CSS_CLASSES.VALUE_UPDATED);
      // Обновляем локальный entries напрямую
      entries.set(dateIso, current);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, String(current)).catch(err => console.error("Tracker: ошибка записи", err));
      setTimeout(() => valEl.removeClass(CSS_CLASSES.VALUE_UPDATED), ANIMATION_DURATION_MS);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
    plus.onclick = async () => {
      current = (Number.isFinite(current) ? current : 0) + step;
      valEl.setText(String(current));
      valEl.addClass(CSS_CLASSES.VALUE_UPDATED);
      // Обновляем локальный entries напрямую
      entries.set(dateIso, current);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, String(current)).catch(err => console.error("Tracker: ошибка записи", err));
      setTimeout(() => valEl.removeClass(CSS_CLASSES.VALUE_UPDATED), ANIMATION_DURATION_MS);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
  }

  private async renderRating(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    opts: Record<string, string>,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    const wrap = container.createDiv({ cls: CSS_CLASSES.ROW });
    const ratingDiv = wrap.createDiv({ cls: CSS_CLASSES.RATING });
    const maxRating = parseInt(opts.maxRating || "5");
    const current = await this.readValueForDate(file, dateIso);
    let currentRating = typeof current === "number" ? current : (current ? parseInt(String(current)) : 0);
    if (isNaN(currentRating)) currentRating = 0;
    
    for (let i = 1; i <= maxRating; i++) {
      const star = ratingDiv.createEl("span", { text: "★", cls: CSS_CLASSES.RATING_STAR });
      if (i <= currentRating) star.addClass(CSS_CLASSES.RATING_STAR_ACTIVE);
      star.onclick = async () => {
        currentRating = i;
        ratingDiv.querySelectorAll(`.${CSS_CLASSES.RATING_STAR}`).forEach((s, idx) => {
          if (idx + 1 <= i) s.addClass(CSS_CLASSES.RATING_STAR_ACTIVE);
          else s.removeClass(CSS_CLASSES.RATING_STAR_ACTIVE);
        });
        // Обновляем локальный entries напрямую
        entries.set(dateIso, i);
        // Записываем в файл асинхронно
        this.writeLogLine(file, dateIso, String(i)).catch(err => console.error("Tracker: ошибка записи", err));
        showNoticeIfNotMobile(`⭐ Оценка: ${dateIso}: ${i}/${maxRating}`, 2000);
        // Обновляем визуализации с локальными данными
        await updateVisualizations(entries);
      };
    }
  }

  private async renderText(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    const wrap = container.createDiv({ cls: CSS_CLASSES.ROW });
    const input = wrap.createEl("textarea", { 
      cls: CSS_CLASSES.TEXT_INPUT,
      placeholder: "Введите текст..."
    }) as HTMLTextAreaElement;
    const current = await this.readValueForDate(file, dateIso);
    if (current != null && typeof current === "string") input.value = current;
    const btn = wrap.createEl("button", { text: "Сохранить" });
    btn.onclick = async () => {
      const val = input.value.trim();
      // Обновляем локальный entries напрямую
      entries.set(dateIso, val);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, val).catch(err => console.error("Tracker: ошибка записи", err));
      showNoticeIfNotMobile(`✓ Записано: ${dateIso}`, 2000);
      // Визуальная обратная связь
      btn.style.transform = "scale(0.95)";
      setTimeout(() => btn.style.transform = "", ANIMATION_DURATION_MS);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
  }

  private async renderScale(
    container: HTMLElement,
    file: TFile,
    dateIso: string,
    opts: Record<string, string>,
    fileOpts: TrackerFileOptions,
    entries: Map<string, string | number>,
    updateVisualizations: (entries?: Map<string, string | number>) => Promise<void>
  ): Promise<void> {
    const minValue = parseFloat(opts.minValue || fileOpts.minValue || "0");
    const maxValue = parseFloat(opts.maxValue || fileOpts.maxValue || "10");
    const step = parseFloat(opts.step || fileOpts.step || "1");
    const current = await this.readValueForDate(file, dateIso);
    let currentValue = minValue;
    if (current != null && !isNaN(Number(current))) {
      const numVal = Number(current);
      currentValue = Math.max(minValue, Math.min(maxValue, numVal));
    }
    
    // Создаем контейнер для progress bar slider
    const wrapper = container.createDiv({ cls: CSS_CLASSES.PROGRESS_BAR_WRAPPER });
    wrapper.setAttribute("data-internal-value", String(currentValue));
    
    // Основной интерактивный контейнер
    const progressBarInput = wrapper.createDiv({ cls: CSS_CLASSES.PROGRESS_BAR_INPUT });
    progressBarInput.setAttribute("tabindex", "0");
    progressBarInput.setAttribute("role", "button");
    progressBarInput.setAttribute("aria-label", String(currentValue));
    progressBarInput.setAttribute("aria-valuemin", String(minValue));
    progressBarInput.setAttribute("aria-valuemax", String(maxValue));
    progressBarInput.setAttribute("aria-valuenow", String(currentValue));
    
    // Элемент прогресса (заполненная часть)
    const progressBar = progressBarInput.createDiv({ cls: CSS_CLASSES.PROGRESS_BAR_PROGRESS });
    progressBar.setAttribute("role", "slider");
    progressBar.setAttribute("tabindex", "0");
    progressBar.setAttribute("aria-valuemin", String(minValue));
    progressBar.setAttribute("aria-valuemax", String(maxValue));
    progressBar.setAttribute("aria-valuenow", String(currentValue));
    
    // Текущее значение (по центру)
    const valueDisplay = progressBarInput.createEl("span", {
      text: String(currentValue),
      cls: CSS_CLASSES.PROGRESS_BAR_VALUE
    });
    
    // Минимальное значение (слева)
    const labelLeft = progressBarInput.createEl("span", {
      text: String(minValue),
      cls: CSS_CLASSES.PROGRESS_BAR_LABEL_LEFT
    });
    
    // Максимальное значение (справа)
    const labelRight = progressBarInput.createEl("span", {
      text: String(maxValue),
      cls: CSS_CLASSES.PROGRESS_BAR_LABEL_RIGHT
    });
    
    // Функция для расчета значения из позиции клика
    const calculateValueFromPosition = (clientX: number): number => {
      const rect = progressBarInput.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const rawValue = minValue + (maxValue - minValue) * percentage;
      // Округляем до ближайшего шага
      const steppedValue = Math.round((rawValue - minValue) / step) * step + minValue;
      return Math.max(minValue, Math.min(maxValue, steppedValue));
    };
    
    // Функция для обновления визуального отображения
    const updateProgressBar = (value: number) => {
      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      progressBar.style.width = `${percentage}%`;
      valueDisplay.setText(String(value));
      progressBarInput.setAttribute("aria-valuenow", String(value));
      progressBarInput.setAttribute("aria-label", String(value));
      progressBar.setAttribute("aria-valuenow", String(value));
      wrapper.setAttribute("data-internal-value", String(value));
    };
    
    // Инициализация прогресс бара
    updateProgressBar(currentValue);
    
    let isDragging = false;
    let hasMoved = false;
    
    // Обработчик начала перетаскивания
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Только левая кнопка мыши
      isDragging = true;
      hasMoved = false;
      progressBarInput.style.cursor = "col-resize";
      const newValue = calculateValueFromPosition(e.clientX);
      currentValue = newValue;
      updateProgressBar(currentValue);
      e.preventDefault();
    };
    
    // Обработчик движения мыши при перетаскивании
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      hasMoved = true;
      const newValue = calculateValueFromPosition(e.clientX);
      currentValue = newValue;
      updateProgressBar(currentValue);
    };
    
    // Обработчик окончания перетаскивания
    const handleMouseUp = async () => {
      if (isDragging) {
        isDragging = false;
        progressBarInput.style.cursor = "";
        if (hasMoved) {
          // Обновляем локальный entries напрямую
          entries.set(dateIso, currentValue);
          // Записываем в файл асинхронно
          this.writeLogLine(file, dateIso, String(currentValue)).catch(err => console.error("Tracker: ошибка записи", err));
          showNoticeIfNotMobile(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
          // Обновляем визуализации с локальными данными
          await updateVisualizations(entries);
        }
      }
    };
    
    // Обработчик клика (сохранение при клике, если не было перетаскивания)
    const handleClick = async (e: MouseEvent) => {
      // Игнорируем клики, если было перетаскивание
      if (hasMoved) {
        hasMoved = false;
        return;
      }
      // Игнорируем клики по самому progress элементу
      if (e.target === progressBar || e.target === valueDisplay || e.target === labelLeft || e.target === labelRight) {
        return;
      }
      const newValue = calculateValueFromPosition(e.clientX);
      currentValue = newValue;
      updateProgressBar(currentValue);
      // Обновляем локальный entries напрямую
      entries.set(dateIso, currentValue);
      // Записываем в файл асинхронно
      this.writeLogLine(file, dateIso, String(currentValue)).catch(err => console.error("Tracker: ошибка записи", err));
      showNoticeIfNotMobile(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
      // Обновляем визуализации с локальными данными
      await updateVisualizations(entries);
    };
    
    // Поддержка клавиатуры
    const handleKeyDown = (e: KeyboardEvent) => {
      let newValue = currentValue;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        newValue = Math.max(minValue, currentValue - step);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        newValue = Math.min(maxValue, currentValue + step);
      } else if (e.key === "Home") {
        e.preventDefault();
        newValue = minValue;
      } else if (e.key === "End") {
        e.preventDefault();
        newValue = maxValue;
      } else {
        return;
      }
      currentValue = newValue;
      updateProgressBar(currentValue);
    };
    
    const handleKeyUp = async (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
        // Обновляем локальный entries напрямую
        entries.set(dateIso, currentValue);
        // Записываем в файл асинхронно
        this.writeLogLine(file, dateIso, String(currentValue)).catch(err => console.error("Tracker: ошибка записи", err));
        showNoticeIfNotMobile(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
        // Обновляем визуализации с локальными данными
        await updateVisualizations(entries);
      }
    };
    
    // Добавляем обработчики событий
    progressBarInput.addEventListener("click", handleClick);
    progressBarInput.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    progressBarInput.addEventListener("keydown", handleKeyDown);
    progressBarInput.addEventListener("keyup", handleKeyUp);
    
    // Очистка обработчиков при удалении элемента (используем MutationObserver)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node === wrapper || (node instanceof Node && wrapper.contains(node))) {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            observer.disconnect();
          }
        });
      });
    });
    if (wrapper.parentNode) {
      observer.observe(wrapper.parentNode, { childList: true, subtree: true });
    }
  }
}

