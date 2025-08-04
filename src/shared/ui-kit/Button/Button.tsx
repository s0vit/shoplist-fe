import styled from 'styled-components';

export type TPrimaryButtonProps = {
  label?: React.ReactNode;
  width?: string;
  height?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLElement> | React.TouchEvent) => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

type TStyledButtonProps = {
  $variant: 'contained' | 'outlined';
  $size: 'small' | 'medium' | 'large';
  width?: string;
  height?: string;
  disabled?: boolean;
};

const Button = styled.button<TStyledButtonProps>`
  width: ${({ width }) => width || '160px'};
  height: ${({ height }) => height || 'auto'};
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

  ${({ $size = 'medium' }) => {
    switch ($size) {
      case 'small':
        return `
          padding: 4px 8px;
          font-size: 0.75rem;
          line-height: 1;
        `;
      case 'large':
        return `
          padding: 12px 24px;
          font-size: 1rem;
          line-height: 1.5;
        `;
      default:
        return `
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: var(--font-size-button);
          line-height: 1.25;
        `;
    }
  }}

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const PrimaryButton = ({
  label = 'Сохранить',
  variant = 'contained',
  width = '160px',
  height = 'auto',
  size = 'medium',
  disabled = false,
  onClick,
  onContextMenu,
  style,
  type = 'button',
  className,
}: TPrimaryButtonProps) => {
  return (
    <Button
      $variant={variant}
      $size={size}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={style}
      type={type}
      className={className}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
