import React from 'react';
import styled from 'styled-components';

export type TChipProps = {
  /** Текст или содержимое чипа */
  label?: React.ReactNode;
  /** Размер чипа */
  size?: 'small' | 'medium' | 'large';
  /** Вариант чипа */
  variant?: 'filled' | 'outlined';
  /** Цвет чипа */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Обработчик клика */
  onClick?: () => void;
  /** Обработчик удаления */
  onDelete?: () => void;
  /** Иконка удаления */
  deleteIcon?: React.ReactNode;
  /** Отключен ли чип */
  disabled?: boolean;
};

const StyledChip = styled.div<TChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.25;
  letter-spacing: 0.0178571429em;
  border-radius: 16px;
  white-space: nowrap;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          height: 24px;
          font-size: 0.75rem;
          padding: 0 8px;
        `;
      case 'large':
        return `
          height: 32px;
          font-size: 0.875rem;
          padding: 0 12px;
        `;
      default:
        return `
          height: 28px;
          font-size: 0.75rem;
          padding: 0 10px;
        `;
    }
  }}

  ${({ variant = 'filled', color = 'default' }) => {
    type StyleConfig = {
      backgroundColor: string;
      color: string;
      border?: string;
    };

    const colors: Record<string, Record<string, StyleConfig>> = {
      default: {
        filled: {
          backgroundColor: 'var(--color-text-secondary)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-text-secondary)',
        },
      },
      primary: {
        filled: {
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-black)',
          border: '1px solid var(--color-black)',
        },
      },
      secondary: {
        filled: {
          backgroundColor: 'var(--color-text-secondary)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-text-secondary)',
        },
      },
      error: {
        filled: {
          backgroundColor: 'var(--color-error)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-error)',
          border: '1px solid var(--color-error)',
        },
      },
      success: {
        filled: {
          backgroundColor: 'var(--color-success)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-success)',
          border: '1px solid var(--color-success)',
        },
      },
      warning: {
        filled: {
          backgroundColor: 'var(--color-warning)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-warning)',
          border: '1px solid var(--color-warning)',
        },
      },
      info: {
        filled: {
          backgroundColor: 'var(--color-info)',
          color: 'var(--color-white)',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--color-info)',
          border: '1px solid var(--color-info)',
        },
      },
    };

    const style = colors[color][variant];

    return `
      background-color: ${style.backgroundColor};
      color: ${style.color};
      ${variant === 'outlined' ? `border: ${style.border || ''};` : ''}
    `;
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.38;
    cursor: default;
    pointer-events: none;
  `}

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `}
  }
`;

const Chip: React.FC<TChipProps> = ({ label, onClick, onDelete, deleteIcon, ...props }) => {
  return (
    <StyledChip onClick={onClick} {...props}>
      {label}
      {onDelete && deleteIcon}
    </StyledChip>
  );
};

export default Chip;
