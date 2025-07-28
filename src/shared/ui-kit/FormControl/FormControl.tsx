import React from 'react';
import styled from 'styled-components';

export type TFormControlProps = {
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Отключен ли компонент */
  disabled?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое FormControl */
  children?: React.ReactNode;
};

type TStyledFormControlProps = {
  $size: string;
  $disabled: boolean;
  $fullWidth: boolean;
};

const StyledFormControl = styled.div<TStyledFormControlProps>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  vertical-align: top;

  ${({ $fullWidth }) =>
    $fullWidth &&
    `
    width: 100%;
  `}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          font-size: 1.25rem;
        `;
      default:
        return `
          font-size: 1rem;
        `;
    }
  }}

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: 0.38;
    pointer-events: none;
  `}
`;

const FormControl: React.FC<TFormControlProps> = ({
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
  className,
  children,
  ...props
}) => {
  return (
    <StyledFormControl
      $size={size}
      $disabled={disabled}
      $fullWidth={fullWidth}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledFormControl>
  );
};

export default FormControl;
