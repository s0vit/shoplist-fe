import React from 'react';
import styled from 'styled-components';

export type TDrawerProps = {
  /** Позиция якоря */
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  /** Открыт ли drawer */
  open: boolean;
  /** Обработчик закрытия */
  onClose: () => void;
  /** Вариант drawer */
  variant?: 'permanent' | 'persistent' | 'temporary';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое drawer */
  children?: React.ReactNode;
};

const DrawerOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: 1200;
`;

const DrawerContainer = styled.div<{
  $anchor: 'left' | 'right' | 'top' | 'bottom';
  $open: boolean;
  $variant: 'permanent' | 'persistent' | 'temporary';
}>`
  position: fixed;
  background-color: var(--color-card-bg);
  box-shadow:
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12),
    0 5px 5px -3px rgba(0, 0, 0, 0.2);
  z-index: 1200;
  overflow: auto;
  display: flex;
  flex-direction: column;

  ${({ $anchor, $open, $variant }) => {
    const isHorizontal = $anchor === 'left' || $anchor === 'right';
    const width = isHorizontal ? '250px' : '100%';
    const height = isHorizontal ? '100%' : 'auto';

    let transform = '';
    if ($variant === 'temporary' || $variant === 'persistent') {
      if ($anchor === 'left') {
        transform = $open ? 'translateX(0)' : 'translateX(-100%)';
      } else if ($anchor === 'right') {
        transform = $open ? 'translateX(0)' : 'translateX(100%)';
      } else if ($anchor === 'top') {
        transform = $open ? 'translateY(0)' : 'translateY(-100%)';
      } else if ($anchor === 'bottom') {
        transform = $open ? 'translateY(0)' : 'translateY(100%)';
      }
    }

    const position = {
      left: $anchor === 'left' ? 0 : 'auto',
      right: $anchor === 'right' ? 0 : 'auto',
      top: $anchor === 'top' ? 0 : 'auto',
      bottom: $anchor === 'bottom' ? 0 : 'auto',
    };

    return `
      width: ${isHorizontal ? width : '100%'};
      height: ${isHorizontal ? '100%' : height};
      ${Object.entries(position)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
      transform: ${transform};
      transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    `;
  }}
`;

const Drawer: React.FC<TDrawerProps> = ({
  anchor = 'left',
  open,
  onClose,
  variant = 'temporary',
  style,
  className,
  children,
  ...props
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && variant !== 'permanent') {
      onClose();
    }
  };

  return (
    <>
      {(variant === 'temporary' || variant === 'persistent') && (
        <DrawerOverlay open={open} onClick={handleOverlayClick} />
      )}
      <DrawerContainer $anchor={anchor} $open={open} $variant={variant} style={style} className={className} {...props}>
        {children}
      </DrawerContainer>
    </>
  );
};

export default Drawer;
