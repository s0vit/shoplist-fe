import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

export type TModalProps = {
  /** Открыто ли модальное окно */
  open?: boolean;
  /** Обработчик закрытия */
  onClose?: () => void;
  /** Закрывать ли после анимации */
  closeAfterTransition?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое модального окна */
  children?: React.ReactNode;
};

const ModalOverlay = styled.div<{ $open: boolean; $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ $open, $isClosing }) => ($open && !$isClosing ? 1 : 0)};
  visibility: ${({ $open, $isClosing }) => ($open || $isClosing ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const Modal: React.FC<TModalProps> = ({
  open = false,
  onClose,
  closeAfterTransition = false,
  style,
  className,
  children,
  ...props
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else if (closeAfterTransition && isClosing) {
      // Если closeAfterTransition = true, оставляем модалку видимой во время анимации
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300); // Время анимации

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, closeAfterTransition, isClosing]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      if (closeAfterTransition) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300); // Время анимации
      } else {
        onClose();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      if (closeAfterTransition) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300); // Время анимации
      } else {
        onClose();
      }
    }
  };

  const shouldRender = open || (closeAfterTransition && isClosing);
  if (!shouldRender) return null;

  return createPortal(
    <ModalOverlay
      $open={open}
      $isClosing={isClosing}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={style}
      className={className}
      {...props}
    >
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>,
    document.body,
  );
};

export default Modal;
