import type { App } from "obsidian";
import { Modal, Notice, Setting } from "obsidian";
import type TrackerPlugin from "../../core/tracker-plugin";
import { DEFAULT_SETTINGS } from "../../domain/types";
import { FolderSuggest } from "../suggest/folder-suggest";
import { populateTrackerTypeSelector, isMetricType } from "../components/tracker-type-selector";
import { TrackerType, MODAL_LABELS, PLACEHOLDERS, DEFAULTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants";
import { sanitizeFileName } from "../../utils/validation";

export class CreateTrackerModal extends Modal {
  private readonly plugin: TrackerPlugin;

  constructor(app: App, plugin: TrackerPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: MODAL_LABELS.CREATE_TRACKER });

    const nameSetting = new Setting(contentEl).setName(MODAL_LABELS.NAME).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.TRACKER_NAME);
      text.inputEl.style.width = "100%";
    });

    const folders = this.app.vault.getAllFolders();

    const folderSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.PATH)
      .addText((text) => {
        const defaultPath = this.plugin.settings.trackersFolder || DEFAULT_SETTINGS.trackersFolder;
        text.setPlaceholder(defaultPath);
        text.setValue("");
        text.inputEl.style.width = "100%";
        new FolderSuggest(this.app, text.inputEl, folders);
      });

    const typeSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.TYPE)
      .addDropdown((dropdown) => {
        dropdown.setValue(TrackerType.GOOD_HABIT);
      });

    const typeDropdown = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdown) {
      populateTrackerTypeSelector(typeDropdown, TrackerType.GOOD_HABIT);
    }

    const parametersHeader = contentEl.createEl("h3", { text: MODAL_LABELS.PARAMETERS });
    const parametersDescription = contentEl.createEl("p", {
      text: "Единица измерения - не обязательное поле. Можно оставить пустым.",
      cls: "tracker-notes__limits-description",
    });
    parametersDescription.style.fontSize = "0.9em";
    parametersDescription.style.color = "var(--text-muted, #999999)";
    parametersDescription.style.marginTop = "0.5em";
    parametersDescription.style.marginBottom = "1em";

    const unitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.UNIT)
      .addText((text) => {
        text.setPlaceholder(PLACEHOLDERS.UNIT);
        text.inputEl.style.width = "100%";
      });
    const unitInput = unitSetting.controlEl.querySelector("input") as HTMLInputElement;

    const plusminusStepSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.STEP)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.STEP))
          .setValue(String(DEFAULTS.STEP))
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    const minValueSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.VALUE_FROM)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.MIN_VALUE))
          .setValue(String(DEFAULTS.MIN_VALUE))
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const maxValueSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.VALUE_TO)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.MAX_VALUE))
          .setValue(String(DEFAULTS.MAX_VALUE))
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const stepSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.STEP)
      .addText((text) => {
        text
          .setPlaceholder(String(DEFAULTS.STEP))
          .setValue(String(DEFAULTS.STEP))
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    parametersHeader.style.display = "none";
    parametersDescription.style.display = "none";
    unitSetting.settingEl.style.display = "none";
    plusminusStepSetting.settingEl.style.display = "none";
    minValueSetting.settingEl.style.display = "none";
    maxValueSetting.settingEl.style.display = "none";
    stepSetting.settingEl.style.display = "none";

    const limitsHeader = contentEl.createEl("h3", { text: MODAL_LABELS.LIMITS });
    const limitsDescription = contentEl.createEl("p", {
      text: 'Опционально вы можете сделать метрику лимитирующей и задать желаемые пороговые значения. Прим. "Не меньше 5000 шагов в день", "Не больше 3х шоколадок"',
      cls: "tracker-notes__limits-description",
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";

    const minLimitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.LOWER_LIMIT)
      .addText((text) => {
        text
          .setPlaceholder(PLACEHOLDERS.LIMIT_NONE)
          .setValue("")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const maxLimitSetting = new Setting(contentEl)
      .setName(MODAL_LABELS.UPPER_LIMIT)
      .addText((text) => {
        text
          .setPlaceholder(PLACEHOLDERS.LIMIT_NONE)
          .setValue("")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    limitsHeader.style.display = "none";
    limitsDescription.style.display = "none";
    minLimitSetting.settingEl.style.display = "none";
    maxLimitSetting.settingEl.style.display = "none";

    const typeDropdownSelect = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdownSelect) {
      typeDropdownSelect.onchange = () => {
        const isScale = typeDropdownSelect.value === TrackerType.SCALE;
        const isMetric = isMetricType(typeDropdownSelect.value);
        const isPlusminus = typeDropdownSelect.value === TrackerType.PLUSMINUS;
        const isText = typeDropdownSelect.value === TrackerType.TEXT;

        if (isMetric) {
          parametersHeader.style.display = "";
          parametersDescription.style.display = "";
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
          parametersDescription.style.display = "none";
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
    }

    new Setting(contentEl).addButton((button) => {
      button.setButtonText(MODAL_LABELS.CREATE).setCta().onClick(async () => {
        const nameInput = nameSetting.controlEl.querySelector("input") as HTMLInputElement;
        const name = nameInput.value.trim();
        if (!name) {
          new Notice(ERROR_MESSAGES.ENTER_NAME);
          return;
        }

        const typeDropdownSelect = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
        const type = typeDropdownSelect ? typeDropdownSelect.value : TrackerType.GOOD_HABIT;
        const minValue =
          type === TrackerType.SCALE
            ? (minValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || String(DEFAULTS.MIN_VALUE)
            : String(DEFAULTS.MIN_VALUE);
        const maxValue =
          type === TrackerType.SCALE
            ? (maxValueSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || String(DEFAULTS.MAX_VALUE)
            : String(DEFAULTS.MAX_VALUE);
        const step =
          type === TrackerType.SCALE
            ? (stepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || String(DEFAULTS.STEP)
            : type === TrackerType.PLUSMINUS
            ? (plusminusStepSetting.controlEl.querySelector("input") as HTMLInputElement)?.value || String(DEFAULTS.STEP)
            : String(DEFAULTS.STEP);

        const minLimitInput = minLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const maxLimitInput = maxLimitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const minLimit = minLimitInput?.value.trim() || "";
        const maxLimit = maxLimitInput?.value.trim() || "";

        const unitInputValue = unitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const unitRaw = unitInputValue?.value.trim() || "";
        const unit = type === TrackerType.TEXT ? DEFAULTS.TEXT_UNIT : unitRaw;
        const isMetric = isMetricType(type);

        const fileName = sanitizeFileName(name) + ".md";
        const folderInput = folderSetting.controlEl.querySelector("input") as HTMLInputElement;
        let inputFolder = folderInput?.value.trim() || "";
        if (inputFolder === "/ (корневая папка)") {
          inputFolder = "";
        }
        const targetFolder = inputFolder || this.plugin.settings.trackersFolder;
        const filePath = targetFolder ? `${targetFolder}/${fileName}` : fileName;

        try {
          const file = await this.plugin.ensureFileWithHeading(filePath, type);

          const content = await this.app.vault.read(file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

          let newFrontmatter = `type: "${type}"\n`;
          if (type === TrackerType.SCALE) {
            newFrontmatter += `minValue: ${parseFloat(minValue) || DEFAULTS.MIN_VALUE}\n`;
            newFrontmatter += `maxValue: ${parseFloat(maxValue) || DEFAULTS.MAX_VALUE}\n`;
            newFrontmatter += `step: ${parseFloat(step) || DEFAULTS.STEP}\n`;
          } else if (type === TrackerType.PLUSMINUS) {
            newFrontmatter += `step: ${parseFloat(step) || DEFAULTS.STEP}\n`;
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
          newFrontmatter += `data: {}\n`;

          const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length).trim() : content.trim();
          const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ""}`;

          await this.app.vault.modify(file, newContent);

          new Notice(`${SUCCESS_MESSAGES.TRACKER_CREATED}: ${name}`);

          const fileFolderPath = this.plugin.getFolderPathFromFile(file.path);
          await this.plugin.onTrackerCreated(fileFolderPath);

          this.close();
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          new Notice(`${ERROR_MESSAGES.CREATE_ERROR}: ${errorMsg}`);
          console.error("Tracker: ошибка создания трекера", error);
        }
      });
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

