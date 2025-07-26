import styled from 'styled-components';
import { ReactNode } from 'react';

export type TContainerProps = {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  style?: React.CSSProperties;
  className?: string;
  sx?: React.CSSProperties;
};

const maxWidthMap: Record<string, string> = {
  xs: '444px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
  false: 'none',
};

const ContainerWrapper = styled.div<{
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  max-width: ${({ maxWidth = 'lg' }) => maxWidthMap[maxWidth === false ? 'false' : maxWidth]};
  box-sizing: border-box;
`;

const Container = ({ children, maxWidth = 'lg', style, className, sx }: TContainerProps) => (
  <ContainerWrapper maxWidth={maxWidth} style={{ ...style, ...sx }} className={className}>
    {children}
  </ContainerWrapper>
);

export default Container;
