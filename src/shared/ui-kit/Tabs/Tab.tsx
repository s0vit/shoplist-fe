import React from 'react';
import styled from 'styled-components';
import { useTabsContext } from './Tabs';

export type TTabProps = {
  /** Лейбл таба */
  label?: string;
  /** Значение таба */
  value?: string | number;
  /** Отключен ли таб */
  disabled?: boolean;
  /** Обернуть текст */
  wrapped?: boolean;
  /** Иконка */
  icon?: React.ReactNode;
  /** Позиция иконки */
  iconPosition?: 'top' | 'bottom' | 'start' | 'end';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Обработчик клика */
  onClick?: () => void;
};

type TStyledTabProps = {
  $disabled: boolean;
  $wrapped: boolean;
  $iconPosition: string;
};

const StyledTab = styled.button<TStyledTabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  min-width: 90px;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.38 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    color: var(--color-text-primary);
    background-color: var(--color-hover);
  }

  &:active {
    background-color: var(--color-hover);
  }

  ${({ $wrapped }) =>
    $wrapped &&
    `
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  `}

  ${({ $iconPosition }) => {
    switch ($iconPosition) {
      case 'top':
        return `
          flex-direction: column;
          gap: 4px;
        `;
      case 'bottom':
        return `
          flex-direction: column-reverse;
          gap: 4px;
        `;
      case 'start':
        return `
          flex-direction: row;
          gap: 8px;
        `;
      case 'end':
        return `
          flex-direction: row-reverse;
          gap: 8px;
        `;
      default:
        return `
          flex-direction: row;
          gap: 8px;
        `;
    }
  }}

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }

  &.active {
    color: var(--color-primary);

    &::after {
      background-color: var(--color-primary);
    }
  }
`;

const Tab: React.FC<TTabProps> = ({
  label,
  value,
  disabled = false,
  wrapped = false,
  icon,
  iconPosition = 'start',
  style,
  className,
  onClick,
  ...props
}) => {
  const { value: contextValue, onChange } = useTabsContext();
  const isActive = contextValue !== undefined && contextValue === value;

  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }

      if (onChange && value !== undefined) {
        onChange(new Event('click') as unknown as React.SyntheticEvent, value);
      }
    }
  };

  return (
    <StyledTab
      $disabled={disabled}
      $wrapped={wrapped}
      $iconPosition={iconPosition}
      onClick={handleClick}
      style={style}
      className={`${className || ''} ${isActive ? 'active' : ''}`}
      data-value={value}
      {...props}
    >
      {icon && iconPosition === 'top' && icon}
      {icon && iconPosition === 'start' && icon}
      {label && <span>{label}</span>}
      {icon && iconPosition === 'end' && icon}
      {icon && iconPosition === 'bottom' && icon}
    </StyledTab>
  );
};

export default Tab;
