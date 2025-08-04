import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { createPortal } from 'react-dom';

export type TTooltipProps = {
  /** Текст подсказки */
  title?: string;
  /** Позиция подсказки */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Задержка показа */
  enterDelay?: number;
  /** Задержка скрытия */
  leaveDelay?: number;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое */
  children?: React.ReactNode;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledTooltip = styled.div<{
  $placement: string;
  $visible: boolean;
  $x: number;
  $y: number;
}>`
  position: fixed;
  z-index: 1500;
  background-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.87));
  color: var(--color-tooltip-text, white);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: translate(${({ $x }) => $x}px, ${({ $y }) => $y}px);
  animation: ${({ $visible }) =>
    $visible
      ? css`
          ${fadeIn} 0.2s ease
        `
      : 'none'};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 4px solid transparent;
  }

  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return `
          &::before {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.87));
          }
        `;
      case 'bottom':
        return `
          &::before {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.87));
          }
        `;
      case 'left':
        return `
          &::before {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.87));
          }
        `;
      case 'right':
        return `
          &::before {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.87));
          }
        `;
      default:
        return '';
    }
  }}
`;

const Tooltip: React.FC<TTooltipProps> = ({
  title,
  placement = 'bottom',
  enterDelay = 200,
  leaveDelay = 0,
  style,
  className,
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const leaveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    switch (placement) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
        y = triggerRect.top - tooltipRect.height - 8 + scrollY;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
        y = triggerRect.bottom + 8 + scrollY;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8 + scrollX;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
        break;
      case 'right':
        x = triggerRect.right + 8 + scrollX;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
        break;
    }

    // Проверяем границы экрана
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x < 0) x = 8;
    if (x + tooltipRect.width > viewportWidth) x = viewportWidth - tooltipRect.width - 8;
    if (y < 0) y = 8;
    if (y + tooltipRect.height > viewportHeight) y = viewportHeight - tooltipRect.height - 8;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (enterTimerRef.current !== undefined) clearTimeout(enterTimerRef.current);
    if (leaveTimerRef.current !== undefined) clearTimeout(leaveTimerRef.current);

    enterTimerRef.current = setTimeout(() => {
      setVisible(true);
      setTimeout(() => calculatePosition(), 0);
    }, enterDelay);
  };

  const handleMouseLeave = () => {
    if (enterTimerRef.current !== undefined) clearTimeout(enterTimerRef.current);
    if (leaveTimerRef.current !== undefined) clearTimeout(leaveTimerRef.current);

    leaveTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, leaveDelay);
  };

  useEffect(() => {
    return () => {
      if (enterTimerRef.current !== undefined) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current !== undefined) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  if (!title) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {createPortal(
        <StyledTooltip
          ref={tooltipRef}
          $placement={placement}
          $visible={visible}
          $x={position.x}
          $y={position.y}
          style={style}
          className={className}
          {...props}
        >
          {title}
        </StyledTooltip>,
        document.body,
      )}
    </>
  );
};

export default Tooltip;
