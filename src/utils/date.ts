import { DateService } from "../services/date-service";

export function resolveDateIso(input: string | undefined, fmt: string): string {
  return DateService.resolveDateIso(input, fmt);
}

export function formatDate(date: Date, fmt: string): string {
  return DateService.format(DateService.fromDate(date), fmt);
}

export function parseDate(dateStr: string, fmt: string): Date {
  return DateService.parse(dateStr, fmt).toDate();
}

export function addDays(date: Date, days: number): Date {
  return DateService.addDays(date, days).toDate();
}

