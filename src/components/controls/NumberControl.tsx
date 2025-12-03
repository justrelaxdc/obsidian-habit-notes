import { useState, useCallback, useRef, useEffect, useMemo } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { CSS_CLASSES, ANIMATION_DURATION_MS, DEBOUNCE_DELAY_MS } from "../../constants";
import type { NumberControlProps } from "../types";
import { logError } from "../../utils/notifications";
import { trackerStore } from "../../store";

/**
 * Number input control with debounce
 * Accesses entries via computed signal internally for proper reactivity
 */
export function NumberControl({ file, dateIso, plugin }: NumberControlProps) {
  // Access entries via computed signal - only re-renders when this tracker's entries change
  const entries = useComputed(() => {
    const state = trackerStore.getTrackerState(file.path);
    return state?.entries ?? new Map();
  });

  // Get current value - use useMemo to track dateIso prop changes
  const currentValue = useMemo(() => {
    const value = entries.value.get(dateIso);
    return value != null && !isNaN(Number(value)) ? String(value) : "";
  }, [entries.value, dateIso]);

  const [inputValue, setInputValue] = useState(currentValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update input when entries or dateIso change
  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  // Write value to file
  const writeValue = useCallback(async (value: string, immediate = false) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    // If value is empty, delete the entry
    if (value === "" || value.trim() === "") {
      const doDelete = async () => {
        try {
          await plugin.deleteEntry(file, dateIso);
        } catch (err) {
          logError("NumberControl: delete error", err);
        }
      };

      if (immediate) {
        await doDelete();
      } else {
        debounceRef.current = setTimeout(doDelete, DEBOUNCE_DELAY_MS);
      }
      return;
    }

    // Validate that it's a number
    const numVal = Number(value);
    if (isNaN(numVal)) return;

    const doWrite = async () => {
      try {
        await plugin.writeLogLine(file, dateIso, String(numVal));
      } catch (err) {
        logError("NumberControl: write error", err);
      }
    };

    if (immediate) {
      await doWrite();
    } else {
      debounceRef.current = setTimeout(doWrite, DEBOUNCE_DELAY_MS);
    }
  }, [plugin, file, dateIso]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  // Handle input change
  const handleChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    writeValue(target.value, false);

    // Visual feedback
    if (inputRef.current) {
      inputRef.current.style.transform = "scale(0.98)";
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.transform = "";
        }
      }, ANIMATION_DURATION_MS);
    }
  }, [writeValue]);

  // Handle enter key - immediate write
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      writeValue(inputValue, true);
    }
  }, [inputValue, writeValue]);

  // Handle blur - immediate write
  const handleBlur = useCallback(() => {
    writeValue(inputValue, true);
  }, [inputValue, writeValue]);

  return (
    <div class={CSS_CLASSES.ROW}>
      <input
        ref={inputRef}
        type="number"
        placeholder="0"
        value={inputValue}
        onInput={handleChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
      />
    </div>
  );
}

