import { App, MarkdownRenderChild, MarkdownPostProcessorContext, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

type HabitSettings = {
  habitsFolder: string;        // папка с заметками привычек
  dateFormat: string;          // "YYYY-MM-DD"
  timeFormat: string;          // "HH:mm"
  daysToShow: number;          // количество дней для отображения графиков
};

const DEFAULT_SETTINGS: HabitSettings = {
  habitsFolder: "0. Files/Habits and Metrics",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm",
  daysToShow: 30,
};

// Класс для управления жизненным циклом блоков habit
class HabitBlockRenderChild extends MarkdownRenderChild {
  plugin: HabitNotesPlugin;
  source: string;
  folderPath: string;
  opts: Record<string, string>;

  constructor(plugin: HabitNotesPlugin, source: string, containerEl: HTMLElement, ctx: MarkdownPostProcessorContext) {
    super(containerEl);
    this.plugin = plugin;
    this.source = source;
    this.opts = parseOptions(source);
    this.folderPath = this.opts.folder || plugin.settings.habitsFolder;
  }

  async render() {
    this.containerEl.empty();
    
    try {
      const files = this.getFilesFromFolder(this.folderPath);
      if (files.length === 0) {
        this.containerEl.createEl("div", { 
          text: `habit: в папке ${this.folderPath} не найдено метрик`, 
          cls: "habit-notes__error" 
        });
        return;
      }

      const view = (this.opts.view ?? "control").toLowerCase();
      const dateIso = resolveDateIso(this.opts.date, this.plugin.settings.dateFormat);

      for (const file of files) {
        await this.plugin.renderHabitMetric(this.containerEl, file, dateIso, view, this.opts);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.containerEl.createEl("div", { 
        text: `habit: ошибка при обработке блока: ${errorMsg}`, 
        cls: "habit-notes__error" 
      });
      console.error("Habit Notes: ошибка обработки блока", error);
    }
  }

  private getFilesFromFolder(folderPath: string): TFile[] {
    const folder = this.plugin.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      this.containerEl.createEl("div", { 
        text: `habit: папка не найдена: ${folderPath}`, 
        cls: "habit-notes__error" 
      });
      return [];
    }

    if (folder instanceof TFile) {
      return [folder];
    }

    if (folder instanceof TFolder) {
      return this.getAllMarkdownFiles(folder);
    }

    // Fallback: поиск по пути
    const allFiles = this.plugin.app.vault.getMarkdownFiles();
    return allFiles.filter(f => f.path.startsWith(folderPath + "/"));
  }

  private getAllMarkdownFiles(folder: TFolder): TFile[] {
    const result: TFile[] = [];
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === "md") {
        result.push(child);
      } else if (child instanceof TFolder) {
        result.push(...this.getAllMarkdownFiles(child));
      }
    }
    return result;
  }

  getFolderPath(): string {
    return this.folderPath;
  }

  onload() {
    // Блок загружен
  }

  onunload() {
    // Удаляем блок из активных при уничтожении
    this.plugin.removeActiveBlock(this);
  }
}

