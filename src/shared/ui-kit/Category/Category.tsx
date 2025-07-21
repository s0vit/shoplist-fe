import React from 'react';
import styled from 'styled-components';

export type TCategoryName =
  | 'food'
  | 'transport'
  | 'house'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'shopping'
  | 'travel'
  | 'work'
  | 'family'
  | 'pets'
  | 'sports'
  | 'technology'
  | 'beauty'
  | 'books'
  | 'gifts'
  | 'charity'
  | 'other';

export interface TCategoryProps {
  name: TCategoryName;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const categoryEmojis: Record<TCategoryName, string> = {
  food: '🍔',
  transport: '🚗',
  house: '🏠',
  entertainment: '🎬',
  health: '🏥',
  education: '📚',
  shopping: '🛍️',
  travel: '✈️',
  work: '💼',
  family: '👨‍👩‍👧‍👦',
  pets: '🐕',
  sports: '⚽',
  technology: '💻',
  beauty: '💄',
  books: '📖',
  gifts: '🎁',
  charity: '❤️',
  other: '📌',
};

// Предустановленные цвета для быстрого выбора (автоматически адаптируются к теме)
export const categoryColorPresets = {
  green: 'var(--color-category-green)',
  blue: 'var(--color-category-blue)',
  red: 'var(--color-category-red)',
  yellow: 'var(--color-category-yellow)',
  orange: 'var(--color-category-orange)',
  purple: 'var(--color-category-purple)',
  pink: 'var(--color-category-pink)',
  turquoise: 'var(--color-category-turquoise)',
} as const;

const sizeMap = {
  small: {
    width: '24px',
    height: '24px',
    fontSize: '12px',
  },
  medium: {
    width: '32px',
    height: '32px',
    fontSize: '16px',
  },
  large: {
    width: '48px',
    height: '48px',
    fontSize: '24px',
  },
};

const StyledCategory = styled.div<{
  $size: 'small' | 'medium' | 'large';
  $backgroundColor: string;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => sizeMap[props.$size].width};
  height: ${(props) => sizeMap[props.$size].height};
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 8px;
  font-size: ${(props) => sizeMap[props.$size].fontSize};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover {
    transform: ${(props) => (props.$disabled ? 'none' : 'scale(1.05)')};
    box-shadow: ${(props) => (props.$disabled ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)')};
  }

  &:active {
    transform: ${(props) => (props.$disabled ? 'none' : 'scale(0.95)')};
  }
`;

const Category: React.FC<TCategoryProps> = ({ name, color, size = 'medium', onClick, disabled = false, className }) => {
  const emoji = categoryEmojis[name];
  // Маппинг категорий к цветам по умолчанию (автоматически адаптируются к теме)
  const defaultCategoryColors: Record<TCategoryName, string> = {
    food: 'var(--color-category-food)',
    transport: 'var(--color-category-transport)',
    house: 'var(--color-category-house)',
    entertainment: categoryColorPresets.purple,
    health: categoryColorPresets.red,
    education: categoryColorPresets.blue,
    shopping: categoryColorPresets.pink,
    travel: categoryColorPresets.turquoise,
    work: categoryColorPresets.orange,
    family: categoryColorPresets.green,
    pets: categoryColorPresets.yellow,
    sports: categoryColorPresets.blue,
    technology: categoryColorPresets.purple,
    beauty: categoryColorPresets.pink,
    books: categoryColorPresets.orange,
    gifts: categoryColorPresets.red,
    charity: categoryColorPresets.green,
    other: categoryColorPresets.yellow,
  };

  const backgroundColor = color || defaultCategoryColors[name];

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <StyledCategory
      $size={size}
      $backgroundColor={backgroundColor}
      $disabled={disabled}
      onClick={handleClick}
      className={className}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {emoji}
    </StyledCategory>
  );
};

export default Category;
