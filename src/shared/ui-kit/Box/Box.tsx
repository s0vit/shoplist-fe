import styled from 'styled-components';
import React from 'react';

export type BoxProps = {
  children?: React.ReactNode;
  display?: React.CSSProperties['display'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  gap?: string | number;
  gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
  gridColumn?: React.CSSProperties['gridColumn'];
  gridRow?: React.CSSProperties['gridRow'];
  gridArea?: React.CSSProperties['gridArea'];
  gridTemplateRows?: React.CSSProperties['gridTemplateRows'];
  gridTemplateAreas?: React.CSSProperties['gridTemplateAreas'];
  columnGap?: string | number;
  rowGap?: string | number;
  sx?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  component?: React.ElementType;
};

const StyledBox = styled.div<BoxProps>`
  box-sizing: border-box;
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap * 8}px` : gap)};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-column: ${({ gridColumn }) => gridColumn};
  grid-row: ${({ gridRow }) => gridRow};
  grid-area: ${({ gridArea }) => gridArea};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  column-gap: ${({ columnGap }) => (typeof columnGap === 'number' ? `${columnGap * 8}px` : columnGap)};
  row-gap: ${({ rowGap }) => (typeof rowGap === 'number' ? `${rowGap * 8}px` : rowGap)};
`;

const Box = ({ children, className, style, sx, component, ...rest }: BoxProps) => {
  return (
    <StyledBox as={component || 'div'} className={className} style={{ ...style, ...sx }} {...rest}>
      {children}
    </StyledBox>
  );
};

export default Box;
