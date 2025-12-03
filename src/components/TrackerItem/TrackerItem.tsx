import { useEffect, useCallback, useMemo } from "preact/hooks";
import { useSignal, useComputed } from "@preact/signals";
import { CSS_CLASSES, TrackerType, ViewMode } from "../../constants";
import type { TrackerItemProps } from "../types";
import type { TrackerFileOptions, TrackerEntries } from "../../domain/types";
import { TrackerHeader } from "./TrackerHeader";
import { useTrackerContext } from "../TrackerContext";
import { trackerStore } from "../../store";
import { logError } from "../../utils/notifications";

// Controls
import { NumberControl } from "../controls/NumberControl";
import { PlusMinusControl } from "../controls/PlusMinusControl";
import { TextControl } from "../controls/TextControl";
import { ScaleControl } from "../controls/ScaleControl";
import { Heatmap } from "../controls/Heatmap";
import { Statistics } from "../Statistics/Statistics";
import { ChartWrapper } from "../Chart/ChartWrapper";

/**
 * Single tracker item component
 * Uses signals for reactive data management - data is loaded once on mount
 * and updated reactively via the global store
 */
export function TrackerItem({ file, plugin, dateIso, viewMode, opts }: TrackerItemProps) {
  const { onDateChange } = useTrackerContext();
  const isLoading = useSignal(true);

  // Get tracker state from the store (reactive)
  // Access entriesVersion to trigger recomputation on any entry change
  const trackerState = useComputed(() => {
    trackerStore.entriesVersion.value;
    return trackerStore.getTrackerState(file.path);
  });

  // Use computed signals for reactive values - properly tracks signal changes
  const entries = useComputed(() => {
    return trackerState.value?.entries ?? new Map();
  });

  const fileOptions = useComputed(() => {
    return trackerState.value?.fileOptions ?? null;
  });

  // Load data on mount only
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if already loaded in store
        const existingState = trackerStore.getTrackerState(file.path);
        if (existingState) {
          isLoading.value = false;
          return;
        }

        // Use readTrackerFile for efficient single-file read
        const { entries: entriesData, fileOpts: options } = await plugin.readTrackerFile(file);

        trackerStore.setTrackerState(file.path, {
          entries: entriesData,
          fileOptions: options,
          lastUpdated: Date.now(),
        });

        isLoading.value = false;
      } catch (error) {
        logError("TrackerItem: error loading data", error);
        isLoading.value = false;
      }
    };

    loadData();

    // Cleanup: clear state when component unmounts
    return () => {
      // Don't clear - keep cached for performance
      // trackerStore.clearTrackerState(file.path);
    };
  }, [file.path, plugin]);

  // Determine tracker type
  const trackerType = useComputed(() => {
    const opts = fileOptions.value;
    return (opts?.mode ?? TrackerType.GOOD_HABIT).toLowerCase() as typeof TrackerType[keyof typeof TrackerType];
  });

  // Calculate display name
  const displayName = useComputed(() => {
    const baseName = file.basename;
    const unit = fileOptions.value?.unit || "";
    return unit ? `${baseName} (${unit})` : baseName;
  });

  // Check if tracker is a habit type (habits don't show charts)
  const isHabitType = useComputed(() => {
    const type = trackerType.value;
    return type === TrackerType.GOOD_HABIT || type === TrackerType.BAD_HABIT;
  });

  // Calculate settings for visualization - use useComputed for reactivity
  const daysToShow = useComputed(() => {
    const settings = trackerStore.settings.value;
    return parseInt(opts.days) || settings.daysToShow;
  });

  // Use useComputed for reactive values that depend on both props and signals
  const shouldShowChart = useComputed(() => {
    // Habits never show charts
    if (isHabitType.value) return false;

    const settings = trackerStore.settings.value;
    const showChart = opts.showChart === "true" ||
      (opts.showChart === undefined && settings.showChartByDefault);
    const hideOnMobile = plugin.isMobileDevice() && settings.hideChartOnMobile;
    return showChart && !hideOnMobile;
  });

  const shouldShowStats = useComputed(() => {
    const settings = trackerStore.settings.value;
    const showStats = opts.showStats === "true" ||
      (opts.showStats === undefined && settings.showStatsByDefault);
    const hideOnMobile = plugin.isMobileDevice() && settings.hideStatsOnMobile;
    return showStats && !hideOnMobile;
  });

  // Event handlers
  const handleEdit = useCallback(() => {
    plugin.openEditTrackerModal(file);
  }, [plugin, file]);

  const handleMoveUp = useCallback(async () => {
    await plugin.moveTrackerUp(file);
  }, [plugin, file]);

  const handleMoveDown = useCallback(async () => {
    await plugin.moveTrackerDown(file);
  }, [plugin, file]);

  // Get start tracking date
  const startTrackingDate = useComputed(() => {
    const opts = fileOptions.value;
    if (!opts) return null;
    return plugin.getStartTrackingDate(entries.value, opts);
  });

  // Calculate limit progress for header - use useMemo to track dateIso prop changes
  // Use computed signals to track signal changes, and useMemo to track prop changes
  const limitProgress = useMemo(() => {
    // Access computed signals to ensure reactivity
    const currentEntries = entries.value;
    const opts = fileOptions.value;
    const settings = trackerStore.settings.value;
    
    if (!opts || !settings || settings.disableLimitReaction) return null;

    const minLimit = opts.minLimit ? parseFloat(opts.minLimit) : null;
    const maxLimit = opts.maxLimit ? parseFloat(opts.maxLimit) : null;

    if (minLimit === null && maxLimit === null) return null;

    const currentValue = currentEntries.get(dateIso);
    const value = currentValue != null ? Number(currentValue) : null;

    if (value === null || isNaN(value)) {
      return { width: '0%', color: 'transparent' };
    }

    let progressPercent = 0;
    let isExceedingMax = false;

    if (minLimit !== null && maxLimit !== null) {
      if (value >= minLimit && value <= maxLimit) {
        progressPercent = 100;
      } else if (value < minLimit) {
        progressPercent = Math.max(0, 100 * (value / minLimit));
      } else {
        progressPercent = 100;
        isExceedingMax = true;
      }
    } else if (maxLimit !== null) {
      if (value <= maxLimit) {
        progressPercent = 100;
      } else {
        progressPercent = 100;
        isExceedingMax = true;
      }
    } else if (minLimit !== null) {
      progressPercent = Math.min(100, Math.max(0, 100 * (value / minLimit)));
    }

    const hue = isExceedingMax ? 0 : 120 * (progressPercent / 100);
    const progressColor = `hsl(${hue}, 70%, 50%)`;

    return {
      width: `${progressPercent}%`,
      color: progressColor,
    };
  }, [
    dateIso, 
    entries.value,
    fileOptions.value,
    trackerStore.settings.value?.disableLimitReaction
  ]);

  // Render control based on tracker type
  const renderControl = () => {
    const currentFileOptions = fileOptions.value;
    if (isLoading.value || !currentFileOptions) return null;

    // Note: No onValueChange callback needed - writeLogLine/deleteEntry 
    // already update the store directly via trackerStore signals
    const controlProps = {
      file,
      dateIso,
      plugin,
      fileOptions: currentFileOptions,
      entries: entries.value,
    };

    const type = trackerType.value;
    const isHabit = type === TrackerType.GOOD_HABIT || type === TrackerType.BAD_HABIT;

    if (isHabit) {
      return (
        <Heatmap
          {...controlProps}
          daysToShow={daysToShow.value}
          trackerType={type}
          startTrackingDate={startTrackingDate.value}
        />
      );
    }

    switch (type) {
      case TrackerType.NUMBER:
        return <NumberControl {...controlProps} />;
      case TrackerType.PLUSMINUS:
        return <PlusMinusControl {...controlProps} />;
      case TrackerType.TEXT:
        return <TextControl {...controlProps} />;
      case TrackerType.SCALE:
        return <ScaleControl {...controlProps} />;
      default:
        return <div>Unknown tracker type: {type}</div>;
    }
  };

  const currentFileOptions = fileOptions.value;
  const currentEntries = entries.value;

  // Display mode - just show value
  if (viewMode === ViewMode.DISPLAY) {
    const currentValue = currentEntries.get(dateIso);
    return (
      <div class={CSS_CLASSES.TRACKER} data-file-path={file.path}>
        <TrackerHeader
          file={file}
          displayName={displayName.value}
          plugin={plugin}
        />
        <div>{dateIso}: {currentValue ?? "—"}</div>

        {shouldShowChart.value && currentFileOptions && (
          <ChartWrapper
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow.value}
            entries={currentEntries}
            fileOptions={currentFileOptions}
            onDateClick={onDateChange}
          />
        )}

        {shouldShowStats.value && currentFileOptions && (
          <Statistics
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow.value}
            trackerType={trackerType.value}
            entries={currentEntries}
            fileOptions={currentFileOptions}
          />
        )}
      </div>
    );
  }

  // Control mode - render interactive controls
  return (
    <div class={CSS_CLASSES.TRACKER} data-file-path={file.path}>
      <TrackerHeader
        file={file}
        displayName={displayName.value}
        plugin={plugin}
        onEdit={handleEdit}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        limitProgress={limitProgress}
      />

      <div class={CSS_CLASSES.TRACKER_CONTROLS}>
        {renderControl()}
      </div>

      {shouldShowChart.value && currentFileOptions && (
        <ChartWrapper
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow.value}
          entries={currentEntries}
          fileOptions={currentFileOptions}
          onDateClick={onDateChange}
        />
      )}

      {shouldShowStats.value && currentFileOptions && (
        <Statistics
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow.value}
          trackerType={trackerType.value}
          entries={currentEntries}
          fileOptions={currentFileOptions}
        />
      )}
    </div>
  );
}
