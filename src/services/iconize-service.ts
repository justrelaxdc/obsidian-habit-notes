import { App, TFile, normalizePath } from "obsidian";

interface IconizeData {
  settings?: any;
  [path: string]: string | any;
}

/**
 * Service for integration with Iconize plugin
 * Reads icon data from .obsidian/plugins/obsidian-icon-folder/data.json
 */
export class IconizeService {
  private iconData: IconizeData | null = null;
  private dataLoaded: boolean = false;
  private watchInterval: ReturnType<typeof setInterval> | null = null;
  private lastModifiedTime: number = 0;
  private iconDataPath: string = "";

  constructor(private readonly app: App) {}

  /**
   * Loads icon data from Iconize plugin data file
   */
  async loadIconizeData(): Promise<void> {
    const configDir = this.app.vault.configDir || ".obsidian";
    const relativePath = normalizePath(`${configDir}/plugins/obsidian-icon-folder/data.json`);
    this.iconDataPath = relativePath;

    try {
      // Try to read file using adapter (expects relative path)
      try {
        const content = await this.app.vault.adapter.read(relativePath);
        this.iconData = JSON.parse(content);
        this.dataLoaded = true;
        
        // Get file modification time
        try {
          const stat = await this.app.vault.adapter.stat(relativePath);
          this.lastModifiedTime = stat.mtime || 0;
        } catch {
          // If stat fails, use current time
          this.lastModifiedTime = Date.now();
        }
      } catch (readError) {
        // File doesn't exist or can't be read
        this.iconData = null;
        this.dataLoaded = true;
        this.lastModifiedTime = 0;
      }
    } catch (error) {
      // Silently fail if Iconize is not installed or data is invalid
      console.error("[Iconize] Error loading data:", error);
      this.iconData = null;
      this.dataLoaded = true;
      this.lastModifiedTime = 0;
    }
  }

  /**
   * Starts watching the icon data file for changes
   */
  startWatching(): void {
    // Stop existing watcher if any
    this.stopWatching();
    
    // Check for file changes every 2 seconds
    this.watchInterval = setInterval(async () => {
      if (!this.iconDataPath) return;
      
      try {
        const stat = await this.app.vault.adapter.stat(this.iconDataPath);
        const currentMtime = stat.mtime || 0;
        
        // If file was modified, reload data
        if (currentMtime > this.lastModifiedTime) {
          this.dataLoaded = false; // Force reload
          await this.loadIconizeData();
        }
      } catch {
        // File might not exist or be inaccessible, ignore
      }
    }, 2000);
  }

  /**
   * Stops watching the icon data file
   */
  stopWatching(): void {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
      this.watchInterval = null;
    }
  }

  /**
   * Gets icon for a given path (file or folder)
   * Only returns icon if it's explicitly set for this path - no inheritance from parent folders
   * @param path - Path to file or folder
   * @param isFile - Whether the path is a file (true) or folder (false) - not used anymore but kept for compatibility
   * @returns Icon string (emoji or Lucide icon name) or null if not found
   */
  getIcon(path: string, isFile: boolean = false): string | null {
    if (!this.iconData) {
      return null;
    }

    // Normalize path (remove leading slash, use forward slashes)
    const normalizedPath = this.normalizePath(path);

    // Try exact match first (without leading slash)
    if (this.iconData[normalizedPath]) {
      return this.iconData[normalizedPath];
    }

    // Try with leading slash
    const pathWithSlash = `/${normalizedPath}`;
    if (this.iconData[pathWithSlash]) {
      return this.iconData[pathWithSlash];
    }

    // For files, try without extension
    if (normalizedPath.endsWith(".md")) {
      const pathWithoutExt = normalizedPath.slice(0, -3);
      if (this.iconData[pathWithoutExt]) {
        return this.iconData[pathWithoutExt];
      }
      if (this.iconData[`/${pathWithoutExt}`]) {
        return this.iconData[`/${pathWithoutExt}`];
      }
    }

    // No inheritance - only return icon if explicitly set for this path
    return null;
  }

  /**
   * Normalizes path for Iconize format
   */
  private normalizePath(path: string): string {
    if (!path) return "";
    return path
      .replace(/\\/g, "/")
      .replace(/\/+/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/$/, "");
  }


  /**
   * Renders icon in a container element
   * @param icon - Icon string (emoji or Lucide icon name)
   * @param container - Container element to render icon in
   */
  renderIcon(icon: string | null, container: HTMLElement): void {
    if (!icon) {
      return;
    }

    // Check if it's a Lucide icon (starts with "Li")
    if (icon.startsWith("Li")) {
      // For Lucide icons, Iconize typically uses format like "LiAtom"
      // We'll create a span that Iconize can style
      // Iconize may use CSS to render these, so we add a class and data attribute
      const iconSpan = container.createSpan({ 
        cls: "iconize-icon lucide-icon",
        attr: { 
          "data-icon": icon,
          "aria-label": icon
        }
      });
      // Add a small space after icon
      iconSpan.style.marginRight = "0.3em";
      iconSpan.style.display = "inline-block";
    } else {
      // Emoji - just add as text with space
      const emojiSpan = container.createSpan({ text: icon });
      emojiSpan.style.marginRight = "0.3em";
    }
  }

  /**
   * Updates icon path when a file or folder is renamed
   * This preserves the icon association after rename
   */
  updateIconPath(oldPath: string, newPath: string): void {
    if (!this.iconData) {
      return;
    }

    const oldNormalized = this.normalizePath(oldPath);
    const newNormalized = this.normalizePath(newPath);

    // Check all possible path formats that might be stored
    const pathVariants = [
      oldNormalized,
      `/${oldNormalized}`,
      oldNormalized.endsWith(".md") ? oldNormalized.slice(0, -3) : null,
      oldNormalized.endsWith(".md") ? `/${oldNormalized.slice(0, -3)}` : null,
    ].filter(Boolean) as string[];

    // Find which variant has an icon
    let iconValue: string | null = null;
    let foundPath: string | null = null;
    
    for (const variant of pathVariants) {
      if (this.iconData[variant] && typeof this.iconData[variant] === 'string') {
        iconValue = this.iconData[variant];
        foundPath = variant;
        break;
      }
    }

    // If we found an icon, update it to the new path
    if (iconValue && foundPath) {
      // Determine the new path format based on the old format
      let newPathKey: string;
      if (foundPath.startsWith('/')) {
        newPathKey = `/${newNormalized}`;
      } else {
        newPathKey = newNormalized;
      }
      
      // Handle .md extension
      if (foundPath.endsWith('.md') || (!foundPath.includes('.') && newPath.endsWith('.md'))) {
        // Keep consistent with old format
      } else if (newPath.endsWith('.md') && !newPathKey.endsWith('.md')) {
        newPathKey = newPathKey.slice(0, -3);
      }

      // Update the icon data in memory
      this.iconData[newPathKey] = iconValue;
      
      // Remove old path entry
      delete this.iconData[foundPath];
    }
  }

  /**
   * Invalidates cached data (useful if Iconize data changes)
   */
  invalidateCache(): void {
    this.dataLoaded = false;
    this.iconData = null;
  }
}

