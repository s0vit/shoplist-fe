import styled from 'styled-components';

export type TPrimaryButtonProps = {
  label?: React.ReactNode;
  width?: string;
  height?: string;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

type TStyledButtonProps = {
  $variant: 'contained' | 'outlined';
  width?: string;
  height?: string;
  disabled?: boolean;
};

const Button = styled.button<TStyledButtonProps>`
  width: ${({ width }) => width || '160px'};
  height: ${({ height }) => height || '53px'};
  border-radius: var(--border-radius-lg);
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-button);
  line-height: var(--line-height-button);
  letter-spacing: 0;
  text-transform: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: ${({ $variant }) => ($variant === 'outlined' ? `1px solid var(--color-button-outlined-border)` : 'none')};
  color: ${({ $variant }) => `var(--color-button-${$variant}-color)`};
  background-color: ${({ $variant }) => `var(--color-button-${$variant}-bg)`};
  padding: var(--spacing-sm) var(--spacing-md);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const PrimaryButton = ({
  label = 'Сохранить',
  variant = 'contained',
  width = '160px',
  height = '53px',
  disabled = false,
  onClick,
  style,
  type = 'button',
  className,
}: TPrimaryButtonProps) => {
  return (
    <Button
      $variant={variant}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
      style={style}
      type={type}
      className={className}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
