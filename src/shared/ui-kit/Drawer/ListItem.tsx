import React from 'react';
import styled from 'styled-components';

export type TListItemProps = {
  /** Отключить отступы */
  disablePadding?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое элемента списка */
  children?: React.ReactNode;
};

type TStyledListItemProps = {
  $disablePadding?: boolean;
};

const StyledListItem = styled.div<TStyledListItemProps>`
  display: flex;
  align-items: center;
  padding: ${({ $disablePadding }) => ($disablePadding ? '0' : '8px 16px')};
  margin: 0;
  list-style: none;
`;

const ListItem: React.FC<TListItemProps> = ({ children, disablePadding, style, className, ...props }) => {
  return (
    <StyledListItem $disablePadding={disablePadding} style={style} className={className} {...props}>
      {children}
    </StyledListItem>
  );
};

export default ListItem;
