import {
  MarkdownRenderChild,
  MarkdownPostProcessorContext,
  TFile,
} from "obsidian";
import type TrackerPlugin from "../core/tracker-plugin";
import type { FolderNode } from "../domain/types";
import { parseOptions } from "../utils/options";
import { resolveDateIso } from "../utils/date";
import { DateService } from "../services/date-service";
import { normalizePath } from "../utils/path";

export class TrackerBlockRenderChild extends MarkdownRenderChild {
  private readonly plugin: TrackerPlugin;
  private readonly source: string;
  private readonly folderPath: string;
  private readonly opts: Record<string, string>;
  private readonly ctx: MarkdownPostProcessorContext;

  constructor(
    plugin: TrackerPlugin,
    source: string,
    containerEl: HTMLElement,
    ctx: MarkdownPostProcessorContext,
  ) {
    super(containerEl);
    this.plugin = plugin;
    this.source = source;
    this.opts = parseOptions(source);
    this.folderPath = this.opts.folder || plugin.settings.trackersFolder;
    this.ctx = ctx;
  }

  async render() {
    // Создаем временный контейнер для off-screen рендеринга
    const tempContainer = document.createElement('div');
    tempContainer.className = this.containerEl.className;

    try {
      const folderTree = this.plugin.getFolderTree(this.folderPath);
      if (!folderTree || (folderTree.files.length === 0 && folderTree.children.length === 0)) {
        tempContainer.createEl("div", {
          text: `tracker: в папке ${this.folderPath} не найдено трекеров`,
          cls: "tracker-notes__error",
        });
        // Атомарная замена содержимого
        this.containerEl.empty();
        this.containerEl.appendChild(tempContainer);
        return;
      }

      const view = (this.opts.view ?? "control").toLowerCase();

      let initialDate: string | undefined = this.opts.date;
      if (!initialDate && this.ctx.sourcePath) {
        try {
          const noteFile = this.plugin.app.vault.getAbstractFileByPath(this.ctx.sourcePath);
          if (noteFile instanceof TFile) {
            const fileName = noteFile.basename;
            if (fileName) {
              const dateFormats = [
                "YYYY-MM-DD",
                "YYYY/MM/DD",
                "DD.MM.YYYY",
                "YYYY-MM-DD HH:mm",
                "YYYY/MM/DD HH:mm",
              ];
              for (const fmt of dateFormats) {
                try {
                  const parsedDate = DateService.parse(fileName, fmt);
                  if (parsedDate.isValid()) {
                    initialDate = DateService.format(parsedDate, this.plugin.settings.dateFormat);
                    break;
                  }
                } catch {
                  // Continue to next format
                }
              }
              if (!initialDate) {
                const datePattern = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}\.\d{2}\.\d{4})/;
                const match = fileName.match(datePattern);
                if (match) {
                  const dateStr = match[0];
                  const parsedDate = DateService.parseMultiple(dateStr, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"]);
                  if (parsedDate.isValid()) {
                    initialDate = DateService.format(parsedDate, this.plugin.settings.dateFormat);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Tracker: Error reading note filename", error);
        }
      }

      let dateIso = resolveDateIso(initialDate, this.plugin.settings.dateFormat);
      let pendingDateIso: string | null = null;
      let isProcessingDateUpdate = false;

      const mainContainer = tempContainer.createDiv({ cls: "tracker-notes" });

      const trackerDateUpdate = async (targetIso: string) => {
        dateIso = targetIso;
        const trackerItems = Array.from(
          mainContainer.querySelectorAll<HTMLElement>(".tracker-notes__tracker"),
        );
        const updatePromises = trackerItems.map(async (trackerItem) => {
          const filePath = trackerItem.dataset.filePath;
          if (!filePath) return;
          const file = this.plugin.app.vault.getAbstractFileByPath(filePath);
          if (file instanceof TFile) {
            await this.plugin.updateTrackerDate(trackerItem, file, targetIso, this.opts);
          }
        });
        await Promise.allSettled(updatePromises);
      };

      let dateInput: HTMLInputElement | null = null;
      const dateNavButtons: HTMLButtonElement[] = [];
      let loadingIndicator: HTMLElement | null = null;

      const setDateUpdatingState = (updating: boolean) => {
        if (loadingIndicator) {
          loadingIndicator.toggleClass("is-active", updating);
        }
        dateInput?.classList.toggle("is-updating", updating);
        if (dateInput) {
          dateInput.disabled = updating;
        }
        for (const btn of dateNavButtons) {
          btn.disabled = updating;
        }
      };

      const processNextDateUpdate = async () => {
        if (isProcessingDateUpdate || !pendingDateIso) return;
        isProcessingDateUpdate = true;
        const targetIso = pendingDateIso;
        pendingDateIso = null;
        setDateUpdatingState(true);
        try {
          await trackerDateUpdate(targetIso);
        } finally {
          setDateUpdatingState(false);
          isProcessingDateUpdate = false;
          if (pendingDateIso) {
            void processNextDateUpdate();
          }
        }
      };

      const requestDateUpdate = (newDate: string) => {
        const newDateIso = resolveDateIso(newDate, this.plugin.settings.dateFormat);
        pendingDateIso = newDateIso;
        if (dateInput) {
          dateInput.value = newDateIso;
        }
        void processNextDateUpdate();
      };

      const navigateDate = (days: number) => {
        const referenceIso = pendingDateIso ?? dateIso;
        const currentDateObj = DateService.parse(referenceIso, this.plugin.settings.dateFormat);
        const newDate = currentDateObj.clone().add(days, "days");
        const newDateStr = DateService.format(newDate, this.plugin.settings.dateFormat);
        requestDateUpdate(newDateStr);
      };

      if (view === "control") {
        const blockHeader = tempContainer.createDiv({ cls: "tracker-notes__header" });
        tempContainer.insertBefore(blockHeader, mainContainer);

        const headerTitle = blockHeader.createDiv({ cls: "tracker-notes__header-title" });
        const folderName = this.folderPath.split("/").pop() || this.folderPath;
        headerTitle.createEl("span", { text: folderName, cls: "tracker-notes__header-label" });

        const datePickerContainer = blockHeader.createDiv({
          cls: "tracker-notes__date-picker-container",
        });
        const datePicker = datePickerContainer.createDiv({ cls: "tracker-notes__date-picker" });

        const dayBackBtn = datePicker.createEl("button", {
          text: "◀",
          cls: "tracker-notes__date-nav-btn tracker-notes__date-nav-btn-left",
        }) as HTMLButtonElement;
        dayBackBtn.onclick = () => navigateDate(-1);
        dayBackBtn.title = "Вчера";
        dateNavButtons.push(dayBackBtn);

        dateInput = datePicker.createEl("input", {
          type: "date",
          cls: "tracker-notes__date-input",
          value: dateIso,
        }) as HTMLInputElement;
        dateInput.onchange = () => requestDateUpdate(dateInput!.value);

        const dayForwardBtn = datePicker.createEl("button", {
          text: "▶",
          cls: "tracker-notes__date-nav-btn tracker-notes__date-nav-btn-right",
        }) as HTMLButtonElement;
        dayForwardBtn.onclick = () => navigateDate(1);
        dayForwardBtn.title = "Завтра";
        dateNavButtons.push(dayForwardBtn);

        loadingIndicator = blockHeader.createDiv({ cls: "tracker-notes__loading" });
        loadingIndicator.createDiv({ cls: "tracker-notes__loading-dot" });
        loadingIndicator.createEl("span", { text: "Обновление…" });
      }

      const trackersContainer = mainContainer.createDiv({ cls: "tracker-notes__hierarchy" });
      await this.renderFolderNode(folderTree, trackersContainer, dateIso, view, this.opts);
      
      // Атомарная замена: весь контент готов, заменяем за одну операцию
      this.containerEl.empty();
      while (tempContainer.firstChild) {
        this.containerEl.appendChild(tempContainer.firstChild);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      tempContainer.createEl("div", {
        text: `tracker: ошибка при обработке блока: ${errorMsg}`,
        cls: "tracker-notes__error",
      });
      // Атомарная замена даже при ошибке
      this.containerEl.empty();
      while (tempContainer.firstChild) {
        this.containerEl.appendChild(tempContainer.firstChild);
      }
      console.error("Tracker: ошибка обработки блока", error);
    }
  }

  private async renderFolderNode(
    node: FolderNode,
    parentEl: HTMLElement,
    dateIso: string,
    view: string,
    opts: Record<string, string>,
  ): Promise<void> {
    // Создаем контейнер узла
    const nodeContainer = document.createElement("div");
    nodeContainer.addClass("tracker-notes__folder-node");
    nodeContainer.addClass(`level-${node.level}`);

    const shouldShowHeader =
      node.files.length > 0 || (node.level > 0 && node.children.length > 0);

    if (shouldShowHeader) {
      const folderHeader = nodeContainer.createDiv({
        cls: `tracker-notes__folder-header level-${node.level}`,
      });
      folderHeader.setText(node.name);
    }

    if (node.files.length > 0) {
      const trackersContainer = nodeContainer.createDiv({ cls: "tracker-notes__trackers" });
      trackersContainer.dataset.folderPath = normalizePath(node.path);

      // Рендерим все трекеры параллельно
      const renderPromises = node.files.map(async (file) => {
        try {
          await this.plugin.readAllEntries(file);
          await this.plugin.trackerRenderer.renderTracker(trackersContainer, file, dateIso, view, opts);
        } catch (error) {
          console.error("Tracker: ошибка рендера трекера", error);
        }
      });
      await Promise.all(renderPromises);
    }

    // Рекурсивно рендерим дочерние узлы
    for (const childNode of node.children) {
      await this.renderFolderNode(childNode, nodeContainer, dateIso, view, opts);
    }
    
    // Добавляем готовый узел в родитель одной операцией
    parentEl.appendChild(nodeContainer);
  }

  getFolderPath(): string {
    return this.folderPath;
  }

  getOptions(): Record<string, string> {
    return this.opts;
  }

  onload() {}

  onunload() {
    this.plugin.removeActiveBlock(this);
  }
}

