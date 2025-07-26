import { TIconName, TIconSize, ICON_SIZES } from './types';
import { ICON_MAP } from './iconImports';
import React from 'react';

export type TIconProps = {
  name: TIconName;
  size?: TIconSize | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
} & React.SVGProps<SVGSVGElement>;

const IconComponent = ({ name, size = 'md', color, className, style, onClick, ...props }: TIconProps) => {
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  const SvgIcon = ICON_MAP[name] as React.FC<React.SVGProps<SVGSVGElement>>;

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`);

    return null;
  }

  return (
    <SvgIcon
      onClick={onClick}
      width={iconSize}
      height={iconSize}
      style={{ color, ...style }}
      className={className}
      {...props}
    />
  );
};

export default IconComponent;
