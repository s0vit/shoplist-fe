import { TouchEvent, useRef, useState } from 'react';

const useLongPress = (callback: (event: TouchEvent) => void, ms = 300) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const triggeredRef = useRef(false);

  const handleTouchStart = (event: TouchEvent) => {
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
    triggeredRef.current = false;
    timeoutRef.current = setTimeout(() => {
      triggeredRef.current = true;
      callback(event);
    }, ms);
  };

  const handleTouchMove = (event: TouchEvent) => {
    const moveX = event.touches[0].clientX - startX;
    const moveY = event.touches[0].clientY - startY;

    if (Math.abs(moveX) > 20 || Math.abs(moveY) > 20) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current && !triggeredRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

export default useLongPress;
