import type { DateWrapper } from "../domain/date-types";

/**
 * Service for unified date operations
 * Abstracts moment.js and native Date API
 */
export class DateService {
  private static momentAvailable(): boolean {
    return typeof (window as any).moment !== 'undefined';
  }

  private static getMoment(): any {
    return (window as any).moment;
  }

  /**
   * Create a DateWrapper from a date string and format
   */
  static parse(dateStr: string, format: string): DateWrapper {
    const m = this.getMoment();
    if (m) {
      const parsed = m(dateStr, format, true);
      if (parsed.isValid()) {
        return this.wrapMoment(parsed);
      }
    }
    // Fallback to native Date parsing
    return this.wrapDate(this.parseNativeDate(dateStr, format));
  }

  /**
   * Create a DateWrapper from multiple possible formats
   */
  static parseMultiple(dateStr: string, formats: string[]): DateWrapper {
    const m = this.getMoment();
    if (m) {
      const parsed = m(dateStr, formats, true);
      if (parsed.isValid()) {
        return this.wrapMoment(parsed);
      }
    }
    // Try native parsing
    for (const fmt of formats) {
      try {
        const date = this.parseNativeDate(dateStr, fmt);
        if (!isNaN(date.getTime())) {
          return this.wrapDate(date);
        }
      } catch {
        // Continue to next format
      }
    }
    // Fallback to current date
    return this.now();
  }

  /**
   * Get current date/time
   */
  static now(): DateWrapper {
    const m = this.getMoment();
    if (m) {
      return this.wrapMoment(m());
    }
    return this.wrapDate(new Date());
  }

  /**
   * Create DateWrapper from native Date
   */
  static fromDate(date: Date): DateWrapper {
    const m = this.getMoment();
    if (m) {
      return this.wrapMoment(m(date));
    }
    return this.wrapDate(new Date(date.getTime()));
  }

  /**
   * Format date to string
   */
  static format(date: DateWrapper | Date, format: string): string {
    if (date instanceof Date) {
      return this.formatNativeDate(date, format);
    }
    return date.format(format);
  }

