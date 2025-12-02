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

  // Derive values directly from trackerState to avoid redundant computed signals
  const entries = useMemo<TrackerEntries>(() => {
    return trackerState.value?.entries ?? new Map();
  }, [trackerState.value]);

  const fileOptions = useMemo<TrackerFileOptions | null>(() => {
    return trackerState.value?.fileOptions ?? null;
  }, [trackerState.value]);

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
  const trackerType = useMemo(() => {
    const opts = fileOptions;
    return (opts?.mode ?? TrackerType.GOOD_HABIT).toLowerCase() as typeof TrackerType[keyof typeof TrackerType];
  }, [fileOptions]);

  // Calculate display name
  const displayName = useMemo(() => {
    const baseName = file.basename;
    const unit = fileOptions?.unit || "";
    return unit ? `${baseName} (${unit})` : baseName;
  }, [file, fileOptions]);

  // Extract settings values for reactivity
  const {
    daysToShow: defaultDaysToShow,
    showChartByDefault,
    showStatsByDefault,
    hideChartOnMobile,
    hideStatsOnMobile,
  } = plugin.settings;

  // Calculate settings for visualization
  const daysToShow = parseInt(opts.days) || defaultDaysToShow;

  // Check if tracker is a habit type (habits don't show charts)
  const isHabitType = useMemo(() => {
    return trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;
  }, [trackerType]);

  const shouldShowChart = useMemo(() => {
    // Habits never show charts
    if (isHabitType) return false;

    const showChart = opts.showChart === "true" ||
      (opts.showChart === undefined && showChartByDefault);
    const hideOnMobile = plugin.isMobileDevice() && hideChartOnMobile;
    return showChart && !hideOnMobile;
  }, [opts.showChart, isHabitType, showChartByDefault, hideChartOnMobile, plugin]);

  const shouldShowStats = useMemo(() => {
    const showStats = opts.showStats === "true" ||
      (opts.showStats === undefined && showStatsByDefault);
    const hideOnMobile = plugin.isMobileDevice() && hideStatsOnMobile;
    return showStats && !hideOnMobile;
  }, [opts.showStats, showStatsByDefault, hideStatsOnMobile, plugin]);

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
  const startTrackingDate = useMemo(() => {
    const opts = fileOptions;
    if (!opts) return null;
    return plugin.getStartTrackingDate(entries, opts);
  }, [plugin, entries, fileOptions]);

  // Calculate limit progress for header
  const limitProgress = useMemo(() => {
    const opts = fileOptions;
    if (!opts || plugin.settings.disableLimitReaction) return null;

    const minLimit = opts.minLimit ? parseFloat(opts.minLimit) : null;
    const maxLimit = opts.maxLimit ? parseFloat(opts.maxLimit) : null;

    if (minLimit === null && maxLimit === null) return null;

    const currentValue = entries.get(dateIso);
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
  }, [fileOptions, plugin.settings.disableLimitReaction, entries, dateIso]);

  // Render control based on tracker type
  const renderControl = () => {
    const currentFileOptions = fileOptions;
    if (isLoading.value || !currentFileOptions) return null;

    // Note: No onValueChange callback needed - writeLogLine/deleteEntry 
    // already update the store directly via trackerStore signals
    const controlProps = {
      file,
      dateIso,
      plugin,
      fileOptions: currentFileOptions,
      entries: entries,
    };

    const isHabit = trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;

    if (isHabit) {
      return (
        <Heatmap
          {...controlProps}
          daysToShow={daysToShow}
          trackerType={trackerType}
          startTrackingDate={startTrackingDate}
        />
      );
    }

    switch (trackerType) {
      case TrackerType.NUMBER:
        return <NumberControl {...controlProps} />;
      case TrackerType.PLUSMINUS:
        return <PlusMinusControl {...controlProps} />;
      case TrackerType.TEXT:
        return <TextControl {...controlProps} />;
      case TrackerType.SCALE:
        return <ScaleControl {...controlProps} />;
      default:
        return <div>Unknown tracker type: {trackerType}</div>;
    }
  };

  const currentFileOptions = fileOptions;
  const currentEntries = entries;

  // Display mode - just show value
  if (viewMode === ViewMode.DISPLAY) {
    const currentValue = currentEntries.get(dateIso);
    return (
      <div class={CSS_CLASSES.TRACKER} data-file-path={file.path}>
        <TrackerHeader
          file={file}
          displayName={displayName}
          plugin={plugin}
        />
        <div>{dateIso}: {currentValue ?? "—"}</div>

        {shouldShowChart && currentFileOptions && (
          <ChartWrapper
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow}
            entries={currentEntries}
            fileOptions={currentFileOptions}
            onDateClick={onDateChange}
          />
        )}

        {shouldShowStats && currentFileOptions && (
          <Statistics
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow}
            trackerType={trackerType}
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
        displayName={displayName}
        plugin={plugin}
        onEdit={handleEdit}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        limitProgress={limitProgress}
      />

      <div class={CSS_CLASSES.TRACKER_CONTROLS}>
        {renderControl()}
      </div>

      {shouldShowChart && currentFileOptions && (
        <ChartWrapper
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow}
          entries={currentEntries}
          fileOptions={currentFileOptions}
          onDateClick={onDateChange}
        />
      )}

      {shouldShowStats && currentFileOptions && (
        <Statistics
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow}
          trackerType={trackerType}
          entries={currentEntries}
          fileOptions={currentFileOptions}
        />
      )}
    </div>
  );
}
