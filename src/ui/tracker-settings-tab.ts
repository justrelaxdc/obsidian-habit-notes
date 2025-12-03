import type { App } from "obsidian";
import { PluginSettingTab, Setting } from "obsidian";
import type TrackerPlugin from "../core/tracker-plugin";
import { FolderSuggest } from "./suggest/folder-suggest";
import { DEBOUNCE_DELAY_MS } from "../constants";
import { trackerStore } from "../store";

export class TrackerSettingsTab extends PluginSettingTab {
  private readonly plugin: TrackerPlugin;
  private folderDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private daysDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(app: App, plugin: TrackerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * Helper to update settings with immediate signal update
   * Signal is updated immediately for reactive UI, then saveSettings persists to disk
   */
  private updateSettingImmediate(updater: () => void): void {
    updater();
    // Update signal immediately for reactive UI (saveSettings also does this, but we want it instant)
    trackerStore.setSettings({ ...this.plugin.settings });
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    const folders = this.app.vault.getAllFolders();

    new Setting(containerEl)
      .setName("Default trackers folder")
      .setDesc("Can be overridden with `folder` parameter in habit block")
      .addText((t) => {
        t.setPlaceholder("0. Files/Trackers")
          .setValue(this.plugin.settings.trackersFolder)
          .onChange((v) => {
            this.updateSettingImmediate(() => {
              this.plugin.settings.trackersFolder = v.trim();
            });
            
            // Debounce saveSettings call for text inputs
            if (this.folderDebounceTimer) {
              clearTimeout(this.folderDebounceTimer);
            }
            this.folderDebounceTimer = setTimeout(async () => {
              await this.plugin.saveSettings();
              this.folderDebounceTimer = null;
            }, DEBOUNCE_DELAY_MS);
          });
        new FolderSuggest(this.app, t.inputEl, folders);
      });

    new Setting(containerEl)
      .setName("Number of days")
      .setDesc("Number of past days displayed for charts and habits. Can be overridden with `days` parameter in tracker/habit block")
      .addText((t) =>
        t
          .setPlaceholder("30")
          .setValue(String(this.plugin.settings.daysToShow))
          .onChange((v) => {
            const num = parseInt(v.trim());
            if (!isNaN(num) && num > 0) {
              this.updateSettingImmediate(() => {
                this.plugin.settings.daysToShow = num;
              });
              
              // Debounce saveSettings call for text inputs
              if (this.daysDebounceTimer) {
                clearTimeout(this.daysDebounceTimer);
              }
              this.daysDebounceTimer = setTimeout(async () => {
                await this.plugin.saveSettings();
                this.daysDebounceTimer = null;
              }, DEBOUNCE_DELAY_MS);
            }
          }),
      );

    new Setting(containerEl)
      .setName("Show chart by default")
      .setDesc("Can be overridden with showChart: `true/false` parameter")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.showChartByDefault)
          .onChange(async (v) => {
            this.plugin.settings.showChartByDefault = v;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Show statistics by default")
      .setDesc("Can be overridden with showStats: `true/false` parameter")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.showStatsByDefault)
          .onChange(async (v) => {
            this.plugin.settings.showStatsByDefault = v;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Hide chart on mobile")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.hideChartOnMobile)
          .onChange(async (v) => {
            this.plugin.settings.hideChartOnMobile = v;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Hide statistics on mobile")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.hideStatsOnMobile)
          .onChange(async (v) => {
            this.plugin.settings.hideStatsOnMobile = v;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Hide tracker title")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.hideTrackerTitle)
          .onChange(async (v) => {
            this.updateSettingImmediate(() => {
              this.plugin.settings.hideTrackerTitle = v;
            });
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Disable color reaction to range compliance")
      .setDesc("Disables color feedback when metric values are within or outside the defined limit range")
      .addToggle((t) =>
        t
          .setValue(this.plugin.settings.disableLimitReaction)
          .onChange(async (v) => {
            this.plugin.settings.disableLimitReaction = v;
            await this.plugin.saveSettings();
          }),
      );
  }
}

