import { useEffect, useRef, useState } from "react";

const useDebounce = (
  value,
  delay = 500,
  options = { immediate: false, maxWait: null }
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const timeoutRef = useRef(null);
  const maxWaitRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    // Immediate execution (first call)
    if (options.immediate && firstRender.current) {
      setDebouncedValue(value);
      firstRender.current = false;
      return;
    }

    // Clear previous timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (maxWaitRef.current) clearTimeout(maxWaitRef.current);

    // Main debounce timer
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Max wait support
    if (options.maxWait) {
      maxWaitRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, options.maxWait);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(maxWaitRef.current);
    };
  }, [value, delay, options.immediate, options.maxWait]);

  return debouncedValue;
};

export default useDebounce;
