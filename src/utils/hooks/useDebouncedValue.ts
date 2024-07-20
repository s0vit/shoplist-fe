import { useEffect, useRef, useState } from 'react';

const useDebouncedValue = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue as T;
};

export default useDebouncedValue;
