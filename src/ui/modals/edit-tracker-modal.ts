import type { App } from "obsidian";
import { TFile } from "obsidian";
import { Modal, Notice, Setting } from "obsidian";
import type TrackerPlugin from "../../core/tracker-plugin";
import { MODAL_LABELS, ERROR_MESSAGES, SUCCESS_MESSAGES, TRACKER_TYPE_LABELS, PLACEHOLDERS, DEFAULTS } from "../../constants";
import { DateService } from "../../services/date-service";
import { logError } from "../../utils/notifications";

export class EditTrackerModal extends Modal {
  private readonly plugin: TrackerPlugin;
  private readonly file: TFile;

  constructor(app: App, plugin: TrackerPlugin, file: TFile) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: MODAL_LABELS.EDIT_TRACKER });

    const fileOpts = await this.plugin.getFileTypeFromFrontmatter(this.file);
    const currentType = fileOpts.mode || "good-habit";
    const currentName = this.file.basename;
    const currentUnit = fileOpts.unit || "";
    const currentMinValue = fileOpts.minValue || "";
    const currentMaxValue = fileOpts.maxValue || "";
    const currentStep = fileOpts.step || "";
    const currentMinLimit = fileOpts.minLimit || "";
    const currentMaxLimit = fileOpts.maxLimit || "";
    const currentStartDate = fileOpts.trackingStartDate || new Date().toISOString().split('T')[0];

    const nameSetting = new Setting(contentEl).setName(MODAL_LABELS.NAME).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.TRACKER_NAME);
      text.setValue(currentName);
      text.inputEl.style.width = "100%";
    });

    const typeSetting = new Setting(contentEl).setName(MODAL_LABELS.TYPE).addDropdown((dropdown) => {
      dropdown.addOption("good-habit", TRACKER_TYPE_LABELS["good-habit"]);
      dropdown.addOption("bad-habit", TRACKER_TYPE_LABELS["bad-habit"]);
      dropdown.addOption("number", TRACKER_TYPE_LABELS["number"]);
      dropdown.addOption("scale", TRACKER_TYPE_LABELS["scale"]);
      dropdown.addOption("plusminus", TRACKER_TYPE_LABELS["plusminus"]);
      dropdown.addOption("text", TRACKER_TYPE_LABELS["text"]);
      dropdown.setValue(currentType);
      dropdown.selectEl.disabled = true;
    });

    const typeDropdown = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdown) {
      typeDropdown.innerHTML = "";

      const habitsGroup = document.createElement("optgroup");
      habitsGroup.label = MODAL_LABELS.HABITS_GROUP;
      const goodHabitOption = document.createElement("option");
      goodHabitOption.value = "good-habit";
      goodHabitOption.textContent = TRACKER_TYPE_LABELS["good-habit"];
      habitsGroup.appendChild(goodHabitOption);
      const badHabitOption = document.createElement("option");
      badHabitOption.value = "bad-habit";
      badHabitOption.textContent = TRACKER_TYPE_LABELS["bad-habit"];
      habitsGroup.appendChild(badHabitOption);
      typeDropdown.appendChild(habitsGroup);

      const metricsGroup = document.createElement("optgroup");
      metricsGroup.label = MODAL_LABELS.METRICS_GROUP;
      const numberOption = document.createElement("option");
      numberOption.value = "number";
      numberOption.textContent = TRACKER_TYPE_LABELS["number"];
      metricsGroup.appendChild(numberOption);
      const scaleOption = document.createElement("option");
      scaleOption.value = "scale";
      scaleOption.textContent = TRACKER_TYPE_LABELS["scale"];
      metricsGroup.appendChild(scaleOption);
      const plusminusOption = document.createElement("option");
      plusminusOption.value = "plusminus";
      plusminusOption.textContent = TRACKER_TYPE_LABELS["plusminus"];
      metricsGroup.appendChild(plusminusOption);
      const textOption = document.createElement("option");
      textOption.value = "text";
      textOption.textContent = TRACKER_TYPE_LABELS["text"];
      metricsGroup.appendChild(textOption);
      typeDropdown.appendChild(metricsGroup);

      typeDropdown.value = currentType;
      typeDropdown.disabled = true;
    }

    const startDateSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.START_DATE)
      .addText((text) => {
        text.setValue(currentStartDate);
        text.inputEl.type = "date";
        text.inputEl.style.width = "100%";
      });

    // Warning element about data before new date
    const warningEl = contentEl.createDiv({
      cls: "tracker-notes__start-date-warning",
      attr: { style: "display: none; margin-top: 0.5em; padding: 0.75em; background: var(--background-modifier-error); color: #fff; border-radius: 4px; font-size: 0.9em;" }
    });

    // Date change handler for data validation
    const startDateInput = startDateSetting.controlEl.querySelector("input") as HTMLInputElement;
    if (startDateInput) {
      startDateInput.addEventListener("input", async () => {
        const newStartDate = startDateInput.value;
        if (!newStartDate || newStartDate === currentStartDate) {
          warningEl.style.display = "none";
          return;
        }

        try {
          // Load data from file
          const content = await this.app.vault.read(this.file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          
          let existingData: Record<string, string | number> = {};
          if (frontmatterMatch) {
            existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
          }

          // Check for data before new date
          const newStartDateObj = DateService.parse(newStartDate, 'YYYY-MM-DD');
          let datesToDeleteCount = 0;
          
          for (const [dateStr] of Object.entries(existingData)) {
            try {
              const dataDateObj = DateService.parseMultiple(dateStr, [
                this.plugin.settings.dateFormat,
                'YYYY-MM-DD',
                'DD.MM.YYYY',
                'MM/DD/YYYY'
              ]);
              
              if (DateService.isBefore(dataDateObj, newStartDateObj)) {
                datesToDeleteCount++;
              }
            } catch (e) {
              // If date parsing failed, skip
            }
          }
          
          // Show or hide warning
          if (datesToDeleteCount > 0) {
            const formattedDate = DateService.format(newStartDateObj, this.plugin.settings.dateFormat);
            const recordsText = datesToDeleteCount === 1 ? MODAL_LABELS.RECORD_SINGULAR : MODAL_LABELS.RECORDS_PLURAL;
            warningEl.textContent = MODAL_LABELS.WARNING_RECORDS_BEFORE_DATE
              .replace('{count}', String(datesToDeleteCount))
              .replace('{records}', recordsText)
              .replace('{date}', formattedDate);
            warningEl.style.display = "block";
          } else {
            warningEl.style.display = "none";
          }
        } catch (error) {
          logError("Tracker: error checking data", error);
          warningEl.style.display = "none";
        }
      });
    }

    const parametersHeader = contentEl.createEl("h3", { text: MODAL_LABELS.PARAMETERS });

    const unitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.UNIT)
      .addText((text) => {
        const unitValue = currentType === "text" ? DEFAULTS.TEXT_UNIT : currentUnit;
        text.setPlaceholder(PLACEHOLDERS.UNIT);
        text.setValue(unitValue);
        text.inputEl.style.width = "100%";
        if (currentType === "text") {
          text.inputEl.disabled = true;
        }
      });
    const unitInput = unitSetting.controlEl.querySelector("input") as HTMLInputElement;

    const plusminusStepSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.STEP)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.STEP))
          .setValue(currentStep || String(DEFAULTS.STEP))
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    const minValueSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.VALUE_FROM)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.MIN_VALUE))
          .setValue(currentMinValue || String(DEFAULTS.MIN_VALUE))
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const maxValueSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.VALUE_TO)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.MAX_VALUE))
          .setValue(currentMaxValue || String(DEFAULTS.MAX_VALUE))
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const stepSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.STEP)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.STEP))
          .setValue(currentStep || String(DEFAULTS.STEP))
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    const limitsHeader = contentEl.createEl("h3", { text: MODAL_LABELS.LIMITS });
    const limitsDescription = contentEl.createEl("p", {
      text: MODAL_LABELS.LIMITS_DESCRIPTION,
      cls: "tracker-notes__limits-description",
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";

    const maxLimitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.UPPER_LIMIT)
      .addText((text) => {
        text
          .setPlaceholder(PLACEHOLDERS.LIMIT_NONE)
          .setValue(currentMaxLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const minLimitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.LOWER_LIMIT)
      .addText((text) => {
        text
          .setPlaceholder(PLACEHOLDERS.LIMIT_NONE)
          .setValue(currentMinLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const updateFieldsVisibility = () => {
      const isScale = typeDropdown.value === "scale";
      const isMetric = ["number", "plusminus", "text", "scale"].includes(typeDropdown.value);
      const isPlusminus = typeDropdown.value === "plusminus";
      const isText = typeDropdown.value === "text";

      if (isMetric) {
        parametersHeader.style.display = "";
        unitSetting.settingEl.style.display = "";
        if (isText) {
          if (unitInput) {
            unitInput.value = DEFAULTS.TEXT_UNIT;
            unitInput.disabled = true;
          }
        } else if (unitInput) {
          unitInput.disabled = false;
        }
        if (isScale) {
          minValueSetting.settingEl.style.display = "";
          maxValueSetting.settingEl.style.display = "";
          stepSetting.settingEl.style.display = "";
          plusminusStepSetting.settingEl.style.display = "none";
        } else {
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
          plusminusStepSetting.settingEl.style.display = isPlusminus ? "" : "none";
        }
      } else {
        parametersHeader.style.display = "none";
        unitSetting.settingEl.style.display = "none";
        plusminusStepSetting.settingEl.style.display = "none";
        minValueSetting.settingEl.style.display = "none";
        maxValueSetting.settingEl.style.display = "none";
        stepSetting.settingEl.style.display = "none";
      }

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

    updateFieldsVisibility();
    if (typeDropdown) {
      typeDropdown.onchange = updateFieldsVisibility;
    }

    // Create container for buttons on edges
    const buttonsWrapper = contentEl.createDiv({ cls: "tracker-modal-buttons" });
    
    // Delete button (left)
    const deleteBtn = buttonsWrapper.createEl("button", { 
      text: MODAL_LABELS.DELETE,
      cls: "mod-warning"
    });
    deleteBtn.addEventListener("click", async () => {
      try {
        // Save file path before deletion
        const filePath = this.file.path;
        const fileName = this.file.basename;
        
        // Remove tracker from UI dynamically BEFORE file deletion
        await this.plugin.onTrackerDeleted(filePath);
        
        // Delete file
        await this.app.vault.delete(this.file);
        
        new Notice(`${SUCCESS_MESSAGES.TRACKER_DELETED}: ${fileName}`);
        
        this.close();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
        logError("Tracker: error deleting tracker", error);
      }
    });
    
    // Save button (right)
    const saveBtn = buttonsWrapper.createEl("button", { 
      text: MODAL_LABELS.SAVE,
      cls: "mod-cta"
    });
    saveBtn.addEventListener("click", async () => {
        const nameInput = nameSetting.controlEl.querySelector("input") as HTMLInputElement;
        const name = nameInput.value.trim();
        if (!name) {
          new Notice(ERROR_MESSAGES.ENTER_NAME);
          return;
        }

        const type = typeDropdown ? typeDropdown.value : currentType;
        const minValue =
          type === "scale"
            ? (minValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "0"
            : "0";
        const maxValue =
          type === "scale"
            ? (maxValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "10"
            : "10";
        const step =
          type === "scale"
            ? (stepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
            : type === "plusminus"
            ? (plusminusStepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || "1"
            : "1";

        const minLimitInput = minLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const maxLimitInput = maxLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const minLimit = minLimitInput?.value.trim() || "";
        const maxLimit = maxLimitInput?.value.trim() || "";

        // Validation: upper limit must be greater than lower limit
        if (minLimit && maxLimit) {
          const minLimitNum = parseFloat(minLimit);
          const maxLimitNum = parseFloat(maxLimit);
          if (!isNaN(minLimitNum) && !isNaN(maxLimitNum) && maxLimitNum <= minLimitNum) {
            new Notice(MODAL_LABELS.UPPER_LIMIT_MUST_BE_GREATER);
            return;
          }
        }

        const unitInputValue = unitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const unitRaw = unitInputValue?.value.trim() || "";
        const unit = type === "text" ? DEFAULTS.TEXT_UNIT : unitRaw;
        const isMetric = ["number", "plusminus", "text", "scale"].includes(type);

        const startDateInput = startDateSetting.controlEl.querySelector("input") as HTMLInputElement;
        const startDate = startDateInput?.value || currentStartDate;

        try {
          const content = await this.app.vault.read(this.file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

          const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length).trim() : content.trim();

          let existingData: Record<string, string | number> = {};
          if (frontmatterMatch) {
            existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
          }

          // Delete data before new tracking start date if date changed
          if (startDate !== currentStartDate) {
            const newStartDateObj = DateService.parse(startDate, 'YYYY-MM-DD');
            const datesToDelete: string[] = [];
            
            // Find all dates before new tracking start date
            for (const [dateStr] of Object.entries(existingData)) {
              try {
                const dataDateObj = DateService.parseMultiple(dateStr, [
                  this.plugin.settings.dateFormat,
                  'YYYY-MM-DD',
                  'DD.MM.YYYY',
                  'MM/DD/YYYY'
                ]);
                
                if (DateService.isBefore(dataDateObj, newStartDateObj)) {
                  datesToDelete.push(dateStr);
                }
              } catch (e) {
                // If date parsing failed, skip
              }
            }
            
            // Delete data before new date
            for (const dateStr of datesToDelete) {
              delete existingData[dateStr];
            }
          }

          let newFrontmatter = `type: "${type}"\n`;
          newFrontmatter += `trackingStartDate: "${startDate}"\n`;
          if (type === "scale") {
            newFrontmatter += `minValue: ${parseFloat(minValue) || 0}\n`;
            newFrontmatter += `maxValue: ${parseFloat(maxValue) || 10}\n`;
            newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
          } else if (type === "plusminus") {
            newFrontmatter += `step: ${parseFloat(step) || 1}\n`;
          }
          if (minLimit) {
            newFrontmatter += `minLimit: ${parseFloat(minLimit)}\n`;
          }
          if (maxLimit) {
            newFrontmatter += `maxLimit: ${parseFloat(maxLimit)}\n`;
          }
          if (unit && isMetric) {
            const escapedUnit = unit.replace(/"/g, '\\"');
            newFrontmatter += `unit: "${escapedUnit}"\n`;
          }
          const dataJson = this.plugin.formatDataToJson(existingData);
          newFrontmatter += dataJson;

          const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ""}`;

          try {
            // Save old path BEFORE file modification
            const oldPath = this.file.path;
            const oldBasename = this.file.basename;
            
            // Modify content
            await this.app.vault.modify(this.file, newContent);

            let updatedFile: TFile = this.file;
            
            // Rename if needed
            if (name !== oldBasename) {
              try {
                const newFileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
                
                // More reliable way to form path: get directory and combine with new name
                const folderPath = this.file.parent?.path || "";
                const newPath = folderPath ? `${folderPath}/${newFileName}` : newFileName;
                
                const renamedFile = await this.app.vault.rename(this.file, newPath);
                
                // Check rename success by file path change, regardless of rename return value (void/null/updated TFile)
                const fileToCheck = this.file;
                if (fileToCheck.path !== oldPath) {
                  // Path changed - rename successful
                  updatedFile = fileToCheck;
                  this.plugin.handleTrackerRenamed(oldPath, updatedFile);
                }
              } catch (renameError) {
                // If rename threw exception, log and use original file
                const errorMsg = renameError instanceof Error ? renameError.message : String(renameError);
                logError("Tracker: error renaming file", renameError);
                // Continue with original file
              }
            }

            new Notice(`${SUCCESS_MESSAGES.TRACKER_UPDATED}: ${name}`);
            
            // Invalidate cache for file so new frontmatter data is read
            this.plugin.invalidateCacheForFile(updatedFile);
            
            // Update tracker visualizations with new file
            // If file was renamed, update dataset.filePath for all trackers
            if (oldPath !== updatedFile.path) {
              // Find all trackers with old path and update them
              for (const block of Array.from(this.plugin.activeBlocks)) {
                const trackers = block.containerEl.querySelectorAll<HTMLElement>(
                  `.tracker-notes__tracker[data-file-path="${oldPath}"]`
                );
                trackers.forEach(tracker => {
                  tracker.dataset.filePath = updatedFile.path;
                });
              }
            }
            
            await this.plugin.refreshTrackersForFile(updatedFile);
            
            this.close();
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            new Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
            logError("Tracker: error updating tracker", error);
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          new Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
          console.error("Tracker: error updating tracker", error);
        }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

