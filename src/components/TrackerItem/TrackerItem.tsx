import { useState, useEffect, useCallback, useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { CSS_CLASSES, TrackerType, ViewMode } from "../../constants";
import type { TrackerItemProps } from "../types";
import type { TrackerFileOptions, TrackerEntries } from "../../domain/types";
import { TrackerHeader } from "./TrackerHeader";
import { useTrackerContext } from "../TrackerContext";

// Controls will be imported after they are created
import { NumberControl } from "../controls/NumberControl";
import { PlusMinusControl } from "../controls/PlusMinusControl";
import { TextControl } from "../controls/TextControl";
import { ScaleControl } from "../controls/ScaleControl";
import { Heatmap } from "../controls/Heatmap";
import { Statistics } from "../Statistics/Statistics";
import { ChartWrapper } from "../Chart/ChartWrapper";

/**
 * Single tracker item component
 */
function TrackerItemComponent({ file, plugin, dateIso, viewMode, opts }: TrackerItemProps) {
  const { onDateChange } = useTrackerContext();
  const [fileOptions, setFileOptions] = useState<TrackerFileOptions | null>(null);
  const [entries, setEntries] = useState<TrackerEntries>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Reload all data for this tracker
  const loadData = useCallback(async () => {
    try {
      const [options, entriesData] = await Promise.all([
        plugin.getFileTypeFromFrontmatter(file),
        plugin.readAllEntries(file),
      ]);
      
      setFileOptions(options);
      setEntries(entriesData);
      setIsLoading(false);
    } catch (error) {
      console.error("TrackerItem: error loading data", error);
      setIsLoading(false);
    }
  }, [plugin, file]);

  // Load file options and entries on mount and date change
  useEffect(() => {
    loadData();
  }, [loadData, dateIso]);

  // Register refresh callback for this tracker
  useEffect(() => {
    plugin.registerTrackerRefresh(file.path, loadData);
    
    return () => {
      plugin.unregisterTrackerRefresh(file.path);
    };
  }, [plugin, file.path, loadData]);

  // Refresh entries when value changes
  const handleValueChange = useCallback(async () => {
    const entriesData = await plugin.readAllEntries(file);
    setEntries(entriesData);
  }, [plugin, file]);

  // Determine tracker type
  const trackerType = useMemo(() => {
    return (fileOptions?.mode ?? TrackerType.GOOD_HABIT).toLowerCase() as typeof TrackerType[keyof typeof TrackerType];
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
    if (!fileOptions) return null;
    return plugin.getStartTrackingDate(entries, fileOptions);
  }, [plugin, entries, fileOptions]);

  // Calculate limit progress for header
  const limitProgress = useMemo(() => {
    if (!fileOptions || plugin.settings.disableLimitReaction) return null;
    
    const minLimit = fileOptions.minLimit ? parseFloat(fileOptions.minLimit) : null;
    const maxLimit = fileOptions.maxLimit ? parseFloat(fileOptions.maxLimit) : null;
    
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
    if (isLoading || !fileOptions) return null;

    const controlProps = {
      file,
      dateIso,
      plugin,
      fileOptions,
      entries,
      onValueChange: handleValueChange,
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

  // Display mode - just show value
  if (viewMode === ViewMode.DISPLAY) {
    const currentValue = entries.get(dateIso);
    return (
      <div class={CSS_CLASSES.TRACKER} data-file-path={file.path}>
        <TrackerHeader
          file={file}
          displayName={displayName}
          plugin={plugin}
        />
        <div>{dateIso}: {currentValue ?? "—"}</div>
        
        {shouldShowChart && fileOptions && (
          <ChartWrapper
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow}
            entries={entries}
            fileOptions={fileOptions}
            onDateClick={onDateChange}
          />
        )}
        
        {shouldShowStats && fileOptions && (
          <Statistics
            file={file}
            plugin={plugin}
            dateIso={dateIso}
            daysToShow={daysToShow}
            trackerType={trackerType}
            entries={entries}
            fileOptions={fileOptions}
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
      
      {shouldShowChart && fileOptions && (
        <ChartWrapper
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow}
          entries={entries}
          fileOptions={fileOptions}
          onDateClick={onDateChange}
        />
      )}
      
      {shouldShowStats && fileOptions && (
        <Statistics
          file={file}
          plugin={plugin}
          dateIso={dateIso}
          daysToShow={daysToShow}
          trackerType={trackerType}
          entries={entries}
          fileOptions={fileOptions}
        />
      )}
    </div>
  );
}

/**
 * Memoized tracker item component to prevent unnecessary re-renders
 */
export const TrackerItem = memo(TrackerItemComponent, (prevProps, nextProps) => {
  // Re-render if file path, date, view mode, or plugin changes
  if (prevProps.file.path !== nextProps.file.path) return false;
  if (prevProps.dateIso !== nextProps.dateIso) return false;
  if (prevProps.viewMode !== nextProps.viewMode) return false;
  if (prevProps.plugin !== nextProps.plugin) return false;
  
  // Shallow compare opts object
  const prevOpts = prevProps.opts;
  const nextOpts = nextProps.opts;
  const prevKeys = Object.keys(prevOpts);
  const nextKeys = Object.keys(nextOpts);
  if (prevKeys.length !== nextKeys.length) return false;
  for (const key of prevKeys) {
    if (prevOpts[key] !== nextOpts[key]) return false;
  }
  
  return true;
});

