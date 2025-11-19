import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { TrackerBlockRenderChild } from "../ui/tracker-block-render-child";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { DEFAULT_SETTINGS } from "../domain/types";
import { FolderTreeService } from "../services/folder-tree-service";
import { TrackerFileService } from "../services/tracker-file-service";
import { resolveDateIso, formatDate, parseDate, addDays } from "../utils/date";
import { countWords } from "../utils/misc";
import { TrackerSettingsTab } from "../ui/tracker-settings-tab";
import { CreateTrackerModal } from "../ui/modals/create-tracker-modal";
import { EditTrackerModal } from "../ui/modals/edit-tracker-modal";
import { FilePickerModal } from "../ui/modals/file-picker-modal";
import trackerStyles from "../styles/tracker.css";

export default class TrackerPlugin extends Plugin {
  settings: TrackerSettings;
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();
  private folderTreeService: FolderTreeService;
  private trackerFileService: TrackerFileService;
  private styleEl?: HTMLStyleElement;

  private isMobileDevice(): boolean {
    return window.innerWidth <= 768;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.folderTreeService = new FolderTreeService(this.app);
    this.trackerFileService = new TrackerFileService(this.app);
    this.addStyleSheet();
    this.addSettingTab(new TrackerSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("tracker", this.processTrackerBlock.bind(this));
    this.registerMarkdownCodeBlockProcessor("habit", this.processTrackerBlock.bind(this));

    this.addCommand({
      id: "tracker-create",
      name: "Create new tracker",
      callback: () => this.createNewTracker()
    });

    // Слушаем события создания файлов для автоматического обновления блоков
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file instanceof TFile && file.extension === "md" && this.isFileInTrackersFolder(file)) {
          const fileFolderPath = this.getFolderPathFromFile(file.path);
          setTimeout(() => {
            this.refreshBlocksForFolder(fileFolderPath);
          }, 300);
        }
      })
    );
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
    // Очищаем все активные блоки
    this.activeBlocks.forEach(block => block.unload());
    this.activeBlocks.clear();
  }

  // ---- Код-блоки ------------------------------------------------------------

  async processTrackerBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    const block = new TrackerBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.activeBlocks.add(block);
    await block.render();
  }

  removeActiveBlock(block: TrackerBlockRenderChild) {
    this.activeBlocks.delete(block);
  }

  async refreshBlocksForFolder(folderPath: string) {
    const normalizedPath = this.normalizePath(folderPath);
    const blocksToRefresh = Array.from(this.activeBlocks).filter(block => 
      this.normalizePath(block.getFolderPath()) === normalizedPath
    );

    for (const block of blocksToRefresh) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: ошибка при обновлении блока", error);
      }
    }
  }

  async refreshAllBlocks() {
    // Сохраняем позицию скролла для всех возможных контейнеров
    const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
    
    // Функция для поиска и сохранения скролла всех элементов с overflow
    const findAndSaveScrollContainers = (root: HTMLElement) => {
      // Проверяем сам элемент
      const style = window.getComputedStyle(root);
      if (style.overflow === 'auto' || style.overflow === 'scroll' || 
          style.overflowY === 'auto' || style.overflowY === 'scroll' ||
          style.overflowX === 'auto' || style.overflowX === 'scroll') {
        scrollPositions.set(root, {
          top: root.scrollTop,
          left: root.scrollLeft
        });
      }
      
      // Проверяем все дочерние элементы
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
    
    // Сохраняем скролл для всех активных листьев
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      const view = leaf.view as any;
      if (view && view.containerEl) {
        findAndSaveScrollContainers(view.containerEl);
        
        // Также проверяем специфичные контейнеры Obsidian
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
    
    // Также сохраняем скролл window
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    
    // Обновляем все блоки
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: ошибка при обновлении блока", error);
      }
    }
    
    // Восстанавливаем позицию скролла после обновления DOM
    // Используем несколько requestAnimationFrame и небольшую задержку для гарантии, что DOM полностью обновлен
    const restoreScroll = () => {
      // Восстанавливаем скролл window
      window.scrollTo(windowScroll.left, windowScroll.top);
      
      // Восстанавливаем скролл для всех контейнеров
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
        }, 50);
        setTimeout(() => {
          restoreScroll();
        }, 100);
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

  // Вспомогательная функция для получения типа из frontmatter файла
  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    return this.trackerFileService.getFileTypeFromFrontmatter(file);
  }

  async updateTrackerDate(trackerItem: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    const controlsContainerEl = trackerItem.querySelector(".tracker-notes__controls") as HTMLElement;
    const controlsContainer = controlsContainerEl || trackerItem;
    
    // Получаем тип из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Проверяем, есть ли уже хитмап (для трекеров он находится в controlsContainer)
    const existingHeatmap = controlsContainer.querySelector(".tracker-notes__heatmap") as HTMLElement;
    
    if (trackerType === "good-habit" || trackerType === "bad-habit") {
      // Для трекеров обновляем хитмап на месте, не пересоздавая контролы
      if (existingHeatmap) {
        await this.updateTrackerHeatmap(existingHeatmap, file, dateIso, daysToShow, trackerType);
      } else {
        // Если хитмапа нет, пересоздаем контролы
        controlsContainer.empty();
        const { mode, ...optsWithoutMode } = opts;
        const mergedOpts = { ...optsWithoutMode, ...fileOpts };
        await this.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
      }
    } else {
      // Для других типов обновляем контролы как обычно
      controlsContainer.empty();
      const { mode, ...optsWithoutMode } = opts;
      const mergedOpts = { ...optsWithoutMode, ...fileOpts };
      await this.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);
    }
    
    // Обновляем визуализации с новой датой
    // Обновляем график если он есть
    const chartDiv = trackerItem.querySelector(".tracker-notes__chart");
    if (chartDiv) {
      await this.updateChart(chartDiv as HTMLElement, file, dateIso, daysToShow);
    }
    
    // Обновляем статистику если она есть
    const statsDiv = trackerItem.querySelector(".tracker-notes__stats");
    if (statsDiv) {
      await this.updateStats(statsDiv as HTMLElement, file, dateIso, daysToShow, trackerType);
    }
  }

  async renderTracker(parentEl: HTMLElement, file: TFile, dateIso: string, view: string, opts: Record<string, string>) {
    // Создаем элемент трекера внутри общего контейнера
    const trackerItem = parentEl.createDiv({ cls: "tracker-notes__tracker" });
    // Сохраняем путь к файлу для обновления при изменении общей даты
    trackerItem.dataset.filePath = file.path;
    
    // Заголовок с названием трекера
    const header = trackerItem.createDiv({ cls: "tracker-notes__tracker-header" });
    // Получаем единицу измерения для отображения в названии
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const baseName = (fileOpts.name?.trim() || file.basename);
    const unit = fileOpts.unit || "";
    const displayName = unit ? `${baseName} (${unit})` : baseName;
    const titleLink = header.createEl("a", { 
      text: displayName, 
      cls: "tracker-notes__tracker-title internal-link",
      href: file.path
    });
    titleLink.setAttribute("data-href", file.path);
    
    // Кнопка "Настройки" для редактирования параметров трекера
    const settingsButton = header.createEl("button", {
      text: "⚙️",
      cls: "tracker-notes__settings-btn"
    });
    settingsButton.title = "Настройки трекера";
    settingsButton.onclick = () => {
      new EditTrackerModal(this.app, this, file).open();
    };
    
    const controlsContainer = trackerItem.createDiv({ cls: "tracker-notes__controls" });

    if (view === "display") {
      const value = await this.readValueForDate(file, dateIso);
      trackerItem.createEl("div", { text: `${dateIso}: ${value ?? "—"}` });
      
      // Показываем дополнительные визуализации если запрошено
      const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
      const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
      
      // Используем настройки по умолчанию, если параметры не заданы напрямую
      const shouldShowChart = (opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault)) && 
                               !(this.isMobileDevice() && this.settings.hideChartOnMobile);
      const shouldShowStats = (opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault)) && 
                              !(this.isMobileDevice() && this.settings.hideStatsOnMobile);
      
      if (shouldShowChart) {
        await this.renderChart(trackerItem, file, dateIso, daysToShow);
      }
      if (shouldShowStats) {
        await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
      }
      return;
    }

    // control view - рендерим контролы
    // Всегда определяем тип из frontmatter (игнорируем mode из opts)
    // Используем уже полученный fileOpts из строки 610
    // Убираем mode из opts, чтобы использовать только из fileOpts
    const { mode, ...optsWithoutMode } = opts;
    const mergedOpts = { ...optsWithoutMode, ...fileOpts };
    
    await this.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);

    // Показываем дополнительные визуализации если запрошено
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Используем настройки по умолчанию, если параметры не заданы напрямую
    const shouldShowChart = (opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault)) && 
                             !(this.isMobileDevice() && this.settings.hideChartOnMobile);
    const shouldShowStats = (opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault)) && 
                            !(this.isMobileDevice() && this.settings.hideStatsOnMobile);
    
    if (shouldShowChart) {
      await this.renderChart(trackerItem, file, dateIso, daysToShow);
    }
    if (shouldShowStats) {
      await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
    }
  }

  async renderControlsForDate(container: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    // Очищаем контейнер перед созданием новых элементов
    container.empty();
    
    // Всегда определяем тип из frontmatter, игнорируя mode из opts
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const mode = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = container.closest(".tracker-notes__tracker") as HTMLElement;
    const mainContainer = trackerItem?.closest(".tracker-notes") as HTMLElement;
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Функция для обновления визуализаций после записи данных
    const updateVisualizations = async () => {
      if (!trackerItem) return;
      // Ищем date-input в общем header блока или используем переданную дату
      const currentDateIso = (mainContainer?.querySelector(".tracker-notes__date-input") as HTMLInputElement)?.value || dateIso;
      
      // Получаем тип трекера один раз
      const fileOptsForViz = await this.getFileTypeFromFrontmatter(file);
      const trackerTypeForViz = (fileOptsForViz.mode ?? "good-habit").toLowerCase();
      
      // Обновляем график/хитмап если он есть
      const chartDiv = trackerItem.querySelector(".tracker-notes__chart");
      const heatmapDiv = trackerItem.querySelector(".tracker-notes__heatmap");
      if (chartDiv) {
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, daysToShow);
      }
      // Хитмап обновляется через updateHeatmapDay, не нужно пересоздавать
      
      // Обновляем статистику если она есть
      const statsDiv = trackerItem.querySelector(".tracker-notes__stats");
      if (statsDiv) {
        await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, daysToShow, trackerTypeForViz);
      }
    };
    
    if (mode === "good-habit" || mode === "bad-habit") {
      // Для трекеров показываем только хитмап
      await this.renderTrackerHeatmap(container, file, dateIso, daysToShow, mode);
    } else if (mode === "checkbox") {
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const label = wrap.createEl("label", { text: "Выполнено" });
      const input = wrap.createEl("input", { type: "checkbox" });
      label.prepend(input);
      const current = await this.readValueForDate(file, dateIso);
      input.checked = current === 1 || current === "1" || String(current) === "true";
      input.onchange = async () => {
        const val = input.checked ? 1 : 0;
        await this.writeLogLine(file, dateIso, String(val));
        new Notice(`✓ Записано: ${dateIso}: ${val}`, 2000);
        // Визуальная обратная связь
        input.style.transform = "scale(1.1)";
        setTimeout(() => input.style.transform = "", 200);
        // Обновляем визуализации
        await updateVisualizations();
      };
    } else if (mode === "number") {
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const input = wrap.createEl("input", { type: "number", placeholder: "0" }) as HTMLInputElement;
      const current = await this.readValueForDate(file, dateIso);
      if (current != null && !isNaN(Number(current))) input.value = String(current);
      
      const updateValue = async () => {
        const val = Number(input.value);
        if (input.value === "" || isNaN(val)) return;
        await this.writeLogLine(file, dateIso, String(val));
        new Notice(`✓ Записано: ${dateIso}: ${val}`, 2000);
        input.value = String(val);
        // Визуальная обратная связь
        input.style.transform = "scale(0.98)";
        setTimeout(() => input.style.transform = "", 200);
        // Обновляем визуализации
        await updateVisualizations();
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
    } else if (mode === "plusminus") {
      // Получаем step из frontmatter, по умолчанию 1
      const fileOpts = await this.getFileTypeFromFrontmatter(file);
      const step = parseFloat(fileOpts.step || "1") || 1;
      
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const minus = wrap.createEl("button", { text: "−" });
      const valEl = wrap.createEl("span", { text: "0", cls: "tracker-notes__value" });
      const plus  = wrap.createEl("button", { text: "+" });
      let current = Number(await this.readValueForDate(file, dateIso) ?? 0);
      if (!isNaN(current)) valEl.setText(String(current));
      minus.onclick = async () => {
        current = (Number.isFinite(current) ? current : 0) - step;
        valEl.setText(String(current));
        valEl.addClass("updated");
        await this.writeLogLine(file, dateIso, String(current));
        setTimeout(() => valEl.removeClass("updated"), 300);
        // Обновляем визуализации
        await updateVisualizations();
      };
      plus.onclick = async () => {
        current = (Number.isFinite(current) ? current : 0) + step;
        valEl.setText(String(current));
        valEl.addClass("updated");
        await this.writeLogLine(file, dateIso, String(current));
        setTimeout(() => valEl.removeClass("updated"), 300);
        // Обновляем визуализации
        await updateVisualizations();
      };
    } else if (mode === "rating") {
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const ratingDiv = wrap.createDiv({ cls: "tracker-notes__rating" });
      const maxRating = parseInt(opts.maxRating || "5");
      const current = await this.readValueForDate(file, dateIso);
      let currentRating = typeof current === "number" ? current : (current ? parseInt(String(current)) : 0);
      if (isNaN(currentRating)) currentRating = 0;
      
      for (let i = 1; i <= maxRating; i++) {
        const star = ratingDiv.createEl("span", { text: "★", cls: "tracker-notes__rating-star" });
        if (i <= currentRating) star.addClass("active");
        star.onclick = async () => {
          currentRating = i;
          ratingDiv.querySelectorAll(".tracker-notes__rating-star").forEach((s, idx) => {
            if (idx + 1 <= i) s.addClass("active");
            else s.removeClass("active");
          });
          await this.writeLogLine(file, dateIso, String(i));
          new Notice(`⭐ Оценка: ${dateIso}: ${i}/${maxRating}`, 2000);
          // Обновляем визуализации
          await updateVisualizations();
        };
      }
    } else if (mode === "text") {
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const input = wrap.createEl("textarea", { 
        cls: "tracker-notes__text-input",
        placeholder: "Введите текст..."
      }) as HTMLTextAreaElement;
      const current = await this.readValueForDate(file, dateIso);
      if (current != null && typeof current === "string") input.value = current;
      const btn = wrap.createEl("button", { text: "Сохранить" });
      btn.onclick = async () => {
        const val = input.value.trim();
        await this.writeLogLine(file, dateIso, val);
        new Notice(`✓ Записано: ${dateIso}`, 2000);
        // Визуальная обратная связь
        btn.style.transform = "scale(0.95)";
        setTimeout(() => btn.style.transform = "", 200);
        // Обновляем визуализации
        await updateVisualizations();
      };
    } else if (mode === "scale") {
      const minValue = parseFloat(opts.minValue || "0");
      const maxValue = parseFloat(opts.maxValue || "10");
      const step = parseFloat(opts.step || "1");
      const current = await this.readValueForDate(file, dateIso);
      let currentValue = minValue;
      if (current != null && !isNaN(Number(current))) {
        const numVal = Number(current);
        currentValue = Math.max(minValue, Math.min(maxValue, numVal));
      }
      
      // Создаем контейнер для progress bar slider
      const wrapper = container.createDiv({ cls: "tracker-notes__progress-bar-wrapper" });
      wrapper.setAttribute("data-internal-value", String(currentValue));
      
      // Основной интерактивный контейнер
      const progressBarInput = wrapper.createDiv({ cls: "tracker-notes__progress-bar-input" });
      progressBarInput.setAttribute("tabindex", "0");
      progressBarInput.setAttribute("role", "button");
      progressBarInput.setAttribute("aria-label", String(currentValue));
      progressBarInput.setAttribute("aria-valuemin", String(minValue));
      progressBarInput.setAttribute("aria-valuemax", String(maxValue));
      progressBarInput.setAttribute("aria-valuenow", String(currentValue));
      
      // Элемент прогресса (заполненная часть)
      const progressBar = progressBarInput.createDiv({ cls: "tracker-notes__progress-bar-progress" });
      progressBar.setAttribute("role", "slider");
      progressBar.setAttribute("tabindex", "0");
      progressBar.setAttribute("aria-valuemin", String(minValue));
      progressBar.setAttribute("aria-valuemax", String(maxValue));
      progressBar.setAttribute("aria-valuenow", String(currentValue));
      
      // Текущее значение (по центру)
      const valueDisplay = progressBarInput.createEl("span", {
        text: String(currentValue),
        cls: "tracker-notes__progress-bar-value"
      });
      
      // Минимальное значение (слева)
      const labelLeft = progressBarInput.createEl("span", {
        text: String(minValue),
        cls: "tracker-notes__progress-bar-label-left"
      });
      
      // Максимальное значение (справа)
      const labelRight = progressBarInput.createEl("span", {
        text: String(maxValue),
        cls: "tracker-notes__progress-bar-label-right"
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
            await this.writeLogLine(file, dateIso, String(currentValue));
            new Notice(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
            await updateVisualizations();
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
        // Сохранение при клике
        await this.writeLogLine(file, dateIso, String(currentValue));
        new Notice(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
        await updateVisualizations();
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
          await this.writeLogLine(file, dateIso, String(currentValue));
          new Notice(`✓ Записано: ${dateIso}: ${currentValue}`, 2000);
          await updateVisualizations();
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
    } else {
      container.createEl("div", { text: `Неизвестный mode: ${mode}. Доступны: good-habit, bad-habit, number, plusminus, rating, text, scale` });
    }
  }

  // ---- Визуализация ---------------------------------------------------------

  async updateTrackerHeatmap(heatmapDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string) {
    const m = (window as any).moment;
    const endDate = m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat);
    const startDate = m ? m(endDate).subtract(daysToShow - 1, 'days') : addDays(endDate, -(daysToShow - 1));
    
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = heatmapDiv.closest(".tracker-notes__tracker") as HTMLElement;
    const mainContainer = trackerItem?.closest(".tracker-notes") as HTMLElement;
    
    // Функция для обновления только конкретного дня в хитмапе
    const updateHeatmapDay = (dateStr: string, dayDiv: HTMLElement) => {
      const value = entries.get(dateStr);
      const hasValue =
        value === 1 ||
        value === "1" ||
        String(value) === "true";
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
    };
    
    // Функция для обновления всех классов start-day в хитмапе
    const updateAllStartDays = () => {
      const currentStartDateStr = this.getStartTrackingDate(entries, file);
      
      // Обновляем класс start-day для всех дней в хитмапе
      const allDayElements = Array.from(heatmapDiv.children) as HTMLElement[];
      for (const dayDiv of allDayElements) {
        const dayDateStr = (dayDiv as any).dataset?.dateStr;
        if (dayDateStr) {
          if (dayDateStr === currentStartDateStr) {
            dayDiv.addClass("start-day");
          } else {
            dayDiv.removeClass("start-day");
          }
        }
      }
    };
    
    // Функция для обновления визуализаций после записи данных
    const updateVisualizations = async (updatedDateStr?: string, updatedDayDiv?: HTMLElement) => {
      if (!trackerItem) return;
      
      // Обновляем только конкретный день в хитмапе, если указан
      if (updatedDateStr && updatedDayDiv) {
        updateHeatmapDay(updatedDateStr, updatedDayDiv);
        // Всегда обновляем все классы start-day после изменения записи
        updateAllStartDays();
      }
      
      // Получаем текущую дату из общего date-input блока
      const currentDateIso = (mainContainer?.querySelector(".tracker-notes__date-input") as HTMLInputElement)?.value || dateIso;
      
      // Обновляем график если он есть
      const chartDiv = trackerItem.querySelector(".tracker-notes__chart");
      if (chartDiv) {
        const days = parseInt((trackerItem as any).daysToShow) || daysToShow;
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, days);
      }
      
      // Обновляем статистику если она есть
      const statsDiv = trackerItem.querySelector(".tracker-notes__stats");
      if (statsDiv) {
        const days = parseInt((trackerItem as any).daysToShow) || daysToShow;
        await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, days, trackerType);
      }
    };
    
    // Получаем существующие элементы дней
    const dayElements = Array.from(heatmapDiv.children) as HTMLElement[];
    
    for (let i = 0; i < daysToShow; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      const dayNum = m ? date.date() : date.getDate();
      
      let dayDiv: HTMLElement;
      if (i < dayElements.length) {
        // Используем существующий элемент
        dayDiv = dayElements[i];
        dayDiv.setText(dayNum.toString());
        // Убеждаемся, что класс типа трекера установлен
        dayDiv.removeClass("good-habit");
        dayDiv.removeClass("bad-habit");
        dayDiv.addClass(trackerType);
      } else {
        // Создаем новый элемент
        dayDiv = heatmapDiv.createDiv({ cls: "tracker-notes__heatmap-day" });
        dayDiv.setText(dayNum.toString());
        dayDiv.addClass(trackerType);
      }
      
      // Сохраняем dateStr в data-атрибуте для последующего обновления start-day
      (dayDiv as any).dataset.dateStr = dateStr;
      
      // Устанавливаем обработчик события для всех элементов (включая существующие)
      dayDiv.onclick = async () => {
        const currentValue = entries.get(dateStr);
        const isChecked = currentValue === 1 || currentValue === "1" || String(currentValue) === "true";
        const newValue = isChecked ? 0 : 1;
        await this.writeLogLine(file, dateStr, String(newValue));
        entries.set(dateStr, newValue);
        new Notice(`✓ Записано: ${dateStr}: ${newValue}`, 2000);
        // Обновляем только этот день и другие визуализации, не пересоздавая весь хитмап
        await updateVisualizations(dateStr, dayDiv);
      };
      
      updateHeatmapDay(dateStr, dayDiv);
      
      // Добавляем класс start-day если это день начала отслеживания
      if (dateStr === startTrackingDateStr) {
        dayDiv.addClass("start-day");
      } else {
        dayDiv.removeClass("start-day");
      }
    }
    
    // Удаляем лишние элементы если их больше чем нужно
    while (dayElements.length > daysToShow) {
      dayElements[dayElements.length - 1].remove();
      dayElements.pop();
    }
    
    // Прокручиваем в конец, чтобы был виден текущий день
    // Используем двойной requestAnimationFrame для гарантии, что layout завершен
    const performScroll = () => {
      const maxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
      if (maxScroll > 0) {
        // Всегда скроллим в конец для отображения текущего дня
        heatmapDiv.scrollLeft = heatmapDiv.scrollWidth;
      } else {
        // Если размеры еще не вычислены, повторяем попытку
        setTimeout(() => {
          const retryMaxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
          if (retryMaxScroll > 0) {
            heatmapDiv.scrollLeft = heatmapDiv.scrollWidth;
          }
        }, 50);
      }
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performScroll();
      });
    });
  }

  async renderTrackerHeatmap(container: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string) {
    let heatmapDiv = container.querySelector(".tracker-notes__heatmap") as HTMLElement;
    if (!heatmapDiv) {
      heatmapDiv = container.createDiv({ cls: "tracker-notes__heatmap" });
    }
    await this.updateTrackerHeatmap(heatmapDiv, file, dateIso, daysToShow, trackerType);
  }


  async renderChart(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number) {
    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    const unit = fileOpts.unit || "";
    
    // Для типов good-habit и bad-habit показываем хитмап вместо графика
    if (metricType === "good-habit" || metricType === "bad-habit") {
      const endDate = dateIso || resolveDateIso("today", this.settings.dateFormat);
      const days = daysToShow || this.settings.daysToShow;
      await this.renderTrackerHeatmap(container, file, endDate, days, metricType);
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
    
    // Получаем цвета из CSS переменных Obsidian
    // Используем body для более надежного получения переменных темы
    const root = document.body || document.documentElement;
    const getCSSVar = (varName: string, fallback: string = '#000000') => {
      const value = getComputedStyle(root).getPropertyValue(varName).trim();
      // Если значение пустое или равно fallback, возвращаем fallback
      return value || fallback;
    };
    
    // Получаем accent цвет - пробуем разные варианты переменных
    // Создаем временный элемент для более надежного получения CSS переменных
    const tempEl = document.createElement('div');
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    document.body.appendChild(tempEl);
    
    let accentColor = getComputedStyle(tempEl).getPropertyValue('--interactive-accent').trim();
    if (!accentColor) {
      accentColor = getComputedStyle(tempEl).getPropertyValue('--color-accent').trim();
    }
    if (!accentColor) {
      accentColor = getComputedStyle(tempEl).getPropertyValue('--accent-color').trim();
    }
    // Если ничего не найдено, пробуем из root
    if (!accentColor) {
      accentColor = getComputedStyle(root).getPropertyValue('--interactive-accent').trim();
    }
    // Если ничего не найдено, используем fallback
    if (!accentColor) {
      accentColor = '#7f6df2';
    }
    
    document.body.removeChild(tempEl);
    const textMuted = getCSSVar('--text-muted', '#999999');
    const textFaint = getCSSVar('--text-faint', '#666666');
    const borderColor = getCSSVar('--background-modifier-border', '#e0e0e0');
    const bgPrimary = getCSSVar('--background-primary', '#ffffff');
    
    // Функция для преобразования цвета в rgba
    const colorToRgba = (color: string, alpha: number): string => {
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else if (color.startsWith('rgb')) {
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      }
      return color;
    };
    
    const m = (window as any).moment;
    // Получаем текущую дату
    const today = m ? m() : new Date();
    const todayStr = m ? today.format(this.settings.dateFormat) : formatDate(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    let activeDate: any;
    if (dateIso) {
      activeDate = m ? m(dateIso, 'YYYY-MM-DD') : parseDate(dateIso, 'YYYY-MM-DD');
    } else {
      activeDate = today;
    }
    const activeDateStr = m ? activeDate.format(this.settings.dateFormat) : formatDate(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    // Используем clone() для moment, чтобы не мутировать исходную дату
    const endDate = m ? m(activeDate).clone().add(5, 'days') : addDays(new Date(activeDate.getTime()), 5);
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Получаем цвет для точек вне диапазона
    const errorColor = getCSSVar('--text-error', '#c00000');
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      // Используем clone() для moment, чтобы не мутировать startDate
      const date = m ? m(startDate).clone().add(i, 'days') : addDays(new Date(startDate.getTime()), i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      
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
      if (m) {
        label = m(date).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toLocaleDateString("ru", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entries.get(dateStr);
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
      let pointColor = accentColor;
      let pointBorder = accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          const successColor = getCSSVar('--text-success', '#00c000');
          pointColor = successColor;
          pointBorder = successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = errorColor;
          pointBorder = errorColor;
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
      pointRadii.push(3);
      pointBorderWidths.push(2);
    }
    
    if (maxValue === 0) {
      chartDiv.setText("Нет данных");
      return;
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
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Создаем градиент для заливки
    const ctx = canvas.getContext('2d');
    let gradient: CanvasGradient | null = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 180);
      gradient.addColorStop(0, colorToRgba(accentColor, 0.25));
      gradient.addColorStop(1, colorToRgba(accentColor, 0));
    }
    
    // Определяем подпись для графика в зависимости от типа метрики и единицы измерения
    let chartLabel: string;
    if (unit) {
      // Делаем первую букву заглавной для единицы измерения
      chartLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
    } else {
      chartLabel = metricType === "text" ? "Кол-во слов" : "Значение";
    }
    
    // Получаем цвет для вертикальной линии (используем accent цвет с прозрачностью)
    const startLineColor = getCSSVar('--text-accent', accentColor);
    
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
      ctx.lineWidth = 2;
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
      ctx.lineWidth = 2;
      // Сплошная линия для выбранного дня
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    };
    
    // Конфигурация графика Chart.js с поддержкой темы Obsidian
    const chartConfig = {
      type: 'line' as const,
      data: {
        labels: labels,
        datasets: [{
          label: chartLabel,
          data: values,
          borderColor: accentColor,
          backgroundColor: gradient || colorToRgba(accentColor, 0.1),
          borderWidth: 2.5,
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
            return pointBackgroundColors[index] || pointBackgroundColors[0] || accentColor;
          },
          pointHoverBorderColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderColors[index] || pointBorderColors[0] || accentColor;
          },
          pointHoverBorderWidth: (ctx: any) => {
            const index = ctx.dataIndex;
            return pointBorderWidths[index] || pointBorderWidths[0] || 2;
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
            backgroundColor: bgPrimary,
            titleColor: textMuted,
            bodyColor: textMuted,
            borderColor: borderColor,
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
              color: colorToRgba(borderColor, 0.3),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: textFaint,
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
              color: colorToRgba(borderColor, 0.3),
              lineWidth: 1,
              drawBorder: false,
            },
            ticks: {
              color: textFaint,
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
                const m = (window as any).moment;
                let dateIsoValue: string;
                
                try {
                  if (m) {
                    const dateObj = m(clickedDateStr, this.settings.dateFormat);
                    if (dateObj.isValid()) {
                      dateIsoValue = dateObj.format('YYYY-MM-DD');
                    } else {
                      return;
                    }
                  } else {
                    const dateObj = parseDate(clickedDateStr, this.settings.dateFormat);
                    dateIsoValue = formatDate(dateObj, 'YYYY-MM-DD');
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
            : startLineColor;
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
            : startLineColor;
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
      ctx.lineWidth = 2;
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
      (chartInstance as any).startLineColor = startLineColor;
      // Сохраняем массив дат для обработки клика
      (chartInstance as any).dateStrings = dateStrings;
      // Сохраняем лимиты успешности в экземпляре графика
      (chartInstance as any).minLimit = minLimit;
      (chartInstance as any).maxLimit = maxLimit;
    } catch (error) {
      console.error("Tracker: ошибка создания графика", error);
      chartDiv.setText("Ошибка отображения графика");
    }
  }

  async updateChart(chartDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number) {
    const chartInstance = (chartDiv as any).chartInstance;
    if (!chartInstance) {
      // Если графика нет, создаем новый
      await this.renderChart(chartDiv.parentElement!, file, dateIso, daysToShow);
      return;
    }

    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Для типов good-habit и bad-habit не обновляем график (они используют хитмап)
    if (metricType === "good-habit" || metricType === "bad-habit") {
      return;
    }

    const m = (window as any).moment;
    // Получаем текущую дату
    const today = m ? m() : new Date();
    const todayStr = m ? today.format(this.settings.dateFormat) : formatDate(today, this.settings.dateFormat);
    
    // Получаем активную дату (дату из dateIso в формате ISO YYYY-MM-DD или текущую дату)
    // dateIso приходит в формате ISO (YYYY-MM-DD), парсим его правильно
    let activeDate: any;
    if (dateIso) {
      activeDate = m ? m(dateIso, 'YYYY-MM-DD') : parseDate(dateIso, 'YYYY-MM-DD');
    } else {
      activeDate = today;
    }
    const activeDateStr = m ? activeDate.format(this.settings.dateFormat) : formatDate(activeDate, this.settings.dateFormat);
    
    // Для визуализации графика используем активную дату + 5 дней вперед как endDate
    // Это нужно только для отображения, активная дата остается исходной
    // Используем clone() для moment, чтобы не мутировать исходную дату
    const endDate = m ? m(activeDate).clone().add(5, 'days') : addDays(new Date(activeDate.getTime()), 5);
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    let startTrackingIndex: number | null = null;
    let activeDateIndex: number | null = null;
    
    // Получаем лимиты успешности из frontmatter
    const minLimit = fileOpts.minLimit ? parseFloat(fileOpts.minLimit) : null;
    const maxLimit = fileOpts.maxLimit ? parseFloat(fileOpts.maxLimit) : null;
    
    // Получаем значения minValue и maxValue для типа "scale"
    const scaleMinValue = (metricType === "scale" && fileOpts.minValue) ? parseFloat(fileOpts.minValue) : null;
    const scaleMaxValue = (metricType === "scale" && fileOpts.maxValue) ? parseFloat(fileOpts.maxValue) : null;
    
    // Получаем цвет для вертикальной линии
    // Используем body для более надежного получения переменных темы
    const root = document.body || document.documentElement;
    const getCSSVar = (varName: string, fallback: string = '#000000') => {
      const value = getComputedStyle(root).getPropertyValue(varName).trim();
      return value || fallback;
    };
    
    // Получаем accent цвет - пробуем разные варианты переменных
    // Создаем временный элемент для более надежного получения CSS переменных
    const tempEl = document.createElement('div');
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    document.body.appendChild(tempEl);
    
    let accentColor = getComputedStyle(tempEl).getPropertyValue('--interactive-accent').trim();
    if (!accentColor) {
      accentColor = getComputedStyle(tempEl).getPropertyValue('--color-accent').trim();
    }
    if (!accentColor) {
      accentColor = getComputedStyle(tempEl).getPropertyValue('--accent-color').trim();
    }
    // Если ничего не найдено, пробуем из root
    if (!accentColor) {
      accentColor = getComputedStyle(root).getPropertyValue('--interactive-accent').trim();
    }
    // Если ничего не найдено, используем fallback
    if (!accentColor) {
      accentColor = '#7f6df2';
    }
    
    document.body.removeChild(tempEl);
    const startLineColor = getCSSVar('--text-accent', accentColor);
    const errorColor = getCSSVar('--text-error', '#c00000');
    const bgPrimary = getCSSVar('--background-primary', '#ffffff');
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    const pointBackgroundColors: string[] = [];
    const pointBorderColors: string[] = [];
    const dateStrings: string[] = []; // Массив дат для каждой точки (для обработки клика)
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      // Используем clone() для moment, чтобы не мутировать startDate
      const date = m ? m(startDate).clone().add(i, 'days') : addDays(new Date(startDate.getTime()), i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      
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
      if (m) {
        label = m(date).format("D MMM");
      } else {
        const day = date.getDate();
        const month = date.toLocaleDateString("ru", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr); // Сохраняем дату для этой точки
      
      const val = entries.get(dateStr);
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
      let pointColor = accentColor;
      let pointBorder = accentColor; // Убираем белую границу для нейтральных точек
      // Сравниваем даты как строки в формате YYYY-MM-DD для корректного сравнения
      const isAfterToday = dateStr > todayStr;
      const hasLimits = (minLimit !== null || maxLimit !== null);
      // Окрашиваем только если: не после сегодня, после или в день старта отслеживания, есть лимиты, и есть старт отслеживания
      // Явно проверяем, что точка НЕ до начала отслеживания (i >= startTrackingIndex)
      if (!isAfterToday && startTrackingIndex !== null && i >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          // Точка в диапазоне - зеленый цвет
          const successColor = getCSSVar('--text-success', '#00c000');
          pointColor = successColor;
          pointBorder = successColor;
        } else {
          // Точка вне диапазона - красный цвет
          pointColor = errorColor;
          pointBorder = errorColor;
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
      pointRadii.push(3);
      pointBorderWidths.push(2);
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
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    
    // Сохраняем индекс начала отслеживания и цвет в экземпляре графика для использования плагином
    (chartInstance as any).startTrackingIndex = startTrackingIndex;
    (chartInstance as any).startLineColor = startLineColor;
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

  async updateStats(statsDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string) {
    const entries = await this.readAllEntries(file);
    
    // Получаем тип трекера из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = trackerType || (fileOpts.mode ?? "good-habit").toLowerCase();
    
    const m = (window as any).moment;
    const endDate = dateIso ? (m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat)) : (m ? m() : new Date());
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));
    
    const periodDays: number[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      const val = entries.get(dateStr);
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
      
      // Для плохих привычек инвертируем: отсутствие отметки = успех
      if (metricType === "bad-habit") {
        numVal = numVal === 1 ? 0 : 1;
      }
      
      periodDays.push(numVal);
    }
    
    const sum = periodDays.reduce((a, b) => a + b, 0);
    const avg = sum / days;
    const total = entries.size;
    
    // Вычисляем текущий стрик (последовательные дни с записью)
    const currentStreak = this.calculateStreak(entries, m, endDate, metricType, file);
    
    // Обновляем содержимое на месте
    const children = Array.from(statsDiv.children);
    if (children.length >= 1) {
      children[0].textContent = `Всего записей: ${total}`;
    } else {
      statsDiv.createEl("div", { text: `Всего записей: ${total}` });
    }
    
    if (children.length >= 2) {
      children[1].textContent = `Последние ${days} дней: ${sum.toFixed(1)} (среднее: ${avg.toFixed(1)})`;
    } else {
      statsDiv.createEl("div", { text: `Последние ${days} дней: ${sum.toFixed(1)} (среднее: ${avg.toFixed(1)})` });
    }
    
    // Обновляем или создаем стрик
    if (currentStreak > 0) {
      if (children.length >= 3) {
        const streakEl = children[2] as HTMLElement;
        streakEl.textContent = `🔥 Текущий стрик: ${currentStreak} ${currentStreak === 1 ? 'день' : currentStreak < 5 ? 'дня' : 'дней'}`;
        streakEl.style.color = "var(--interactive-accent)";
        streakEl.style.fontWeight = "600";
      } else {
        const streakEl = statsDiv.createEl("div", { text: `🔥 Текущий стрик: ${currentStreak} ${currentStreak === 1 ? 'день' : currentStreak < 5 ? 'дня' : 'дней'}` });
        streakEl.style.color = "var(--interactive-accent)";
        streakEl.style.fontWeight = "600";
      }
    } else if (children.length >= 3) {
      // Удаляем стрик если его нет
      children[2].remove();
    }
  }

  async renderStats(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string) {
    const statsDiv = container.createDiv({ cls: "tracker-notes__stats" });
    await this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType);
  }
  
  getStartTrackingDate(entries: Map<string, string | number>, file?: TFile): string | null {
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, file);
  }

  calculateStreak(entries: Map<string, string | number>, m: any, endDate: Date | any, trackerType?: string, file?: TFile): number {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file);
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    return this.trackerFileService.readAllEntries(file);
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string) {
    await this.refreshAllBlocks();
  }


  // ---- Чтение/запись --------------------------------------------------------

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
    return this.trackerFileService.readValueForDate(file, dateIso);
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      await this.trackerFileService.writeLogLine(file, dateIso, value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`Ошибка записи: ${errorMsg}`);
      console.error("Tracker: ошибка записи", error);
      throw error;
    }
  }

  // Простейший «пикер» файла: предлагает последние открытые/подходящие
  async pickTrackerFile(): Promise<TFile | null> {
    const files = this.app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith(this.settings.trackersFolder + "/"));
    if (files.length === 0) { new Notice("Нет трекеров"); return null; }
    if (files.length === 1) return files[0];

    return new Promise(resolve => {
      new FilePickerModal(this.app, files, resolve).open();
    });
  }

  async saveSettings() { await this.saveData(this.settings); }
}


