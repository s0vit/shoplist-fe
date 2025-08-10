import React, { createContext, useContext } from 'react';
import styled from 'styled-components';

export type TBottomNavigationProps = {
  /** Показывать ли лейблы */
  showLabels?: boolean;
  /** Значение активного элемента */
  value?: string | number;
  /** Обработчик изменения значения */
  onChange?: (event: React.SyntheticEvent, newValue: string | number) => void;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое навигации */
  children?: React.ReactNode;
};

type TBottomNavigationContextType = {
  value?: string | number;
  onChange?: (event: React.SyntheticEvent, newValue: string | number) => void;
};

const BottomNavigationContext = createContext<TBottomNavigationContextType | null>(null);

export const useBottomNavigationContext = () => {
  const context = useContext(BottomNavigationContext);
  if (!context) {
    throw new Error('useBottomNavigationContext must be used within a BottomNavigation');
  }

  return context;
};

const StyledBottomNavigation = styled.div<TBottomNavigationProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--color-card-bg);
  padding: 8px 0;
  min-height: 56px;
`;

const BottomNavigation: React.FC<TBottomNavigationProps> = ({
  children,
  showLabels: _showLabels = true,
  value,
  onChange,
  style,
  className,
  ...props
}) => {
  const contextValue: TBottomNavigationContextType = {
    value,
    onChange,
  };

  return (
    <BottomNavigationContext.Provider value={contextValue}>
      <StyledBottomNavigation style={style} className={className} {...props}>
        {children}
      </StyledBottomNavigation>
    </BottomNavigationContext.Provider>
  );
};

export default BottomNavigation;
