import React from 'react';
import styled from 'styled-components';

export type TFabProps = {
  /** Цвет кнопки */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  /** Размер кнопки */
  size?: 'small' | 'medium' | 'large';
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Дополнительные пропсы */
  sx?: Record<string, unknown>;
  /** Содержимое кнопки */
  children?: React.ReactNode;
};

type TStyledFabProps = {
  $color: string;
  $size: string;
  $disabled: boolean;
};

const StyledFab = styled.button<TStyledFabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12);

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          width: 40px;
          height: 40px;
        `;
      case 'large':
        return `
          width: 56px;
          height: 56px;
        `;
      default:
        return `
          width: 56px;
          height: 56px;
        `;
    }
  }}

  ${({ $color, $disabled }) => {
    if ($disabled) {
      return `
        background-color: var(--color-text-disabled);
        color: var(--color-text-secondary);
        cursor: not-allowed;
        box-shadow: none;
      `;
    }

    switch ($color) {
      case 'primary':
        return `
          background-color: var(--color-primary);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-primary-dark);
          }
        `;
      case 'secondary':
        return `
          background-color: var(--color-secondary);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-secondary-dark);
          }
        `;
      case 'success':
        return `
          background-color: var(--color-success);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-success-dark);
          }
        `;
      case 'error':
        return `
          background-color: var(--color-error);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-error-dark);
          }
        `;
      case 'info':
        return `
          background-color: var(--color-info);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-info-dark);
          }
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-warning-dark);
          }
        `;
      default:
        return `
          background-color: var(--color-primary);
          color: var(--color-white);
          &:hover {
            background-color: var(--color-primary-dark);
          }
        `;
    }
  }}

  &:hover {
    box-shadow:
      0 5px 8px -1px rgba(0, 0, 0, 0.2),
      0 8px 16px 0 rgba(0, 0, 0, 0.14),
      0 3px 14px 0 rgba(0, 0, 0, 0.12);
  }

  &:active {
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
`;

const Fab: React.FC<TFabProps> = ({
  color = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  style,
  className,
  sx,
  children,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <StyledFab
      $color={color}
      $size={size}
      $disabled={disabled}
      onClick={handleClick}
      style={{ ...style, ...sx }}
      className={className}
      {...props}
    >
      {children}
    </StyledFab>
  );
};

export default Fab;
