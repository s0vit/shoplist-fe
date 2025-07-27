import React from 'react';
import styled from 'styled-components';
import { useAccordionContext } from './Accordion';

export type TAccordionSummaryProps = {
  /** Иконка разворачивания */
  expandIcon?: React.ReactNode;
  /** Отключен ли элемент */
  disabled?: boolean;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое заголовка */
  children?: React.ReactNode;
  /** Обработчик клика */
  onClick?: () => void;
};

const StyledAccordionSummary = styled.div<TAccordionSummaryProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  background-color: var(--color-card-bg);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: var(--color-hover);
  }

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.38;
    cursor: default;
    pointer-events: none;
  `}
`;

const SummaryContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
`;

const ExpandIcon = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const AccordionSummary: React.FC<TAccordionSummaryProps> = ({
  expandIcon,
  disabled: propDisabled,
  style,
  className,
  children,
  onClick,
  ...props
}) => {
  const { expanded, setExpanded, disabled: contextDisabled } = useAccordionContext();
  const disabled = propDisabled || contextDisabled;

  const handleClick = () => {
    if (!disabled) {
      setExpanded(!expanded);
      onClick?.();
    }
  };

  return (
    <StyledAccordionSummary onClick={handleClick} disabled={disabled} style={style} className={className} {...props}>
      <SummaryContent>{children}</SummaryContent>
      {expandIcon && <ExpandIcon $expanded={expanded}>{expandIcon}</ExpandIcon>}
    </StyledAccordionSummary>
  );
};

export default AccordionSummary;
