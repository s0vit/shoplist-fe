import React from 'react';
import styled from 'styled-components';

export type TDialogActionsProps = {
  /** Содержимое действий */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledDialogActions = styled.div<TDialogActionsProps>`
  display: flex;
  align-items: center;
  padding: 8px 24px 16px;
  gap: 8px;
  justify-content: flex-end;
`;

const DialogActions: React.FC<TDialogActionsProps> = ({ children, ...props }) => {
  return <StyledDialogActions {...props}>{children}</StyledDialogActions>;
};

export default DialogActions;
