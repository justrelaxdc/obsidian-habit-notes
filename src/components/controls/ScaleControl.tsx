import { useState, useCallback, useRef, useEffect } from "preact/hooks";
import { CSS_CLASSES, DEFAULTS } from "../../constants";
import type { ScaleControlProps } from "../types";
import { logError } from "../../utils/notifications";

/**
 * Scale/Progress bar control with drag support
 * Note: No onValueChange callback needed - writeLogLine already updates the store
 */
export function ScaleControl({ file, dateIso, plugin, fileOptions, entries }: ScaleControlProps) {
  const minValue = parseFloat(fileOptions.minValue || String(DEFAULTS.MIN_VALUE)) || DEFAULTS.MIN_VALUE;
  const maxValue = parseFloat(fileOptions.maxValue || String(DEFAULTS.MAX_VALUE)) || DEFAULTS.MAX_VALUE;
  const step = parseFloat(fileOptions.step || String(DEFAULTS.STEP)) || DEFAULTS.STEP;

  const currentValue = entries.get(dateIso);
  let initialValue = minValue;
  if (currentValue != null && !isNaN(Number(currentValue))) {
    initialValue = Math.max(minValue, Math.min(maxValue, Number(currentValue)));
  }

  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  // Update value when entries change externally
  useEffect(() => {
    const newValue = entries.get(dateIso);
    if (newValue != null && !isNaN(Number(newValue))) {
      const numVal = Math.max(minValue, Math.min(maxValue, Number(newValue)));
      setValue(numVal);
    } else {
      // Reset to minValue when no value exists for the selected day
      setValue(minValue);
    }
  }, [entries, dateIso, minValue, maxValue]);

  // Calculate value from click position
  const calculateValue = useCallback((clientX: number): number => {
    if (!progressBarRef.current) return minValue;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const rawValue = minValue + (maxValue - minValue) * percentage;
    const steppedValue = Math.round((rawValue - minValue) / step) * step + minValue;
    return Math.max(minValue, Math.min(maxValue, steppedValue));
  }, [minValue, maxValue, step]);

  // Write value to file
  const writeValue = useCallback(async (newValue: number) => {
    try {
      await plugin.writeLogLine(file, dateIso, String(newValue));
    } catch (err) {
      logError("ScaleControl: write error", err);
    }
  }, [plugin, file, dateIso]);

  // Handle mouse down
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMoved.current = false;
    const newValue = calculateValue(e.clientX);
    setValue(newValue);
    e.preventDefault();
  }, [calculateValue]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    hasMoved.current = true;
    const newValue = calculateValue(e.clientX);
    setValue(newValue);
  }, [isDragging, calculateValue]);

  // Handle mouse up
  const handleMouseUp = useCallback(async () => {
    if (isDragging) {
      setIsDragging(false);
      if (hasMoved.current) {
        await writeValue(value);
      }
    }
  }, [isDragging, value, writeValue]);

  // Handle click (save immediately if no drag)
  const handleClick = useCallback(async (e: MouseEvent) => {
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    const target = e.target as HTMLElement;
    if (target.classList.contains(CSS_CLASSES.PROGRESS_BAR_PROGRESS) ||
        target.classList.contains(CSS_CLASSES.PROGRESS_BAR_VALUE) ||
        target.classList.contains(CSS_CLASSES.PROGRESS_BAR_LABEL_LEFT) ||
        target.classList.contains(CSS_CLASSES.PROGRESS_BAR_LABEL_RIGHT)) {
      return;
    }
    const newValue = calculateValue(e.clientX);
    setValue(newValue);
    await writeValue(newValue);
  }, [calculateValue, writeValue]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let newValue = value;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      newValue = Math.max(minValue, value - step);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      newValue = Math.min(maxValue, value + step);
    } else if (e.key === "Home") {
      e.preventDefault();
      newValue = minValue;
    } else if (e.key === "End") {
      e.preventDefault();
      newValue = maxValue;
    } else {
      return;
    }
    setValue(newValue);
  }, [value, minValue, maxValue, step]);

  const handleKeyUp = useCallback(async (e: KeyboardEvent) => {
    if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(e.key)) {
      await writeValue(value);
    }
  }, [value, writeValue]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <div class={CSS_CLASSES.PROGRESS_BAR_WRAPPER} data-internal-value={value}>
      <div
        ref={progressBarRef}
        class={CSS_CLASSES.PROGRESS_BAR_INPUT}
        tabIndex={0}
        role="button"
        aria-label={String(value)}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-valuenow={value}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        style={{ cursor: isDragging ? "col-resize" : undefined }}
      >
        <div
          class={CSS_CLASSES.PROGRESS_BAR_PROGRESS}
          role="slider"
          tabIndex={0}
          aria-valuemin={minValue}
          aria-valuemax={maxValue}
          aria-valuenow={value}
          style={{ width: `${percentage}%` }}
        />
        <span class={CSS_CLASSES.PROGRESS_BAR_VALUE}>{value}</span>
        <span class={CSS_CLASSES.PROGRESS_BAR_LABEL_LEFT}>{minValue}</span>
        <span class={CSS_CLASSES.PROGRESS_BAR_LABEL_RIGHT}>{maxValue}</span>
      </div>
    </div>
  );
}

