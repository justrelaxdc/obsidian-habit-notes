import { App, MarkdownRenderChild, MarkdownPostProcessorContext, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

type TrackerSettings = {
  trackersFolder: string;        // папка с заметками трекеров
  dateFormat: string;          // "YYYY-MM-DD"
  timeFormat: string;          // "HH:mm"
  daysToShow: number;          // количество дней для отображения графиков
  hideNumbering: boolean;      // скрывать нумерацию в начале названий (например, "1. [[Название]]")
};

const DEFAULT_SETTINGS: TrackerSettings = {
  trackersFolder: "0. Files/Trackers",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm",
  daysToShow: 30,
  hideNumbering: false,
};

// Интерфейс для представления узла дерева папок
interface FolderNode {
  name: string;
  path: string;
  level: number;
  files: TFile[];
  children: FolderNode[];
}

// Класс для управления жизненным циклом блоков tracker
class TrackerBlockRenderChild extends MarkdownRenderChild {
  plugin: TrackerPlugin;
  source: string;
  folderPath: string;
  opts: Record<string, string>;

  constructor(plugin: TrackerPlugin, source: string, containerEl: HTMLElement, ctx: MarkdownPostProcessorContext) {
    super(containerEl);
    this.plugin = plugin;
    this.source = source;
    this.opts = parseOptions(source);
    this.folderPath = this.opts.folder || plugin.settings.trackersFolder;
  }

  async render() {
    this.containerEl.empty();
    
    try {
      const folderTree = this.getFilesFromFolder(this.folderPath);
      if (!folderTree || (folderTree.files.length === 0 && folderTree.children.length === 0)) {
        this.containerEl.createEl("div", { 
          text: `tracker: в папке ${this.folderPath} не найдено трекеров`, 
          cls: "tracker-notes__error" 
        });
        return;
      }

      const view = (this.opts.view ?? "control").toLowerCase();
      let dateIso = resolveDateIso(this.opts.date, this.plugin.settings.dateFormat);

      // Создаем один общий контейнер для всех трекеров
      const mainContainer = this.containerEl.createDiv({ cls: "tracker-notes" });
      
      // Создаем общий header с date picker только для control view
      if (view === "control") {
        const blockHeader = mainContainer.createDiv({ cls: "tracker-notes__header" });
        const datePicker = blockHeader.createDiv({ cls: "tracker-notes__date-picker" });
        const dateInput = datePicker.createEl("input", { 
          type: "date", 
          cls: "tracker-notes__date-input",
          value: dateIso 
        }) as HTMLInputElement;
        
        const updateDate = async (newDate: string) => {
          const newDateIso = resolveDateIso(newDate, this.plugin.settings.dateFormat);
          dateInput.value = newDateIso;
          dateIso = newDateIso;
          
          // Обновляем все трекеры в блоке с новой датой (работает с вложенными контейнерами)
          const trackerItems = mainContainer.querySelectorAll(".tracker-notes__tracker");
          for (const trackerItem of Array.from(trackerItems)) {
            const filePath = (trackerItem as HTMLElement).dataset.filePath;
            if (filePath) {
              const file = this.plugin.app.vault.getAbstractFileByPath(filePath);
              if (file instanceof TFile) {
                await this.plugin.updateTrackerDate(trackerItem as HTMLElement, file, newDateIso, this.opts);
              }
            }
          }
        };
        
        dateInput.onchange = () => updateDate(dateInput.value);
        const todayBtn = datePicker.createEl("button", { text: "Сегодня", cls: "tracker-notes__date-btn" });
        todayBtn.onclick = () => updateDate("today");
      }

      // Создаем контейнер для иерархии трекеров
      const trackersContainer = mainContainer.createDiv({ cls: "tracker-notes__hierarchy" });

      // Рендерим иерархическую структуру
      await this.renderFolderNode(folderTree, trackersContainer, dateIso, view, this.opts);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.containerEl.createEl("div", { 
        text: `tracker: ошибка при обработке блока: ${errorMsg}`, 
        cls: "tracker-notes__error" 
      });
      console.error("Tracker: ошибка обработки блока", error);
    }
  }

  private getFilesFromFolder(folderPath: string): FolderNode | null {
    const folder = this.plugin.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      this.containerEl.createEl("div", { 
        text: `tracker: папка не найдена: ${folderPath}`, 
        cls: "tracker-notes__error" 
      });
      return null;
    }

    if (folder instanceof TFile) {
      // Если это файл, возвращаем узел с одним файлом
      return {
        name: folder.basename,
        path: folder.path,
        level: 0,
        files: [folder],
        children: []
      };
    }

    if (folder instanceof TFolder) {
      return this.buildFolderTree(folder, 2, 0);
    }

    return null;
  }

  private buildFolderTree(folder: TFolder, maxDepth: number, currentLevel: number): FolderNode {
    const node: FolderNode = {
      name: folder.name,
      path: folder.path,
      level: currentLevel,
      files: [],
      children: []
    };

    // Собираем файлы из текущей папки
    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === "md") {
        node.files.push(child);
      }
    }

    // Сортируем файлы по названию (ascending)
    node.files.sort((a, b) => a.basename.localeCompare(b.basename, undefined, { sensitivity: 'base' }));

    // Рекурсивно обрабатываем подпапки, если не достигнут максимальный уровень
    if (currentLevel < maxDepth) {
      for (const child of folder.children) {
        if (child instanceof TFolder) {
          const childNode = this.buildFolderTree(child, maxDepth, currentLevel + 1);
          // Добавляем дочерний узел только если в нем есть файлы или подпапки с файлами
          if (childNode.files.length > 0 || childNode.children.length > 0) {
            node.children.push(childNode);
          }
        }
      }
      
      // Сортируем дочерние папки по названию (ascending)
      node.children.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }

    return node;
  }

  private async renderFolderNode(
    node: FolderNode, 
    parentEl: HTMLElement, 
    dateIso: string, 
    view: string, 
    opts: Record<string, string>
  ): Promise<void> {
    // Создаем контейнер для этого узла папки с классом уровня
    const nodeContainer = parentEl.createDiv({ 
      cls: `tracker-notes__folder-node level-${node.level}` 
    });
    
    // Показываем заголовок папки только если есть файлы или это не корневая папка (level > 0)
    // Для корневой папки без файлов заголовок не показываем, чтобы не дублировать название
    const shouldShowHeader = node.files.length > 0 || (node.level > 0 && node.children.length > 0);
    
    if (shouldShowHeader) {
      // Создаем заголовок папки с классом уровня
      const folderHeader = nodeContainer.createDiv({ 
        cls: `tracker-notes__folder-header level-${node.level}` 
      });
      const displayName = this.plugin.settings.hideNumbering 
        ? this.plugin.removeNumbering(node.name) 
        : node.name;
      folderHeader.setText(displayName);
    }

    // Если есть файлы в этой папке, создаем контейнер для трекеров
    if (node.files.length > 0) {
      const trackersContainer = nodeContainer.createDiv({ cls: "tracker-notes__trackers" });

      // Рендерим все трекеры из этой папки
      for (const file of node.files) {
        await this.plugin.renderTracker(trackersContainer, file, dateIso, view, opts);
      }
    }

    // Рекурсивно рендерим дочерние папки
    for (const childNode of node.children) {
      await this.renderFolderNode(childNode, nodeContainer, dateIso, view, opts);
    }
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

export default class TrackerPlugin extends Plugin {
  settings: TrackerSettings;
  activeBlocks: Set<TrackerBlockRenderChild> = new Set();

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
    const fileFolderPath = this.normalizePath(this.getFolderPathFromFile(file.path));
    const trackersFolderPath = this.normalizePath(this.settings.trackersFolder);
    return fileFolderPath === trackersFolderPath || file.path.startsWith(this.settings.trackersFolder + "/");
  }

  getFolderPathFromFile(filePath: string): string {
    return filePath.substring(0, filePath.lastIndexOf('/'));
  }

  addStyleSheet() {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .tracker-notes { margin: 1em 0; padding: 1em; border-radius: 10px; background: var(--background-secondary); border: 1px solid var(--background-modifier-border); box-shadow: 0 2px 8px rgba(0,0,0,0.1); box-sizing: border-box; max-width: 100%; overflow-x: hidden; }
      .tracker-notes__header { display: flex; justify-content: flex-start; align-items: center; margin-bottom: 1em; padding-bottom: 0.75em; border-bottom: 2px solid var(--background-modifier-border); flex-wrap: wrap; gap: 0.5em; }
      .tracker-notes__trackers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1em; }
      .tracker-notes__tracker { padding: 1em; border-radius: 8px; background: var(--background-primary); border: 1px solid var(--background-modifier-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s ease; box-sizing: border-box; max-width: 100%; overflow-x: hidden; }
      .tracker-notes__tracker:hover { box-shadow: 0 2px 6px rgba(0,0,0,0.1); transform: translateY(-1px); }
      .tracker-notes__tracker-header { margin-bottom: 0.75em; padding-bottom: 0.5em; border-bottom: 1px solid var(--background-modifier-border); }
      .tracker-notes__tracker-title { font-weight: 600; font-size: 1em; color: var(--text-normal); margin: 0; word-wrap: break-word; overflow-wrap: break-word; }
      .tracker-notes__row { display: flex; align-items: center; gap: 0.6em; padding: 0.4em 0; flex-wrap: wrap; }
      .tracker-notes__value { min-width: 2.5em; text-align: center; font-weight: 600; font-size: 1em; color: var(--text-normal); transition: transform 0.2s ease; flex-shrink: 0; }
      .tracker-notes__value.updated { animation: pulse 0.3s ease; }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      .tracker-notes input[type="checkbox"] { width: 1.4em; height: 1.4em; cursor: pointer; accent-color: var(--interactive-accent); transition: transform 0.2s ease; flex-shrink: 0; }
      .tracker-notes input[type="checkbox"]:hover { transform: scale(1.1); }
      .tracker-notes input[type="number"] { width: 4.5em; min-width: 4.5em; max-width: 100%; padding: 0.4em 0.6em; border: 1px solid var(--background-modifier-border); border-radius: 5px; background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; transition: border-color 0.2s ease; box-sizing: border-box; }
      .tracker-notes input[type="number"]:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .tracker-notes input[type="range"], .tracker-notes__slider { flex: 1 1 auto; min-width: 0; height: 6px; border-radius: 3px; background: var(--background-modifier-border); outline: none; -webkit-appearance: none; cursor: pointer; }
      .tracker-notes input[type="range"]::-webkit-slider-thumb, .tracker-notes__slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--interactive-accent); cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .tracker-notes input[type="range"]::-webkit-slider-thumb:hover, .tracker-notes__slider::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 3px 6px rgba(0,0,0,0.3); }
      .tracker-notes input[type="range"]::-moz-range-thumb, .tracker-notes__slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--interactive-accent); cursor: pointer; border: none; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .tracker-notes input[type="range"]::-moz-range-thumb:hover, .tracker-notes__slider::-moz-range-thumb:hover { transform: scale(1.15); box-shadow: 0 3px 6px rgba(0,0,0,0.3); }
      .tracker-notes__progress-bar-wrapper { display: inline; white-space: normal; width: 100%; }
      .tracker-notes__progress-bar-input { height: var(--input-height, 2.5em); width: 100%; border-radius: var(--input-radius, 4px); border: var(--border-width, 1px) solid var(--background-modifier-border); position: relative; cursor: col-resize; background: var(--background-modifier-form-field, var(--background-secondary-alt)); user-select: none; box-sizing: border-box; outline: none; overflow: hidden; }
      .tracker-notes__progress-bar-input:hover { border-color: var(--background-modifier-border-hover, var(--interactive-accent)); }
      .tracker-notes__progress-bar-input:focus-visible { box-shadow: 0 0 0 3px var(--background-modifier-border-focus, var(--interactive-accent)); }
      .tracker-notes__progress-bar-progress { height: 100%; background: var(--color-accent, var(--interactive-accent)); border-radius: var(--input-radius, 4px); pointer-events: none; z-index: 0; }
      .tracker-notes__progress-bar-value { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: var(--font-ui-small, 0.9em); font-weight: 600; color: var(--text-normal); pointer-events: none; z-index: 2; white-space: nowrap; }
      .tracker-notes__progress-bar-label-left { position: absolute; top: 50%; transform: translate(0, -50%); left: var(--size-4-2, 0.5em); font-size: var(--font-ui-small, 0.85em); color: var(--color-accent, var(--interactive-accent)); font-weight: 600; pointer-events: none; z-index: 1; }
      .tracker-notes__progress-bar-label-right { position: absolute; top: 50%; transform: translate(0, -50%); right: var(--size-4-2, 0.5em); font-size: var(--font-ui-small, 0.85em); color: var(--color-accent, var(--interactive-accent)); font-weight: 600; pointer-events: none; z-index: 1; }
      .tracker-notes button { padding: 0.4em 0.8em; border: 1px solid var(--background-modifier-border); border-radius: 5px; background: var(--interactive-normal); color: var(--text-normal); cursor: pointer; font-size: 0.9em; transition: all 0.2s ease; white-space: nowrap; flex-shrink: 0; }
      .tracker-notes button:hover { background: var(--interactive-hover); border-color: var(--interactive-accent); transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .tracker-notes button:active { transform: scale(0.95) translateY(0); }
      .tracker-notes__rating { display: flex; gap: 0.3em; align-items: center; flex-wrap: wrap; }
      .tracker-notes__rating-star { font-size: 1.4em; cursor: pointer; color: var(--text-faint); transition: all 0.2s ease; user-select: none; flex-shrink: 0; }
      .tracker-notes__rating-star:hover { transform: scale(1.2); filter: brightness(1.2); }
      .tracker-notes__rating-star.active { color: #ffd700; text-shadow: 0 0 4px rgba(255, 215, 0, 0.5); }
      .tracker-notes__text-input { width: 100%; max-width: 100%; padding: 0.5em; border: 1px solid var(--background-modifier-border); border-radius: 5px; background: var(--background-primary); color: var(--text-normal); font-family: inherit; font-size: 0.9em; transition: border-color 0.2s ease; resize: vertical; min-height: 60px; box-sizing: border-box; }
      .tracker-notes__text-input:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .tracker-notes__stats { margin-top: 0.75em; margin-bottom: 0.5em; padding-top: 0.75em; padding-bottom: 0.5em; border-top: 1px solid var(--background-modifier-border); font-size: 0.85em; color: var(--text-muted); line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word; }
      .tracker-notes__stats > div { margin: 0.3em 0; }
      .tracker-notes__calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.3em; margin-top: 0.75em; max-width: 100%; }
      .tracker-notes__calendar-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 0.8em; background: var(--background-modifier-border); color: var(--text-muted); transition: all 0.2s ease; cursor: default; min-width: 0; }
      .tracker-notes__calendar-day.has-value { background: var(--interactive-accent); color: var(--text-on-accent); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
      .tracker-notes__calendar-day:hover { transform: scale(1.1); }
      .tracker-notes__chart { margin-top: 0.75em; margin-bottom: 0.5em; border-top: 1px solid var(--background-modifier-border); padding-top: 0.75em; width: 100%; max-width: 100%; position: relative; height: 200px; box-sizing: border-box; overflow: hidden; }
      .tracker-notes__chart canvas { max-width: 100% !important; height: 180px !important; }
      .tracker-notes__date-picker { display: flex; gap: 0.5em; align-items: center; flex-wrap: wrap; }
      .tracker-notes__date-input { padding: 0.4em 0.6em; border: 1px solid var(--background-modifier-border); border-radius: 5px; background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; transition: border-color 0.2s ease; min-width: 0; flex: 1 1 auto; max-width: 100%; box-sizing: border-box; }
      .tracker-notes__date-input:focus { outline: 2px solid var(--interactive-accent); outline-offset: 2px; border-color: var(--interactive-accent); }
      .tracker-notes__date-btn { padding: 0.4em 0.8em; font-size: 0.85em; white-space: nowrap; flex-shrink: 0; }
      .tracker-notes__error { color: var(--text-error); padding: 0.5em; background: var(--background-modifier-error); border-radius: 5px; margin: 0.5em 0; font-size: 0.9em; word-wrap: break-word; overflow-wrap: break-word; }
      .tracker-notes__success { color: var(--text-success, var(--text-normal)); padding: 0.4em 0.6em; background: var(--background-modifier-success, var(--background-modifier-border)); border-radius: 5px; margin: 0.4em 0; font-size: 0.85em; word-wrap: break-word; overflow-wrap: break-word; }
      .tracker-notes__heatmap { display: flex; gap: 0.3em; overflow-x: auto; scroll-behavior: smooth; padding: 0.5em 0; margin-top: 0.5em; min-height: 2.5em; max-width: 100%; box-sizing: border-box; }
      .tracker-notes__heatmap::-webkit-scrollbar { height: 6px; }
      .tracker-notes__heatmap::-webkit-scrollbar-track { background: var(--background-modifier-border); border-radius: 3px; }
      .tracker-notes__heatmap::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 3px; }
      .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { background: var(--text-normal); }
      .tracker-notes__heatmap-day { aspect-ratio: 1; min-width: 2.5em; max-width: 3em; display: flex; align-items: center; justify-content: center; border-radius: 5px; font-size: 0.85em; background: var(--background-modifier-border); color: var(--text-muted); transition: all 0.2s ease; cursor: pointer; font-weight: 500; flex-shrink: 0; }
      .tracker-notes__heatmap-day:hover { transform: scale(1.1); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .tracker-notes__heatmap-day.has-value.good-habit { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.has-value.bad-habit { background: var(--text-error, var(--background-modifier-error)); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.bad-habit:not(.has-value) { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.start-day { box-shadow: 0 0 0 2px var(--text-accent, var(--interactive-accent)) !important; }
      .tracker-notes__calendar-day.start-day { position: relative; box-shadow: 0 0 0 2px var(--text-accent, var(--interactive-accent)) !important; opacity: 0.9; }
      .tracker-notes__stats > div { transition: opacity 0.2s ease; }
      .tracker-notes__calendar-day { transition: background-color 0.2s ease, color 0.2s ease; }
      .tracker-notes__heatmap { transition: opacity 0.15s ease; }
      .tracker-notes__chart { transition: opacity 0.15s ease; }
      .tracker-notes__hierarchy { display: flex; flex-direction: column; gap: 1.5em; }
      .tracker-notes__folder-node { display: flex; flex-direction: column; margin-bottom: 1em; }
      .tracker-notes__folder-header { font-weight: 700; color: var(--text-normal); margin-bottom: 0.75em; margin-top: 0.5em; padding-bottom: 0.5em; border-bottom: 2px solid var(--background-modifier-border); }
      .tracker-notes__folder-header.level-0 { font-size: 1.4em; margin-top: 0; }
      .tracker-notes__folder-header.level-1 { font-size: 1.2em; }
      .tracker-notes__folder-header.level-2 { font-size: 1.1em; }
      
      /* Медиа-запросы для мобильных устройств */
      @media (max-width: 768px) {
        .tracker-notes { padding: 0.75em; margin: 0.75em 0; }
        .tracker-notes__trackers { grid-template-columns: 1fr !important; gap: 0.75em; }
        .tracker-notes__tracker { padding: 0.75em; }
        .tracker-notes__header { flex-direction: column; align-items: stretch; }
        .tracker-notes__date-picker { width: 100%; }
        .tracker-notes__date-input { width: 100%; }
        .tracker-notes__row { flex-direction: column; align-items: stretch; gap: 0.5em; }
        .tracker-notes__row > * { width: 100%; }
        .tracker-notes input[type="number"] { width: 100%; }
        .tracker-notes button { width: 100%; }
        .tracker-notes__rating { justify-content: center; }
        .tracker-notes__heatmap-day { min-width: 2.8em; max-width: 3.2em; font-size: 0.9em; }
        .tracker-notes__calendar { gap: 0.2em; }
        .tracker-notes__calendar-day { font-size: 0.7em; }
        .tracker-notes__chart { height: 180px; }
        .tracker-notes__chart canvas { height: 160px !important; }
        .tracker-notes__folder-header.level-0 { font-size: 1.2em; }
        .tracker-notes__folder-header.level-1 { font-size: 1.1em; }
        .tracker-notes__folder-header.level-2 { font-size: 1em; }
      }
      
      @media (max-width: 480px) {
        .tracker-notes { padding: 0.5em; margin: 0.5em 0; }
        .tracker-notes__tracker { padding: 0.5em; }
        .tracker-notes__tracker-title { font-size: 0.9em; }
        .tracker-notes__heatmap-day { min-width: 2.5em; max-width: 3em; font-size: 0.85em; }
        .tracker-notes__calendar-day { font-size: 0.65em; }
        .tracker-notes__chart { height: 160px; }
        .tracker-notes__chart canvas { height: 140px !important; }
        .tracker-notes__folder-header.level-0 { font-size: 1.1em; }
        .tracker-notes__folder-header.level-1 { font-size: 1em; }
        .tracker-notes__folder-header.level-2 { font-size: 0.95em; }
      }
    `;
    document.head.appendChild(styleEl);
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
        // Ищем minValue на верхнем уровне
        const minValueMatch = frontmatter.match(/^minValue:\s*([\d.]+)/m);
        if (minValueMatch) {
          fileOpts.minValue = minValueMatch[1];
        }
        // Ищем maxValue на верхнем уровне
        const maxValueMatch = frontmatter.match(/^maxValue:\s*([\d.]+)/m);
        if (maxValueMatch) {
          fileOpts.maxValue = maxValueMatch[1];
        }
        // Ищем step на верхнем уровне
        const stepMatch = frontmatter.match(/^step:\s*([\d.]+)/m);
        if (stepMatch) {
          fileOpts.step = stepMatch[1];
        }
      } else {
        fileOpts.mode = "good-habit"; // значение по умолчанию, если frontmatter нет
      }
    } catch (error) {
      console.error("Tracker: ошибка чтения frontmatter", error);
      fileOpts.mode = "good-habit"; // значение по умолчанию при ошибке
    }
    return fileOpts;
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
    const fileName = file.basename;
    const displayName = this.settings.hideNumbering 
      ? this.removeNumbering(fileName) 
      : fileName;
    header.createEl("div", { text: displayName, cls: "tracker-notes__tracker-title" });
    
    const controlsContainer = trackerItem.createDiv({ cls: "tracker-notes__controls" });

    if (view === "display") {
      const value = await this.readValueForDate(file, dateIso);
      trackerItem.createEl("div", { text: `${dateIso}: ${value ?? "—"}` });
      
      // Показываем дополнительные визуализации если запрошено
      const daysToShow = parseInt(opts.days) || this.settings.daysToShow;
      const fileOpts = await this.getFileTypeFromFrontmatter(file);
      const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
      
      if (opts.showChart === "true") {
        await this.renderChart(trackerItem, file, dateIso, daysToShow);
      }
      if (opts.showStats === "true") {
        await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
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
    const trackerType = (fileOpts.mode ?? "good-habit").toLowerCase();
    
    if (opts.showChart === "true") {
      await this.renderChart(trackerItem, file, dateIso, daysToShow);
    }
    if (opts.showStats === "true") {
      await this.renderStats(trackerItem, file, dateIso, daysToShow, trackerType);
    }
  }

  async renderControlsForDate(container: HTMLElement, file: TFile, dateIso: string, opts: Record<string, string>) {
    // Очищаем контейнер перед созданием новых элементов
    container.empty();
    
    const mode = (opts.mode ?? "good-habit").toLowerCase();
    
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
      const wrap = container.createDiv({ cls: "tracker-notes__row" });
      const minus = wrap.createEl("button", { text: "−" });
      const valEl = wrap.createEl("span", { text: "0", cls: "tracker-notes__value" });
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
    
    // Сохраняем текущую позицию скролла
    const scrollPosition = heatmapDiv.scrollLeft;
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = heatmapDiv.closest(".tracker-notes__tracker") as HTMLElement;
    const mainContainer = trackerItem?.closest(".tracker-notes") as HTMLElement;
    
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
      if (!trackerItem) return;
      
      // Обновляем только конкретный день в хитмапе, если указан
      if (updatedDateStr && updatedDayDiv) {
        await updateHeatmapDay(updatedDateStr, updatedDayDiv);
        // Всегда обновляем все классы start-day после изменения записи
        await updateAllStartDays();
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
    // Используем двойной requestAnimationFrame для гарантии, что layout завершен
    const performScroll = () => {
      if (scrollPosition > 0) {
        heatmapDiv.scrollLeft = scrollPosition;
      } else {
        const maxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
        if (maxScroll > 0) {
          // Используем scrollTo для более надежного скролла
          heatmapDiv.scrollTo({
            left: heatmapDiv.scrollWidth,
            behavior: 'auto'
          });
        } else {
          // Если размеры еще не вычислены, повторяем попытку
          setTimeout(() => {
            const retryMaxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
            if (retryMaxScroll > 0) {
              heatmapDiv.scrollTo({
                left: heatmapDiv.scrollWidth,
                behavior: 'auto'
              });
            }
          }, 50);
        }
      }
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performScroll();
      });
    });
  }

  async renderTrackerHeatmap(container: HTMLElement, file: TFile, dateIso: string, daysToShow: number, trackerType: string) {
    // Проверяем, существует ли уже хитмап
    const existingHeatmap = container.querySelector(".tracker-notes__heatmap") as HTMLElement;
    let heatmapDiv: HTMLElement;
    
    if (existingHeatmap) {
      // Обновляем существующий хитмап на месте
      heatmapDiv = existingHeatmap;
      await this.updateTrackerHeatmap(heatmapDiv, file, dateIso, daysToShow, trackerType);
      return;
    }

    // Создаем новый хитмап
    heatmapDiv = container.createDiv({ cls: "tracker-notes__heatmap" });
    
    const m = (window as any).moment;
    const endDate = m ? m(dateIso, this.settings.dateFormat) : parseDate(dateIso, this.settings.dateFormat);
    const startDate = m ? m(endDate).subtract(daysToShow - 1, 'days') : addDays(endDate, -(daysToShow - 1));
    
    const entries = await this.readAllEntries(file);
    
    // Получаем дату начала отслеживания
    const startTrackingDateStr = this.getStartTrackingDate(entries, file);
    
    // Находим родительский контейнер для обновления визуализаций
    const trackerItem = container.closest(".tracker-notes__tracker") as HTMLElement;
    const mainContainer = trackerItem?.closest(".tracker-notes") as HTMLElement;
    
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
      if (!trackerItem) return;
      
      // Обновляем только конкретный день в хитмапе, если указан
      if (updatedDateStr && updatedDayDiv) {
        await updateHeatmapDay(updatedDateStr, updatedDayDiv);
        // Всегда обновляем все классы start-day после изменения записи
        await updateAllStartDays();
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
    
    for (let i = 0; i < daysToShow; i++) {
      const date = m ? m(startDate).add(i, 'days') : addDays(startDate, i);
      const dateStr = m ? date.format(this.settings.dateFormat) : formatDate(date, this.settings.dateFormat);
      const dayNum = m ? date.date() : date.getDate();
      
      const dayDiv = heatmapDiv.createDiv({ cls: "tracker-notes__heatmap-day" });
      dayDiv.setText(dayNum.toString());
      dayDiv.addClass(trackerType);
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
    // Используем двойной requestAnimationFrame для гарантии, что layout завершен и размеры вычислены
    const performScroll = () => {
      const maxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
      if (maxScroll > 0) {
        // Используем scrollTo для более надежного скролла
        heatmapDiv.scrollTo({
          left: heatmapDiv.scrollWidth,
          behavior: 'auto'
        });
      } else {
        // Если размеры еще не вычислены, повторяем попытку
        setTimeout(() => {
          const retryMaxScroll = heatmapDiv.scrollWidth - heatmapDiv.clientWidth;
          if (retryMaxScroll > 0) {
            heatmapDiv.scrollTo({
              left: heatmapDiv.scrollWidth,
              behavior: 'auto'
            });
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

  async renderStats(container: HTMLElement, file: TFile, dateIso?: string, daysToShow?: number, trackerType?: string) {
    const statsDiv = container.createDiv({ cls: "tracker-notes__stats" });
    await this.updateStats(statsDiv, file, dateIso, daysToShow, trackerType);
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

  calculateStreak(entries: Map<string, string | number>, m: any, endDate: Date | any, trackerType?: string, file?: TFile): number {
    let streak = 0;
    let currentDate = m ? m(endDate) : new Date(endDate);
    const metricType = (trackerType || "good-habit").toLowerCase();
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
      console.error("Tracker: ошибка чтения всех записей", error);
    }
    
    return entries;
  }

  // ---- Создание привычки ----------------------------------------------------

  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }

  async onTrackerCreated(folderPath: string) {
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
      console.error("Tracker: ошибка чтения значения", error);
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

  // Удаляет нумерацию из начала названия (например, "1. [[Название]]" -> "[[Название]]")
  removeNumbering(name: string): string {
    // Паттерн для поиска: цифра(ы), точка, пробел (опционально), затем текст
    // Поддерживает форматы: "1. [[Название]]", "1.[[Название]]", "123. Название"
    const match = name.match(/^\d+\.\s*(.+)$/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return name;
  }
}

// ---- UI: Settings -----------------------------------------------------------

class TrackerSettingsTab extends PluginSettingTab {
  plugin: TrackerPlugin;
  constructor(app: App, plugin: TrackerPlugin) { super(app, plugin); this.plugin = plugin; }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Папка трекеров")
      .addText(t => t.setPlaceholder("0. Files/Trackers")
        .setValue(this.plugin.settings.trackersFolder)
        .onChange(async (v)=>{ this.plugin.settings.trackersFolder = v.trim(); await this.plugin.saveSettings(); }));

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

    new Setting(containerEl).setName("Скрывать нумерацию трекеров")
      .setDesc("Если включено, убирает нумерацию в начале названий папок и трекеров (например, '1. [[Название]]' → '[[Название]]')")
      .addToggle(t => t
        .setValue(this.plugin.settings.hideNumbering)
        .onChange(async (v) => {
          this.plugin.settings.hideNumbering = v;
          await this.plugin.saveSettings();
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

// --- Modal для создания нового трекера
class CreateTrackerModal extends Modal {
  plugin: TrackerPlugin;
  
  constructor(app: App, plugin: TrackerPlugin) {
    super(app);
    this.plugin = plugin;
  }
  
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Создать новый трекер" });
    
    const nameSetting = new Setting(contentEl)
      .setName("Название")
      .addText(text => {
        text.setPlaceholder("Например: Утренняя зарядка");
        text.inputEl.style.width = "100%";
      });
    
    const typeSetting = new Setting(contentEl)
      .setName("Тип")
      .addDropdown(dropdown => {
        // Привычки
        dropdown.addOption("good-habit", "Хорошая привычка");
        dropdown.addOption("bad-habit", "Плохая привычка");
        // Метрики
        dropdown.addOption("number", "Число");
        dropdown.addOption("plusminus", "Счётчик (+/-)");
        dropdown.addOption("rating", "Оценка (звёзды)");
        dropdown.addOption("text", "Текст");
        dropdown.addOption("checkbox", "Чекбокс");
        dropdown.setValue("good-habit");
      });
    
    // Добавляем optgroup для группировки опций
    const typeDropdown = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdown) {
      // Очищаем существующие опции
      typeDropdown.innerHTML = "";
      
      // Группа "Привычки"
      const habitsGroup = document.createElement("optgroup");
      habitsGroup.label = "Привычки";
      const goodHabitOption = document.createElement("option");
      goodHabitOption.value = "good-habit";
      goodHabitOption.textContent = "Хорошая привычка";
      habitsGroup.appendChild(goodHabitOption);
      const badHabitOption = document.createElement("option");
      badHabitOption.value = "bad-habit";
      badHabitOption.textContent = "Плохая привычка";
      habitsGroup.appendChild(badHabitOption);
      typeDropdown.appendChild(habitsGroup);
      
      // Группа "Метрики"
      const metricsGroup = document.createElement("optgroup");
      metricsGroup.label = "Метрики";
      const numberOption = document.createElement("option");
      numberOption.value = "number";
      numberOption.textContent = "Число";
      metricsGroup.appendChild(numberOption);
      const plusminusOption = document.createElement("option");
      plusminusOption.value = "plusminus";
      plusminusOption.textContent = "Счётчик (+/-)";
      metricsGroup.appendChild(plusminusOption);
      const ratingOption = document.createElement("option");
      ratingOption.value = "rating";
      ratingOption.textContent = "Оценка (звёзды)";
      metricsGroup.appendChild(ratingOption);
      const textOption = document.createElement("option");
      textOption.value = "text";
      textOption.textContent = "Текст";
      metricsGroup.appendChild(textOption);
      const checkboxOption = document.createElement("option");
      checkboxOption.value = "checkbox";
      checkboxOption.textContent = "Чекбокс";
      metricsGroup.appendChild(checkboxOption);
      const scaleOption = document.createElement("option");
      scaleOption.value = "scale";
      scaleOption.textContent = "Шкала";
      metricsGroup.appendChild(scaleOption);
      typeDropdown.appendChild(metricsGroup);
      
      // Устанавливаем значение по умолчанию
      typeDropdown.value = "good-habit";
    }
    
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
    
    const minValueSetting = new Setting(contentEl)
      .setName("Значение \"от\"")
      .addText(text => {
        text.setPlaceholder("0")
          .setValue("0")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const maxValueSetting = new Setting(contentEl)
      .setName("Значение \"до\"")
      .addText(text => {
        text.setPlaceholder("10")
          .setValue("10")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const stepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText(text => {
        text.setPlaceholder("1")
          .setValue("1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });
    
    // Скрываем настройки scale по умолчанию
    minValueSetting.settingEl.style.display = "none";
    maxValueSetting.settingEl.style.display = "none";
    stepSetting.settingEl.style.display = "none";
    
    // Получаем select элемент (если еще не получен выше)
    const typeDropdownSelect = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdownSelect) {
      typeDropdownSelect.onchange = () => {
        if (typeDropdownSelect.value === "rating") {
          maxRatingSetting.settingEl.style.display = "";
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
        } else if (typeDropdownSelect.value === "scale") {
          maxRatingSetting.settingEl.style.display = "none";
          minValueSetting.settingEl.style.display = "";
          maxValueSetting.settingEl.style.display = "";
          stepSetting.settingEl.style.display = "";
        } else {
          maxRatingSetting.settingEl.style.display = "none";
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
        }
      };
    }
    
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
            
            const typeDropdownSelect = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
            const type = typeDropdownSelect ? typeDropdownSelect.value : "good-habit";
            const maxRating = type === "rating" 
              ? (maxRatingSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "5"
              : "5";
            const minValue = type === "scale"
              ? (minValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "0"
              : "0";
            const maxValue = type === "scale"
              ? (maxValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "10"
              : "10";
            const step = type === "scale"
              ? (stepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
              : "1";
            
            const fileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
            const filePath = `${this.plugin.settings.trackersFolder}/${fileName}`;
            
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
              if (type === "scale") {
                newFrontmatter += `minValue: ${parseFloat(minValue) || 0}\n`;
                newFrontmatter += `maxValue: ${parseFloat(maxValue) || 10}\n`;
                newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
              }
              newFrontmatter += `data: {}\n`;
              
              const body = frontmatterMatch 
                ? content.slice(frontmatterMatch[0].length).trim()
                : content.trim();
              
              // Сохраняем структуру: frontmatter с правильным форматированием
              const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ''}`;
              
              await this.app.vault.modify(file, newContent);
              
              new Notice(`Создан трекер: ${name}`);
              
              // Обновляем все открытые блоки tracker для этой папки
              const fileFolderPath = this.plugin.getFolderPathFromFile(file.path);
              setTimeout(async () => {
                await this.plugin.onTrackerCreated(fileFolderPath);
              }, 500);
              
              this.close();
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              new Notice(`Ошибка при создании трекера: ${errorMsg}`);
              console.error("Tracker: ошибка создания трекера", error);
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
    contentEl.createEl("h3", {text: "Выберите трекер"});
    this.files.slice(0,200).forEach(f=>{
      const btn = contentEl.createEl("button", {text: f.path});
      btn.onclick = ()=>{ this.close(); this.onPick(f); };
    });
  }
  onClose() { this.onPick(null); this.contentEl.empty(); }
}
