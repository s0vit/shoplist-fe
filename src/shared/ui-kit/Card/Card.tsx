import styled from 'styled-components';
import { ReactNode } from 'react';

export type TCardProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
};

const CardWrapper = styled.div<{
  width?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;
  border-radius: 16px;
  background: var(--color-card-bg);
  box-shadow: var(--color-card-shadow);
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  transition:
    background 0.2s,
    box-shadow 0.2s;
`;

const Card = ({ children, width, height, style, className }: TCardProps) => (
  <CardWrapper width={width} height={height} style={style} className={className}>
    {children}
  </CardWrapper>
);

export default Card;
