import React, { createContext, useContext } from 'react';
import styled from 'styled-components';

export type TTabsProps = {
  /** Текущее значение */
  value?: string | number;
  /** Обработчик изменения значения */
  onChange?: (event: React.SyntheticEvent, newValue: string | number) => void;
  /** Ориентация табов */
  orientation?: 'horizontal' | 'vertical';
  /** Размер табов */
  size?: 'small' | 'medium' | 'large';
  /** Отключены ли табы */
  disabled?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое табов */
  children?: React.ReactNode;
};

type TTabsContextType = {
  value?: string | number;
  onChange?: (event: React.SyntheticEvent, newValue: string | number) => void;
};

const TabsContext = createContext<TTabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a Tabs');
  }

  return context;
};

type TStyledTabsProps = {
  $orientation: string;
  $size: string;
  $disabled: boolean;
};

const StyledTabs = styled.div<TStyledTabsProps>`
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === 'vertical' ? 'column' : 'row')};
  border-bottom: ${({ $orientation }) => ($orientation === 'horizontal' ? '1px solid var(--color-border)' : 'none')};
  border-right: ${({ $orientation }) => ($orientation === 'vertical' ? '1px solid var(--color-border)' : 'none')};
  background-color: var(--color-card-bg);
  opacity: ${({ $disabled }) => ($disabled ? 0.38 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          font-size: 1.25rem;
        `;
      default:
        return `
          font-size: 1rem;
        `;
    }
  }}
`;

const Tabs: React.FC<TTabsProps> = ({
  value,
  onChange,
  orientation = 'horizontal',
  size = 'medium',
  disabled = false,
  style,
  className,
  children,
  ...props
}) => {
  const contextValue: TTabsContextType = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <StyledTabs
        $orientation={orientation}
        $size={size}
        $disabled={disabled}
        style={style}
        className={className}
        {...props}
      >
        {children}
      </StyledTabs>
    </TabsContext.Provider>
  );
};

export default Tabs;
