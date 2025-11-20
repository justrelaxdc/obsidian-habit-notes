/**
 * Date wrapper interface that abstracts moment.js and native Date
 * This allows the code to work with or without moment.js
 */
export interface DateWrapper {
  /**
   * Format date to string
   */
  format(fmt: string): string;
  
  /**
   * Get date component
   */
  date(): number;
  
  /**
   * Get month component (1-based)
   */
  month(): number;
  
  /**
   * Get year component
   */
  year(): number;
  
  /**
   * Get day of month
   */
  getDate(): number;
  
  /**
   * Get month (0-based)
   */
  getMonth(): number;
  
  /**
   * Get full year
   */
  getFullYear(): number;
  
  /**
   * Get time in milliseconds
   */
  getTime(): number;
  
  /**
   * Check if date is before another date
   */
  isBefore(other: DateWrapper | Date): boolean;
  
  /**
   * Check if date is after another date
   */
  isAfter(other: DateWrapper | Date): boolean;
  
  /**
   * Check if date is valid
   */
  isValid(): boolean;
  
  /**
   * Clone the date
   */
  clone(): DateWrapper;
  
  /**
   * Add/subtract days
   */
  add(amount: number, unit: 'days' | 'months' | 'years'): DateWrapper;
  
  /**
   * Subtract days/months/years
   */
  subtract(amount: number, unit: 'days' | 'months' | 'years'): DateWrapper;
  
  /**
   * Start of day
   */
  startOf(unit: 'day' | 'month' | 'year'): DateWrapper;
  
  /**
   * Convert to native Date
   */
  toDate(): Date;
}