export default class HabitNotesPlugin extends Plugin {
  settings: HabitSettings;
  activeBlocks: Set<HabitBlockRenderChild> = new Set();

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addStyleSheet();
    this.addSettingTab(new HabitSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("habit", this.processHabitBlock.bind(this));

    this.addCommand({
      id: "habit-create",
      name: "Create new habit/metric",
      callback: () => this.createNewHabit()
    });

    // Слушаем события создания файлов для автоматического обновления блоков
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file instanceof TFile && file.extension === "md" && this.isFileInHabitsFolder(file)) {
          const fileFolderPath = this.getFolderPathFromFile(file.path);
          setTimeout(() => {
            this.refreshBlocksForFolder(fileFolderPath);
          }, 300);
        }
      })
    );
  }

  private isFileInHabitsFolder(file: TFile): boolean {
    const fileFolderPath = this.normalizePath(this.getFolderPathFromFile(file.path));
    const habitsFolderPath = this.normalizePath(this.settings.habitsFolder);
    return fileFolderPath === habitsFolderPath || file.path.startsWith(this.settings.habitsFolder + "/");
  }

  getFolderPathFromFile(filePath: string): string {
    return filePath.substring(0, filePath.lastIndexOf('/'));
  }

  addStyleSheet() {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .habit-notes { margin: 1em 0; padding: 1em; border-radius: 8px; background: var(--background-secondary); border: 1px solid var(--background-modifier-border); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .habit-notes__row { display: flex; align-items: center; gap: 0.75em; padding: 0.5em 0; }
      .habit-notes__value { min-width: 3em; text-align: center; font-weight: 600; font-size: 1.1em; color: var(--text-normal); transition: transform 0.2s ease; }
      .habit-notes__value.updated { animation: pulse 0.3s ease; }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      .habit-notes input[type="checkbox"] { width: 1.5em; height: 1.5em; cursor: pointer; accent-color: var(--interactive-accent); transition: transform 0.2s ease; }
      .habit-notes input[type="checkbox"]:hover { transform: scale(1.1); }
      .habit-notes input[type="number"] { width: 5em; padding: 0.4em 0.6em; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--background-primary); color: var(--text-normal); transition: border-color 0.2s ease; }
      .habit-notes input[type="number"]:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .habit-notes button { padding: 0.4em 0.8em; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--interactive-normal); color: var(--text-normal); cursor: pointer; font-size: 0.9em; transition: all 0.2s ease; }
      .habit-notes button:hover { background: var(--interactive-hover); border-color: var(--interactive-accent); transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .habit-notes button:active { transform: scale(0.95) translateY(0); }
      .habit-notes__rating { display: flex; gap: 0.3em; align-items: center; }
      .habit-notes__rating-star { font-size: 1.5em; cursor: pointer; color: var(--text-faint); transition: all 0.2s ease; user-select: none; }
      .habit-notes__rating-star:hover { transform: scale(1.2); filter: brightness(1.2); }
      .habit-notes__rating-star.active { color: #ffd700; text-shadow: 0 0 4px rgba(255, 215, 0, 0.5); }
      .habit-notes__text-input { width: 100%; padding: 0.5em; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--background-primary); color: var(--text-normal); font-family: inherit; transition: border-color 0.2s ease; resize: vertical; min-height: 60px; }
      .habit-notes__text-input:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .habit-notes__stats { margin-top: 1em; margin-bottom: 0.5em; padding-top: 1em; padding-bottom: 0.5em; border-top: 1px solid var(--background-modifier-border); font-size: 0.9em; color: var(--text-muted); line-height: 1.6; }
      .habit-notes__stats > div { margin: 0.3em 0; }
      .habit-notes__calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.3em; margin-top: 1em; }
      .habit-notes__calendar-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 0.8em; background: var(--background-modifier-border); color: var(--text-muted); transition: all 0.2s ease; cursor: default; }
      .habit-notes__calendar-day.has-value { background: var(--interactive-accent); color: var(--text-on-accent); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
      .habit-notes__calendar-day:hover { transform: scale(1.1); }
      .habit-notes__chart { margin-top: 1em; margin-bottom: 0.5em; border-top: 1px solid var(--background-modifier-border); padding-top: 0.75em; width: 100%; position: relative; height: 200px; }
      .habit-notes__chart canvas { max-width: 100%; height: 180px !important; }
      .habit-notes__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75em; padding-bottom: 0.5em; border-bottom: 1px solid var(--background-modifier-border); }
      .habit-notes__title { font-weight: 600; color: var(--text-normal); margin: 0; }
      .habit-notes__date-picker { display: flex; gap: 0.5em; align-items: center; }
      .habit-notes__date-input { padding: 0.3em 0.5em; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; transition: border-color 0.2s ease; }
      .habit-notes__date-input:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .habit-notes__date-btn { padding: 0.3em 0.6em; font-size: 0.85em; }
      .habit-notes__error { color: var(--text-error); padding: 0.5em; background: var(--background-modifier-error); border-radius: 4px; margin: 0.5em 0; }
      .habit-notes__success { color: var(--text-success, var(--text-normal)); padding: 0.3em 0.5em; background: var(--background-modifier-success, var(--background-modifier-border)); border-radius: 4px; margin: 0.3em 0; font-size: 0.9em; }
      .habit-notes__heatmap { display: flex; gap: 0.3em; overflow-x: auto; scroll-behavior: smooth; padding: 0.5em 0; margin-top: 0.5em; min-height: 2.5em; }
      .habit-notes__heatmap::-webkit-scrollbar { height: 6px; }
      .habit-notes__heatmap::-webkit-scrollbar-track { background: var(--background-modifier-border); border-radius: 3px; }
      .habit-notes__heatmap::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 3px; }
      .habit-notes__heatmap::-webkit-scrollbar-thumb:hover { background: var(--text-normal); }
      .habit-notes__heatmap-day { aspect-ratio: 1; min-width: 2em; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 0.75em; background: var(--background-modifier-border); color: var(--text-muted); transition: all 0.2s ease; cursor: pointer; font-weight: 500; }
      .habit-notes__heatmap-day:hover { transform: scale(1.1); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .habit-notes__heatmap-day.has-value.good-habit { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .habit-notes__heatmap-day.has-value.bad-habit { background: var(--text-error, var(--background-modifier-error)); color: var(--text-on-accent, var(--text-normal)); }
      .habit-notes__heatmap-day.bad-habit:not(.has-value) { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .habit-notes__heatmap-day.start-day { border: 2px solid var(--text-accent, var(--interactive-accent)) !important; }
      .habit-notes__calendar-day.start-day { position: relative; border: 2px solid var(--text-accent, var(--interactive-accent)) !important; opacity: 0.9; box-shadow: 0 0 0 1px var(--text-accent, var(--interactive-accent)); }
      .habit-notes__stats > div { transition: opacity 0.2s ease; }
      .habit-notes__calendar-day { transition: background-color 0.2s ease, color 0.2s ease; }
      .habit-notes__heatmap { transition: opacity 0.15s ease; }
      .habit-notes__chart { transition: opacity 0.15s ease; }
    `;
    document.head.appendChild(styleEl);
  }

  async onunload() {
    // Очищаем все активные блоки
    this.activeBlocks.forEach(block => block.unload());
    this.activeBlocks.clear();
  }

  // ---- Код-блоки ------------------------------------------------------------

  async processHabitBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    const block = new HabitBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.activeBlocks.add(block);
    await block.render();
  }

  removeActiveBlock(block: HabitBlockRenderChild) {
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
        console.error("Habit Notes: ошибка при обновлении блока", error);
      }
    }
  }

  private normalizePath(path: string): string {
    return path.replace(/\/+/g, '/').replace(/\/$/, '');
  }

  // Вспомогательная функция для получения типа из frontmatter файла
  async getFileTypeFromFrontmatter(file: TFile): Promise<Record<string, string>> {
    const fileOpts: Record<string, string> = {};
    try {
      const fileContent = await this.app.vault.read(file);
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        // Ищем type: на верхнем уровне (плоская структура)
        const typeMatch = frontmatter.match(/^type:\s*["']?([^"'\s\n]+)["']?/m);
        if (typeMatch && typeMatch[1]) {
          fileOpts.mode = typeMatch[1].trim();
        } else {
          fileOpts.mode = "good-habit"; // значение по умолчанию
        }
        // Ищем maxRating на верхнем уровне
        const maxRatingMatch = frontmatter.match(/^maxRating:\s*(\d+)/m);
        if (maxRatingMatch) {
          fileOpts.maxRating = maxRatingMatch[1];
        }
      } else {
        fileOpts.mode = "good-habit"; // значение по умолчанию, если frontmatter нет
      }
    } catch (error) {
      console.error("Habit Notes: ошибка чтения frontmatter", error);
      fileOpts.mode = "good-habit"; // значение по умолчанию при ошибке
    }
    return fileOpts;
  }

  async renderHabitMetric(parentEl: HTMLElement, file: TFile, dateIso: string, view: string, opts: Record<string, string>) {
    const container = parentEl.createDiv({ cls: "habit-notes" });
    
    // Заголовок с названием и выбором даты
    const header = container.createDiv({ cls: "habit-notes__header" });
    const fileName = file.basename;
    header.createEl("div", { text: fileName, cls: "habit-notes__title" });
    
    const datePicker = header.createDiv({ cls: "habit-notes__date-picker" });
    const dateInput = datePicker.createEl("input", { 
      type: "date", 
      cls: "habit-notes__date-input",
      value: dateIso 
    }) as HTMLInputElement;
    
    const controlsContainer = container.createDiv();
    
    const updateDate = async (newDate: string) => {
      const newDateIso = resolveDateIso(newDate, this.settings.dateFormat);
      dateInput.value = newDateIso;
      
      // Получаем тип из frontmatter каждый раз заново
      const fileOpts = await this.getFileTypeFromFrontmatter(file);
      const habitType = (fileOpts.mode ?? "good-habit").toLowerCase();
      const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
      
      // Проверяем, есть ли уже хитмап (для привычек он находится в controlsContainer)
      const existingHeatmap = controlsContainer.querySelector(".habit-notes__heatmap") as HTMLElement;
      
      if (habitType === "good-habit" || habitType === "bad-habit") {
        // Для привычек обновляем хитмап на месте, не пересоздавая контролы
        if (existingHeatmap) {
          await this.updateHabitHeatmap(existingHeatmap, file, newDateIso, daysToShow, habitType);
        } else {
          // Если хитмапа нет, пересоздаем контролы
          controlsContainer.empty();
          const { mode, ...optsWithoutMode } = opts;
          const mergedOpts = { ...optsWithoutMode, ...fileOpts };
          await this.renderControlsForDate(controlsContainer, file, newDateIso, mergedOpts);
        }
      } else {
        // Для других типов обновляем контролы как обычно
        controlsContainer.empty();
        const { mode, ...optsWithoutMode } = opts;
        const mergedOpts = { ...optsWithoutMode, ...fileOpts };
        await this.renderControlsForDate(controlsContainer, file, newDateIso, mergedOpts);
      }
      
      // Обновляем визуализации с новой датой
      // Обновляем календарь если он есть
      const calendarDiv = container.querySelector(".habit-notes__calendar");
      if (calendarDiv) {
        await this.updateCalendar(calendarDiv as HTMLElement, file, newDateIso, daysToShow);
      }
      
      // Обновляем график если он есть
      const chartDiv = container.querySelector(".habit-notes__chart");
      if (chartDiv) {
        await this.updateChart(chartDiv as HTMLElement, file, newDateIso, daysToShow);
      }
      
      // Обновляем статистику если она есть
      const statsDiv = container.querySelector(".habit-notes__stats");
      if (statsDiv) {
        await this.updateStats(statsDiv as HTMLElement, file, newDateIso, daysToShow, habitType);
      }
    };
    
    dateInput.onchange = () => updateDate(dateInput.value);
    const todayBtn = datePicker.createEl("button", { text: "Сегодня", cls: "habit-notes__date-btn" });
    todayBtn.onclick = () => updateDate("today");

    if (view === "display") {
      const value = await this.readValueForDate(file, dateIso);
      container.createEl("div", { text: `${dateIso}: ${value ?? "—"}` });
      
      // Показываем дополнительные визуализации если запрошено
      const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
      const fileOpts = await this.getFileTypeFromFrontmatter(file);
      const habitType = (fileOpts.mode ?? "good-habit").toLowerCase();
      
      if (opts.showCalendar === "true") {
        await this.renderCalendar(container, file, dateIso, daysToShow);
      }
      if (opts.showChart === "true") {
        await this.renderChart(container, file, dateIso, daysToShow);
      }
      if (opts.showStats === "true") {
        await this.renderStats(container, file, dateIso, daysToShow, habitType);
      }
      return;
    }

    // control view - рендерим контролы
    // Всегда определяем тип из frontmatter (игнорируем mode из opts)
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    // Убираем mode из opts, чтобы использовать только из fileOpts
    const { mode, ...optsWithoutMode } = opts;
    const mergedOpts = { ...optsWithoutMode, ...fileOpts };
    
    await this.renderControlsForDate(controlsContainer, file, dateIso, mergedOpts);

    // Показываем дополнительные визуализации если запрошено
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    const habitType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    if (opts.showCalendar === "true") {
      await this.renderCalendar(container, file, dateIso, daysToShow);
    }
    if (opts.showChart === "true") {
      await this.renderChart(container, file, dateIso, daysToShow);
    }
    if (opts.showStats === "true") {
      await this.renderStats(container, file, dateIso, daysToShow, habitType);
    }
  }

  async renderControlsForDate(container: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    const mode = (opts.mode ?? "good-habit").toLowerCase();
    
    // Находим родительский контейнер для обновления визуализаций
    const habitContainer = container.closest(".habit-notes") as HTMLElement;
    const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
    
    // Функция для обновления визуализаций после записи данных
    const updateVisualizations = async () => {
      if (!habitContainer) return;
      const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
      
      // Обновляем календарь если он есть
      const calendarDiv = habitContainer.querySelector(".habit-notes__calendar");
      if (calendarDiv) {
        await this.updateCalendar(calendarDiv as HTMLElement, file, currentDateIso, daysToShow);
      }
      
      // Получаем тип привычки один раз
      const fileOptsForViz = await this.getFileTypeFromFrontmatter(file);
      const habitTypeForViz = (fileOptsForViz.mode ?? "good-habit").toLowerCase();
      
      // Обновляем график/хитмап если он есть
      const chartDiv = habitContainer.querySelector(".habit-notes__chart");
      const heatmapDiv = habitContainer.querySelector(".habit-notes__heatmap");
      if (chartDiv) {
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, daysToShow);
      }
      // Хитмап обновляется через updateHeatmapDay, не нужно пересоздавать
      
      // Обновляем статистику если она есть
      const statsDiv = habitContainer.querySelector(".habit-notes__stats");
      if (statsDiv) {
        await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, daysToShow, habitTypeForViz);
      }
    };
    
    if (mode === "good-habit" || mode === "bad-habit") {
      // Для привычек показываем только хитмап
      await this.renderHabitHeatmap(container, file, dateIso, daysToShow, mode);
    } else if (mode === "checkbox") {
      const wrap = container.createDiv({ cls: "habit-notes__row" });
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
      const wrap = container.createDiv({ cls: "habit-notes__row" });
      const input = wrap.createEl("input", { type: "number", placeholder: "0" }) as HTMLInputElement;
      const current = await this.readValueForDate(file, dateIso);
      if (current != null && !isNaN(Number(current))) input.value = String(current);
      const btn = wrap.createEl("button", { text: "Set" });
      btn.onclick = async () => {
        const val = Number(input.value);
        if (isNaN(val)) { new Notice("❌ Некорректное число"); return; }
        await this.writeLogLine(file, dateIso, String(val));
        new Notice(`✓ Записано: ${dateIso}: ${val}`, 2000);
        input.value = String(val);
        // Визуальная обратная связь
        btn.style.transform = "scale(0.95)";
        setTimeout(() => btn.style.transform = "", 200);
        // Обновляем визуализации
        await updateVisualizations();
      };
      input.onkeypress = async (e) => {
        if (e.key === "Enter") btn.click();
      };
    } else if (mode === "plusminus") {
      const wrap = container.createDiv({ cls: "habit-notes__row" });
      const minus = wrap.createEl("button", { text: "−" });
      const valEl = wrap.createEl("span", { text: "0", cls: "habit-notes__value" });
      const plus  = wrap.createEl("button", { text: "+" });
      let current = Number(await this.readValueForDate(file, dateIso) ?? 0);
      if (!isNaN(current)) valEl.setText(String(current));
      minus.onclick = async () => {
        current = (Number.isFinite(current) ? current : 0) - 1;
        valEl.setText(String(current));
        valEl.addClass("updated");
        await this.writeLogLine(file, dateIso, String(current));
        setTimeout(() => valEl.removeClass("updated"), 300);
        // Обновляем визуализации
        await updateVisualizations();
      };
      plus.onclick = async () => {
        current = (Number.isFinite(current) ? current : 0) + 1;
        valEl.setText(String(current));
        valEl.addClass("updated");
        await this.writeLogLine(file, dateIso, String(current));
        setTimeout(() => valEl.removeClass("updated"), 300);
        // Обновляем визуализации
        await updateVisualizations();
      };
    } else if (mode === "rating") {
      const wrap = container.createDiv({ cls: "habit-notes__row" });
      const ratingDiv = wrap.createDiv({ cls: "habit-notes__rating" });
      const maxRating = parseInt(opts.maxRating || "5");
      const current = await this.readValueForDate(file, dateIso);
      let currentRating = typeof current === "number" ? current : (current ? parseInt(String(current)) : 0);
      if (isNaN(currentRating)) currentRating = 0;
      
      for (let i = 1; i <= maxRating; i++) {
        const star = ratingDiv.createEl("span", { text: "★", cls: "habit-notes__rating-star" });
        if (i <= currentRating) star.addClass("active");
        star.onclick = async () => {
          currentRating = i;
          ratingDiv.querySelectorAll(".habit-notes__rating-star").forEach((s, idx) => {
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
      const wrap = container.createDiv({ cls: "habit-notes__row" });
      const input = wrap.createEl("textarea", { 
        cls: "habit-notes__text-input",
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
    } else {
      container.createEl("div", { text: `Неизвестный mode: ${mode}. Доступны: good-habit, bad-habit, number, plusminus, rating, text` });
    }
  }

  // ---- Визуализация ---------------------------------------------------------

  async updateHabitHeatmap(heatmapDiv: HTMLElement, file: TFile, dateIso: string, daysToShow: number, habitType: string) {
    const m = (window as any).moment;
    const endDate = m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat);
    const startDate = m ? m(endDate).subtract(daysToShow - 1, 'days') : addDays(endDate, -(daysToShow - 1));
    
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    
    // Сохраняем текущую позицию скролла
    const scrollPosition = heatmapDiv.scrollLeft;
    
    // Находим родительский контейнер для обновления визуализаций
    const habitContainer = heatmapDiv.closest(".habit-notes") as HTMLElement;
    
    // Функция для обновления только конкретного дня в хитмапе
    const updateHeatmapDay = async (dateStr: string, dayDiv: HTMLElement) => {
      const entries = await this.readAllEntries(file);
      const hasValue = entries.has(dateStr) && (entries.get(dateStr) === 1 || entries.get(dateStr) === "1" || String(entries.get(dateStr)) === "true");
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
    };
    
    // Функция для обновления всех классов start-day в хитмапе
    const updateAllStartDays = async () => {
      const entries = await this.readAllEntries(file);
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
      if (!habitContainer) return;
      
      // Обновляем только конкретный день в хитмапе, если указан
      if (updatedDateStr && updatedDayDiv) {
        await updateHeatmapDay(updatedDateStr, updatedDayDiv);
        // Всегда обновляем все классы start-day после изменения записи
        await updateAllStartDays();
      }
      
      // Обновляем календарь если он есть
      const calendarDiv = habitContainer.querySelector(".habit-notes__calendar");
      if (calendarDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateCalendar(calendarDiv as HTMLElement, file, currentDateIso, days);
      }
      
      // Обновляем график если он есть
      const chartDiv = habitContainer.querySelector(".habit-notes__chart");
      if (chartDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, days);
      }
      
      // Обновляем статистику если она есть
      const statsDiv = habitContainer.querySelector(".habit-notes__stats");
      if (statsDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, days, habitType);
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
        // Убеждаемся, что класс типа привычки установлен
        dayDiv.removeClass("good-habit");
        dayDiv.removeClass("bad-habit");
        dayDiv.addClass(habitType);
      } else {
        // Создаем новый элемент
        dayDiv = heatmapDiv.createDiv({ cls: "habit-notes__heatmap-day" });
        dayDiv.setText(dayNum.toString());
        dayDiv.addClass(habitType);
      }
      
      // Сохраняем dateStr в data-атрибуте для последующего обновления start-day
      (dayDiv as any).dataset.dateStr = dateStr;
      
      // Устанавливаем обработчик события для всех элементов (включая существующие)
      dayDiv.onclick = async () => {
        const currentValue = await this.readValueForDate(file, dateStr);
        const isChecked = currentValue === 1 || currentValue === "1" || String(currentValue) === "true";
        const newValue = isChecked ? 0 : 1;
        await this.writeLogLine(file, dateStr, String(newValue));
        new Notice(`✓ Записано: ${dateStr}: ${newValue}`, 2000);
        // Обновляем только этот день и другие визуализации, не пересоздавая весь хитмап
        await updateVisualizations(dateStr, dayDiv);
      };
      
      const hasValue = entries.has(dateStr) && (entries.get(dateStr) === 1 || entries.get(dateStr) === "1" || String(entries.get(dateStr)) === "true");
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
      
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
    
    // Восстанавливаем позицию скролла или прокручиваем в конец если это первый рендер
    requestAnimationFrame(() => {
      if (scrollPosition > 0) {
        heatmapDiv.scrollLeft = scrollPosition;
      } else {
        heatmapDiv.scrollLeft = heatmapDiv.scrollWidth;
      }
    });
  }

  async renderHabitHeatmap(container: HTMLElement, file: TFile, dateIso: string, daysToShow: number, habitType: string) {
    // Проверяем, существует ли уже хитмап
    const existingHeatmap = container.querySelector(".habit-notes__heatmap") as HTMLElement;
    let heatmapDiv: HTMLElement;
    
    if (existingHeatmap) {
      // Обновляем существующий хитмап на месте
      heatmapDiv = existingHeatmap;
      await this.updateHabitHeatmap(heatmapDiv, file, dateIso, daysToShow, habitType);
      return;
    }

    // Создаем новый хитмап
    heatmapDiv = container.createDiv({ cls: "habit-notes__heatmap" });
    
    const m = (window as any).moment;
    const endDate = m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat);
    const startDate = m ? m(endDate).subtract(daysToShow - 1, 'days') : addDays(endDate, -(daysToShow - 1));
    
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    
    // Находим родительский контейнер для обновления визуализаций
    const habitContainer = container.closest(".habit-notes") as HTMLElement;
    
    // Функция для обновления только конкретного дня в хитмапе
    const updateHeatmapDay = async (dateStr: string, dayDiv: HTMLElement) => {
      const entries = await this.readAllEntries(file);
      const hasValue = entries.has(dateStr) && (entries.get(dateStr) === 1 || entries.get(dateStr) === "1" || String(entries.get(dateStr)) === "true");
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
    };
    
    // Функция для обновления всех классов start-day в хитмапе
    const updateAllStartDays = async () => {
      const entries = await this.readAllEntries(file);
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
      if (!habitContainer) return;
      
      // Обновляем только конкретный день в хитмапе, если указан
      if (updatedDateStr && updatedDayDiv) {
        await updateHeatmapDay(updatedDateStr, updatedDayDiv);
        // Всегда обновляем все классы start-day после изменения записи
        await updateAllStartDays();
      }
      
      // Обновляем календарь если он есть
      const calendarDiv = habitContainer.querySelector(".habit-notes__calendar");
      if (calendarDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateCalendar(calendarDiv as HTMLElement, file, currentDateIso, days);
      }
      
      // Обновляем график если он есть
      const chartDiv = habitContainer.querySelector(".habit-notes__chart");
      if (chartDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateChart(chartDiv as HTMLElement, file, currentDateIso, days);
      }
      
      // Обновляем статистику если она есть
      const statsDiv = habitContainer.querySelector(".habit-notes__stats");
      if (statsDiv) {
        const currentDateIso = (habitContainer.querySelector(".habit-notes__date-input") as HTMLInputElement)?.value || dateIso;
        const days = parseInt((habitContainer as any).daysToShow) || daysToShow;
        await this.updateStats(statsDiv as HTMLElement, file, currentDateIso, days, habitType);
      }
    };
    
    for (let i = 0; i < daysToShow; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      const dayNum = m ? date.date() : date.getDate();
      
      const dayDiv = heatmapDiv.createDiv({ cls: "habit-notes__heatmap-day" });
      dayDiv.setText(dayNum.toString());
      dayDiv.addClass(habitType);
      // Сохраняем dateStr в data-атрибуте для последующего обновления start-day
      (dayDiv as any).dataset.dateStr = dateStr;
      
      const hasValue = entries.has(dateStr) && (entries.get(dateStr) === 1 || entries.get(dateStr) === "1" || String(entries.get(dateStr)) === "true");
      
      if (hasValue) {
        dayDiv.addClass("has-value");
      }
      
      // Добавляем класс start-day если это день начала отслеживания
      if (dateStr === startTrackingDateStr) {
        dayDiv.addClass("start-day");
      }
      
      dayDiv.onclick = async () => {
        const currentValue = await this.readValueForDate(file, dateStr);
        const isChecked = currentValue === 1 || currentValue === "1" || String(currentValue) === "true";
        const newValue = isChecked ? 0 : 1;
        await this.writeLogLine(file, dateStr, String(newValue));
        new Notice(`✓ Записано: ${dateStr}: ${newValue}`, 2000);
        // Обновляем только этот день и другие визуализации, не пересоздавая весь хитмап
        await updateVisualizations(dateStr, dayDiv);
      };
    }
    
    // Прокручиваем хитмап в конец, чтобы был виден текущий день
    // Используем requestAnimationFrame для гарантии, что DOM полностью отрендерен
    requestAnimationFrame(() => {
      heatmapDiv.scrollLeft = heatmapDiv.scrollWidth;
    });
  }

  async updateCalendar(calendarDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number) {
    const m = (window as any).moment;
    const endDate = dateIso ? (m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat)) : (m ? m() : new Date());
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));

    // Получаем все записи
    const allEntries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(allEntries, file);
    
    // Пропускаем заголовки (первые 7 элементов)
    const dayElements = Array.from(calendarDiv.children).slice(7);
    
    for (let i = 0; i < days; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      
      let dayDiv: HTMLElement;
      if (i < dayElements.length) {
        dayDiv = dayElements[i] as HTMLElement;
      } else {
        dayDiv = calendarDiv.createDiv({ cls: "habit-notes__calendar-day" });
      }
      
      const dayNum = m ? date.date() : date.getDate();
      dayDiv.setText(dayNum.toString());
      
      if (allEntries.has(dateStr)) {
        dayDiv.addClass("has-value");
      } else {
        dayDiv.removeClass("has-value");
      }
      
      // Добавляем класс start-day если это день начала отслеживания
      if (dateStr === startTrackingDateStr) {
        dayDiv.addClass("start-day");
      } else {
        dayDiv.removeClass("start-day");
      }
      
      const today = m ? m() : new Date();
      const isToday = m ? date.isSame(today, 'day') : 
                     (date.getTime && today.getTime ? 
                      formatDate(date, this.settings.dateFormat) === formatDate(today, this.settings.dateFormat) :
                      false);
      if (isToday) {
        dayDiv.style.border = "2px solid var(--interactive-accent)";
      } else {
        dayDiv.style.border = "";
      }
    }
    
    // Удаляем лишние элементы если их больше чем нужно
    while (dayElements.length > days) {
      dayElements[dayElements.length - 1].remove();
      dayElements.pop();
    }
  }

  async renderCalendar(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number) {
    const calendarDiv = container.createDiv({ cls: "habit-notes__calendar" });
    
    // Заголовки дней недели
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    weekDays.forEach(day => {
      const dayHeader = calendarDiv.createDiv({ cls: "habit-notes__calendar-day" });
      dayHeader.style.fontWeight = "600";
      dayHeader.setText(day);
    });

    await this.updateCalendar(calendarDiv, file, dateIso, daysToShow);
  }

  // Вспомогательная функция для подсчета слов в тексте
  private countWords(text: string): number {
    const trimmed = text.trim();
    if (trimmed === '') return 0;
    return trimmed.split(/\s+/).filter(word => word.length > 0).length;
  }

  async renderChart(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number) {
    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    // Для типов good-habit и bad-habit показываем хитмап вместо графика
    if (metricType === "good-habit" || metricType === "bad-habit") {
      const endDate = dateIso || resolveDateIso("today", this.settings.dateFormat);
      const days = daysToShow || this.settings.daysToShow;
      await this.renderHabitHeatmap(container, file, endDate, days, metricType);
      return;
    }
    
    // Удаляем старый график, если он существует
    const existingChart = container.querySelector(".habit-notes__chart");
    if (existingChart) {
      const chartInstance = (existingChart as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
      existingChart.remove();
    }

    const chartDiv = container.createDiv({ cls: "habit-notes__chart" });
    const canvas = chartDiv.createEl("canvas");
    
    // Получаем цвета из CSS переменных Obsidian
    const root = document.documentElement;
    const getCSSVar = (varName: string, fallback: string = '#000000') => {
      return getComputedStyle(root).getPropertyValue(varName).trim() || fallback;
    };
    
    const accentColor = getCSSVar('--interactive-accent', '#7f6df2');
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
    const endDate = dateIso ? (m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat)) : (m ? m() : new Date());
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    let startTrackingIndex: number | null = null;
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
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
      
      const val = entries.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
          numVal = this.countWords(String(val));
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
    }
    
    if (maxValue === 0) {
      chartDiv.setText("Нет данных");
      return;
    }
    
    // Создаем градиент для заливки
    const ctx = canvas.getContext('2d');
    let gradient: CanvasGradient | null = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 180);
      gradient.addColorStop(0, colorToRgba(accentColor, 0.25));
      gradient.addColorStop(1, colorToRgba(accentColor, 0));
    }
    
    // Определяем подпись для графика в зависимости от типа метрики
    const chartLabel = metricType === "text" ? "Кол-во слов" : "Значение";
    
    // Получаем цвет для вертикальной линии (используем accent цвет с прозрачностью)
    const startLineColor = getCSSVar('--text-accent', accentColor);
    
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
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: accentColor,
          pointHoverBorderColor: bgPrimary,
          pointHoverBorderWidth: 2,
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
            beginAtZero: true
          }
        },
        interaction: {
          intersect: false,
          mode: 'index' as const
        },
        onResize: (chart: any) => {
          // Перерисовываем вертикальную линию при изменении размера
          const index = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : startLineColor;
          if (index !== null && index !== undefined) {
            drawStartLine(chart, index, lineColor);
          }
        }
      },
      plugins: [{
        id: 'startLinePlugin',
        afterDraw: (chart: any) => {
          // Рисуем вертикальную линию на дате начала отслеживания
          const index = (chart as any).startTrackingIndex !== undefined 
            ? (chart as any).startTrackingIndex 
            : startTrackingIndex;
          // Получаем цвет из экземпляра графика или используем текущий
          const lineColor = (chart as any).startLineColor !== undefined 
            ? (chart as any).startLineColor 
            : startLineColor;
          if (index !== null && index !== undefined) {
            drawStartLine(chart, index, lineColor);
          }
        }
      }]
    };
    
    // Функция для рисования вертикальной линии
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
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
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
    } catch (error) {
      console.error("Habit Notes: ошибка создания графика", error);
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
    const endDate = dateIso ? (m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat)) : (m ? m() : new Date());
    const days = daysToShow || this.settings.daysToShow;
    const startDate = m ? m(endDate).subtract(days - 1, 'days') : addDays(endDate, -(days - 1));
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    let startTrackingIndex: number | null = null;
    
    // Подготавливаем данные для Chart.js
    const labels: string[] = [];
    const values: number[] = [];
    let maxValue = 0;
    
    for (let i = 0; i < days; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      
      // Сохраняем индекс дня начала отслеживания
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i;
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
      
      const val = entries.get(dateStr);
      let numVal = 0;
      if (val != null) {
        // Для метрики типа "text" используем количество слов
        if (metricType === "text") {
          numVal = this.countWords(String(val));
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
    }
    
    // Получаем цвет для вертикальной линии
    const root = document.documentElement;
    const getCSSVar = (varName: string, fallback: string = '#000000') => {
      return getComputedStyle(root).getPropertyValue(varName).trim() || fallback;
    };
    const accentColor = getCSSVar('--interactive-accent', '#7f6df2');
    const startLineColor = getCSSVar('--text-accent', accentColor);
    
    // Сохраняем индекс начала отслеживания и цвет в экземпляре графика для использования плагином
    (chartInstance as any).startTrackingIndex = startTrackingIndex;
    (chartInstance as any).startLineColor = startLineColor;
    
    // Обновляем данные графика
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = values;
    chartInstance.update('none'); // 'none' для мгновенного обновления без анимации
  }

  async updateStats(statsDiv: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, habitType?: string) {
    const entries = await this.readAllEntries(file);
    
    // Получаем тип метрики из frontmatter
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const metricType = habitType || (fileOpts.mode ?? "good-habit").toLowerCase();
    
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
          numVal = this.countWords(String(val));
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

  async renderStats(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, habitType?: string) {
    const statsDiv = container.createDiv({ cls: "habit-notes__stats" });
    await this.updateStats(statsDiv, file, dateIso, daysToShow, habitType);
  }
  
  getStartTrackingDate(entries: Map<string, string | number>, file?: TFile): string | null {
    const m = (window as any).moment;
    let startTrackingDate: Date | any = null;
    
    if (file) {
      // Используем дату создания файла как дату начала отслеживания
      const fileStat = file.stat;
      if (fileStat && fileStat.ctime) {
        startTrackingDate = m ? m(fileStat.ctime) : new Date(fileStat.ctime);
        // Нормализуем до начала дня
        if (m) {
          startTrackingDate = startTrackingDate.startOf('day');
        } else {
          startTrackingDate.setHours(0, 0, 0, 0);
        }
      }
    }
    
    // Если есть записи, используем самую раннюю как дату начала
    if (entries.size > 0) {
      const sortedDates = Array.from(entries.keys()).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = m ? m(firstDateStr, this.settings.dateFormat) : parseDate(firstDateStr, this.settings.dateFormat);
      if (!startTrackingDate || (m ? firstDate.isBefore(startTrackingDate) : firstDate < startTrackingDate)) {
        startTrackingDate = firstDate;
      }
    }
    
    if (!startTrackingDate) {
      return null;
    }
    
    // Возвращаем дату в формате настроек
    return m ? startTrackingDate.format(this.settings.dateFormat) : formatDate(startTrackingDate, this.settings.dateFormat);
  }

  calculateStreak(entries: Map<string, string | number>, m: any, endDate: Date | any, habitType?: string, file?: TFile): number {
    let streak = 0;
    let currentDate = m ? m(endDate) : new Date(endDate);
    const metricType = (habitType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";
    
    // Определяем дату начала отслеживания - либо дата создания файла, либо первая запись
    let startTrackingDate: Date | any = null;
    if (file) {
      // Используем дату создания файла как дату начала отслеживания
      const fileStat = file.stat;
      if (fileStat && fileStat.ctime) {
        startTrackingDate = m ? m(fileStat.ctime) : new Date(fileStat.ctime);
        // Нормализуем до начала дня
        if (m) {
          startTrackingDate = startTrackingDate.startOf('day');
        } else {
          startTrackingDate.setHours(0, 0, 0, 0);
        }
      }
    }
    
    // Если есть записи, используем самую раннюю как дату начала
    if (entries.size > 0) {
      const sortedDates = Array.from(entries.keys()).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = m ? m(firstDateStr, this.settings.dateFormat) : parseDate(firstDateStr, this.settings.dateFormat);
      if (!startTrackingDate || (m ? firstDate.isBefore(startTrackingDate) : firstDate < startTrackingDate)) {
        startTrackingDate = firstDate;
      }
    }
    
    // Если нет даты начала, используем текущую дату минус разумный лимит (например, 1 год назад)
    if (!startTrackingDate) {
      startTrackingDate = m ? m(endDate).subtract(365, 'days') : addDays(endDate, -365);
    }
    
    // Защита от бесконечного цикла - максимальное количество дней назад (10 лет)
    const maxDaysBack = 3650;
    let daysChecked = 0;
    
    while (daysChecked < maxDaysBack) {
      // Проверяем, не вышли ли за дату начала отслеживания
      if (m) {
        if (currentDate.isBefore(startTrackingDate)) {
          break;
        }
      } else {
        if (currentDate < startTrackingDate) {
          break;
        }
      }
      
      const dateStr = m ? currentDate.format(this.settings.dateFormat) : formatDate(currentDate, this.settings.dateFormat);
      const val = entries.get(dateStr);
      
      // Для плохих привычек: отсутствие отметки = успех, наличие отметки = неудача
      // Для хороших привычек: наличие отметки = успех, отсутствие = неудача
      let isSuccess = false;
      
      if (isBadHabit) {
        // Для плохих привычек успех = отсутствие отметки (но только с даты начала отслеживания)
        if (val == null) {
          isSuccess = true;
        } else {
          const valStr = String(val);
          const hasValue = typeof val === "number" 
            ? val !== 0 
            : valStr === "1" || valStr === "true" || valStr.trim() !== "";
          isSuccess = !hasValue;
        }
      } else {
        // Для хороших привычек успех = наличие отметки
        if (val != null) {
          const valStr = String(val);
          isSuccess = typeof val === "number" 
            ? val !== 0 
            : valStr === "1" || valStr === "true" || valStr.trim() !== "";
        } else {
          isSuccess = false;
        }
      }
      
      if (isSuccess) {
        streak++;
      } else {
        break;
      }
      
      // Переходим к предыдущему дню
      if (m) {
        currentDate = currentDate.subtract(1, 'day');
      } else {
        currentDate = addDays(currentDate, -1);
      }
      
      daysChecked++;
    }
    
    return streak;
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const entries = new Map<string, string | number>();
    try {
      const raw = await this.app.vault.read(file);
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return entries;
      
      const frontmatter = frontmatterMatch[1];
      const data = this.parseFrontmatterData(frontmatter);
      
      Object.entries(data).forEach(([date, value]) => {
        entries.set(date, value);
      });
    } catch (error) {
      console.error("Habit Notes: ошибка чтения всех записей", error);
    }
    
    return entries;
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewHabit() {
    new CreateHabitModal(this.app, this).open();
  }

  async onHabitCreated(folderPath: string) {
    await this.refreshBlocksForFolder(folderPath);
  }


  // ---- Чтение/запись --------------------------------------------------------

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing instanceof TFile) return existing;
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (dir && !(this.app.vault.getAbstractFileByPath(dir))) {
      await this.app.vault.createFolder(dir);
    }
    const name = filePath.split("/").pop()?.replace(".md","") || "Untitled";
    // Правильный YAML формат - плоская структура без вложенности
    const content = `---\nname: "${name.replace(/"/g, '\\"')}"\ntype: "${type}"\ndata: {}\n---\n`;
    return await this.app.vault.create(filePath, content);
  }

  // Парсит YAML frontmatter и возвращает объект данных
  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    const data: Record<string, string | number> = {};
    // Ищем секцию data: в frontmatter
    // Может быть в формате data: {} или data:\n  "key": value
    const dataMatch = frontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
    if (dataMatch) {
      // Если data: {}, то данных нет
      if (frontmatter.match(/data:\s*\{\}/)) {
        return data;
      }
      // Иначе парсим многострочный формат
      const dataContent = dataMatch[1];
      if (dataContent) {
        const dataLines = dataContent.split(/\n/);
        dataLines.forEach(line => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#') || trimmed === '{}') return;
          // Парсим строки вида "  "2025-01-15": 10000" или "  "2025-01-15": "value""
          // Более точный паттерн для YAML формата с кавычками
          const match = trimmed.match(/^["']([^"']+)["']\s*:\s*(.+)$/);
          if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            // Убираем кавычки если есть (одинарные или двойные)
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
              // Раскрываем экранированные кавычки
              value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
            }
            data[key] = parseMaybeNumber(value);
          } else {
            // Пробуем без кавычек в ключе (для обратной совместимости)
            const matchNoQuotes = trimmed.match(/^([^:]+?)\s*:\s*(.+)$/);
            if (matchNoQuotes) {
              const key = matchNoQuotes[1].trim();
              let value = matchNoQuotes[2].trim();
              // Убираем кавычки если есть
              if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
                value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
              }
              data[key] = parseMaybeNumber(value);
            }
          }
        });
      }
    }
    return data;
  }

  // Форматирует данные в YAML формат
  formatDataToYaml(data: Record<string, string | number>): string {
    if (Object.keys(data).length === 0) {
      return "data: {}\n";
    }
    let yaml = "data:\n";
    // Сортируем по дате для читаемости
    const sortedDates = Object.keys(data).sort();
    sortedDates.forEach(date => {
      const value = data[date];
      // Всегда оборачиваем ключ (дату) в кавычки для надежности
      // Для значения: если это строка, всегда в кавычках; если число - без кавычек
      if (typeof value === "string") {
        // Экранируем кавычки и переносы строк в строках
        const escapedValue = value
          .replace(/\\/g, '\\\\')  // Сначала экранируем обратные слеши
          .replace(/"/g, '\\"')     // Затем кавычки
          .replace(/\n/g, '\\n')    // Переносы строк
          .replace(/\r/g, '\\r');   // Возврат каретки
        yaml += `  "${date}": "${escapedValue}"\n`;
      } else {
        // Числовые значения без кавычек
        yaml += `  "${date}": ${value}\n`;
      }
    });
    return yaml;
  }

  async readValueForDate(file: TFile, dateIso: string): Promise<string | number | null> {
    try {
      const raw = await this.app.vault.read(file);
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;
      
      const frontmatter = frontmatterMatch[1];
      const data = this.parseFrontmatterData(frontmatter);
      return data[dateIso] ?? null;
    } catch (error) {
      console.error("Habit Notes: ошибка чтения значения", error);
      return null;
    }
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      let f = file;
      if (!f) throw new Error("file missing");
      const content = await this.app.vault.read(f);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (!frontmatterMatch) {
        throw new Error("Frontmatter не найден");
      }

      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);
      
      // Парсим существующие данные
      let data = this.parseFrontmatterData(frontmatter);
      
      // Всегда перезаписываем значение для даты
      data[dateIso] = parseMaybeNumber(value);

      // Форматируем данные обратно в YAML
      const dataYaml = this.formatDataToYaml(data);
      
      // Заменяем секцию data в frontmatter
      let newFrontmatter = frontmatter.trim();
      // Ищем data: {} или data:\n  ...
      const dataMatch = newFrontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
      if (dataMatch) {
        // Заменяем существующую секцию data (включая data: {})
        // Убираем последний перенос строки из dataYaml, так как он уже есть в структуре
        const dataYamlTrimmed = dataYaml.endsWith('\n') ? dataYaml.slice(0, -1) : dataYaml;
        newFrontmatter = newFrontmatter.replace(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/, dataYamlTrimmed);
      } else {
        // Добавляем секцию data в конец frontmatter
        newFrontmatter = newFrontmatter + "\n" + dataYaml.trimEnd();
      }

      // Убеждаемся, что frontmatter заканчивается на перенос строки перед ---
      if (!newFrontmatter.endsWith('\n')) {
        newFrontmatter += '\n';
      }

      const newContent = `---\n${newFrontmatter}---${body}`;
      await this.app.vault.modify(f, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new Notice(`Ошибка записи: ${errorMsg}`);
      console.error("Habit Notes: ошибка записи", error);
      throw error;
    }
  }

  // Простейший «пикер» файла: предлагает последние открытые/подходящие
  async pickHabitFile(): Promise<TFile | null> {
    const files = this.app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith(this.settings.habitsFolder + "/"));
    if (files.length === 0) { new Notice("Нет заметок привычек"); return null; }
    if (files.length === 1) return files[0];

    return new Promise(resolve => {
      new FilePickerModal(this.app, files, resolve).open();
    });
  }

  async saveSettings() { await this.saveData(this.settings); }
}

