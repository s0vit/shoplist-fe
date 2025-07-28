import styled from 'styled-components';
import React from 'react';

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: string | number;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  sx?: React.CSSProperties;
};

const StyledStack = styled.div<StackProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
  gap: ${({ gap = 0 }) => (typeof gap === 'number' ? `${gap * 8}px` : gap)};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  flex-wrap: ${({ flexWrap = 'nowrap' }) => flexWrap};
  min-width: 0;
`;

const Stack = ({ children, className, style, sx, ...rest }: StackProps) => (
  <StyledStack className={className} style={{ ...style, ...sx }} {...rest}>
    {children}
  </StyledStack>
);

export default Stack;
