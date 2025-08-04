import React from 'react';
import styled, { keyframes, css } from 'styled-components';

export type TFadeProps = {
  /** Показывать ли элемент */
  in?: boolean;
  /** Таймаут анимации */
  timeout?: number;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое */
  children?: React.ReactNode;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const getFadeAnimation = (inProp: boolean, timeout: number) => css`
  ${inProp ? fadeIn : fadeOut} ${timeout}ms ease
`;

const StyledFade = styled.div<{ $in: boolean; $timeout: number }>`
  animation: ${({ $in, $timeout }) => getFadeAnimation($in, $timeout)};
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transform: ${({ $in }) => ($in ? 'scale(1)' : 'scale(0.95)')};
  transition:
    opacity ${({ $timeout: timeout }) => timeout}ms ease,
    transform ${({ $timeout: timeout2 }) => timeout2}ms ease;
`;

const Fade: React.FC<TFadeProps> = ({ in: inProp = false, timeout = 300, style, className, children, ...props }) => {
  return (
    <StyledFade $in={inProp} $timeout={timeout} style={style} className={className} {...props}>
      {children}
    </StyledFade>
  );
};

export default Fade;
