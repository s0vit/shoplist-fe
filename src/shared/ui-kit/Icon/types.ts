// Доступные иконки
export type TIconName =
  | 'plus'
  | 'decline'
  | 'chevroneRight'
  | 'pencilSquare'
  | 'calendar'
  | 'burgerMenu'
  | 'home'
  | 'card'
  | 'coin'
  | 'menu'
  | 'camera'
  | 'eye'
  | 'eyeSlash';

// Размеры иконок
export type TIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Варианты иконок
export type TIconVariant = 'primary' | 'secondary' | 'disabled';

// Маппер размеров
export const ICON_SIZES: Record<TIconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

// Данные иконок
export type TIconData = {
  viewBox: string;
  path: string;
};
