import { App, TFile } from "obsidian";
import type { TrackerSettings, TrackerFileOptions } from "../domain/types";
import { parseMaybeNumber } from "../utils/misc";
import { ERROR_MESSAGES, MAX_DAYS_BACK, TrackerType } from "../constants";
import { isTrackerValueTrue } from "../utils/validation";
import { DateService } from "./date-service";
import { getEntryValueByDate, determineStartTrackingDate } from "./entry-utils";
import { logError } from "../utils/notifications";

export class TrackerFileService {
  // Cache for file content to avoid redundant reads
  private fileContentCache: Map<string, { content: string; timestamp: number; fileMtime: number }> = new Map();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

  constructor(private readonly app: App) {}

  /**
   * Get cached file content or read from vault
   */
  private async getFileContent(file: TFile): Promise<string> {
    const cacheKey = file.path;
    const cached = this.fileContentCache.get(cacheKey);
    const now = Date.now();
    const fileMtime = file.stat?.mtime || 0;
    
    // Check if cache is valid (not expired and file hasn't been modified)
    if (cached) {
      const cacheAge = now - cached.timestamp;
      // Cache is valid if it's not expired and file mtime matches cached mtime
      if (cacheAge < this.CACHE_TTL_MS && cached.fileMtime === fileMtime) {
        return cached.content;
      }
    }
    
    // Read file and cache it
    const content = await this.app.vault.read(file);
    // Use current file mtime (should be available after read)
    const latestMtime = file.stat?.mtime || now;
    this.fileContentCache.set(cacheKey, {
      content,
      timestamp: now,
      fileMtime: latestMtime
    });
    
    return content;
  }

  /**
   * Invalidate cache for a specific file
   */
  invalidateFileCache(filePath: string): void {
    this.fileContentCache.delete(filePath);
  }

