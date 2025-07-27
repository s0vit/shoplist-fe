import React from 'react';
import styled from 'styled-components';

export type TMenuProps = {
  /** Элемент, к которому привязано меню */
  anchorEl?: HTMLElement | null;
  /** Открыто ли меню */
  open: boolean;
  /** Обработчик закрытия */
  onClose: () => void;
  /** Ссылка на якорь */
  anchorReference?: 'anchorEl' | 'anchorPosition';
  /** Позиция якоря */
  anchorPosition?: { top: number; left: number };
  /** Происхождение якоря */
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  /** Вариант меню */
  variant?: 'menu' | 'selectedMenu';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое меню */
  children?: React.ReactNode;
  /** Слоты для кастомизации */
  slotProps?: {
    paper?: {
      style?: React.CSSProperties;
      sx?: Record<string, unknown>;
    };
  };
};

const MenuOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1300;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const MenuContainer = styled.div<{
  $anchorEl?: HTMLElement | null;
  $anchorPosition?: { top: number; left: number };
  $anchorReference: 'anchorEl' | 'anchorPosition';
  $anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  $variant: 'menu' | 'selectedMenu';
}>`
  position: absolute;
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  padding: 8px 0;
  z-index: 1300;
  border: 1px solid var(--color-border);

  ${({ $anchorEl, $anchorPosition, $anchorReference, $anchorOrigin }) => {
    if ($anchorReference === 'anchorPosition' && $anchorPosition) {
      // Примерные размеры меню
      const menuWidth = 200;
      const menuHeight = 150;

      let top = $anchorPosition.top;
      let left = $anchorPosition.left;

      // Проверяем границы экрана
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Если меню выходит за правую границу, сдвигаем влево
      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth - 10; // 10px отступ от края
      }

      // Если меню выходит за левую границу, сдвигаем вправо
      if (left < 0) {
        left = 10; // 10px отступ от края
      }

      // Если меню выходит за нижнюю границу, показываем сверху
      if (top + menuHeight > viewportHeight) {
        top = $anchorPosition.top - menuHeight;
      }

      // Если меню выходит за верхнюю границу, показываем снизу
      if (top < 0) {
        top = $anchorPosition.top + 20; // 20px отступ от курсора
      }

      return `
        top: ${Math.max(0, top)}px;
        left: ${Math.max(0, left)}px;
      `;
    }

    if ($anchorEl && $anchorReference === 'anchorEl') {
      const rect = $anchorEl.getBoundingClientRect();
      const { vertical = 'bottom', horizontal = 'left' } = $anchorOrigin || {};

      // Примерные размеры меню (можно сделать динамическими)
      const menuWidth = 200;
      const menuHeight = 150;

      let top = rect.bottom;
      let left = rect.left;

      if (vertical === 'top') {
        top = rect.top - menuHeight;
      } else if (vertical === 'center') {
        top = rect.top + rect.height / 2 - menuHeight / 2;
      }

      if (horizontal === 'center') {
        left = rect.left + rect.width / 2 - menuWidth / 2;
      } else if (horizontal === 'right') {
        left = rect.right - menuWidth;
      }

      // Проверяем границы экрана
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Если меню выходит за правую границу, сдвигаем влево
      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth - 10; // 10px отступ от края
      }

      // Если меню выходит за левую границу, сдвигаем вправо
      if (left < 0) {
        left = 10; // 10px отступ от края
      }

      // Если меню выходит за нижнюю границу, показываем сверху
      if (top + menuHeight > viewportHeight && vertical !== 'top') {
        top = rect.top - menuHeight;
      }

      // Если меню выходит за верхнюю границу, показываем снизу
      if (top < 0 && vertical !== 'bottom') {
        top = rect.bottom;
      }

      return `
        top: ${Math.max(0, top)}px;
        left: ${Math.max(0, left)}px;
      `;
    }

    return '';
  }}

  ${({ $variant }) => {
    if ($variant === 'selectedMenu') {
      return `
        background-color: var(--color-card-bg);
        border: 1px solid var(--color-border);
      `;
    }

    return '';
  }}
`;

const Menu: React.FC<TMenuProps> = ({
  anchorEl,
  open,
  onClose,
  anchorReference = 'anchorEl',
  anchorPosition,
  anchorOrigin,
  variant = 'menu',
  style,
  className,
  children,
  slotProps,
  ...props
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const paperStyle = {
    ...style,
    ...slotProps?.paper?.style,
  };

  return (
    <MenuOverlay open={open} onClick={handleOverlayClick}>
      <MenuContainer
        $anchorEl={anchorEl}
        $anchorPosition={anchorPosition}
        $anchorReference={anchorReference}
        $anchorOrigin={anchorOrigin}
        $variant={variant}
        style={paperStyle}
        className={className}
        {...props}
      >
        {children}
      </MenuContainer>
    </MenuOverlay>
  );
};

export default Menu;
