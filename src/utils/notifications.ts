import { Notice } from "obsidian";
import { ERROR_MESSAGES } from "../constants";

/**
 * ERROR HANDLING STRATEGY
 * 
 * This codebase follows a consistent error handling pattern:
 * 
 * 1. PUBLIC METHODS (API methods called by external code):
 *    - Should throw errors for the caller to handle
 *    - Example: writeLogLine(), deleteEntry() - throw errors that are caught by UI components
 * 
 * 2. INTERNAL METHODS (private/protected methods within classes):
 *    - Should log errors and return default/null values
 *    - Example: parseFrontmatterData() - logs error and returns {} on failure
 *    - Example: readTrackerFile() - logs error and returns default empty state
 * 
 * 3. USER-FACING OPERATIONS (methods that directly affect user experience):
 *    - Should show Notice to user when errors occur
 *    - Example: writeLogLine() - shows Notice on write failure
 *    - Example: createTracker() - shows Notice on creation failure
 * 
 * 4. ERROR BOUNDARIES (React/Preact components):
 *    - Should catch errors and display fallback UI
 *    - Example: ErrorBoundary component catches render errors
 * 
 * When to use each pattern:
 * - Throw: When the caller needs to know about the error and handle it (e.g., rollback state)
 * - Return default: When the error is non-critical and operation can continue with defaults
 * - Show Notice: When the user needs to be informed about the error
 * - Log always: All errors should be logged for debugging (via logError())
 */

/**
 * Check if we're in development mode
 * Obsidian plugins don't have NODE_ENV, so we check for common development indicators
 * Returns false by default to disable logging in production builds
 */
const isDev = (): boolean => {
  // Check for Node.js development environment
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    return true;
  }
  // Check for other development indicators (e.g., hot reload, dev server)
  if (typeof window !== 'undefined' && (window as any).__DEV__) {
    return true;
  }
  // Default to false for production builds
  return false;
};

/**
 * Error logging utility - replaces console.error with proper error handling
 * Logs errors for debugging but doesn't clutter production console
 */
export function logError(context: string, error: unknown, showToUser: boolean = false): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const fullMessage = `${context}: ${errorMessage}`;
  
  // Log errors for debugging (only in development mode)
  if (isDev()) {
    // eslint-disable-next-line no-console
    console.error(fullMessage, error);
  }
  
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
  // Log warnings for debugging (only in development mode)
  if (isDev()) {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}

