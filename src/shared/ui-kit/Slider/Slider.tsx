import React, { useState, useRef, useEffect, useCallback } from 'react'; // eslint-disable-line no-restricted-syntax
import styled from 'styled-components';

export type TSliderProps = {
  /** Текущее значение */
  value?: number | number[];
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Обработчик изменения значения */
  onChange?: (event: Event, value: number | number[]) => void;
  /** Отключен ли слайдер */
  disabled?: boolean;
  /** Размер слайдера */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** ARIA лейбл */
  'aria-labelledby'?: string;
};

type TStyledSliderProps = {
  $size: string;
  $disabled: boolean;
  $value: number;
  $min: number;
  $max: number;
};

const StyledSliderContainer = styled.div<TStyledSliderProps>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: ${({ $size }) => ($size === 'small' ? '20px' : $size === 'large' ? '40px' : '30px')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.38 : 1)};
`;

const StyledSliderTrack = styled.div<TStyledSliderProps>`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: ${({ $size }) => ($size === 'small' ? '2px' : $size === 'large' ? '6px' : '4px')};
  background-color: var(--color-border);
  border-radius: 2px;
  transform: translateY(-50%);
`;

const StyledSliderThumb = styled.div<TStyledSliderProps>`
  position: absolute;
  top: 50%;
  width: ${({ $size }) => ($size === 'small' ? '12px' : $size === 'large' ? '20px' : '16px')};
  height: ${({ $size }) => ($size === 'small' ? '12px' : $size === 'large' ? '20px' : '16px')};
  background-color: var(--color-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
    transform: translate(-50%, -50%) scale(1.1);
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const StyledSliderValue = styled.div<TStyledSliderProps>`
  position: absolute;
  top: 50%;
  left: ${({ $value, $min, $max }) => `${(($value - $min) / ($max - $min)) * 100}%`};
  width: ${({ $size }) => ($size === 'small' ? '2px' : $size === 'large' ? '6px' : '4px')};
  height: ${({ $size }) => ($size === 'small' ? '12px' : $size === 'large' ? '20px' : '16px')};
  background-color: var(--color-primary);
  border-radius: 2px;
  transform: translateY(-50%);
`;

const Slider: React.FC<TSliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  size = 'medium',
  style,
  className,
  'aria-labelledby': ariaLabelledby,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentValue, setCurrentValue] = useState(Array.isArray(value) ? value[0] : value);

  useEffect(() => {
    setCurrentValue(Array.isArray(value) ? value[0] : value);
  }, [value]);

  const calculateValue = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return currentValue;

      const rect = containerRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const newValue = min + percentage * (max - min);
      const steppedValue = Math.round(newValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [currentValue, min, max, step],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    const newValue = calculateValue(e.clientX);
    setCurrentValue(newValue);
    onChange?.(e.nativeEvent, newValue);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || disabled) return;
      const newValue = calculateValue(e.clientX);
      setCurrentValue(newValue);
      onChange?.(e, newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, disabled, onChange, calculateValue]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    const newValue = calculateValue(e.clientX);
    setCurrentValue(newValue);
    onChange?.(e.nativeEvent, newValue);
  };

  return (
    <StyledSliderContainer
      ref={containerRef}
      $size={size}
      $disabled={disabled}
      $value={currentValue}
      $min={min}
      $max={max}
      style={style}
      className={className}
      aria-labelledby={ariaLabelledby}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <StyledSliderTrack $size={size} $disabled={disabled} $value={currentValue} $min={min} $max={max} />
      <StyledSliderValue $size={size} $disabled={disabled} $value={currentValue} $min={min} $max={max} />
      <StyledSliderThumb $size={size} $disabled={disabled} $value={currentValue} $min={min} $max={max} />
    </StyledSliderContainer>
  );
};

export default Slider;
