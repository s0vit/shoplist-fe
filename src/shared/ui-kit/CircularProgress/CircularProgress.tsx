import React from 'react';
import styled, { keyframes, css } from 'styled-components';

export type TCircularProgressProps = {
  /** Размер индикатора */
  size?: number | string;
  /** Толщина линии */
  thickness?: number;
  /** Значение прогресса (0-100) */
  value?: number;
  /** Вариант индикатора */
  variant?: 'determinate' | 'indeterminate';
  /** Цвет индикатора */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledCircularProgress = styled.div<TCircularProgressProps>`
  display: inline-block;
  position: relative;
  width: ${({ size = 40 }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size = 40 }) => (typeof size === 'number' ? `${size}px` : size)};

  ${({ color = 'primary' }) => {
    const colors = {
      primary: 'var(--color-black)',
      secondary: 'var(--color-text-secondary)',
      error: 'var(--color-error)',
      info: 'var(--color-info)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
    };

    return `color: ${colors[color]};`;
  }}
`;

const CircularProgressSvg = styled.svg<{ size: number | string }>`
  display: block;
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  transform: rotate(-90deg);
`;

const CircularProgressCircle = styled.circle<{
  thickness: number;
  variant: string;
  value?: number;
  size: number | string;
}>`
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: ${({ thickness = 3.6 }) => thickness};
  fill: transparent;
  stroke-dasharray: ${({ size }) => {
    const radius = typeof size === 'number' ? size / 2 - 4 : 16;

    return `${2 * Math.PI * radius}`;
  }};
  stroke-dashoffset: ${({ variant, value = 0, size }) => {
    if (variant === 'determinate') {
      const radius = typeof size === 'number' ? size / 2 - 4 : 16;
      const circumference = 2 * Math.PI * radius;

      return `${circumference - (value / 100) * circumference}`;
    }

    return 0;
  }};
  animation: ${({ variant }) =>
    variant === 'indeterminate'
      ? css`
          ${spinAnimation} 1.4s linear infinite
        `
      : 'none'};
`;

const CircularProgress: React.FC<TCircularProgressProps> = ({
  size = 40,
  thickness = 3.6,
  value,
  variant = 'indeterminate',
  ...props
}) => {
  const radius = typeof size === 'number' ? size / 2 - 4 : 16;

  return (
    <StyledCircularProgress size={size} {...props}>
      <CircularProgressSvg size={size}>
        <CircularProgressCircle
          cx={typeof size === 'number' ? size / 2 : 20}
          cy={typeof size === 'number' ? size / 2 : 20}
          r={radius}
          thickness={thickness}
          variant={variant}
          value={value}
          size={size}
        />
      </CircularProgressSvg>
    </StyledCircularProgress>
  );
};

export default CircularProgress;
