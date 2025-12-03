import { Notice } from "obsidian";
import { ERROR_MESSAGES } from "../constants";

/**
 * Error logging utility - replaces console.error with proper error handling
 * Logs errors for debugging but doesn't clutter production console
 */
export function logError(context: string, error: unknown, showToUser: boolean = false): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const fullMessage = `${context}: ${errorMessage}`;
  
  // Log errors for debugging (Obsidian plugins don't have NODE_ENV, so always log)
  // In production builds, these will be minified/removed if desired
  console.error(fullMessage, error);
  
  // Show to user if requested
  if (showToUser) {
    new Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMessage}`, 3000);
  }
}

/**
 * Warning logging utility - replaces console.warn
 * Logs warnings for debugging
 */
export function logWarning(message: string): void {
  // Log warnings for debugging
  console.warn(message);
}

