import { useEffect, useRef, useState } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

interface PinchZoomOptions {
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

export const usePinchZoom = (options: PinchZoomOptions = {}) => {
  const { minScale = 1, maxScale = 4, initialScale = 1 } = options;

  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const initialDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef(initialScale);
  const isDraggingRef = useRef(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const resetZoom = useStableCallback(() => {
    setScale(initialScale);
    setPosition({ x: 0, y: 0 });
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getDistance = (touches: TouchList) => {
      const touch1 = touches[0];
      const touch2 = touches[1];
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;

      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        initialDistanceRef.current = getDistance(e.touches);
        initialScaleRef.current = scale;
        isDraggingRef.current = false;
      } else if (e.touches.length === 1 && scale > 1) {
        isDraggingRef.current = true;
        lastTouchRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistanceRef.current) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scaleChange = currentDistance / initialDistanceRef.current;
        const newScale = Math.min(Math.max(initialScaleRef.current * scaleChange, minScale), maxScale);
        setScale(newScale);
      } else if (e.touches.length === 1 && isDraggingRef.current && lastTouchRef.current) {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouchRef.current.x;
        const deltaY = touch.clientY - lastTouchRef.current.y;

        setPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        lastTouchRef.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDistanceRef.current = null;
      }

      if (e.touches.length === 0) {
        isDraggingRef.current = false;
        lastTouchRef.current = null;

        if (scale === initialScale) {
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    let lastTapTime = 0;
    const handleDoubleTap = (e: TouchEvent) => {
      const currentTime = Date.now();
      const tapGap = currentTime - lastTapTime;

      if (tapGap < 300 && tapGap > 0) {
        e.preventDefault();
        if (scale > initialScale) {
          resetZoom();
        } else {
          setScale(maxScale / 2);
        }
      }

      lastTapTime = currentTime;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchstart', handleDoubleTap, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchstart', handleDoubleTap);
    };
  }, [scale, minScale, maxScale, initialScale, resetZoom]);

  return {
    elementRef,
    scale,
    position,
    resetZoom,
    style: {
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      transition: isDraggingRef.current ? 'none' : 'transform 0.2s ease-out',
    },
  };
};
