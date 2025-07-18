import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

export type TInputProps = {
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

type TStyledInputProps = {
  disabled?: boolean;
  $error?: boolean;
};

const InputWrapper = styled.div<{ $error?: boolean; $isFocused?: boolean; $disabled?: boolean; $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || '328px'};
  height: 53px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md);
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  border-radius: var(--border-radius-lg);
  background-color: ${({ $isFocused, $disabled }) => {
    if ($disabled) return 'var(--color-input-disabled-bg)';

    return $isFocused ? 'var(--color-input-focus-bg)' : 'var(--color-input-bg)';
  }};
  border: ${({ $error }) => ($error ? '1px solid var(--color-error)' : 'none')};
  transition: all 0.2s ease;
`;

const StyledInput = styled.input<TStyledInputProps>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-input-text);
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body1);
  line-height: var(--line-height-body1);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: var(--color-input-placeholder);
    font-family: var(--font-family);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--line-height-body1);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const InputComponent = forwardRef<HTMLInputElement, TInputProps>(
  ({ placeholder, disabled = false, style, className, error = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <InputWrapper style={style} className={className} $error={error} $isFocused={isFocused} $disabled={disabled}>
        <StyledInput
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          $error={error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </InputWrapper>
    );
  },
);

InputComponent.displayName = 'InputComponent';

export default InputComponent;
