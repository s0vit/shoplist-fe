import React from 'react';
import styled from 'styled-components';
import { useAccordionContext } from './Accordion';

export type TAccordionDetailsProps = {
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое деталей */
  children?: React.ReactNode;
};

type TStyledAccordionDetailsProps = {
  $expanded: boolean;
};

const StyledAccordionDetails = styled.div<TAccordionDetailsProps & TStyledAccordionDetailsProps>`
  background-color: var(--color-card-bg);
  overflow: hidden;
  transition: max-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  max-height: ${({ $expanded }) => ($expanded ? '1000px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? '1' : '0')};
`;

const AccordionDetails: React.FC<TAccordionDetailsProps> = ({ children, style, className, ...props }) => {
  const { expanded } = useAccordionContext();

  return (
    <StyledAccordionDetails $expanded={expanded} style={style} className={className} {...props}>
      {children}
    </StyledAccordionDetails>
  );
};

export default AccordionDetails;
