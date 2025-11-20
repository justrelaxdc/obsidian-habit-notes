import { Notice } from "obsidian";
import { MOBILE_BREAKPOINT } from "../constants";

/**
 * Показывает уведомление только на десктопе
 * На мобильных устройствах уведомления о записи данных скрываются,
 * чтобы не засорять интерфейс
 */
export function showNoticeIfNotMobile(message: string, timeout?: number): void {
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    new Notice(message, timeout);
  }
}

