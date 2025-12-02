import { useState, useCallback, useRef, useEffect } from "preact/hooks";
import { CSS_CLASSES, ANIMATION_DURATION_MS, DEBOUNCE_DELAY_MS } from "../../constants";
import type { NumberControlProps } from "../types";

/**
 * Number input control with debounce
 */
export function NumberControl({ file, dateIso, plugin, fileOptions, entries, onValueChange }: NumberControlProps) {
  const currentValue = entries.get(dateIso);
  const initialValue = currentValue != null && !isNaN(Number(currentValue)) ? String(currentValue) : "";
  
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update input when entries change externally
  useEffect(() => {
    const newValue = entries.get(dateIso);
    const newInputValue = newValue != null && !isNaN(Number(newValue)) ? String(newValue) : "";
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
          await onValueChange();
        } catch (err) {
          console.error("NumberControl: delete error", err);
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
        await onValueChange();
      } catch (err) {
        console.error("NumberControl: write error", err);
      }
    };

    if (immediate) {
      await doWrite();
    } else {
      debounceRef.current = setTimeout(doWrite, DEBOUNCE_DELAY_MS);
    }
  }, [plugin, file, dateIso, onValueChange]);

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

