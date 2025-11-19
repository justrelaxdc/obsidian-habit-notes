import { CSS_VARIABLES, FALLBACK_COLORS } from "../constants";
import type { ThemeColors } from "../domain/chart-types";

/**
 * Gets a CSS variable value from the Obsidian theme
 * 
 * @param varName - CSS variable name (with or without --)
 * @param fallback - Fallback value if variable not found
 * @returns CSS variable value or fallback
 */
export function getCSSVar(varName: string, fallback: string = '#000000'): string {
  const root = document.body || document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || fallback;
}

/**
 * Gets accent color from theme with fallback attempts
 * 
 * @returns Accent color from theme or fallback
 */
export function getAccentColor(): string {
  // Create temporary element for more reliable CSS variable reading
  const tempEl = document.createElement('div');
  tempEl.style.position = 'absolute';
  tempEl.style.visibility = 'hidden';
  document.body.appendChild(tempEl);
  
  let accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.INTERACTIVE_ACCENT).trim();
  if (!accentColor) {
    accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.COLOR_ACCENT).trim();
  }
  if (!accentColor) {
    accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.ACCENT_COLOR).trim();
  }
  
  document.body.removeChild(tempEl);
  
  // Fallback to root element
  if (!accentColor) {
    const root = document.body || document.documentElement;
    accentColor = getComputedStyle(root).getPropertyValue(CSS_VARIABLES.INTERACTIVE_ACCENT).trim();
  }
  
  // Use fallback color if still not found
  if (!accentColor) {
    accentColor = FALLBACK_COLORS.ACCENT;
  }
  
  return accentColor;
}

/**
 * Gets all theme colors needed for chart rendering
 * 
 * @returns ThemeColors object with all colors
 */
export function getThemeColors(): ThemeColors {
  const accentColor = getAccentColor();
  
  return {
    accentColor,
    textMuted: getCSSVar(CSS_VARIABLES.TEXT_MUTED, FALLBACK_COLORS.TEXT_MUTED),
    textFaint: getCSSVar(CSS_VARIABLES.TEXT_FAINT, FALLBACK_COLORS.TEXT_FAINT),
    borderColor: getCSSVar(CSS_VARIABLES.BACKGROUND_MODIFIER_BORDER, FALLBACK_COLORS.BORDER),
    bgPrimary: getCSSVar(CSS_VARIABLES.BACKGROUND_PRIMARY, FALLBACK_COLORS.BG_PRIMARY),
    errorColor: getCSSVar(CSS_VARIABLES.TEXT_ERROR, FALLBACK_COLORS.TEXT_ERROR),
    successColor: getCSSVar(CSS_VARIABLES.TEXT_SUCCESS, FALLBACK_COLORS.TEXT_SUCCESS),
    startLineColor: getCSSVar(CSS_VARIABLES.TEXT_ACCENT, accentColor),
  };
}

/**
 * Converts a color to RGBA format with specified alpha
 * 
 * @param color - Color in hex or rgb format
 * @param alpha - Alpha value (0-1)
 * @returns Color in RGBA format
 */
export function colorToRgba(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }
  return color;
}

