import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { TIconName, TIconSize } from '../Icon/types';

export type TIconButtonProps = {
  icon?: TIconName;
  iconSize?: TIconSize | number;
  iconColor?: string;
  iconVariant?: 'primary' | 'secondary' | 'disabled';
  width?: string;
  height?: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
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

const sizeMap: Record<string, { width: string; height: string }> = {
  xs: { width: '24px', height: '24px' },
  sm: { width: '32px', height: '32px' },
  md: { width: '40px', height: '40px' },
  lg: { width: '48px', height: '48px' },
  xl: { width: '56px', height: '56px' },
};

const IconButtonStyled = styled.button<TStyledIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  border-radius: var(--border-radius-md);
  font-family: var(--font-family), serif;
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
    outline: 2px solid var(--color-btn-focus-bg);
    outline-offset: 2px;
  }
`;

const IconButton = ({
  icon,
  iconSize = 'md',
  iconColor,
  iconVariant = 'primary',
  width,
  height,
  variant = 'text',
  disabled = false,
  onClick,
  style,
  type = 'button',
  className,
  children,
}: TIconButtonProps) => {
  let defaultWidth = '40px';
  let defaultHeight = '40px';
  if (typeof iconSize === 'string' && sizeMap[iconSize]) {
    const { width: sizeWidth, height: sizeHeight } = sizeMap[iconSize];
    defaultWidth = sizeWidth;
    defaultHeight = sizeHeight;
  }

  const finalWidth = width || defaultWidth;
  const finalHeight = height || defaultHeight;

  // Определяем вариант иконки на основе состояния кнопки
  const getIconVariant = () => {
    if (disabled) return 'disabled';

    return iconVariant;
  };

  return (
    <IconButtonStyled
      $variant={variant}
      width={finalWidth}
      height={finalHeight}
      disabled={disabled}
      onClick={onClick}
      style={style}
      type={type}
      className={className}
    >
      {icon && <Icon name={icon} size={iconSize} color={iconColor} variant={getIconVariant()} />}
      {children}
    </IconButtonStyled>
  );
};

export default IconButton;
