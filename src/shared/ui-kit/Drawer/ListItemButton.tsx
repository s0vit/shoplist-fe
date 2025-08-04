import React from 'react';
import styled from 'styled-components';

export type TListItemButtonProps = {
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое кнопки */
  children?: React.ReactNode;
};

const StyledListItemButton = styled.button<TListItemButtonProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: var(--color-hover);
  }

  &:focus {
    outline: none;
    background-color: var(--color-hover);
  }
`;

const ListItemButton: React.FC<TListItemButtonProps> = ({ children, onClick, style, className, ...props }) => {
  return (
    <StyledListItemButton onClick={onClick} style={style} className={className} {...props}>
      {children}
    </StyledListItemButton>
  );
};

export default ListItemButton;
