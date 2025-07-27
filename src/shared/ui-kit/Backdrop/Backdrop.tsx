import React from 'react';
import styled, { keyframes } from 'styled-components';

export type TBackdropProps = {
  /** Открыт ли backdrop */
  open?: boolean;
  /** Таймаут анимации */
  timeout?: number;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Содержимое backdrop */
  children?: React.ReactNode;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const getAnimation = (open: boolean, timeout: number) => `${open ? fadeIn : fadeOut} ${timeout}ms ease`;

const StyledBackdrop = styled.div<{ $open: boolean; $timeout: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $open, $timeout }) => getAnimation($open, $timeout)};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: visibility ${({ $timeout: timeout }) => timeout}ms ease;
`;

const Backdrop: React.FC<TBackdropProps> = ({
  open = false,
  timeout = 500,
  onClick,
  style,
  className,
  children,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  };

  return (
    <StyledBackdrop
      $open={open}
      $timeout={timeout}
      onClick={handleClick}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </StyledBackdrop>
  );
};

export default Backdrop;
