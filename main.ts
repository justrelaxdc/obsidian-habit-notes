import { App, AbstractInputSuggest, MarkdownRenderChild, MarkdownPostProcessorContext, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

type TrackerSettings = {
  trackersFolder: string;        // папка с заметками трекеров
  dateFormat: string;          // "YYYY-MM-DD"
  daysToShow: number;          // количество дней для отображения графиков
  showChartByDefault: boolean;  // показывать график по умолчанию
  showStatsByDefault: boolean; // показывать статистику по умолчанию
};

const DEFAULT_SETTINGS: TrackerSettings = {
  trackersFolder: "0. Files/Trackers",
  dateFormat: "YYYY-MM-DD",
  daysToShow: 30,
  showChartByDefault: true,
  showStatsByDefault: false,
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
  ctx: MarkdownPostProcessorContext;

  constructor(plugin: TrackerPlugin, source: string, containerEl: HTMLElement, ctx: MarkdownPostProcessorContext) {
    super(containerEl);
    this.plugin = plugin;
    this.source = source;
    this.opts = parseOptions(source);
    this.folderPath = this.opts.folder || plugin.settings.trackersFolder;
    this.ctx = ctx;
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
      
      // Пытаемся получить дату из названия файла (заметки)
      let initialDate: string | undefined = this.opts.date;
      if (!initialDate && this.ctx.sourcePath) {
        try {
          const noteFile = this.plugin.app.vault.getAbstractFileByPath(this.ctx.sourcePath);
          if (noteFile instanceof TFile) {
            // Получаем название файла без расширения
            const fileName = noteFile.basename;
            
            // Пытаемся распарсить дату из названия файла в форматах YYYY-MM-DD, YYYY/MM/DD, DD.MM.YYYY
            // Ищем дату в любом месте названия файла
            if (fileName) {
              const m = (window as any).moment;
              if (m) {
                // Пробуем разные форматы, moment может найти дату в любом месте строки
                const dateFormats = ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY", "YYYY-MM-DD HH:mm", "YYYY/MM/DD HH:mm"];
                for (const fmt of dateFormats) {
                  const parsedDate = m(fileName, fmt, true);
                  if (parsedDate.isValid()) {
                    initialDate = parsedDate.format(this.plugin.settings.dateFormat);
                    break;
                  }
                }
                // Если не нашли точное совпадение, пробуем найти дату в любом месте строки
                if (!initialDate) {
                  // Ищем паттерн даты в строке
                  const datePattern = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}\.\d{2}\.\d{4})/;
                  const match = fileName.match(datePattern);
                  if (match) {
                    const dateStr = match[0];
                    const parsedDate = m(dateStr, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"], true);
                    if (parsedDate.isValid()) {
                      initialDate = parsedDate.format(this.plugin.settings.dateFormat);
                    }
                  }
                }
              } else {
                // Fallback без moment - ищем дату в любом месте строки
                const datePatterns = [
                  /(\d{4})-(\d{2})-(\d{2})/,  // YYYY-MM-DD
                  /(\d{4})\/(\d{2})\/(\d{2})/, // YYYY/MM/DD
                  /(\d{2})\.(\d{2})\.(\d{4})/  // DD.MM.YYYY
                ];
                for (const pattern of datePatterns) {
                  const match = fileName.match(pattern);
                  if (match) {
                    let year: number, month: number, day: number;
                    if (pattern === datePatterns[2]) {
                      // DD.MM.YYYY
                      day = parseInt(match[1]);
                      month = parseInt(match[2]) - 1;
                      year = parseInt(match[3]);
                    } else {
                      // YYYY-MM-DD или YYYY/MM/DD
                      year = parseInt(match[1]);
                      month = parseInt(match[2]) - 1;
                      day = parseInt(match[3]);
                    }
                    const date = new Date(year, month, day);
                    if (!isNaN(date.getTime())) {
                      initialDate = formatDate(date, this.plugin.settings.dateFormat);
                      break;
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          // Если не удалось прочитать название файла, используем значение по умолчанию
          console.error("Tracker: Error reading note filename", error);
        }
      }
      
      let dateIso = resolveDateIso(initialDate, this.plugin.settings.dateFormat);

      // Создаем один общий контейнер для всех трекеров (создаем заранее, чтобы был доступен в updateDate)
      const mainContainer = this.containerEl.createDiv({ cls: "tracker-notes" });

      // Создаем общий header с date picker только для control view (отдельно от трекеров)
      // Вставляем header перед mainContainer, чтобы он отображался первым
      if (view === "control") {
        const blockHeader = this.containerEl.createDiv({ cls: "tracker-notes__header" });
        this.containerEl.insertBefore(blockHeader, mainContainer);
        
        // Красивый заголовок с названием корневой папки
        const headerTitle = blockHeader.createDiv({ cls: "tracker-notes__header-title" });
        const folderName = this.folderPath.split('/').pop() || this.folderPath;
        headerTitle.createEl("span", { text: folderName, cls: "tracker-notes__header-label" });
        
        // Компактный контейнер для date picker
        const datePickerContainer = blockHeader.createDiv({ cls: "tracker-notes__date-picker-container" });
        const datePicker = datePickerContainer.createDiv({ cls: "tracker-notes__date-picker" });
        
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
        
        const navigateDate = async (days: number) => {
          const m = (window as any).moment;
          const currentDateObj = m ? m(dateIso, this.plugin.settings.dateFormat) : parseDate(dateIso, this.plugin.settings.dateFormat);
          const newDate = m ? currentDateObj.clone().add(days, 'days') : addDays(new Date(currentDateObj.getTime()), days);
          const newDateStr = m ? newDate.format(this.plugin.settings.dateFormat) : formatDate(newDate, this.plugin.settings.dateFormat);
          await updateDate(newDateStr);
        };
        
        // Кнопка "Вчера" слева
        const dayBackBtn = datePicker.createEl("button", { text: "◀", cls: "tracker-notes__date-nav-btn tracker-notes__date-nav-btn-left" });
        dayBackBtn.onclick = () => navigateDate(-1);
        dayBackBtn.title = "Вчера";
        
        // Input даты по центру
        const dateInput = datePicker.createEl("input", { 
          type: "date", 
          cls: "tracker-notes__date-input",
          value: dateIso 
        }) as HTMLInputElement;
        dateInput.onchange = () => updateDate(dateInput.value);
        
        // Кнопка "Завтра" справа
        const dayForwardBtn = datePicker.createEl("button", { text: "▶", cls: "tracker-notes__date-nav-btn tracker-notes__date-nav-btn-right" });
        dayForwardBtn.onclick = () => navigateDate(1);
        dayForwardBtn.title = "Завтра";
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
      return this.buildFolderTree(folder, 3, 0);
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
      folderHeader.setText(node.name);
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
      .markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-habit:hover,
      .markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-tracker:hover { box-shadow: none; cursor: default; }
      .tracker-notes { margin: 1em 0; padding: 1em; border-radius: 10px; background: var(--background-secondary); border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); box-sizing: border-box; max-width: 100%; overflow-x: hidden; }
      .tracker-notes__header { display: flex; flex-direction: column; gap: 0.75em; margin: 1em 0; margin-bottom: 0.5em; box-sizing: border-box; align-items: center; }
      .tracker-notes__header-title { display: flex; align-items: center; gap: 0.5em; font-weight: 700; font-size: 1.15em; color: var(--text-normal); }
      .tracker-notes__header-icon { font-size: 1.3em; }
      .tracker-notes__header-label { }
      .tracker-notes__date-picker-container { width: 100%; display: flex; justify-content: center; }
      .tracker-notes__trackers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1em; }
      .tracker-notes__tracker { padding: 1em; border-radius: 8px; background: var(--background-primary); border: 1px solid var(--background-modifier-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s ease; box-sizing: border-box; max-width: 100%; overflow-x: hidden; }
      .tracker-notes__tracker-header { margin-bottom: 0.75em; padding-bottom: 0.5em; border-bottom: 1px solid var(--background-modifier-border); display: flex; align-items: center; justify-content: space-between; gap: 0.5em; }
      .tracker-notes__tracker-title { font-weight: 600; font-size: 1em; color: var(--text-normal); margin: 0; word-wrap: break-word; overflow-wrap: break-word; text-decoration: none !important; flex: 1; }
      .tracker-notes__settings-btn { padding: 0em 0.4em 0.1em 0.4em !important; border: 1px solid var(--background-modifier-border); border-radius: 5px; background: var(--interactive-normal); color: var(--text-normal); cursor: pointer; font-size: 0.9em; transition: all 0.2s ease; white-space: nowrap; flex-shrink: 0; flex-grow: 0; width: auto; min-width: 2em; max-width: 2.5em; height: 2em; display: flex; align-items: center; justify-content: center; opacity: 0.7; }
      .tracker-notes__settings-btn:hover { background: var(--interactive-hover); border-color: var(--interactive-accent); transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); opacity: 1; }
      .tracker-notes__settings-btn:active { transform: scale(0.95) translateY(0); }
      .tracker-notes__row { display: flex; align-items: center; gap: 0.6em; padding: 0.4em 0; flex-wrap: wrap; }
      .tracker-notes__value { min-width: 2.5em; text-align: center; font-weight: 600; font-size: 1em; color: var(--text-normal); transition: transform 0.2s ease; flex-shrink: 0; }
      .tracker-notes__value.updated { animation: pulse 0.3s ease; }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      .tracker-notes input[type="checkbox"] { width: 1.4em; height: 1.4em; cursor: pointer; accent-color: var(--interactive-accent); transition: transform 0.2s ease; flex-shrink: 0; }
      .tracker-notes input[type="checkbox"]:hover { transform: scale(1.1); }
      .tracker-notes input[type="number"] { width: 4.5em; min-width: 4.5em; max-width: 100%; padding: 0.4em 0.6em; border: 1px solid var(--background-modifier-border); border-radius: 5px; color: var(--text-normal); font-size: 0.9em; transition: border-color 0.2s ease; box-sizing: border-box; }
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
      .tracker-notes__date-picker { display: flex; align-items: center; gap: 0.5em; flex-wrap: wrap; justify-content: center; }
      .tracker-notes__date-nav-btn { padding: 0.5em 0.75em; font-size: 1em; min-width: 2.5em; height: 2.5em; border: none; border-radius: var(--input-radius, 5px); background: var(--interactive-normal); color: var(--text-normal); cursor: pointer; transition: all 0.2s ease; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .tracker-notes__date-nav-btn:hover { background: var(--interactive-hover); transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .tracker-notes__date-nav-btn:active { transform: scale(0.95) translateY(0); }
      .tracker-notes__date-input { padding: 0.5em 0.75em; border: none !important; border-radius: var(--input-radius, 5px); background: var(--background-primary); color: var(--text-normal); font-size: 1em !important; transition: all 0.2s ease; height: 2.5em; width: 160px; box-sizing: border-box; font-weight: 600; text-align: center; flex-shrink: 0; }
      .tracker-notes__date-input:focus { outline: none; box-shadow: 0 0 0 2px var(--background-modifier-border-focus, hsla(var(--interactive-accent-hsl), 0.2)); }
      .tracker-notes__date-btn { padding: 0.5em 1em; font-size: 0.9em; white-space: nowrap; flex-shrink: 0; border: 1px solid var(--interactive-accent); border-radius: var(--input-radius, 5px); background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); cursor: pointer; transition: all 0.2s ease; font-weight: 600; height: 2.5em; }
      .tracker-notes__date-btn:hover { background: var(--interactive-accent-hover, var(--interactive-accent)); border-color: var(--interactive-accent-hover, var(--interactive-accent)); transform: translateY(-1px); box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
      .tracker-notes__date-btn:active { transform: scale(0.95) translateY(0); }
      .tracker-notes__error { color: var(--text-on-accent, #ffffff); padding: 0.75em 1em; background: var(--text-error, #d32f2f); border: 1px solid var(--text-error, #d32f2f); border-radius: 5px; margin: 0.5em 0; font-size: 0.9em; font-weight: 600; word-wrap: break-word; overflow-wrap: break-word; line-height: 1.5; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .tracker-notes__success { color: var(--text-success, var(--text-normal)); padding: 0.4em 0.6em; background: var(--background-modifier-success, var(--background-modifier-border)); border-radius: 5px; margin: 0.4em 0; font-size: 0.85em; word-wrap: break-word; overflow-wrap: break-word; }
      .tracker-notes__heatmap { display: flex; gap: 0.3em; overflow-x: auto; scroll-behavior: auto; padding: 0.5em 0; margin-top: 0.5em; min-height: 2.5em; max-width: 100%; box-sizing: border-box; }
      .tracker-notes__heatmap::-webkit-scrollbar { height: 6px; }
      .tracker-notes__heatmap::-webkit-scrollbar-track { background: var(--background-modifier-border); border-radius: 3px; }
      .tracker-notes__heatmap::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 3px; }
      .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { background: var(--text-normal); }
      .tracker-notes__heatmap-day { aspect-ratio: 1; min-width: 2.5em; max-width: 3em; display: flex; align-items: center; justify-content: center; border-radius: 5px; font-size: 0.85em; background: var(--background-modifier-border); color: var(--text-muted); transition: all 0.2s ease; cursor: pointer; font-weight: 500; flex-shrink: 0; }
      .tracker-notes__heatmap-day:hover { box-shadow: 0 2px 4px rgba(0,0,0,0.2); filter: brightness(0.90); }
      .tracker-notes__heatmap-day.has-value.good-habit { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.has-value.bad-habit { background: var(--text-error, var(--background-modifier-error)); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.bad-habit:not(.has-value) { background: var(--interactive-accent); color: var(--text-on-accent, var(--text-normal)); }
      .tracker-notes__heatmap-day.start-day { 
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1;
      }
      .tracker-notes__heatmap-day.start-day::after {
        content: "START";
        font-size: 0.5em;
        line-height: 1;
        margin-top: 0.1em;
        opacity: 0.7;
        font-weight: 600;
      }
      .tracker-notes__calendar-day.start-day { position: relative; box-shadow: 0 0 0 2px var(--text-accent, var(--interactive-accent)) !important; opacity: 0.9; }
      .tracker-notes__stats > div { transition: opacity 0.2s ease; }
      .tracker-notes__calendar-day { transition: background-color 0.2s ease, color 0.2s ease; }
      .tracker-notes__heatmap { transition: opacity 0.15s ease; }
      .tracker-notes__chart { transition: opacity 0.15s ease; }
      .tracker-notes__hierarchy { display: flex; flex-direction: column; gap: 1.5em; }
      .tracker-notes__folder-node { display: flex; flex-direction: column; margin-bottom: 1em; }
      .tracker-notes__folder-node.level-0 { padding-left: 0; margin-bottom: 1.5em; }
      .tracker-notes__folder-node.level-1 { padding-left: 0; margin-top: 1em; margin-bottom: 1.25em; }
      .tracker-notes__folder-node.level-2 { padding-left: 1em; margin-top: 0.75em; margin-bottom: 1em; }
      .tracker-notes__folder-node.level-3 { padding-left: 1em; margin-top: 0.5em; margin-bottom: 0.75em; }
      .tracker-notes__folder-header { font-weight: 700; color: var(--text-normal); margin-bottom: 0.75em; margin-top: 0.5em; padding-bottom: 0.5em; border-bottom: 2px solid var(--background-modifier-border); }
      .tracker-notes__folder-header.level-0 { font-size: 1.4em; margin-top: 0; }
      .tracker-notes__folder-header.level-1 { font-size: 1.35em; margin-top: 0.25em; }
      .tracker-notes__folder-header.level-2 { font-size: 1.15em; margin-top: 0.25em; border-bottom: 1px solid var(--background-modifier-border); }
      .tracker-notes__folder-header.level-3 { font-size: 1em; margin-top: 0.25em; border-bottom: 1px solid var(--background-modifier-border); }
      
      /* Медиа-запросы для мобильных устройств */
      @media (max-width: 768px) {
        .tracker-notes { padding: 0.5em; margin: 0.5em 0; border-radius: 8px; }
        .tracker-notes__header { margin: 0.5em 0; margin-bottom: 0.25em; gap: 0.5em; }
        .tracker-notes__header-title { font-size: 1em; }
        .tracker-notes__trackers { grid-template-columns: 1fr !important; gap: 0.5em; }
        .tracker-notes__tracker { padding: 0.5em; border-radius: 6px; }
        .tracker-notes__tracker-header { margin-bottom: 0.5em; padding-bottom: 0.4em; overflow: hidden; }
        .tracker-notes__tracker-title { font-size: 0.9em; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tracker-notes__settings-btn { flex-shrink: 0; flex-grow: 0; width: 2em; min-width: 2em; max-width: 2em; height: 2em; padding: 0 !important; display: flex; align-items: center; justify-content: center; }
        .tracker-notes__date-picker-container { padding: 0; }
        .tracker-notes__date-picker { gap: 0.3em; flex-wrap: wrap; }
        .tracker-notes__date-nav-btn { padding: 0.4em 0.6em; font-size: 0.9em; min-width: 2em; height: 2.2em; }
        .tracker-notes__date-input { padding: 0.4em 0.6em; font-size: 0.9em !important; height: 2.2em; width: 140px; }
        .tracker-notes__row { gap: 0.4em; padding: 0.3em 0; }
        .tracker-notes__value { font-size: 0.9em; min-width: 2em; }
        .tracker-notes input[type="number"] { width: 100%; padding: 0.3em 0.5em; font-size: 0.85em; }
        .tracker-notes button { padding: 0.3em 0.6em; font-size: 0.85em; width: 100%; }
        .tracker-notes__rating { gap: 0.2em; justify-content: center; }
        .tracker-notes__rating-star { font-size: 1.2em; }
        .tracker-notes__text-input { padding: 0.4em; font-size: 0.85em; min-height: 50px; }
        .tracker-notes__stats { margin-top: 0.5em; margin-bottom: 0.4em; padding-top: 0.5em; padding-bottom: 0.4em; font-size: 0.8em; }
        .tracker-notes__heatmap { gap: 0.2em; padding: 0.4em 0; margin-top: 0.4em; }
        .tracker-notes__heatmap::-webkit-scrollbar { height: 4px !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-track { background: transparent !important; border-radius: 0 !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-thumb { background: var(--text-muted) !important; border-radius: 2px !important; opacity: 0.5 !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { background: var(--text-normal) !important; opacity: 0.8 !important; }
        .tracker-notes__heatmap-day { min-width: 2.5em; max-width: 2.8em; font-size: 0.8em; }
        .tracker-notes__calendar { gap: 0.15em; margin-top: 0.5em; }
        .tracker-notes__calendar-day { font-size: 0.65em; }
        .tracker-notes__chart { margin-top: 0.5em; margin-bottom: 0.4em; padding-top: 0.5em; height: 160px; }
        .tracker-notes__chart canvas { height: 140px !important; }
        .tracker-notes__hierarchy { gap: 1em; }
        .tracker-notes__folder-node { margin-bottom: 0.75em; }
        .tracker-notes__folder-node.level-0 { margin-bottom: 1em; }
        .tracker-notes__folder-node.level-1 { padding-left: 0; margin-top: 0.75em; margin-bottom: 0.75em; }
        .tracker-notes__folder-node.level-2 { padding-left: 0; margin-top: 0.5em; margin-bottom: 0.5em; }
        .tracker-notes__folder-node.level-3 { padding-left: 0; margin-top: 0.4em; margin-bottom: 0.4em; }
        .tracker-notes__folder-header { margin-bottom: 0.5em; margin-top: 0.25em; padding-bottom: 0.4em; }
        .tracker-notes__folder-header.level-0 { font-size: 1.15em; margin-top: 0; }
        .tracker-notes__folder-header.level-1 { font-size: 1.1em; }
        .tracker-notes__folder-header.level-2 { font-size: 0.95em; }
        .tracker-notes__folder-header.level-3 { font-size: 0.9em; }
      }
      
      @media (max-width: 480px) {
        .tracker-notes { padding: 0.4em; margin: 0.4em 0; border-radius: 6px; }
        .tracker-notes__header { margin: 0.4em 0; margin-bottom: 0.2em; gap: 0.4em; }
        .tracker-notes__header-title { font-size: 0.95em; }
        .tracker-notes__trackers { gap: 0.4em; }
        .tracker-notes__tracker { padding: 0.4em; border-radius: 5px; }
        .tracker-notes__tracker-header { margin-bottom: 0.4em; padding-bottom: 0.3em; overflow: hidden; }
        .tracker-notes__tracker-title { font-size: 0.85em; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tracker-notes__settings-btn { flex-shrink: 0; flex-grow: 0; width: 2em; min-width: 2em; max-width: 2em; height: 2em; padding: 0 !important; display: flex; align-items: center; justify-content: center; }
        .tracker-notes__date-picker { gap: 0.25em; }
        .tracker-notes__date-nav-btn { padding: 0.35em 0.5em; font-size: 0.85em; min-width: 1.8em; height: 2em; }
        .tracker-notes__date-input { padding: 0.35em 0.5em; font-size: 0.85em !important; height: 2em; width: 120px; }
        .tracker-notes__row { gap: 0.3em; padding: 0.25em 0; }
        .tracker-notes__value { font-size: 0.85em; min-width: 1.8em; }
        .tracker-notes input[type="number"] { padding: 0.25em 0.4em; font-size: 0.8em; }
        .tracker-notes button { padding: 0.25em 0.5em; font-size: 0.8em; }
        .tracker-notes__rating-star { font-size: 1.1em; }
        .tracker-notes__text-input { padding: 0.35em; font-size: 0.8em; min-height: 45px; }
        .tracker-notes__stats { margin-top: 0.4em; margin-bottom: 0.3em; padding-top: 0.4em; padding-bottom: 0.3em; font-size: 0.75em; }
        .tracker-notes__heatmap { gap: 0.15em; padding: 0.3em 0; margin-top: 0.3em; }
        .tracker-notes__heatmap::-webkit-scrollbar { height: 3px !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-track { background: transparent !important; border-radius: 0 !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-thumb { background: var(--text-muted) !important; border-radius: 2px !important; opacity: 0.5 !important; }
        .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { background: var(--text-normal) !important; opacity: 0.8 !important; }
        .tracker-notes__heatmap-day { min-width: 2.2em; max-width: 2.5em; font-size: 0.75em; }
        .tracker-notes__calendar { gap: 0.1em; margin-top: 0.4em; }
        .tracker-notes__calendar-day { font-size: 0.6em; }
        .tracker-notes__chart { margin-top: 0.4em; margin-bottom: 0.3em; padding-top: 0.4em; height: 140px; }
        .tracker-notes__chart canvas { height: 120px !important; }
        .tracker-notes__hierarchy { gap: 0.75em; }
        .tracker-notes__folder-node { margin-bottom: 0.5em; }
        .tracker-notes__folder-node.level-0 { margin-bottom: 0.75em; }
        .tracker-notes__folder-node.level-1 { margin-top: 0.5em; margin-bottom: 0.5em; }
        .tracker-notes__folder-node.level-2 { margin-top: 0.4em; margin-bottom: 0.4em; }
        .tracker-notes__folder-node.level-3 { margin-top: 0.3em; margin-bottom: 0.3em; }
        .tracker-notes__folder-header { margin-bottom: 0.4em; margin-top: 0.2em; padding-bottom: 0.3em; }
        .tracker-notes__folder-header.level-0 { font-size: 1.05em; }
        .tracker-notes__folder-header.level-1 { font-size: 1em; }
        .tracker-notes__folder-header.level-2 { font-size: 0.9em; }
        .tracker-notes__folder-header.level-3 { font-size: 0.85em; }
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
        // Ищем minLimit на верхнем уровне
        const minLimitMatch = frontmatter.match(/^minLimit:\s*([\d.]+)/m);
        if (minLimitMatch) {
          fileOpts.minLimit = minLimitMatch[1];
        }
        // Ищем maxLimit на верхнем уровне
        const maxLimitMatch = frontmatter.match(/^maxLimit:\s*([\d.]+)/m);
        if (maxLimitMatch) {
          fileOpts.maxLimit = maxLimitMatch[1];
        }
        // Ищем unit на верхнем уровне
        const unitMatch = frontmatter.match(/^unit:\s*["']?([^"'\n]+)["']?/m);
        if (unitMatch && unitMatch[1]) {
          fileOpts.unit = unitMatch[1].trim();
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
    // Получаем единицу измерения для отображения в названии
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    const fileName = file.basename;
    const unit = fileOpts.unit || "";
    const displayName = unit ? `${fileName} (${unit})` : fileName;
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
      const shouldShowChart = opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault);
      const shouldShowStats = opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault);
      
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
    const shouldShowChart = opts.showChart === "true" || (opts.showChart === undefined && this.settings.showChartByDefault);
    const shouldShowStats = opts.showStats === "true" || (opts.showStats === undefined && this.settings.showStatsByDefault);
    
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
}

// ---- UI: Settings -----------------------------------------------------------

class TrackerSettingsTab extends PluginSettingTab {
  plugin: TrackerPlugin;
  constructor(app: App, plugin: TrackerPlugin) { super(app, plugin); this.plugin = plugin; }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Папка трекеров по умолчанию")
      .addText(t => t.setPlaceholder("0. Files/Trackers")
        .setValue(this.plugin.settings.trackersFolder)
        .onChange(async (v)=>{ this.plugin.settings.trackersFolder = v.trim(); await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Показывать график по умолчанию")
      .addToggle(t => t
        .setValue(this.plugin.settings.showChartByDefault)
        .onChange(async (v)=>{ this.plugin.settings.showChartByDefault = v; await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Показывать статистику по умолчанию")
      .addToggle(t => t
        .setValue(this.plugin.settings.showStatsByDefault)
        .onChange(async (v)=>{ this.plugin.settings.showStatsByDefault = v; await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Формат даты")
      .addText(t => t.setPlaceholder("YYYY-MM-DD")
        .setValue(this.plugin.settings.dateFormat)
        .onChange(async (v)=>{ this.plugin.settings.dateFormat = v.trim(); await this.plugin.saveSettings(); }));

    new Setting(containerEl).setName("Количество дней")
      .setDesc("Количество прошедших дней, которое отображается для графиков и привычек")
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
    
    // Получаем список всех папок для автодополнения
    const folders = this.app.vault.getAllFolders();
    
    const folderSetting = new Setting(contentEl)
      .setName("Путь")
      .addText(text => {
        const defaultPath = this.plugin.settings.trackersFolder || DEFAULT_SETTINGS.trackersFolder;
        text.setPlaceholder(defaultPath);
        text.setValue("");
        text.inputEl.style.width = "100%";
        
        // Подключаем нативный компонент подсказок Obsidian
        new FolderSuggest(this.app, text.inputEl, folders);
      });
    
    const typeSetting = new Setting(contentEl)
      .setName("Тип")
      .addDropdown(dropdown => {
        // Привычки
        dropdown.addOption("good-habit", "Хорошая привычка");
        dropdown.addOption("bad-habit", "Плохая привычка");
        // Метрики
        dropdown.addOption("number", "Число");
        dropdown.addOption("scale", "Шкала");
        dropdown.addOption("plusminus", "Счётчик (+/-)");
        dropdown.addOption("text", "Текст");
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
      const scaleOption = document.createElement("option");
      scaleOption.value = "scale";
      scaleOption.textContent = "Шкала";
      metricsGroup.appendChild(scaleOption);
      const plusminusOption = document.createElement("option");
      plusminusOption.value = "plusminus";
      plusminusOption.textContent = "Счётчик (+/-)";
      metricsGroup.appendChild(plusminusOption);
      const textOption = document.createElement("option");
      textOption.value = "text";
      textOption.textContent = "Текст";
      metricsGroup.appendChild(textOption);
      typeDropdown.appendChild(metricsGroup);
      
      // Устанавливаем значение по умолчанию
      typeDropdown.value = "good-habit";
    }
    
    // Заголовок для параметров метрики
    const parametersHeader = contentEl.createEl("h3", { text: "Параметры" });
    const parametersDescription = contentEl.createEl("p", {
      text: "Единица измерения - не обязательное поле. Можно оставить пустым.",
      cls: "tracker-notes__limits-description"
    });
    parametersDescription.style.fontSize = "0.9em";
    parametersDescription.style.color = "var(--text-muted, #999999)";
    parametersDescription.style.marginTop = "0.5em";
    parametersDescription.style.marginBottom = "1em";
    
    // Блок "Единица измерения" для метрик (в начале блока "Параметры")
    const unitSetting = new Setting(contentEl)
      .setName("Единица измерения")
      .addText(text => {
        text.setPlaceholder("Например: метры, минуты, кг");
        text.inputEl.style.width = "100%";
      });
    
    // Поле "Шаг" для счетчика (plusminus)
    const plusminusStepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText(text => {
        text.setPlaceholder("1")
          .setValue("1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });
    
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
    
    // Скрываем настройки по умолчанию
    parametersHeader.style.display = "none";
    parametersDescription.style.display = "none";
    unitSetting.settingEl.style.display = "none";
    plusminusStepSetting.settingEl.style.display = "none";
    minValueSetting.settingEl.style.display = "none";
    maxValueSetting.settingEl.style.display = "none";
    stepSetting.settingEl.style.display = "none";
    
    // Блок "Лимиты успешности" для метрик
    const limitsHeader = contentEl.createEl("h3", { text: "Лимиты успешности" });
    const limitsDescription = contentEl.createEl("p", { 
      text: "Опционально вы можете сделать метрику лимитирующей и задать желаемые пороговые значения. Прим. \"Не меньше 5000 шагов в день\", \"Не больше 3х шоколадок\"",
      cls: "tracker-notes__limits-description"
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";
    
    const minLimitSetting = new Setting(contentEl)
      .setName("Нижняя граница")
      .addText(text => {
        text.setPlaceholder("По умолчанию - нет")
          .setValue("")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const maxLimitSetting = new Setting(contentEl)
      .setName("Верхняя граница")
      .addText(text => {
        text.setPlaceholder("По умолчанию - нет")
          .setValue("")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    // Скрываем блок лимитов по умолчанию
    limitsHeader.style.display = "none";
    limitsDescription.style.display = "none";
    minLimitSetting.settingEl.style.display = "none";
    maxLimitSetting.settingEl.style.display = "none";
    
    // Получаем select элемент (если еще не получен выше)
    const typeDropdownSelect = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdownSelect) {
      typeDropdownSelect.onchange = () => {
        const isScale = typeDropdownSelect.value === "scale";
        const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(typeDropdownSelect.value);
        
        // Управление блоком "Параметры" (для всех метрик)
        const isPlusminus = typeDropdownSelect.value === "plusminus";
        if (isMetric) {
          parametersHeader.style.display = "";
          parametersDescription.style.display = "";
          unitSetting.settingEl.style.display = "";
          // Параметры minValue, maxValue, step только для scale
          if (isScale) {
            minValueSetting.settingEl.style.display = "";
            maxValueSetting.settingEl.style.display = "";
            stepSetting.settingEl.style.display = "";
            plusminusStepSetting.settingEl.style.display = "none";
          } else {
            minValueSetting.settingEl.style.display = "none";
            maxValueSetting.settingEl.style.display = "none";
            stepSetting.settingEl.style.display = "none";
            // Поле "Шаг" только для plusminus
            plusminusStepSetting.settingEl.style.display = isPlusminus ? "" : "none";
          }
        } else {
          parametersHeader.style.display = "none";
          parametersDescription.style.display = "none";
          unitSetting.settingEl.style.display = "none";
          plusminusStepSetting.settingEl.style.display = "none";
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
        }
        
        // Управление блоком "Лимиты успешности" (для всех метрик)
        if (isMetric) {
          limitsHeader.style.display = "";
          limitsDescription.style.display = "";
          minLimitSetting.settingEl.style.display = "";
          maxLimitSetting.settingEl.style.display = "";
        } else {
          limitsHeader.style.display = "none";
          limitsDescription.style.display = "none";
          minLimitSetting.settingEl.style.display = "none";
          maxLimitSetting.settingEl.style.display = "none";
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
            const minValue = type === "scale"
              ? (minValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "0"
              : "0";
            const maxValue = type === "scale"
              ? (maxValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "10"
              : "10";
            const step = type === "scale"
              ? (stepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
              : type === "plusminus"
              ? (plusminusStepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
              : "1";
            
            // Получаем значения лимитов успешности
            const minLimitInput = minLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const maxLimitInput = maxLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const minLimit = minLimitInput?.value.trim() || "";
            const maxLimit = maxLimitInput?.value.trim() || "";
            
            // Получаем единицу измерения
            const unitInput = unitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const unit = unitInput?.value.trim() || "";
            const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(type);
            
            const fileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
            // Получаем значение из поля ввода папки
            const folderInput = folderSetting.controlEl.querySelector("input") as HTMLInputElement;
            let inputFolder = folderInput?.value.trim() || "";
            // Если пользователь ввел "/ (корневая папка)", преобразуем в пустую строку
            if (inputFolder === "/ (корневая папка)") {
              inputFolder = "";
            }
            // Используем введенную папку или папку по умолчанию
            const targetFolder = inputFolder || this.plugin.settings.trackersFolder;
            // Если папка пустая (корневая), путь - просто имя файла
            const filePath = targetFolder ? `${targetFolder}/${fileName}` : fileName;
            
            try {
              const file = await this.plugin.ensureFileWithHeading(filePath, type);
              
              // Обновляем frontmatter с правильным типом и форматом YAML
              const content = await this.app.vault.read(file);
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
              
              // Экранируем кавычки в названии для YAML
              const escapedName = name.replace(/"/g, '\\"');
              // Плоская структура без вложенности
              let newFrontmatter = `name: "${escapedName}"\ntype: "${type}"\n`;
              if (type === "scale") {
                newFrontmatter += `minValue: ${parseFloat(minValue) || 0}\n`;
                newFrontmatter += `maxValue: ${parseFloat(maxValue) || 10}\n`;
                newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
              } else if (type === "plusminus") {
                newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
              }
              // Добавляем лимиты успешности, если они заданы
              if (minLimit) {
                newFrontmatter += `minLimit: ${parseFloat(minLimit)}\n`;
              }
              if (maxLimit) {
                newFrontmatter += `maxLimit: ${parseFloat(maxLimit)}\n`;
              }
              // Добавляем единицу измерения, если она задана и это метрика
              if (unit && isMetric) {
                const escapedUnit = unit.replace(/"/g, '\\"');
                newFrontmatter += `unit: "${escapedUnit}"\n`;
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

class EditTrackerModal extends Modal {
  plugin: TrackerPlugin;
  file: TFile;
  
  constructor(app: App, plugin: TrackerPlugin, file: TFile) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }
  
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Редактировать трекер" });
    
    // Загружаем текущие значения из frontmatter
    const fileOpts = await this.plugin.getFileTypeFromFrontmatter(this.file);
    const currentType = fileOpts.mode || "good-habit";
    const currentName = this.file.basename;
    const currentUnit = fileOpts.unit || "";
    const currentMinValue = fileOpts.minValue || "";
    const currentMaxValue = fileOpts.maxValue || "";
    const currentStep = fileOpts.step || "";
    const currentMinLimit = fileOpts.minLimit || "";
    const currentMaxLimit = fileOpts.maxLimit || "";
    
    const nameSetting = new Setting(contentEl)
      .setName("Название")
      .addText(text => {
        text.setPlaceholder("Например: Утренняя зарядка");
        text.setValue(currentName);
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
        dropdown.addOption("scale", "Шкала");
        dropdown.addOption("plusminus", "Счётчик (+/-)");
        dropdown.addOption("text", "Текст");
        dropdown.setValue(currentType);
        // Запрещаем изменение типа в модальном окне редактирования
        dropdown.selectEl.disabled = true;
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
      const scaleOption = document.createElement("option");
      scaleOption.value = "scale";
      scaleOption.textContent = "Шкала";
      metricsGroup.appendChild(scaleOption);
      const plusminusOption = document.createElement("option");
      plusminusOption.value = "plusminus";
      plusminusOption.textContent = "Счётчик (+/-)";
      metricsGroup.appendChild(plusminusOption);
      const textOption = document.createElement("option");
      textOption.value = "text";
      textOption.textContent = "Текст";
      metricsGroup.appendChild(textOption);
      typeDropdown.appendChild(metricsGroup);
      
      // Устанавливаем текущее значение
      typeDropdown.value = currentType;
      // Запрещаем изменение типа
      typeDropdown.disabled = true;
    }
    
    // Заголовок для параметров метрики
    const parametersHeader = contentEl.createEl("h3", { text: "Параметры" });
    const parametersDescription = contentEl.createEl("p", {
      text: "Единица измерения - не обязательное поле. Можно оставить пустым.",
      cls: "tracker-notes__limits-description"
    });
    parametersDescription.style.fontSize = "0.9em";
    parametersDescription.style.color = "var(--text-muted, #999999)";
    parametersDescription.style.marginTop = "0.5em";
    parametersDescription.style.marginBottom = "1em";
    
    // Блок "Единица измерения" для метрик (в начале блока "Параметры")
    const unitSetting = new Setting(contentEl)
      .setName("Единица измерения")
      .addText(text => {
        text.setPlaceholder("Например: метры, минуты, кг");
        text.setValue(currentUnit);
        text.inputEl.style.width = "100%";
      });
    
    // Поле "Шаг" для счетчика (plusminus)
    const plusminusStepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText(text => {
        text.setPlaceholder("1")
          .setValue(currentStep || "1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });
    
    const minValueSetting = new Setting(contentEl)
      .setName("Значение \"от\"")
      .addText(text => {
        text.setPlaceholder("0")
          .setValue(currentMinValue || "0")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const maxValueSetting = new Setting(contentEl)
      .setName("Значение \"до\"")
      .addText(text => {
        text.setPlaceholder("10")
          .setValue(currentMaxValue || "10")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const stepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText(text => {
        text.setPlaceholder("1")
          .setValue(currentStep || "1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });
    
    // Блок "Лимиты успешности" для метрик
    const limitsHeader = contentEl.createEl("h3", { text: "Лимиты успешности" });
    const limitsDescription = contentEl.createEl("p", { 
      text: "Опционально вы можете сделать метрику лимитирующей и задать желаемые пороговые значения. Прим. \"Не меньше 5000 шагов в день\", \"Не больше 3х шоколадок\"",
      cls: "tracker-notes__limits-description"
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";
    
    const minLimitSetting = new Setting(contentEl)
      .setName("Нижняя граница")
      .addText(text => {
        text.setPlaceholder("По умолчанию - нет")
          .setValue(currentMinLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    const maxLimitSetting = new Setting(contentEl)
      .setName("Верхняя граница")
      .addText(text => {
        text.setPlaceholder("По умолчанию - нет")
          .setValue(currentMaxLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });
    
    // Функция для управления видимостью полей
    const updateFieldsVisibility = () => {
      const isScale = typeDropdown.value === "scale";
      const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(typeDropdown.value);
      const isPlusminus = typeDropdown.value === "plusminus";
      
      // Управление блоком "Параметры" (для всех метрик)
      if (isMetric) {
        parametersHeader.style.display = "";
        parametersDescription.style.display = "";
        unitSetting.settingEl.style.display = "";
        // Параметры minValue, maxValue, step только для scale
        if (isScale) {
          minValueSetting.settingEl.style.display = "";
          maxValueSetting.settingEl.style.display = "";
          stepSetting.settingEl.style.display = "";
          plusminusStepSetting.settingEl.style.display = "none";
        } else {
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
          // Поле "Шаг" только для plusminus
          plusminusStepSetting.settingEl.style.display = isPlusminus ? "" : "none";
        }
      } else {
        parametersHeader.style.display = "none";
        parametersDescription.style.display = "none";
        unitSetting.settingEl.style.display = "none";
        plusminusStepSetting.settingEl.style.display = "none";
        minValueSetting.settingEl.style.display = "none";
        maxValueSetting.settingEl.style.display = "none";
        stepSetting.settingEl.style.display = "none";
      }
      
      // Управление блоком "Лимиты успешности" (для всех метрик)
      if (isMetric) {
        limitsHeader.style.display = "";
        limitsDescription.style.display = "";
        minLimitSetting.settingEl.style.display = "";
        maxLimitSetting.settingEl.style.display = "";
      } else {
        limitsHeader.style.display = "none";
        limitsDescription.style.display = "none";
        minLimitSetting.settingEl.style.display = "none";
        maxLimitSetting.settingEl.style.display = "none";
      }
    };
    
    // Инициализируем видимость полей
    updateFieldsVisibility();
    
    // Обновляем видимость при изменении типа
    if (typeDropdown) {
      typeDropdown.onchange = updateFieldsVisibility;
    }
    
    new Setting(contentEl)
      .addButton(button => {
        button
          .setButtonText("Сохранить")
          .setCta()
          .onClick(async () => {
            const nameInput = nameSetting.controlEl.querySelector("input") as HTMLInputElement;
            const name = nameInput.value.trim();
            if (!name) {
              new Notice("Введите название");
              return;
            }
            
            const type = typeDropdown ? typeDropdown.value : currentType;
            const minValue = type === "scale"
              ? (minValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "0"
              : "0";
            const maxValue = type === "scale"
              ? (maxValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "10"
              : "10";
            const step = type === "scale"
              ? (stepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
              : type === "plusminus"
              ? (plusminusStepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
              : "1";
            
            // Получаем значения лимитов успешности
            const minLimitInput = minLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const maxLimitInput = maxLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const minLimit = minLimitInput?.value.trim() || "";
            const maxLimit = maxLimitInput?.value.trim() || "";
            
            // Получаем единицу измерения
            const unitInput = unitSetting.controlEl.querySelector("input") as HTMLInputElement;
            const unit = unitInput?.value.trim() || "";
            const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(type);
            
            try {
              // Читаем текущий контент файла
              const content = await this.app.vault.read(this.file);
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
              
              // Сохраняем тело файла (все после frontmatter)
              const body = frontmatterMatch 
                ? content.slice(frontmatterMatch[0].length).trim()
                : content.trim();
              
              // Сохраняем существующие данные из frontmatter
              let existingData: Record<string, string | number> = {};
              if (frontmatterMatch) {
                existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
              }
              
              // Экранируем кавычки в названии для YAML
              const escapedName = name.replace(/"/g, '\\"');
              // Плоская структура без вложенности
              let newFrontmatter = `name: "${escapedName}"\ntype: "${type}"\n`;
              if (type === "scale") {
                newFrontmatter += `minValue: ${parseFloat(minValue) || 0}\n`;
                newFrontmatter += `maxValue: ${parseFloat(maxValue) || 10}\n`;
                newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
              } else if (type === "plusminus") {
                newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
              }
              // Добавляем лимиты успешности, если они заданы
              if (minLimit) {
                newFrontmatter += `minLimit: ${parseFloat(minLimit)}\n`;
              }
              if (maxLimit) {
                newFrontmatter += `maxLimit: ${parseFloat(maxLimit)}\n`;
              }
              // Добавляем единицу измерения, если она задана и это метрика
              if (unit && isMetric) {
                const escapedUnit = unit.replace(/"/g, '\\"');
                newFrontmatter += `unit: "${escapedUnit}"\n`;
              }
              // Форматируем данные обратно в YAML
              const dataYaml = this.plugin.formatDataToYaml(existingData);
              newFrontmatter += dataYaml;
              
              // Сохраняем структуру: frontmatter с правильным форматированием
              const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ''}`;
              
              await this.app.vault.modify(this.file, newContent);
              
              // Если название изменилось, переименовываем файл
              if (name !== this.file.basename) {
                const newFileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
                const newPath = this.file.path.replace(this.file.name, newFileName);
                await this.app.vault.rename(this.file, newPath);
              }
              
              new Notice(`Трекер обновлен: ${name}`);
              
              // Обновляем все открытые блоки tracker для этой папки
              const fileFolderPath = this.plugin.getFolderPathFromFile(this.file.path);
              setTimeout(async () => {
                await this.plugin.onTrackerCreated(fileFolderPath);
              }, 500);
              
              this.close();
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              new Notice(`Ошибка при обновлении трекера: ${errorMsg}`);
              console.error("Tracker: ошибка обновления трекера", error);
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

// --- Folder suggest для выбора папки
class FolderSuggest extends AbstractInputSuggest<TFolder> {
  folders: TFolder[];
  
  constructor(app: App, inputEl: HTMLInputElement, folders: TFolder[]) {
    super(app, inputEl);
    this.folders = folders;
  }
  
  getSuggestions(query: string): TFolder[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return this.folders.slice(0, 100);
    }
    
    return this.folders.filter(folder => {
      const path = folder.path || "";
      return path.toLowerCase().includes(normalizedQuery);
    }).slice(0, 100);
  }
  
  renderSuggestion(folder: TFolder, el: HTMLElement): void {
    const path = folder.path || "";
    el.textContent = path || "/ (корневая папка)";
  }
  
  selectSuggestion(folder: TFolder): void {
    const path = folder.path || "";
    this.setValue(path);
    this.close();
  }
}

