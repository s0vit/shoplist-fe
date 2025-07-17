import styled, { css } from 'styled-components';
import React from 'react';

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  style?: React.CSSProperties;
  className?: string;
  sx?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
};

const breakpoints = { sm: 600, md: 900, lg: 1200, xl: 1536 };

const getResponsiveSize = (size?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }) => {
  if (!size) return '';
  if (typeof size === 'number') {
    const percent = (size / 12) * 100;

    return `flex-basis: ${percent}%; max-width: ${percent}%;`;
  }

  let cssStr = '';
  if (size.xs) {
    const percent = (size.xs / 12) * 100;
    cssStr += `flex-basis: ${percent}%; max-width: ${percent}%;`;
  }

  (['sm', 'md', 'lg', 'xl'] as const).forEach((key) => {
    if (size[key]) {
      const percent = (size[key]! / 12) * 100;
      cssStr += `@media (min-width: ${breakpoints[key]}px) { flex-basis: ${percent}%; max-width: ${percent}%; }`;
    }
  });

  return cssStr;
};

const StyledGrid = styled.div<GridProps>`
  box-sizing: border-box;
  ${({ container, direction, wrap, alignItems, justifyContent, spacing, rowSpacing, columnSpacing }) =>
    container
      ? `
    display: flex;
    flex-direction: ${direction || 'row'};
    flex-wrap: ${wrap || 'wrap'};
    align-items: ${alignItems || 'stretch'};
    justify-content: ${justifyContent || 'flex-start'};
    gap: ${spacing ? spacing * 8 + 'px' : 0};
    row-gap: ${rowSpacing ? rowSpacing * 8 + 'px' : ''};
    column-gap: ${columnSpacing ? columnSpacing * 8 + 'px' : ''};
  `
      : ''}
  ${({ item, size }) =>
    item
      ? css`
          box-sizing: border-box;
          ${getResponsiveSize(size)}
        `
      : ''}
`;

const Grid: React.FC<GridProps> = ({ children, className, style, sx, ref, ...rest }) => {
  return (
    <StyledGrid ref={ref} className={className} style={{ ...style, ...sx }} {...rest}>
      {children}
    </StyledGrid>
  );
};

export const GridItem: React.FC<Omit<GridProps, 'container' | 'item'>> = (props) => <Grid item {...props} />;

export default Grid;
