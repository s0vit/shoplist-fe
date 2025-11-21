import { useEffect, useRef, useState } from 'react';

export type TTypingEffectOptions = {
  speed?: number;
  onComplete?: () => void;
};

const useTypingEffect = (text: string | null, isActive: boolean, options: TTypingEffectOptions = {}) => {
  const { speed = 20, onComplete } = options;
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const textRef = useRef(text ?? '');

  useEffect(() => {
    const nextText = text ?? '';
    textRef.current = nextText;
    indexRef.current = 0;

    if (!isActive) {
      setDisplayed(nextText);
    } else {
      setDisplayed('');
    }
  }, [text, isActive]);

  useEffect(() => {
    const currentText = textRef.current;

    if (!isActive) {
      if (currentText) {
        setDisplayed(currentText);
      }

      return;
    }

    if (!currentText) {
      setDisplayed('');
      onComplete?.();

      return;
    }

    const interval = setInterval(() => {
      indexRef.current += 1;

      if (indexRef.current >= currentText.length) {
        setDisplayed(currentText);
        clearInterval(interval);
        onComplete?.();

        return;
      }

      setDisplayed(currentText.slice(0, indexRef.current));
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, speed, onComplete]);

  return displayed;
};

export default useTypingEffect;
