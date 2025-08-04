import React from 'react';
import styled from 'styled-components';

export type TListItemTextProps = {
  /** Основной текст */
  primary?: React.ReactNode;
  /** Вторичный текст */
  secondary?: React.ReactNode;
  /** Стили для основного текста */
  primaryTypographyProps?: {
    fontWeight?: string;
    [key: string]: unknown;
  };
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое текста */
  children?: React.ReactNode;
};

const StyledListItemText = styled.div<TListItemTextProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const PrimaryText = styled.div<{ $fontWeight?: string }>`
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: var(--color-text-primary);
  font-weight: ${({ $fontWeight }) => $fontWeight || 'normal'};
`;

const SecondaryText = styled.div`
  font-size: 0.75rem;
  line-height: 1.33;
  letter-spacing: 0.03333em;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

const ListItemText: React.FC<TListItemTextProps> = ({
  primary,
  secondary,
  primaryTypographyProps,
  style,
  className,
  children,
  ...props
}) => {
  return (
    <StyledListItemText style={style} className={className} {...props}>
      {primary && <PrimaryText $fontWeight={primaryTypographyProps?.fontWeight}>{primary}</PrimaryText>}
      {secondary && <SecondaryText>{secondary}</SecondaryText>}
      {children}
    </StyledListItemText>
  );
};

export default ListItemText;
