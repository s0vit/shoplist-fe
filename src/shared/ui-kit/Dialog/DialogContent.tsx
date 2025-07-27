import React from 'react';
import styled from 'styled-components';

export type TDialogContentProps = {
  /** Содержимое диалога */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledDialogContent = styled.div<TDialogContentProps>`
  flex: 1 1 auto;
  padding: 8px 24px;
  overflow-y: auto;
  color: var(--color-text-primary);
`;

const DialogContent: React.FC<TDialogContentProps> = ({ children, ...props }) => {
  return <StyledDialogContent {...props}>{children}</StyledDialogContent>;
};

export default DialogContent;
