/**
 * Normalizes a file system path by:
 * - Trimming whitespace
 * - Converting backslashes to forward slashes
 * - Removing duplicate slashes
 * - Removing leading/trailing slashes
 * 
 * @param path - The path to normalize
 * @returns Normalized path string
 */
export function normalizePath(path: string): string {
  if (!path) return "";
  return path
    .trim()
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\/+/, "")
    .replace(/\/$/, "");
}

/**
 * Extracts the folder path from a file path
 * 
 * @param filePath - Full file path
 * @returns Folder path (empty string if file is in root)
 */
export function getFolderFromFilePath(filePath: string): string {
  if (!filePath) return "";
  const normalizedPath = normalizePath(filePath);
  const lastSlash = normalizedPath.lastIndexOf("/");
  if (lastSlash === -1) {
    return "";
  }
  return normalizedPath.substring(0, lastSlash);
}

/**
 * Checks if a path starts with another path (folder containment check)
 * 
 * @param childPath - Path to check
 * @param parentPath - Parent path
 * @returns True if childPath is under parentPath
 */
export function isPathUnder(childPath: string, parentPath: string): boolean {
  if (!childPath || !parentPath) return false;
  const normalizedChild = normalizePath(childPath);
  const normalizedParent = normalizePath(parentPath);
  return normalizedChild === normalizedParent || 
         normalizedChild.startsWith(`${normalizedParent}/`);
}