  async ensureFileWithHeading(filePath: string, type: string = "good-habit"): Promise<TFile> {
    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing instanceof TFile) return existing;
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (dir && !this.app.vault.getAbstractFileByPath(dir)) {
      await this.app.vault.createFolder(dir);
    }
    const content = `---\ntype: "${type}"\ndata: {}\n---\n`;
    return this.app.vault.create(filePath, content);
  }

  parseFrontmatterData(frontmatter: string): Record<string, string | number> {
    // Find data: section in frontmatter
    const dataIndex = frontmatter.indexOf('data:');
    if (dataIndex === -1) {
      return {};
    }
    
    // Find the start of JSON object after "data:"
    let jsonStart = dataIndex + 5; // length of "data:"
    // Skip whitespace
    while (jsonStart < frontmatter.length && /\s/.test(frontmatter[jsonStart])) {
      jsonStart++;
    }
    
    if (jsonStart >= frontmatter.length || frontmatter[jsonStart] !== '{') {
      return {};
    }
    
    // Extract JSON object by finding matching closing brace
    let braceCount = 0;
    let inString = false;
    let escapeNext = false;
    let jsonEnd = jsonStart;
    
    for (let i = jsonStart; i < frontmatter.length; i++) {
      const char = frontmatter[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            jsonEnd = i + 1;
            break;
          }
        }
      }
    }
    
    if (braceCount !== 0) {
      // Malformed JSON
      return {};
    }
    
    const jsonString = frontmatter.substring(jsonStart, jsonEnd).trim();
    if (jsonString === '{}') {
      return {};
    }
    
    try {
      const parsed = JSON.parse(jsonString);
      // Convert all values through parseMaybeNumber to maintain type consistency
      const result: Record<string, string | number> = {};
      for (const [key, value] of Object.entries(parsed)) {
        result[key] = parseMaybeNumber(String(value));
      }
      return result;
    } catch (error) {
      logError("Tracker: error parsing JSON data", error);
      return {};
    }
  }

  formatDataToJson(data: Record<string, string | number>): string {
    if (Object.keys(data).length === 0) {
      return "data: {}\n";
    }
    
    // Sort keys for readability
    const sortedKeys = Object.keys(data).sort();
    const sortedData: Record<string, string | number> = {};
    for (const key of sortedKeys) {
      sortedData[key] = data[key];
    }
    
    // Compact JSON format (no spaces)
    const jsonString = JSON.stringify(sortedData);
    return `data: ${jsonString}\n`;
  }

  async readAllEntries(file: TFile): Promise<Map<string, string | number>> {
    const entries = new Map<string, string | number>();
    try {
      const raw = await this.getFileContent(file);
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return entries;

      const frontmatter = frontmatterMatch[1];
      const data = this.parseFrontmatterData(frontmatter);

      Object.entries(data).forEach(([date, value]) => {
        entries.set(date, value);
      });
    } catch (error) {
      logError("Tracker: error reading all entries", error);
    }

    return entries;
  }

  async readValueForDate(file: TFile, dateIso: string): Promise<string | number | null> {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }

  async writeLogLine(file: TFile, dateIso: string, value: string) {
    try {
      const content = await this.getFileContent(file);
      // Invalidate cache after write
      this.invalidateFileCache(file.path);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

      if (!frontmatterMatch) {
        throw new Error(ERROR_MESSAGES.NO_FRONTMATTER);
      }

      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);

      const data = this.parseFrontmatterData(frontmatter);
      data[dateIso] = parseMaybeNumber(value);

      const dataJson = this.formatDataToJson(data);

      let newFrontmatter = frontmatter.trim();
      // Find data: section and replace with new JSON
      // Use a helper function to find the JSON object boundaries
      const dataIndex = newFrontmatter.indexOf('data:');
      if (dataIndex !== -1) {
        // Find the JSON object after "data:"
        let jsonStart = dataIndex + 5;
        while (jsonStart < newFrontmatter.length && /\s/.test(newFrontmatter[jsonStart])) {
          jsonStart++;
        }
        
        if (jsonStart < newFrontmatter.length && newFrontmatter[jsonStart] === '{') {
          // Find matching closing brace
          let braceCount = 0;
          let inString = false;
          let escapeNext = false;
          let jsonEnd = jsonStart;
          
          for (let i = jsonStart; i < newFrontmatter.length; i++) {
            const char = newFrontmatter[i];
            
            if (escapeNext) {
              escapeNext = false;
              continue;
            }
            
            if (char === '\\') {
              escapeNext = true;
              continue;
            }
            
            if (char === '"') {
              inString = !inString;
              continue;
            }
            
            if (!inString) {
              if (char === '{') {
                braceCount++;
              } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                  jsonEnd = i + 1;
                  break;
                }
              }
            }
          }
          
          // Replace the data section
          const dataJsonTrimmed = dataJson.trim();
          newFrontmatter = newFrontmatter.substring(0, dataIndex) + dataJsonTrimmed + newFrontmatter.substring(jsonEnd);
        } else {
          // data: exists but no JSON object, append it
          newFrontmatter = newFrontmatter + "\n" + dataJson.trim();
        }
      } else {
        // No data: section, append it
        newFrontmatter = newFrontmatter + "\n" + dataJson.trim();
      }

      if (!newFrontmatter.endsWith("\n")) {
        newFrontmatter += "\n";
      }

      const newContent = `---\n${newFrontmatter}---${body}`;
      await this.app.vault.modify(file, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logError("Tracker: write error", error);
      throw new Error(errorMsg);
    }
  }

  /**
   * Delete entry for a specific date
   */
  async deleteEntry(file: TFile, dateIso: string): Promise<void> {
    try {
      const content = await this.getFileContent(file);
      // Invalidate cache after delete
      this.invalidateFileCache(file.path);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

      if (!frontmatterMatch) {
        throw new Error(ERROR_MESSAGES.NO_FRONTMATTER);
      }

      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);

      const data = this.parseFrontmatterData(frontmatter);
      
      // Delete the entry
      delete data[dateIso];

      const dataJson = this.formatDataToJson(data);

      let newFrontmatter = frontmatter.trim();
      // Find data: section and replace with new JSON
      // Use a helper function to find the JSON object boundaries
      const dataIndex = newFrontmatter.indexOf('data:');
      if (dataIndex !== -1) {
        // Find the JSON object after "data:"
        let jsonStart = dataIndex + 5;
        while (jsonStart < newFrontmatter.length && /\s/.test(newFrontmatter[jsonStart])) {
          jsonStart++;
        }
        
        if (jsonStart < newFrontmatter.length && newFrontmatter[jsonStart] === '{') {
          // Find matching closing brace
          let braceCount = 0;
          let inString = false;
          let escapeNext = false;
          let jsonEnd = jsonStart;
          
          for (let i = jsonStart; i < newFrontmatter.length; i++) {
            const char = newFrontmatter[i];
            
            if (escapeNext) {
              escapeNext = false;
              continue;
            }
            
            if (char === '\\') {
              escapeNext = true;
              continue;
            }
            
            if (char === '"') {
              inString = !inString;
              continue;
            }
            
            if (!inString) {
              if (char === '{') {
                braceCount++;
              } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                  jsonEnd = i + 1;
                  break;
                }
              }
            }
          }
          
          // Replace the data section
          const dataJsonTrimmed = dataJson.trim();
          newFrontmatter = newFrontmatter.substring(0, dataIndex) + dataJsonTrimmed + newFrontmatter.substring(jsonEnd);
        } else {
          // data: exists but no JSON object, append it
          newFrontmatter = newFrontmatter + "\n" + dataJson.trim();
        }
      } else {
        // No data: section, append it
        newFrontmatter = newFrontmatter + "\n" + dataJson.trim();
      }

      if (!newFrontmatter.endsWith("\n")) {
        newFrontmatter += "\n";
      }

      const newContent = `---\n${newFrontmatter}---${body}`;
      await this.app.vault.modify(file, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logError("Tracker: delete entry error", error);
      throw new Error(errorMsg);
    }
  }

  async getFileTypeFromFrontmatter(file: TFile): Promise<TrackerFileOptions> {
    const fileOpts: TrackerFileOptions = {};
    try {
      const fileContent = await this.getFileContent(file);
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const typeMatch = frontmatter.match(/^type:\s*["']?([^"'\s\n]+)["']?/m);
        fileOpts.mode = (typeMatch && typeMatch[1] ? typeMatch[1].trim() : TrackerType.GOOD_HABIT) as any;
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
        const trackingStartDateMatch = frontmatter.match(/^trackingStartDate:\s*["']?([^"'\s\n]+)["']?/m);
        if (trackingStartDateMatch && trackingStartDateMatch[1]) {
          fileOpts.trackingStartDate = trackingStartDateMatch[1].trim();
        }
      } else {
        fileOpts.mode = TrackerType.GOOD_HABIT;
      }
    } catch (error) {
      logError("Tracker: error reading frontmatter", error);
      fileOpts.mode = TrackerType.GOOD_HABIT;
    }
    return fileOpts;
  }

  getStartTrackingDate(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    fileOpts?: TrackerFileOptions
  ): string | null {
    // Priority 1: Date from frontmatter
    if (fileOpts?.trackingStartDate) {
      return fileOpts.trackingStartDate;
    }
    
    // Fallback: current date
    return DateService.format(DateService.now(), settings.dateFormat);
  }

  calculateStreak(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    endDate: Date | any,
    trackerType?: string,
    file?: TFile,
    startTrackingDateStr?: string | null
  ): number {
    let streak = 0;
    let currentDate = endDate instanceof Date ? DateService.fromDate(endDate) : DateService.fromDate(new Date(endDate));
    currentDate = DateService.startOfDay(currentDate);
    const metricType = (trackerType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";

    // Determine start tracking date using shared utility
    const startTrackingDate = determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );

    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return 0;
    }

    let daysChecked = 0;

    while (daysChecked < MAX_DAYS_BACK) {
      if (DateService.isBefore(currentDate, startTrackingDate)) {
        break;
      }

      // Use shared utility for getting entry value
      const val = getEntryValueByDate(entries, currentDate, settings);
      let isSuccess = false;

      if (isBadHabit) {
        if (val == null || val === undefined) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== undefined) {
          isSuccess = isTrackerValueTrue(val);
        }
      }

      if (isSuccess) {
        streak++;
      } else {
        break;
      }

      currentDate = currentDate.subtract(1, "days");
      daysChecked++;
    }

    return streak;
  }

  calculateBestStreak(
    entries: Map<string, string | number>,
    settings: TrackerSettings,
    trackerType?: string,
    file?: TFile,
    startTrackingDateStr?: string | null
  ): number {
    const metricType = (trackerType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";
    
    if (entries.size === 0) return 0;
    
    const today = DateService.now();
    let currentDate = DateService.startOfDay(today);
    
    // Determine start tracking date using shared utility
    const startTrackingDate = determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );

    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return 0;
    }
    
    let bestStreak = 0;
    let currentStreak = 0;
    let daysChecked = 0;
    
    while (!DateService.isBefore(currentDate, startTrackingDate) && daysChecked < MAX_DAYS_BACK) {
      // Use shared utility for getting entry value
      const val = getEntryValueByDate(entries, currentDate, settings);
      let isSuccess = false;
      
      if (isBadHabit) {
        if (val == null || val === undefined) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== undefined) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      
      if (isSuccess) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }

      currentDate = currentDate.subtract(1, "days");
      daysChecked++;
    }
    
    return bestStreak;
  }
}
