import { App, TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { addDays, formatDate, parseDate } from "../utils/date";
import { parseMaybeNumber } from "../utils/misc";

export class TrackerFileService {
  constructor(private readonly app: App) {}

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing instanceof TFile) return existing;
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (dir && !this.app.vault.getAbstractFileByPath(dir)) {
      await this.app.vault.createFolder(dir);
    }
    const name = filePath.split("/").pop()?.replace(".md", "") || "Untitled";
    const content = `---\nname: "${name.replace(/"/g, '\\"')}"\ntype: "${type}"\ndata: {}\n---\n`;
    return this.app.vault.create(filePath, content);
  }

  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    const data: Record<string, string | number> = {};
    const dataMatch = frontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
    if (dataMatch) {
      if (frontmatter.match(/data:\s*\{\}/)) {
        return data;
      }
      const dataContent = dataMatch[1];
      if (dataContent) {
        const dataLines = dataContent.split(/\n/);
        dataLines.forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#") || trimmed === "{}") return;
          const match = trimmed.match(/^["']([^"']+)["']\s*:\s*(.+)$/);
          if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
              value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
            }
            data[key] = parseMaybeNumber(value);
          } else {
            const matchNoQuotes = trimmed.match(/^([^:]+?)\s*:\s*(.+)$/);
            if (matchNoQuotes) {
              const key = matchNoQuotes[1].trim();
              let value = matchNoQuotes[2].trim();
              if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
              ) {
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

  formatDataToYaml(data: Record<string, string | number>): string {
    if (Object.keys(data).length === 0) {
      return "data: {}\n";
    }
    let yaml = "data:\n";
    const sortedDates = Object.keys(data).sort();
    sortedDates.forEach((date) => {
      const value = data[date];
      if (typeof value === "string") {
        const escapedValue = value
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r");
        yaml += `  "${date}": "${escapedValue}"\n`;
      } else {
        yaml += `  "${date}": ${value}\n`;
      }
    });
    return yaml;
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
      const content = await this.app.vault.read(file);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

      if (!frontmatterMatch) {
        throw new Error("Frontmatter не найден");
      }

      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);

      const data = this.parseFrontmatterData(frontmatter);
      data[dateIso] = parseMaybeNumber(value);

      const dataYaml = this.formatDataToYaml(data);

      let newFrontmatter = frontmatter.trim();
      const dataMatch = newFrontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
      if (dataMatch) {
        const dataYamlTrimmed = dataYaml.endsWith("\n") ? dataYaml.slice(0, -1) : dataYaml;
        newFrontmatter = newFrontmatter.replace(
          /data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/,
          dataYamlTrimmed
        );
      } else {
        newFrontmatter = newFrontmatter + "\n" + dataYaml.trimEnd();
      }

      if (!newFrontmatter.endsWith("\n")) {
        newFrontmatter += "\n";
      }

      const newContent = `---\n${newFrontmatter}---${body}`;
      await this.app.vault.modify(file, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Tracker: ошибка записи", error);
      throw new Error(errorMsg);
    }
  }

  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    const fileOpts: TrackerFileOptions = {};
    try {
      const fileContent = await this.app.vault.read(file);
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const typeMatch = frontmatter.match(/^type:\s*["']?([^"'\s\n]+)["']?/m);
        fileOpts.mode = typeMatch && typeMatch[1] ? typeMatch[1].trim() : "good-habit";
        const nameMatch = frontmatter.match(/^name:\s*["']?([^"'\n]+)["']?/m);
        if (nameMatch && nameMatch[1]) {
          fileOpts.name = nameMatch[1].trim();
        }
        const maxRatingMatch = frontmatter.match(/^maxRating:\s*(\d+)/m);
        if (maxRatingMatch) fileOpts.maxRating = maxRatingMatch[1];
        const minValueMatch = frontmatter.match(/^minValue:\s*([\d.]+)/m);
        if (minValueMatch) fileOpts.minValue = minValueMatch[1];
        const maxValueMatch = frontmatter.match(/^maxValue:\s*([\d.]+)/m);
        if (maxValueMatch) fileOpts.maxValue = maxValueMatch[1];
        const stepMatch = frontmatter.match(/^step:\s*([\d.]+)/m);
        if (stepMatch) fileOpts.step = stepMatch[1];
        const minLimitMatch = frontmatter.match(/^minLimit:\s*([\d.]+)/m);
        if (minLimitMatch) fileOpts.minLimit = minLimitMatch[1];
        const maxLimitMatch = frontmatter.match(/^maxLimit:\s*([\d.]+)/m);
        if (maxLimitMatch) fileOpts.maxLimit = maxLimitMatch[1];
        const unitMatch = frontmatter.match(/^unit:\s*["']?([^"'\n]+)["']?/m);
        if (unitMatch && unitMatch[1]) {
          fileOpts.unit = unitMatch[1].trim();
        }
      } else {
        fileOpts.mode = "good-habit";
      }
    } catch (error) {
      console.error("Tracker: ошибка чтения frontmatter", error);
      fileOpts.mode = "good-habit";
    }
    return fileOpts;
  }

  getStartTrackingDate(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    file?: TFile
  ): string | null {
    const m = (window as any).moment;
    let startTrackingDate: Date | any = null;

    if (file?.stat?.ctime) {
      startTrackingDate = m ? m(file.stat.ctime).startOf("day") : new Date(file.stat.ctime);
      if (!m && startTrackingDate) {
        startTrackingDate.setHours(0, 0, 0, 0);
      }
    }

    if (entries.size > 0) {
      const sortedDates = Array.from(entries.keys()).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = m
        ? m(firstDateStr, settings.dateFormat)
        : parseDate(firstDateStr, settings.dateFormat);
      if (!startTrackingDate || (m ? firstDate.isBefore(startTrackingDate) : firstDate < startTrackingDate)) {
        startTrackingDate = firstDate;
      }
    }

    if (!startTrackingDate) {
      return null;
    }

    return m ? startTrackingDate.format(settings.dateFormat) : formatDate(startTrackingDate, settings.dateFormat);
  }

  calculateStreak(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    endDate: Date | any,
    trackerType?: string,
    file?: TFile
  ): number {
    let streak = 0;
    const m = (window as any).moment;
    let currentDate = m ? m(endDate) : new Date(endDate);
    const metricType = (trackerType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";

    let startTrackingDate: Date | any = null;
    if (file?.stat?.ctime) {
      startTrackingDate = m ? m(file.stat.ctime).startOf("day") : new Date(file.stat.ctime);
      if (!m && startTrackingDate) {
        startTrackingDate.setHours(0, 0, 0, 0);
      }
    }

    if (entries.size > 0) {
      const sortedDates = Array.from(entries.keys()).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = m
        ? m(firstDateStr, settings.dateFormat)
        : parseDate(firstDateStr, settings.dateFormat);
      if (!startTrackingDate || (m ? firstDate.isBefore(startTrackingDate) : firstDate < startTrackingDate)) {
        startTrackingDate = firstDate;
      }
    }

    if (!startTrackingDate) {
      startTrackingDate = m ? m(endDate).subtract(365, "days") : addDays(endDate, -365);
    }

    const maxDaysBack = 3650;
    let daysChecked = 0;

    while (daysChecked < maxDaysBack) {
      if (m) {
        if (currentDate.isBefore(startTrackingDate)) break;
      } else if (currentDate < startTrackingDate) {
        break;
      }

      const dateStr = m ? currentDate.format(settings.dateFormat) : formatDate(currentDate, settings.dateFormat);
      const val = entries.get(dateStr);
      let isSuccess = false;

      if (isBadHabit) {
        if (val == null) {
          isSuccess = true;
        } else {
          const valStr = String(val);
          const hasValue =
            typeof val === "number" ? val !== 0 : valStr === "1" || valStr === "true" || valStr.trim() !== "";
          isSuccess = !hasValue;
        }
      } else if (val != null) {
        const valStr = String(val);
        isSuccess =
          typeof val === "number"
            ? val !== 0
            : valStr === "1" || valStr === "true" || valStr.trim() !== "";
      }

      if (isSuccess) {
        streak++;
      } else {
        break;
      }

      if (m) {
        currentDate = currentDate.subtract(1, "day");
      } else {
        currentDate = addDays(currentDate, -1);
      }

      daysChecked++;
    }

    return streak;
  }
}

