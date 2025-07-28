import React from 'react';
import styled from 'styled-components';

export type TDividerProps = {
  /** Ориентация разделителя */
  orientation?: 'horizontal' | 'vertical';
  /** Вариант разделителя */
  variant?: 'fullWidth' | 'inset' | 'middle';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledDivider = styled.hr<TDividerProps>`
  border: none;
  margin: 0;
  flex-shrink: 0;
  background-color: var(--color-text-secondary);
  opacity: 0.12;

  ${({ orientation = 'horizontal' }) =>
    orientation === 'horizontal'
      ? `
        height: 1px;
        width: 100%;
      `
      : `
        width: 1px;
        height: 100%;
      `}

  ${({ variant = 'fullWidth' }) => {
    switch (variant) {
      case 'inset':
        return `
          margin-left: 72px;
        `;
      case 'middle':
        return `
          margin-left: 16px;
          margin-right: 16px;
        `;
      default:
        return '';
    }
  }}
`;

const Divider: React.FC<TDividerProps> = ({ ...props }) => {
  return <StyledDivider {...props} />;
};

export default Divider;
