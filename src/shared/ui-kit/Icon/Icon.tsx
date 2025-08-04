import { TIconName, TIconSize, ICON_SIZES } from './types';
import { ICON_MAP } from './iconImports';
import React from 'react';
import styles from './Icon.module.scss';

export type TIconProps = {
  name: TIconName;
  size?: TIconSize | number;
  color?: string;
  variant?: 'primary' | 'secondary' | 'disabled';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
} & React.SVGProps<SVGSVGElement>;

const IconComponent = ({
  name,
  size = 'md',
  color,
  variant = 'primary',
  className,
  style,
  onClick,
  ...props
}: TIconProps) => {
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  const SvgIcon = ICON_MAP[name] as React.FC<React.SVGProps<SVGSVGElement>>;

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`);

    return null;
  }

  // Определяем цвет иконки на основе variant и темы
  const getIconColor = () => {
    if (color) return color;

    switch (variant) {
      case 'primary':
        return 'var(--color-icon-primary)';
      case 'secondary':
        return 'var(--color-icon-secondary)';
      case 'disabled':
        return 'var(--color-icon-disabled)';
      default:
        return 'var(--color-icon-primary)';
    }
  };

  // Формируем классы
  const iconClasses = [
    styles.icon,
    variant === 'primary' && styles.iconPrimary,
    variant === 'secondary' && styles.iconSecondary,
    variant === 'disabled' && styles.iconDisabled,
    onClick && styles.iconClickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={iconClasses}
      style={{
        width: iconSize,
        height: iconSize,
        ...style,
      }}
    >
      <SvgIcon
        onClick={onClick}
        width={iconSize}
        height={iconSize}
        style={{
          color: getIconColor(),
          fill: 'currentColor',
        }}
        {...props}
      />
    </div>
  );
};

export default IconComponent;
