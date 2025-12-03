import { useState, useCallback, useEffect, useMemo } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { CSS_CLASSES, ANIMATION_DURATION_MS, DEFAULTS } from "../../constants";
import type { PlusMinusControlProps } from "../types";
import { logError } from "../../utils/notifications";
import { trackerStore } from "../../store";

/**
 * Plus/Minus counter control
 * Accesses entries via computed signal internally for proper reactivity
 */
export function PlusMinusControl({ file, dateIso, plugin, fileOptions }: PlusMinusControlProps) {
  const step = parseFloat(fileOptions.step || String(DEFAULTS.STEP)) || DEFAULTS.STEP;
  
  // Access entries via computed signal - only re-renders when this tracker's entries change
  const entries = useComputed(() => {
    const state = trackerStore.getTrackerState(file.path);
    return state?.entries ?? new Map();
  });

  // Get current value - use useMemo to track dateIso prop changes
  const currentValue = useMemo(() => {
    const value = entries.value.get(dateIso);
    return value != null && !isNaN(Number(value)) ? Number(value) : 0;
  }, [entries.value, dateIso]);
  
  const [value, setValue] = useState(currentValue);
  const [isUpdated, setIsUpdated] = useState(false);

  // Update value when entries or dateIso change
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  // Write value to file
  const writeValue = useCallback(async (newValue: number) => {
    try {
      await plugin.writeLogLine(file, dateIso, String(newValue));
    } catch (err) {
      logError("PlusMinusControl: write error", err);
    }
  }, [plugin, file, dateIso]);

  // Handle minus click
  const handleMinus = useCallback(async () => {
    const newValue = (Number.isFinite(value) ? value : 0) - step;
    setValue(newValue);
    setIsUpdated(true);
    await writeValue(newValue);
    setTimeout(() => setIsUpdated(false), ANIMATION_DURATION_MS);
  }, [value, step, writeValue]);

  // Handle plus click
  const handlePlus = useCallback(async () => {
    const newValue = (Number.isFinite(value) ? value : 0) + step;
    setValue(newValue);
    setIsUpdated(true);
    await writeValue(newValue);
    setTimeout(() => setIsUpdated(false), ANIMATION_DURATION_MS);
  }, [value, step, writeValue]);

  return (
    <div class={CSS_CLASSES.ROW}>
      <button type="button" onClick={handleMinus}>−</button>
      <span 
        class={`${CSS_CLASSES.VALUE}${isUpdated ? ` ${CSS_CLASSES.VALUE_UPDATED}` : ""}`}
      >
        {value}
      </span>
      <button type="button" onClick={handlePlus}>+</button>
    </div>
  );
}

