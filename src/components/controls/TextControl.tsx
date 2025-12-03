import { useState, useCallback, useRef, useEffect } from "preact/hooks";
import { CSS_CLASSES, PLACEHOLDERS } from "../../constants";
import type { TextControlProps } from "../types";
import { logError } from "../../utils/notifications";

// Debounce delay for text input (0.6 seconds)
const TEXT_DEBOUNCE_DELAY_MS = 600;

/**
 * Text input control with auto-save on input (debounced)
 * Note: No onValueChange callback needed - writeLogLine already updates the store
 */
export function TextControl({ file, dateIso, plugin, entries }: TextControlProps) {
  const currentValue = entries.get(dateIso);
  const initialValue = currentValue != null && typeof currentValue === "string" ? currentValue : "";
  
  const [inputValue, setInputValue] = useState(initialValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update input when entries change externally
  useEffect(() => {
    const newValue = entries.get(dateIso);
    const newInputValue = newValue != null && typeof newValue === "string" ? newValue : "";
    setInputValue(newInputValue);
  }, [entries, dateIso]);

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
          logError("TextControl: delete error", err);
        }
      };

      if (immediate) {
        await doDelete();
      } else {
        debounceRef.current = setTimeout(doDelete, TEXT_DEBOUNCE_DELAY_MS);
      }
      return;
    }

    const doWrite = async () => {
      try {
        const val = value.trim();
        await plugin.writeLogLine(file, dateIso, val);
      } catch (err) {
        logError("TextControl: write error", err);
      }
    };

    if (immediate) {
      await doWrite();
    } else {
      debounceRef.current = setTimeout(doWrite, TEXT_DEBOUNCE_DELAY_MS);
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
    const target = e.target as HTMLTextAreaElement;
    setInputValue(target.value);
    writeValue(target.value, false);
  }, [writeValue]);

  // Handle blur - immediate write
  const handleBlur = useCallback(() => {
    writeValue(inputValue, true);
  }, [inputValue, writeValue]);

  return (
    <div class={CSS_CLASSES.ROW}>
      <textarea
        class={CSS_CLASSES.TEXT_INPUT}
        placeholder={PLACEHOLDERS.TEXT_INPUT}
        value={inputValue}
        onInput={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

