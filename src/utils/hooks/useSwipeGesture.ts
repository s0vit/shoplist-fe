import { useEffect, useRef } from 'react';

type SwipeDirection = 'up' | 'down' | 'left' | 'right';

interface SwipeGestureOptions {
  onSwipe?: (direction: SwipeDirection) => void;
  onSwipeDown?: () => void;
  onSwipeUp?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions) => {
  const { onSwipe, onSwipeDown, onSwipeUp, onSwipeLeft, onSwipeRight, minSwipeDistance = 50 } = options;

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (Math.max(absDeltaX, absDeltaY) < minSwipeDistance) {
        touchStartRef.current = null;

        return;
      }

      let direction: SwipeDirection;

      if (absDeltaX > absDeltaY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      onSwipe?.(direction);

      switch (direction) {
        case 'down':
          onSwipeDown?.();
          break;
        case 'up':
          onSwipeUp?.();
          break;
        case 'left':
          onSwipeLeft?.();
          break;
        case 'right':
          onSwipeRight?.();
          break;
      }

      touchStartRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, onSwipeDown, onSwipeUp, onSwipeLeft, onSwipeRight, minSwipeDistance]);

  return elementRef;
};
