import React from 'react';
import styled from 'styled-components';

export type TInputAdornmentProps = {
  /** Позиция адорнмента */
  position?: 'start' | 'end';
  /** Содержимое адорнмента */
  children?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
};

type TStyledInputAdornmentProps = {
  $position: string;
};

const StyledInputAdornment = styled.div<TStyledInputAdornmentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $position }) => ($position === 'start' ? '0 8px 0 0' : '0 0 0 8px')};
  color: var(--color-text-secondary);
  font-size: 1.25rem;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const InputAdornment: React.FC<TInputAdornmentProps> = ({ position = 'end', children, style, className, ...props }) => {
  return (
    <StyledInputAdornment $position={position} style={style} className={className} {...props}>
      {children}
    </StyledInputAdornment>
  );
};

export default InputAdornment;
