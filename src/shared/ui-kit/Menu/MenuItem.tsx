import React from 'react';
import styled from 'styled-components';

export type TMenuItemProps = {
  /** Обработчик клика */
  onClick?: () => void;
  /** Отключен ли элемент */
  disabled?: boolean;
  /** Разделитель после элемента */
  divider?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое элемента */
  children?: React.ReactNode;
};

type TStyledMenuItemProps = {
  $disabled?: boolean;
  $divider?: boolean;
};

const StyledMenuItem = styled.div<TStyledMenuItemProps>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: var(--color-text-primary);
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: var(--color-hover);
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: 0.38;
    cursor: default;
    pointer-events: none;
  `}

  ${({ $divider }) =>
    $divider &&
    `
    border-bottom: 1px solid var(--color-border);
  `}
`;

const MenuItem: React.FC<TMenuItemProps> = ({ onClick, disabled, divider, style, className, children, ...props }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <StyledMenuItem
      onClick={handleClick}
      $disabled={disabled}
      $divider={divider}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
