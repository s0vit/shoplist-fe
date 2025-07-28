import React from 'react';
import styled from 'styled-components';

export type TDialogProps = {
  /** Открыт ли диалог */
  open: boolean;
  /** Содержимое диалога */
  children?: React.ReactNode;
  /** Максимальная ширина */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Полная ширина */
  fullWidth?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Обработчик закрытия */
  onClose?: () => void;
};

const DialogOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1300;
  padding: 16px;
`;

const DialogContainer = styled.div<{ $maxWidth: string; $fullWidth: boolean }>`
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow:
    0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin: 32px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 64px);

  ${({ $maxWidth, $fullWidth }) => {
    if ($fullWidth) {
      return `
        width: 100%;
        max-width: 100%;
      `;
    }

    const maxWidthMap: Record<string, string> = {
      xs: '444px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    };

    return `
      width: 100%;
      max-width: ${maxWidthMap[$maxWidth] || maxWidthMap.sm};
    `;
  }}
`;

const Dialog: React.FC<TDialogProps> = ({ open, children, maxWidth = 'sm', fullWidth = false, onClose, ...props }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <DialogOverlay open={open} onClick={handleOverlayClick}>
      <DialogContainer $maxWidth={maxWidth} $fullWidth={fullWidth} {...props}>
        {children}
      </DialogContainer>
    </DialogOverlay>
  );
};

export default Dialog;
