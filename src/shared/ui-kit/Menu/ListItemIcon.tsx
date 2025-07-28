import React from 'react';
import styled from 'styled-components';

export type TListItemIconProps = {
  /** Содержимое иконки */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

const StyledListItemIcon = styled.div<TListItemIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  margin-right: 8px;
`;

const ListItemIcon: React.FC<TListItemIconProps> = ({ children, style, className, ...props }) => {
  return (
    <StyledListItemIcon style={style} className={className} {...props}>
      {children}
    </StyledListItemIcon>
  );
};

export default ListItemIcon;