  /**
   * Add days to date
   */
  static addDays(date: DateWrapper | Date, days: number): DateWrapper {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return this.wrapDate(result);
    }
    return date.clone().add(days, 'days');
  }

  /**
   * Subtract days from date
   */
  static subtractDays(date: DateWrapper | Date, days: number): DateWrapper {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return this.wrapDate(result);
    }
    return date.clone().subtract(days, 'days');
  }

  /**
   * Check if date is before another date
   */
  static isBefore(date: DateWrapper | Date, other: DateWrapper | Date): boolean {
    const date1 = date instanceof Date ? this.wrapDate(date) : date;
    const date2 = other instanceof Date ? this.wrapDate(other) : other;
    return date1.isBefore(date2);
  }

  /**
   * Check if date is after another date
   */
  static isAfter(date: DateWrapper | Date, other: DateWrapper | Date): boolean {
    const date1 = date instanceof Date ? this.wrapDate(date) : date;
    const date2 = other instanceof Date ? this.wrapDate(other) : other;
    return date1.isAfter(date2);
  }

  /**
   * Start of day
   */
  static startOfDay(date: DateWrapper | Date): DateWrapper {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setHours(0, 0, 0, 0);
      return this.wrapDate(result);
    }
    return date.clone().startOf('day');
  }

  /**
   * Resolve date string to ISO format
   */
  static resolveDateIso(input: string | undefined, fmt: string): string {
    if (!input || input.toLowerCase() === "today") {
      return this.format(this.now(), fmt);
    }
    
    const m = this.getMoment();
    if (m) {
      const tryParse = m(input, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"], true);
      if (tryParse.isValid()) {
        return tryParse.format(fmt);
      }
      return m().format(fmt);
    }
    
    // Native Date fallback
    const today = new Date();
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) {
      return this.formatNativeDate(today, fmt);
    }
    return this.formatNativeDate(parsed, fmt);
  }

  // Private helper methods

  private static wrapMoment(momentObj: any): DateWrapper {
    const m = this.getMoment();
    return {
      format: (fmt: string) => momentObj.format(fmt),
      date: () => momentObj.date(),
      month: () => momentObj.month() + 1, // moment uses 0-based, we use 1-based
      year: () => momentObj.year(),
      getDate: () => momentObj.date(),
      getMonth: () => momentObj.month(),
      getFullYear: () => momentObj.year(),
      getTime: () => momentObj.valueOf(),
      isBefore: (other: DateWrapper | Date) => {
        if (other instanceof Date) {
          return momentObj.isBefore(m ? m(other) : other);
        }
        return momentObj.isBefore((other as any).toDate ? (other as any).toDate() : other);
      },
      isAfter: (other: DateWrapper | Date) => {
        if (other instanceof Date) {
          return momentObj.isAfter(m ? m(other) : other);
        }
        return momentObj.isAfter((other as any).toDate ? (other as any).toDate() : other);
      },
      isValid: () => momentObj.isValid(),
      clone: () => this.wrapMoment(momentObj.clone()),
      add: (amount: number, unit: 'days' | 'months' | 'years') => {
        return this.wrapMoment(momentObj.clone().add(amount, unit));
      },
      subtract: (amount: number, unit: 'days' | 'months' | 'years') => {
        return this.wrapMoment(momentObj.clone().subtract(amount, unit));
      },
      startOf: (unit: 'day' | 'month' | 'year') => {
        return this.wrapMoment(momentObj.clone().startOf(unit));
      },
      toDate: () => momentObj.toDate(),
    };
  }

  private static wrapDate(date: Date): DateWrapper {
    return {
      format: (fmt: string) => this.formatNativeDate(date, fmt),
      date: () => date.getDate(),
      month: () => date.getMonth() + 1,
      year: () => date.getFullYear(),
      getDate: () => date.getDate(),
      getMonth: () => date.getMonth(),
      getFullYear: () => date.getFullYear(),
      getTime: () => date.getTime(),
      isBefore: (other: DateWrapper | Date) => {
        const otherDate = other instanceof Date ? other : other.toDate();
        return date < otherDate;
      },
      isAfter: (other: DateWrapper | Date) => {
        const otherDate = other instanceof Date ? other : other.toDate();
        return date > otherDate;
      },
      isValid: () => !isNaN(date.getTime()),
      clone: () => this.wrapDate(new Date(date.getTime())),
      add: (amount: number, unit: 'days' | 'months' | 'years') => {
        const result = new Date(date);
        if (unit === 'days') {
          result.setDate(result.getDate() + amount);
        } else if (unit === 'months') {
          result.setMonth(result.getMonth() + amount);
        } else if (unit === 'years') {
          result.setFullYear(result.getFullYear() + amount);
        }
        return this.wrapDate(result);
      },
      subtract: (amount: number, unit: 'days' | 'months' | 'years') => {
        const result = new Date(date);
        if (unit === 'days') {
          result.setDate(result.getDate() - amount);
        } else if (unit === 'months') {
          result.setMonth(result.getMonth() - amount);
        } else if (unit === 'years') {
          result.setFullYear(result.getFullYear() - amount);
        }
        return this.wrapDate(result);
      },
      startOf: (unit: 'day' | 'month' | 'year') => {
        const result = new Date(date);
        if (unit === 'day') {
          result.setHours(0, 0, 0, 0);
        } else if (unit === 'month') {
          result.setDate(1);
          result.setHours(0, 0, 0, 0);
        } else if (unit === 'year') {
          result.setMonth(0, 1);
          result.setHours(0, 0, 0, 0);
        }
        return this.wrapDate(result);
      },
      toDate: () => new Date(date.getTime()),
    };
  }

  private static parseNativeDate(dateStr: string, format: string): Date {
    if (format === "YYYY-MM-DD") {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return new Date(dateStr);
  }

  private static formatNativeDate(date: Date, format: string): string {
    if (format === "YYYY-MM-DD") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    // Fallback to ISO format
    return date.toISOString().split("T")[0];
  }
}

