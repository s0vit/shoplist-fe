import styled from 'styled-components';
import { ReactNode } from 'react';

export type TTypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'button';
export type TTypographyWeight = 'regular' | 'medium' | 'bold';

export type TTypographyProps = {
  children: ReactNode;
  variant?: TTypographyVariant;
  weight?: TTypographyWeight;
  align?: 'left' | 'center' | 'right';
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  gutterBottom?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

const variantToFontSize = {
  h1: 'var(--font-size-h1)',
  h2: 'var(--font-size-h2)',
  h3: 'var(--font-size-h3)',
  body1: 'var(--font-size-body1)',
  body2: 'var(--font-size-body2)',
  button: 'var(--font-size-button)',
};
const variantToLineHeight = {
  h1: 'var(--line-height-h1)',
  h2: 'var(--line-height-h2)',
  h3: 'var(--line-height-h3)',
  body1: 'var(--line-height-body1)',
  body2: 'var(--line-height-body2)',
  button: 'var(--line-height-button)',
};
const weightToFontWeight = {
  regular: 'var(--font-weight-regular)',
  medium: 'var(--font-weight-medium)',
  bold: 'var(--font-weight-bold)',
};

const StyledTypography = styled.span<{
  $variant: TTypographyVariant;
  $weight: TTypographyWeight;
  $align?: 'left' | 'center' | 'right';
  $color?: string;
}>`
  font-family: var(--font-family);
  font-size: ${({ $variant }) => variantToFontSize[$variant]};
  line-height: ${({ $variant }) => variantToLineHeight[$variant]};
  font-weight: ${({ $weight }) => weightToFontWeight[$weight]};
  text-align: ${({ $align }) => $align || 'left'};
  color: ${({ $color }) => $color || 'var(--color-text-primary)'};
`;

const Typography = ({
  children,
  variant = 'body1',
  weight = 'regular',
  align = 'left',
  color,
  style,
  className,
  gutterBottom = false,
  onClick,
}: TTypographyProps) => (
  <StyledTypography
    $variant={variant}
    $weight={weight}
    $align={align}
    $color={color}
    style={{
      ...style,
      ...(gutterBottom ? { marginBottom: '0.35em' } : {}),
    }}
    className={className}
    onClick={onClick}
  >
    {children}
  </StyledTypography>
);

export default Typography;
