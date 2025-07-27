import { useEffect, useState } from 'react';

export interface ThemeColors {
  // Text colors
  textPrimary: string;
  textSecondary: string;

  // Background colors
  cardBg: string;
  cardShadow: string;

  // Button colors
  buttonContainedBg: string;
  buttonContainedColor: string;
  buttonContainedDisabled: string;
  buttonOutlinedBg: string;
  buttonOutlinedColor: string;
  buttonOutlinedBorder: string;
  buttonOutlinedDisabled: string;

  // Icon colors
  iconPrimary: string;
  iconSecondary: string;
  iconDisabled: string;

  // Status colors
  error: string;
  success: string;
  warning: string;

  // Category colors
  categoryGreen: string;
  categoryBlue: string;
  categoryRed: string;
  categoryYellow: string;
  categoryOrange: string;
  categoryPurple: string;
  categoryPink: string;
  categoryTurquoise: string;

  // Utility colors
  black: string;
  white: string;
  graphite: string;
}

const getCSSVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const getThemeColors = (): ThemeColors => {
  return {
    // Text colors
    textPrimary: getCSSVariable('--color-text-primary'),
    textSecondary: getCSSVariable('--color-text-secondary'),

    // Background colors
    cardBg: getCSSVariable('--color-card-bg'),
    cardShadow: getCSSVariable('--color-card-shadow'),

    // Button colors
    buttonContainedBg: getCSSVariable('--color-button-contained-bg'),
    buttonContainedColor: getCSSVariable('--color-button-contained-color'),
    buttonContainedDisabled: getCSSVariable('--color-button-contained-disabled'),
    buttonOutlinedBg: getCSSVariable('--color-button-outlined-bg'),
    buttonOutlinedColor: getCSSVariable('--color-button-outlined-color'),
    buttonOutlinedBorder: getCSSVariable('--color-button-outlined-border'),
    buttonOutlinedDisabled: getCSSVariable('--color-button-outlined-disabled'),

    // Icon colors
    iconPrimary: getCSSVariable('--color-icon-primary'),
    iconSecondary: getCSSVariable('--color-icon-secondary'),
    iconDisabled: getCSSVariable('--color-icon-disabled'),

    // Status colors
    error: getCSSVariable('--color-error'),
    success: getCSSVariable('--color-success'),
    warning: getCSSVariable('--color-warning'),

    // Category colors
    categoryGreen: getCSSVariable('--color-category-green'),
    categoryBlue: getCSSVariable('--color-category-blue'),
    categoryRed: getCSSVariable('--color-category-red'),
    categoryYellow: getCSSVariable('--color-category-yellow'),
    categoryOrange: getCSSVariable('--color-category-orange'),
    categoryPurple: getCSSVariable('--color-category-purple'),
    categoryPink: getCSSVariable('--color-category-pink'),
    categoryTurquoise: getCSSVariable('--color-category-turquoise'),

    // Utility colors
    black: getCSSVariable('--color-black'),
    white: getCSSVariable('--color-white'),
    graphite: getCSSVariable('--color-graphite'),
  };
};

export const useTheme = () => {
  const [colors, setColors] = useState<ThemeColors>(getThemeColors);

  useEffect(() => {
    const updateColors = () => {
      setColors(getThemeColors());
    };

    // Listen for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return {
    colors,
    palette: {
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      primary: {
        main: colors.black, // Default primary color
      },
      error: {
        main: colors.error,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
    },
    spacing: (factor: number) => `${factor * 8}px`, // Default spacing function
  };
};
