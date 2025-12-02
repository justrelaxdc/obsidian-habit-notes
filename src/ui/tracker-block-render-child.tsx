import {
  MarkdownRenderChild,
  MarkdownPostProcessorContext,
  TFile,
} from "obsidian";
import { render } from "preact";
import type TrackerPlugin from "../core/tracker-plugin";
import { parseOptions } from "../utils/options";
import { DateService } from "../services/date-service";
import { ViewMode, ERROR_MESSAGES } from "../constants";
import { TrackerBlock } from "../components/TrackerBlock";
import type { ViewModeValue } from "../constants";

export class TrackerBlockRenderChild extends MarkdownRenderChild {
  private readonly plugin: TrackerPlugin;
  private readonly source: string;
  private folderPath: string;
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
    // Update folderPath if it's not explicitly set in opts (to reflect settings changes)
    if (!this.opts.folder) {
      this.folderPath = this.plugin.settings.trackersFolder;
    }

    try {
      const folderTree = this.plugin.getFolderTree(this.folderPath);
      
      // Determine view mode
      const viewMode = (this.opts.view ?? ViewMode.CONTROL).toLowerCase() as ViewModeValue;

      // Determine initial date
      let initialDate: string | undefined = this.opts.date;
      if (!initialDate && this.ctx.sourcePath) {
        initialDate = this.extractDateFromNotePath(this.ctx.sourcePath);
      }

      const dateIso = DateService.resolveDateIso(initialDate, this.plugin.settings.dateFormat);

      // Render Preact component - keep stable tree, use events for targeted updates
      render(
        <TrackerBlock
          plugin={this.plugin}
          folderTree={folderTree}
          initialDateIso={dateIso}
          viewMode={viewMode}
          opts={this.opts}
          folderPath={this.folderPath}
        />,
        this.containerEl
      );
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.containerEl.empty();
      this.containerEl.createEl("div", {
        text: `tracker: ${ERROR_MESSAGES.RENDER_ERROR}: ${errorMsg}`,
        cls: "tracker-notes__error",
      });
      console.error("Tracker: error processing block", error);
    }
  }

  /**
   * Extract date from note file path/name
   */
  private extractDateFromNotePath(sourcePath: string): string | undefined {
    try {
      const noteFile = this.plugin.app.vault.getAbstractFileByPath(sourcePath);
      if (!(noteFile instanceof TFile)) return undefined;

      const fileName = noteFile.basename;
      if (!fileName) return undefined;

      // Try various date formats
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
            return DateService.format(parsedDate, this.plugin.settings.dateFormat);
          }
        } catch {
          // Continue to next format
        }
      }

      // Try regex pattern extraction
      const datePattern = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}\.\d{2}\.\d{4})/;
      const match = fileName.match(datePattern);
      if (match) {
        const dateStr = match[0];
        const parsedDate = DateService.parseMultiple(dateStr, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"]);
        if (parsedDate.isValid()) {
          return DateService.format(parsedDate, this.plugin.settings.dateFormat);
        }
      }
    } catch (error) {
      console.error("Tracker: Error reading note filename", error);
    }

    return undefined;
  }

  getFolderPath(): string {
    return this.folderPath;
  }

  getOptions(): Record<string, string> {
    return this.opts;
  }

  onload() {}

  onunload() {
    // Unmount Preact component
    render(null, this.containerEl);
    this.plugin.removeActiveBlock(this);
  }
}
