import React from 'react';
import styled from 'styled-components';

export type TToolbarProps = {
  /** Минимальная высота */
  minHeight?: string;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое Toolbar */
  children?: React.ReactNode;
};

const StyledToolbar = styled.div<TToolbarProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  min-height: ${({ minHeight }) => minHeight || '64px'};
  width: 100%;
`;

const Toolbar: React.FC<TToolbarProps> = ({ minHeight, style, className, children, ...props }) => {
  return (
    <StyledToolbar minHeight={minHeight} style={style} className={className} {...props}>
      {children}
    </StyledToolbar>
  );
};

export default Toolbar;
