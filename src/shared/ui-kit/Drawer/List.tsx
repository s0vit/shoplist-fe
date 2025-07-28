import React from 'react';
import styled from 'styled-components';

export type TListProps = {
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое списка */
  children?: React.ReactNode;
};

const StyledList = styled.div<TListProps>`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin: 0;
  list-style: none;
`;

const List: React.FC<TListProps> = ({ children, style, className, ...props }) => {
  return (
    <StyledList style={style} className={className} {...props}>
      {children}
    </StyledList>
  );
};

export default List;
