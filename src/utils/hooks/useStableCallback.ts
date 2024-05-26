import { useRef } from 'react';

export const useStableCallback = <P extends unknown[], R>(fn: (...args: P) => R): ((...args: P) => R) => {
  const inputRef = useRef(fn);
  inputRef.current = fn;
  const outputRef = useRef((...args: P) => inputRef.current(...args));
  return outputRef.current;
};
