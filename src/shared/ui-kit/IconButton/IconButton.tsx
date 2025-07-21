import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { TIconName, TIconSize } from '../Icon/types';

export type TIconButtonProps = {
  icon: TIconName;
  iconSize?: TIconSize | number;
  iconColor?: string;
  width?: string;
  height?: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
};

type TStyledIconButtonProps = {
  $variant: 'contained' | 'outlined' | 'text';
  width?: string;
  height?: string;
  disabled?: boolean;
};

const IconButtonStyled = styled.button<TStyledIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  border-radius: var(--border-radius-md);
  font-family: var(--font-family);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: ${({ $variant }) => {
    if ($variant === 'outlined') return `1px solid var(--color-button-outlined-border)`;
    if ($variant === 'contained') return 'none';

    return 'none';
  }};
  color: ${({ $variant }) => {
    if ($variant === 'text') return 'var(--color-text-primary)';

    return `var(--color-button-${$variant}-color)`;
  }};
  background-color: ${({ $variant }) => {
    if ($variant === 'text') return 'transparent';

    return `var(--color-button-${$variant}-bg)`;
  }};
  padding: var(--spacing-xs);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $variant, disabled }) => {
      if (disabled) return 'inherit';
      if ($variant === 'text') return 'var(--color-background-hover)';

      return `var(--color-button-${$variant}-hover-bg)`;
    }};
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const IconButton = ({
  icon,
  iconSize = 'md',
  iconColor,
  width = '40px',
  height = '40px',
  variant = 'text',
  disabled = false,
  onClick,
  style,
  type = 'button',
  className,
  children,
}: TIconButtonProps) => {
  return (
    <IconButtonStyled
      $variant={variant}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
      style={style}
      type={type}
      className={className}
    >
      <Icon name={icon} size={iconSize} color={iconColor} />
      {children}
    </IconButtonStyled>
  );
};

export default IconButton;
