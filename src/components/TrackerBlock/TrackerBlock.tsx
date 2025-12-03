import { useCallback, useMemo } from "preact/hooks";
import { useSignal, useComputed } from "@preact/signals";
import { CSS_CLASSES, ViewMode, ERROR_MESSAGES } from "../../constants";
import { DateService } from "../../services/date-service";
import { trackerStore } from "../../store";
import type { TrackerBlockProps } from "../types";
import { TrackerContext } from "../TrackerContext";
import { DatePicker } from "./DatePicker";
import { LoadingIndicator } from "./LoadingIndicator";
import { FolderNode } from "./FolderNode";

/**
 * Main tracker block component - root of the Preact tree
 * Uses LOCAL signal for date - each block has its own independent date state
 */
export function TrackerBlock({
  plugin,
  folderTree,
  initialDateIso,
  viewMode,
  opts,
  folderPath,
}: TrackerBlockProps) {
  // Local signals for this block's state - NOT shared between blocks
  const isUpdating = useSignal(false);
  const dateIso = useSignal(initialDateIso);

  // Handle date change - updates local signal only
  const handleDateChange = useCallback((newDate: string) => {
    const newDateIso = DateService.resolveDateIso(newDate, plugin.settings.dateFormat);
    dateIso.value = newDateIso;
  }, [plugin.settings.dateFormat, dateIso]);

  // Handle date navigation
  const handleNavigate = useCallback((days: number) => {
    const currentDateObj = DateService.parse(dateIso.value, plugin.settings.dateFormat);
    const newDate = currentDateObj.clone().add(days, "days");
    const newDateStr = DateService.format(newDate, plugin.settings.dateFormat);
    dateIso.value = newDateStr;
  }, [plugin.settings.dateFormat, dateIso]);

  // Context value - only contains onDateChange callback
  // Other values (plugin, dateIso, viewMode, opts) are passed as props
  const contextValue = useMemo(() => ({
    onDateChange: handleDateChange,
  }), [handleDateChange]);

  // Render error state if no folder tree
  if (!folderTree || (folderTree.files.length === 0 && folderTree.children.length === 0)) {
    return (
      <div class={CSS_CLASSES.ERROR}>
        tracker: {ERROR_MESSAGES.NO_TRACKERS} {folderPath}
      </div>
    );
  }

  // Get folder name for header
  const folderName = folderPath.split("/").pop() || folderPath;

  // Reactive setting for hiding tracker title
  const hideTrackerTitle = useComputed(() => {
    return trackerStore.settings.value.hideTrackerTitle;
  });

  return (
    <TrackerContext.Provider value={contextValue}>
      {viewMode === ViewMode.CONTROL && (
        <div class={CSS_CLASSES.TRACKER_NOTES_HEADER}>
          {!hideTrackerTitle.value && (
            <div class="tracker-notes__header-title">
              <span class="tracker-notes__header-label">{folderName}</span>
            </div>
          )}
          <DatePicker
            dateIso={dateIso.value}
            onDateChange={handleDateChange}
            onNavigate={handleNavigate}
            isUpdating={isUpdating.value}
          />
          <LoadingIndicator isActive={isUpdating.value} />
        </div>
      )}

      <div class={CSS_CLASSES.TRACKER_NOTES}>
        <div class={CSS_CLASSES.TRACKER_NOTES_HIERARCHY}>
          <FolderNode
            node={folderTree}
            plugin={plugin}
            dateIso={dateIso.value}
            viewMode={viewMode}
            opts={opts}
          />
        </div>
      </div>
    </TrackerContext.Provider>
  );
}
