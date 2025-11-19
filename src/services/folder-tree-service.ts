import { App, TFile, TFolder } from "obsidian";
import type { FolderNode } from "../domain/types";
import { normalizePath } from "../utils/path";

export class FolderTreeService {
  private readonly cache = new Map<string, FolderNode | null>();

  constructor(private readonly app: App) {}

  private cacheKey(folderPath: string, maxDepth: number): string {
    return `${normalizePath(folderPath)}::${maxDepth}`;
  }

  getFolderTree(folderPath: string, maxDepth: number = 3): FolderNode | null {
    const key = this.cacheKey(folderPath, maxDepth);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      return null;
    }

    if (folder instanceof TFile) {
      return {
        name: folder.basename,
        path: folder.path,
        level: 0,
        files: [folder],
        children: [],
      };
    }

    if (folder instanceof TFolder) {
      const tree = this.buildFolderTree(folder, maxDepth, 0);
      this.cache.set(key, tree);
      return tree;
    }

    return null;
  }

  private buildFolderTree(folder: TFolder, maxDepth: number, currentLevel: number): FolderNode {
    const node: FolderNode = {
      name: folder.name,
      path: folder.path,
      level: currentLevel,
      files: [],
      children: [],
    };

    for (const child of folder.children) {
      if (child instanceof TFile && child.extension === "md") {
        node.files.push(child);
      }
    }

    node.files.sort((a, b) => a.basename.localeCompare(b.basename, undefined, { sensitivity: "base" }));

    if (currentLevel < maxDepth) {
      for (const child of folder.children) {
        if (child instanceof TFolder) {
          const childNode = this.buildFolderTree(child, maxDepth, currentLevel + 1);
          if (childNode.files.length > 0 || childNode.children.length > 0) {
            node.children.push(childNode);
          }
        }
      }

      node.children.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    }

    return node;
  }

  invalidate(folderPath?: string) {
    if (!folderPath) {
      this.cache.clear();
      return;
    }
    const normalized = normalizePath(folderPath);
    for (const key of Array.from(this.cache.keys())) {
      const [cachedPath] = key.split("::");
      if (
        cachedPath === normalized ||
        cachedPath.startsWith(`${normalized}/`) ||
        normalized.startsWith(`${cachedPath}/`)
      ) {
        this.cache.delete(key);
      }
    }
  }
}

