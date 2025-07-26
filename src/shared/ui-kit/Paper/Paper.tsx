import styled from 'styled-components';
import { ReactNode } from 'react';

export type TPaperProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  elevation?: number;
  padding?: string;
  borderRadius?: string;
  sx?: React.CSSProperties;
};

const PaperWrapper = styled.div<{
  width?: string;
  height?: string;
  elevation?: number;
  padding?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  padding: ${({ padding }) => padding || '16px'};
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--border-radius-lg)'};
  background: var(--color-card-bg);
  box-shadow: var(--color-card-shadow);
  transition:
    background 0.2s,
    box-shadow 0.2s;
`;

const Paper = ({
  children,
  width,
  height,
  style,
  className,
  elevation = 1,
  padding,
  borderRadius,
  sx,
}: TPaperProps) => (
  <PaperWrapper
    width={width}
    height={height}
    elevation={elevation}
    padding={padding}
    borderRadius={borderRadius}
    style={{ ...style, ...sx }}
    className={className}
  >
    {children}
  </PaperWrapper>
);

export default Paper;
