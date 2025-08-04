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
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type StyledBoxProps = {
  $display?: React.CSSProperties['display'];
  $flexDirection?: React.CSSProperties['flexDirection'];
  $flexWrap?: React.CSSProperties['flexWrap'];
  $alignItems?: React.CSSProperties['alignItems'];
  $justifyContent?: React.CSSProperties['justifyContent'];
  $gap?: string | number;
  $gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
  $gridColumn?: React.CSSProperties['gridColumn'];
  $gridRow?: React.CSSProperties['gridRow'];
  $gridArea?: React.CSSProperties['gridArea'];
  $gridTemplateRows?: React.CSSProperties['gridTemplateRows'];
  $gridTemplateAreas?: React.CSSProperties['gridTemplateAreas'];
  $columnGap?: string | number;
  $rowGap?: string | number;
  $customStyles?: React.CSSProperties;
};

const StyledBox = styled.div<StyledBoxProps>`
  box-sizing: border-box;
  display: ${({ $display }) => $display};
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  align-items: ${({ $alignItems }) => $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  gap: ${({ $gap }) => (typeof $gap === 'number' ? `${$gap * 8}px` : $gap)};
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
  grid-column: ${({ $gridColumn }) => $gridColumn};
  grid-row: ${({ $gridRow }) => $gridRow};
  grid-area: ${({ $gridArea }) => $gridArea};
  grid-template-rows: ${({ $gridTemplateRows }) => $gridTemplateRows};
  grid-template-areas: ${({ $gridTemplateAreas }) => $gridTemplateAreas};
  column-gap: ${({ $columnGap }) => (typeof $columnGap === 'number' ? `${$columnGap * 8}px` : $columnGap)};
  row-gap: ${({ $rowGap }) => (typeof $rowGap === 'number' ? `${$rowGap * 8}px` : $rowGap)};
  ${({ $customStyles }) => {
    if (!$customStyles) return '';

    return Object.entries($customStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();

        return `${cssKey}: ${value};`;
      })
      .join('\n');
  }}
`;

const Box = ({ children, className, style, sx, component, onClick, ...rest }: BoxProps) => {
  const {
    display,
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
    gap,
    gridTemplateColumns,
    gridColumn,
    gridRow,
    gridArea,
    gridTemplateRows,
    gridTemplateAreas,
    columnGap,
    rowGap,
    ...domProps
  } = rest;

  const filteredDomProps = Object.fromEntries(
    Object.entries(domProps).filter(([key]) => {
      return !key.startsWith('@') && key !== 'zIndex';
    }),
  );

  const combinedStyles = { ...style, ...sx };
  const customStyles = Object.fromEntries(
    Object.entries(combinedStyles).filter(([key]) => {
      if (key === 'zIndex') {
        return false;
      }

      return true;
    }),
  );

  const zIndex = combinedStyles.zIndex;

  return (
    <StyledBox
      as={component || 'div'}
      className={className}
      onClick={onClick}
      $display={display}
      $flexDirection={flexDirection}
      $flexWrap={flexWrap}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $gap={gap}
      $gridTemplateColumns={gridTemplateColumns}
      $gridColumn={gridColumn}
      $gridRow={gridRow}
      $gridArea={gridArea}
      $gridTemplateRows={gridTemplateRows}
      $gridTemplateAreas={gridTemplateAreas}
      $columnGap={columnGap}
      $rowGap={rowGap}
      $customStyles={{
        ...customStyles,
        ...(zIndex && { zIndex }),
      }}
      {...filteredDomProps}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
