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
  | 'menu';

// Размеры иконок
export type TIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
