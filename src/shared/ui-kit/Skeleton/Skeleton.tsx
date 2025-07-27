import React from 'react';
import styled, { keyframes } from 'styled-components';

export type TSkeletonProps = {
  /** Вариант скелетона */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Ширина скелетона */
  width?: string | number;
  /** Высота скелетона */
  height?: string | number;
  /** Анимация */
  animation?: 'pulse' | 'wave' | false;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const StyledSkeleton = styled.div<TSkeletonProps>`
  display: block;
  background-color: var(--color-text-secondary);
  opacity: 0.12;
  border-radius: 4px;

  ${({ variant = 'text' }) => {
    switch (variant) {
      case 'circular':
        return `
          border-radius: 50%;
        `;
      case 'rectangular':
        return `
          border-radius: 0;
        `;
      default:
        return `
          border-radius: 4px;
        `;
    }
  }}

  ${({ width }) => width && `width: ${typeof width === 'number' ? `${width}px` : width};`}
  ${({ height }) => height && `height: ${typeof height === 'number' ? `${height}px` : height};`}

  ${({ variant = 'text' }) => {
    if (variant === 'text') {
      return `
        height: 1em;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
      `;
    }

    return '';
  }}

  ${({ animation = 'pulse' }) => {
    if (animation === 'pulse') {
      return `
        animation: ${pulseAnimation} 1.5s ease-in-out 0.5s infinite;
      `;
    }

    if (animation === 'wave') {
      return `
        position: relative;
        overflow: hidden;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: ${waveAnimation} 1.6s linear infinite;
        }
      `;
    }

    return '';
  }}
`;

const Skeleton: React.FC<TSkeletonProps> = ({ ...props }) => {
  return <StyledSkeleton {...props} />;
};

export default Skeleton;
