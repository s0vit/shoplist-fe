import styled from 'styled-components';
import { ReactNode } from 'react';

export type TAvatarProps = {
  src?: string;
  alt?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  variant?: 'circular' | 'rounded' | 'square';
  sx?: React.CSSProperties;
  name?: string; // Для генерации инициалов
  onClick?: () => void;
};

// Функция для генерации инициалов из имени
const getInitials = (name?: string): string => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Функция для генерации цвета фона на основе имени
const getAvatarColor = (name?: string): string => {
  if (!name) return 'var(--color-avatar-bg)';

  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const AvatarWrapper = styled.div<{
  width?: string;
  height?: string;
  variant?: 'circular' | 'rounded' | 'square';
  $bgColor?: string;
}>`
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  border-radius: ${({ variant }) => {
    switch (variant) {
      case 'circular':
        return '50%';
      case 'rounded':
        return 'var(--border-radius-md)';
      case 'square':
        return '0';
      default:
        return '50%';
    }
  }};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor }) => $bgColor || 'var(--color-avatar-bg)'};
  color: var(--color-avatar-text);
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body1);
  line-height: var(--line-height-body1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const AvatarImage = styled.img<{
  width?: string;
  height?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Avatar = ({
  src,
  alt,
  children,
  width,
  height,
  style,
  className,
  variant = 'circular',
  sx,
  name,
  onClick,
}: TAvatarProps) => {
  const bgColor = getAvatarColor(name);
  const initials = getInitials(name);

  if (src) {
    return (
      <AvatarWrapper
        width={width}
        height={height}
        variant={variant}
        style={{ ...style, ...sx }}
        className={className}
        $bgColor={bgColor}
        onClick={onClick}
      >
        <AvatarImage src={src} alt={alt || 'Avatar'} width={width} height={height} />
      </AvatarWrapper>
    );
  }

  return (
    <AvatarWrapper
      width={width}
      height={height}
      variant={variant}
      style={{ ...style, ...sx }}
      className={className}
      $bgColor={bgColor}
      onClick={onClick}
    >
      {children || initials}
    </AvatarWrapper>
  );
};

export default Avatar;
