import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

export type TAccordionProps = {
  /** Развернут ли аккордеон */
  expanded?: boolean;
  /** Обработчик изменения состояния */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  /** Отключен ли аккордеон */
  disabled?: boolean;
  /** Уровень тени */
  elevation?: number;
  /** Отключить отступы */
  disableGutters?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое аккордеона */
  children?: React.ReactNode;
};

type TStyledAccordionProps = {
  $disableGutters?: boolean;
  $elevation?: number;
  $disabled?: boolean;
};

// Контекст для управления состоянием аккордеона
type TAccordionContextType = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  disabled?: boolean;
};

const AccordionContext = createContext<TAccordionContextType | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an Accordion');
  }

  return context;
};

const StyledAccordion = styled.div<TStyledAccordionProps>`
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-card-bg);
  margin: ${({ $disableGutters }) => ($disableGutters ? '0' : '8px 0')};

  ${({ $elevation = 1 }) => {
    const shadows = {
      0: 'none',
      1: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
      2: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
      3: '0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)',
      4: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
      5: '0 3px 5px -1px rgba(0,0,0,0.2), 0 5px 8px 0 rgba(0,0,0,0.14), 0 1px 14px 0 rgba(0,0,0,0.12)',
    };

    return `box-shadow: ${shadows[$elevation as keyof typeof shadows] || shadows[1]};`;
  }}

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: 0.38;
    pointer-events: none;
  `}
`;

const Accordion: React.FC<TAccordionProps> = ({
  children,
  elevation,
  disabled,
  disableGutters,
  expanded: controlledExpanded,
  onChange,
  ...props
}) => {
  // Используем контролируемое состояние, если оно передано, иначе внутреннее состояние
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleExpandedChange = (newExpanded: boolean) => {
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }

    onChange?.(new Event('change') as unknown as React.SyntheticEvent, newExpanded);
  };

  const contextValue: TAccordionContextType = {
    expanded,
    setExpanded: handleExpandedChange,
    disabled,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <StyledAccordion $elevation={elevation} $disabled={disabled} $disableGutters={disableGutters} {...props}>
        {children}
      </StyledAccordion>
    </AccordionContext.Provider>
  );
};

export default Accordion;
