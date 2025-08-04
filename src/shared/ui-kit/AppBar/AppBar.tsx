import React from 'react';
import styled from 'styled-components';

export type TAppBarProps = {
  /** Позиция AppBar */
  position?: 'fixed' | 'absolute' | 'relative' | 'static';
  /** Цвет AppBar */
  color?: 'default' | 'primary' | 'secondary' | 'inherit' | 'transparent';
  /** Elevation (тень) */
  elevation?: number;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое AppBar */
  children?: React.ReactNode;
};

type TStyledAppBarProps = {
  $position: string;
  $color: string;
  $elevation: number;
};

const StyledAppBar = styled.div<TStyledAppBarProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--color-card-bg);
  color: var(--color-text-primary);
  box-shadow: ${({ $elevation }) => {
    if ($elevation === 0) return 'none';

    return `0 ${$elevation}px ${$elevation * 2}px rgba(0, 0, 0, 0.12)`;
  }};

  ${({ $position }) => {
    switch ($position) {
      case 'fixed':
        return `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
        `;
      case 'absolute':
        return `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
        `;
      case 'relative':
        return `
          position: relative;
        `;
      case 'static':
        return `
          position: static;
        `;
      default:
        return `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
        `;
    }
  }}

  ${({ $color }) => {
    switch ($color) {
      case 'primary':
        return `
          background-color: var(--color-primary);
          color: var(--color-white);
        `;
      case 'secondary':
        return `
          background-color: var(--color-secondary);
          color: var(--color-white);
        `;
      case 'transparent':
        return `
          background-color: transparent;
          box-shadow: none;
        `;
      case 'inherit':
        return `
          background-color: inherit;
          color: inherit;
        `;
      default:
        return `
          background-color: var(--color-card-bg);
          color: var(--color-text-primary);
        `;
    }
  }}
`;

const AppBar: React.FC<TAppBarProps> = ({
  position = 'fixed',
  color = 'default',
  elevation = 4,
  style,
  className,
  children,
  ...props
}) => {
  return (
    <StyledAppBar
      $position={position}
      $color={color}
      $elevation={elevation}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledAppBar>
  );
};

export default AppBar;
