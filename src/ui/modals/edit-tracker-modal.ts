import type { App, TFile } from "obsidian";
import { Modal, Notice, Setting } from "obsidian";
import type TrackerPlugin from "../../core/tracker-plugin";
import { MODAL_LABELS, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants";

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
    contentEl.createEl("h2", { text: "Редактировать трекер" });

    const fileOpts = await this.plugin.getFileTypeFromFrontmatter(this.file);
    const currentType = fileOpts.mode || "good-habit";
    const currentName = this.file.basename;
    const currentUnit = fileOpts.unit || "";
    const currentMinValue = fileOpts.minValue || "";
    const currentMaxValue = fileOpts.maxValue || "";
    const currentStep = fileOpts.step || "";
    const currentMinLimit = fileOpts.minLimit || "";
    const currentMaxLimit = fileOpts.maxLimit || "";

    const nameSetting = new Setting(contentEl).setName("Название").addText((text) => {
      text.setPlaceholder("Например: Утренняя зарядка");
      text.setValue(currentName);
      text.inputEl.style.width = "100%";
    });

    const typeSetting = new Setting(contentEl).setName("Тип").addDropdown((dropdown) => {
      dropdown.addOption("good-habit", "Хорошая привычка");
      dropdown.addOption("bad-habit", "Плохая привычка");
      dropdown.addOption("number", "Число");
      dropdown.addOption("scale", "Шкала");
      dropdown.addOption("plusminus", "Счётчик (+/-)");
      dropdown.addOption("text", "Текст");
      dropdown.setValue(currentType);
      dropdown.selectEl.disabled = true;
    });

    const typeDropdown = typeSetting.controlEl.querySelector("select") as HTMLSelectElement;
    if (typeDropdown) {
      typeDropdown.innerHTML = "";

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

      typeDropdown.value = currentType;
      typeDropdown.disabled = true;
    }

    const parametersHeader = contentEl.createEl("h3", { text: "Параметры" });
    const parametersDescription = contentEl.createEl("p", {
      text: "Единица измерения - не обязательное поле. Можно оставить пустым.",
      cls: "tracker-notes__limits-description",
    });
    parametersDescription.style.fontSize = "0.9em";
    parametersDescription.style.color = "var(--text-muted, #999999)";
    parametersDescription.style.marginTop = "0.5em";
    parametersDescription.style.marginBottom = "1em";

    const unitSetting = new Setting(contentEl)
      .setName("Единица измерения")
      .addText((text) => {
        const unitValue = currentType === "text" ? "слов" : currentUnit;
        text.setPlaceholder("Например: метры, минуты, кг");
        text.setValue(unitValue);
        text.inputEl.style.width = "100%";
        if (currentType === "text") {
          text.inputEl.disabled = true;
        }
      });
    const unitInput = unitSetting.controlEl.querySelector("input") as HTMLInputElement;

    const plusminusStepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText((text) => {
        text
          .setPlaceholder("1")
          .setValue(currentStep || "1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    const minValueSetting = new Setting(contentEl)
      .setName("Значение \"от\"")
      .addText((text) => {
        text
          .setPlaceholder("0")
          .setValue(currentMinValue || "0")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const maxValueSetting = new Setting(contentEl)
      .setName("Значение \"до\"")
      .addText((text) => {
        text
          .setPlaceholder("10")
          .setValue(currentMaxValue || "10")
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const stepSetting = new Setting(contentEl)
      .setName("Шаг")
      .addText((text) => {
        text
          .setPlaceholder("1")
          .setValue(currentStep || "1")
          .inputEl.type = "number";
        text.inputEl.step = "any";
        text.inputEl.style.width = "100%";
      });

    const limitsHeader = contentEl.createEl("h3", { text: "Лимиты успешности" });
    const limitsDescription = contentEl.createEl("p", {
      text: 'Опционально вы можете сделать метрику лимитирующей и задать желаемые пороговые значения. Прим. "Не меньше 5000 шагов в день", "Не больше 3х шоколадок"',
      cls: "tracker-notes__limits-description",
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1ем";

    const minLimitSetting = new Setting(contentEl)
      .setName("Нижняя граница")
      .addText((text) => {
        text
          .setPlaceholder("По умолчанию - нет")
          .setValue(currentMinLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const maxLimitSetting = new Setting(contentEl)
      .setName("Верхняя граница")
      .addText((text) => {
        text
          .setPlaceholder("По умолчанию - нет")
          .setValue(currentMaxLimit)
          .inputEl.type = "number";
        text.inputEl.style.width = "100%";
      });

    const updateFieldsVisibility = () => {
      const isScale = typeDropdown.value === "scale";
      const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(typeDropdown.value);
      const isPlusminus = typeDropdown.value === "plusminus";
      const isText = typeDropdown.value === "text";

      if (isMetric) {
        parametersHeader.style.display = "";
        parametersDescription.style.display = "";
        unitSetting.settingEl.style.display = "";
        if (isText) {
          if (unitInput) {
            unitInput.value = "слов";
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

    updateFieldsVisibility();
    if (typeDropdown) {
      typeDropdown.onchange = updateFieldsVisibility;
    }

    // Создаем контейнер для кнопок по краям
    const buttonsWrapper = contentEl.createDiv({ cls: "tracker-modal-buttons" });
    
    // Кнопка "Удалить" (слева)
    const deleteBtn = buttonsWrapper.createEl("button", { 
      text: MODAL_LABELS.DELETE,
      cls: "mod-warning"
    });
    deleteBtn.addEventListener("click", async () => {
      try {
        // Удаляем файл сразу
        await this.app.vault.delete(this.file);
        
        new Notice(`${SUCCESS_MESSAGES.TRACKER_DELETED}: ${this.file.basename}`);
        
        // Обновляем UI
        const fileFolderPath = this.plugin.getFolderPathFromFile(this.file.path);
        await this.plugin.onTrackerCreated(fileFolderPath);
        
        this.close();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
        console.error("Tracker: ошибка удаления трекера", error);
      }
    });
    
    // Кнопка "Сохранить" (справа)
    const saveBtn = buttonsWrapper.createEl("button", { 
      text: MODAL_LABELS.SAVE,
      cls: "mod-cta"
    });
    saveBtn.addEventListener("click", async () => {
        const nameInput = nameSetting.controlEl.querySelector("input") as HTMLInputElement;
        const name = nameInput.value.trim();
        if (!name) {
          new Notice("Введите название");
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

        const unitInputValue = unitSetting.controlEl.querySelector("input") as HTMLInputElement;
        const unitRaw = unitInputValue?.value.trim() || "";
        const unit = type === "text" ? "слов" : unitRaw;
        const isMetric = ["number", "plusminus", "rating", "text", "scale"].includes(type);

        try {
          const content = await this.app.vault.read(this.file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

          const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length).trim() : content.trim();

          let existingData: Record<string, string | number> = {};
          if (frontmatterMatch) {
            existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
          }

          let newFrontmatter = `type: "${type}"\n`;
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
          const dataYaml = this.plugin.formatDataToYaml(existingData);
          newFrontmatter += dataYaml;

          const newContent = `---\n${newFrontmatter}---${body ? `\n\n${body}` : ""}`;

          await this.app.vault.modify(this.file, newContent);
          
          // Инвалидируем кеш для корректного обновления после модификации
          this.plugin.trackerFileService.invalidateCacheForPath(this.file.path);

          if (name !== this.file.basename) {
            const newFileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
            const newPath = this.file.path.replace(this.file.name, newFileName);
            await this.app.vault.rename(this.file, newPath);
          }

          new Notice(`Трекер обновлен: ${name}`);

          const fileFolderPath = this.plugin.getFolderPathFromFile(this.file.path);
          await this.plugin.onTrackerCreated(fileFolderPath);

          this.close();
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          new Notice(`Ошибка при обновлении трекера: ${errorMsg}`);
          console.error("Tracker: ошибка обновления трекера", error);
        }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

