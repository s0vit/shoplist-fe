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

const StyledBottomNavigationAction = styled.div<TStyledBottomNavigationActionProps>`
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  .label {
    font-size: 0.75rem;
    color: ${({ $active }) => ($active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)')};
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
      {icon}
      {label && <div className="label">{label}</div>}
    </StyledBottomNavigationAction>
  );
};

export default BottomNavigationAction;
