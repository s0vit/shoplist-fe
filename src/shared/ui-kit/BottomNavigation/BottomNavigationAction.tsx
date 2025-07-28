import React from 'react';
import styled from 'styled-components';
import { useBottomNavigationContext } from './BottomNavigation';

export type TBottomNavigationActionProps = {
  /** Лейбл элемента */
  label?: string;
  /** Иконка элемента */
  icon?: React.ReactNode;
  /** Значение элемента */
  value?: string | number;
  /** Отключен ли элемент */
  disabled?: boolean;
  /** Активен ли элемент */
  active?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Дополнительные пропсы */
  sx?: Record<string, unknown>;
};

type TStyledBottomNavigationActionProps = {
  $disabled?: boolean;
  $active?: boolean;
};

const StyledBottomNavigationAction = styled.button<TStyledBottomNavigationActionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  min-width: 80px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--color-text-secondary);
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    background-color: var(--color-hover);
    color: var(--color-text-primary);
  }

  ${({ $active }) =>
    $active &&
    `
    color: var(--color-text-primary);
    background-color: var(--color-hover);
  `}

  .icon {
    margin-bottom: 4px;
    font-size: 1.5rem;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }
`;

const BottomNavigationAction: React.FC<TBottomNavigationActionProps> = ({
  label,
  icon,
  value,
  disabled = false,
  active: propActive = false,
  onClick,
  style,
  className,
  sx,
  ...props
}) => {
  const { value: contextValue, onChange } = useBottomNavigationContext();
  const isActive = propActive || (contextValue !== undefined && contextValue === value);

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
    <StyledBottomNavigationAction
      $disabled={disabled}
      $active={isActive}
      onClick={handleClick}
      style={{ ...style, ...sx }}
      className={className}
      data-value={value}
      {...props}
    >
      {icon && <div className="icon">{icon}</div>}
      {label && <div className="label">{label}</div>}
    </StyledBottomNavigationAction>
  );
};

export default BottomNavigationAction;