// ---- UI: Settings -----------------------------------------------------------

class HabitSettingsTab extends PluginSettingTab {
  plugin: HabitNotesPlugin;
  constructor(app: App, plugin: HabitNotesPlugin) { super(app, plugin); this.plugin = plugin; }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Папка привычек")
      .addText(t => t.setPlaceholder("3. Metrics/Habits")
        .setValue(this.plugin.settings.habitsFolder)
        .onChange(async (v)=>{ this.plugin.settings.habitsFolder = v.trim(); await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Формат даты")
      .addText(t => t.setPlaceholder("YYYY-MM-DD")
        .setValue(this.plugin.settings.dateFormat)
        .onChange(async (v)=>{ this.plugin.settings.dateFormat = v.trim(); await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Формат времени")
      .addText(t => t.setPlaceholder("HH:mm")
        .setValue(this.plugin.settings.timeFormat)
        .onChange(async (v)=>{ this.plugin.settings.timeFormat = v.trim(); await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Количество дней для графиков")
      .addText(t => t.setPlaceholder("30")
        .setValue(String(this.plugin.settings.daysToShow))
        .onChange(async (v)=>{ 
          const num = parseInt(v.trim());
          if (!isNaN(num) && num > 0) {
            this.plugin.settings.daysToShow = num;
            await this.plugin.saveSettings();
          }
        }));
  }
}

// ---- Helpers ----------------------------------------------------------------

function parseOptions(src: string): Record<string,string> {
  const o: Record<string,string> = {};
  src.split(/\r?\n/).forEach(l=>{
    const m = l.match(/^\s*([a-zA-Z_]+)\s*:\s*(.+)\s*$/);
    if (m) o[m[1].trim()] = m[2].trim();
  });
  return o;
}

function resolveDateIso(input: string | undefined, fmt: string): string {
  const m = (window as any).moment;
  if (!m) {
    // Fallback если moment недоступен - используем нативный Date
    const today = new Date();
    if (!input || input.toLowerCase() === "today") {
      return formatDate(today, fmt);
    }
    const parsed = new Date(input);
    return isNaN(parsed.getTime()) ? formatDate(today, fmt) : formatDate(parsed, fmt);
  }
  if (!input || input.toLowerCase() === "today") return m().format(fmt);
  const tryParse = m(input, ["YYYY-MM-DD","YYYY/MM/DD","DD.MM.YYYY"], true);
  return tryParse.isValid() ? tryParse.format(fmt) : m().format(fmt);
}

function formatDate(date: Date, fmt: string): string {
  // Простой форматтер для YYYY-MM-DD
  if (fmt === "YYYY-MM-DD") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // Для других форматов возвращаем ISO
  return date.toISOString().split("T")[0];
}

function parseDate(dateStr: string, fmt: string): Date {
  // Простой парсер для YYYY-MM-DD
  if (fmt === "YYYY-MM-DD") {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
  }
  // Fallback на стандартный парсер
  return new Date(dateStr);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseMaybeNumber(v: string): string | number {
  const n = Number(v);
  return Number.isFinite(n) ? n : v;
}

function escapeRegExp(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// --- Modal для создания новой привычки
class CreateHabitModal extends Modal {
  plugin: HabitNotesPlugin;
  
  constructor(app: App, plugin: HabitNotesPlugin) {
    super(app);
    this.plugin = plugin;
  }
  
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Создать новую метрику/привычку" });
    
    const nameSetting = new Setting(contentEl)
      .setName("Название")
      .addText(text => {
        text.setPlaceholder("Например: Утренняя зарядка");
        text.inputEl.style.width = "100%";
      });
    
    const typeSetting = new Setting(contentEl)
      .setName("Тип")
      .addDropdown(dropdown => {
        dropdown
          .addOption("good-habit", "Хорошая привычка")
          .addOption("bad-habit", "Плохая привычка")
          .addOption("number", "Число")
          .addOption("plusminus", "Счётчик (+/-)")
          .addOption("rating", "Оценка (звёзды)")
          .addOption("text", "Текст")
          .setValue("good-habit");
      });
    
    const maxRatingSetting = new Setting(contentEl)
      .setName("Максимальная оценка")
      .addSlider(slider => {
        slider
          .setLimits(3, 10, 1)
          .setValue(5)
          .setDynamicTooltip();
      });
    
    // Скрываем maxRatingSetting по умолчанию
    maxRatingSetting.settingEl.style.display = "none";
    
    const typeDropdown = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    typeDropdown.onchange = () => {
      if (typeDropdown.value === "rating") {
        maxRatingSetting.settingEl.style.display = "";
      } else {
        maxRatingSetting.settingEl.style.display = "none";
      }
    };
    
    new Setting(contentEl)
      .addButton(button => {
        button
          .setButtonText("Создать")
          .setCta()
          .onClick(async () => {
            const nameInput = nameSetting.controlEl.querySelector("input") as HTMLInputElement;
            const name = nameInput.value.trim();
            if (!name) {
              new Notice("Введите название");
              return;
            }
            
            const type = typeDropdown.value;
            const maxRating = type === "rating" 
              ? (maxRatingSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "5"
              : "5";
            
            const fileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
            const filePath = `${this.plugin.settings.habitsFolder}/${fileName}`;
            
            try {
              const file = await this.plugin.ensureFileWithHeading(filePath, type);
              
              // Обновляем frontmatter с правильным типом и форматом YAML
              const content = await this.app.vault.read(file);
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
              
              // Экранируем кавычки в названии для YAML
              const escapedName = name.replace(/"/g, '\\"');
              // Плоская структура без вложенности
              let newFrontmatter = `name: "${escapedName}"\ntype: "${type}"\n`;
              if (type === "rating") {
                newFrontmatter += `maxRating: ${parseInt(maxRating) || 5}\n`;
              }
              newFrontmatter += `data: {}\n`;
              
              const body = frontmatterMatch 
                ? content.slice(frontmatterMatch[0].length).trim()
                : content.trim();
              
              // Сохраняем структуру: frontmatter с правильным форматированием
              const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ''}`;
              
              await this.app.vault.modify(file, newContent);
              
              new Notice(`Создана метрика: ${name}`);
              
              // Обновляем все открытые блоки habit для этой папки
              const fileFolderPath = this.plugin.getFolderPathFromFile(file.path);
              setTimeout(async () => {
                await this.plugin.onHabitCreated(fileFolderPath);
              }, 500);
              
              this.close();
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              new Notice(`Ошибка при создании метрики: ${errorMsg}`);
              console.error("Habit Notes: ошибка создания метрики", error);
            }
          });
      });
  }
  
  onClose() {
    this.contentEl.empty();
  }
}

// --- Simple modal to pick a file
class FilePickerModal extends Modal {
  files: TFile[];
  onPick: (f: TFile | null)=>void;
  constructor(app: App, files: TFile[], onPick:(f:TFile|null)=>void) {
    super(app); this.files = files; this.onPick = onPick;
  }
  onOpen() {
    const {contentEl} = this;
    contentEl.createEl("h3", {text: "Выберите заметку привычки"});
    this.files.slice(0,200).forEach(f=>{
      const btn = contentEl.createEl("button", {text: f.path});
      btn.onclick = ()=>{ this.close(); this.onPick(f); };
    });
  }
  onClose() { this.onPick(null); this.contentEl.empty(); }
}
