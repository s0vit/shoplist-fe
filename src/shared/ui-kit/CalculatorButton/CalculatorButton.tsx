import React from 'react';
import styled from 'styled-components';

export interface CalculatorButtonProps {
  /** Текст кнопки (цифра или символ) - не нужен для backspace */
  children?: React.ReactNode;
  /** Тип кнопки */
  variant?: 'calculator' | 'backspace' | 'comma';
  /** Обработчик клика */
  onClick?: () => void;
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
}

interface StyledButtonProps {
  $variant: 'calculator' | 'backspace' | 'comma';
  $disabled: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 96px;
  height: 42px;
  border-radius: 5px;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $disabled }) =>
    $disabled ? 'var(--color-calculator-button-disabled-bg)' : 'var(--color-calculator-button-bg)'};
  color: ${({ $disabled }) =>
    $disabled ? 'var(--color-calculator-button-disabled-text)' : 'var(--color-calculator-button-text)'};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-inter);
  font-weight: 500;
  font-size: 28px;
  line-height: 1.14;
  user-select: none;

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? 'var(--color-calculator-button-disabled-bg)' : 'var(--color-calculator-button-hover-bg)'};
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'scale(0.98)')};
  }

  &:active {
    background-color: ${({ $disabled }) =>
      $disabled ? 'var(--color-calculator-button-disabled-bg)' : 'var(--color-calculator-button-active-bg)'};
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'scale(0.95)')};
  }

  &:focus {
    outline: 2px solid var(--color-calculator-button-text);
    outline-offset: 2px;
  }
`;

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  children,
  variant = 'calculator',
  onClick,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const getButtonContent = () => {
    switch (variant) {
      case 'backspace':
        return '⌫';
      case 'comma':
        return ',';
      default:
        return children;
    }
  };

  return (
    <StyledButton
      $variant={variant}
      $disabled={disabled}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      type="button"
    >
      {getButtonContent()}
    </StyledButton>
  );
};
