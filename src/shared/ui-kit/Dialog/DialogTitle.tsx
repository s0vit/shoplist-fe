import React from 'react';
import styled from 'styled-components';

export type TDialogTitleProps = {
  /** Содержимое заголовка */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledDialogTitle = styled.div<TDialogTitleProps>`
  margin: 0;
  padding: 16px 24px 8px;
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  color: var(--color-text-primary);
`;

const DialogTitle: React.FC<TDialogTitleProps> = ({ children, ...props }) => {
  return <StyledDialogTitle {...props}>{children}</StyledDialogTitle>;
};

export default DialogTitle;
