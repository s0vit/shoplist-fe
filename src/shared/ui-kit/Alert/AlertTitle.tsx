import React from 'react';
import styled from 'styled-components';

export type TAlertTitleProps = {
  /** Содержимое заголовка */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledAlertTitle = styled.div<TAlertTitleProps>`
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-weight: 500;
  margin-bottom: 4px;
`;

const AlertTitle: React.FC<TAlertTitleProps> = ({ children, ...props }) => {
  return <StyledAlertTitle {...props}>{children}</StyledAlertTitle>;
};

export default AlertTitle;
