import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes, useState, ReactNode } from 'react';

export type TTextFieldProps = {
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  InputLabelProps?: Record<string, unknown>;
  InputProps?: Record<string, unknown>;
  inputProps?: Record<string, unknown>;
  inputRef?: React.Ref<HTMLInputElement>;
  endAdornment?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

type TStyledTextFieldProps = {
  $variant: 'outlined' | 'filled' | 'standard';
  $error?: boolean;
  $disabled?: boolean;
  $fullWidth?: boolean;
  $size: 'small' | 'medium' | 'large';
  $isFocused?: boolean;
};

const TextFieldWrapper = styled.div<TStyledTextFieldProps>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '328px')};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputContainer = styled.div<TStyledTextFieldProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '40px';
      case 'large':
        return '56px';
      default:
        return '53px';
    }
  }};
  padding: 0 var(--spacing-md);
  border-radius: var(--border-radius-lg);
  background-color: ${({ $isFocused, $disabled, $variant }) => {
    if ($disabled) return 'var(--color-input-disabled-bg)';
    if ($variant === 'filled') return 'var(--color-input-bg)';

    return $isFocused ? 'var(--color-input-focus-bg)' : 'var(--color-input-bg)';
  }};

  border: ${({ $variant, $error }) => {
    if ($variant === 'outlined') {
      return $error ? '1px solid var(--color-error)' : '1px solid var(--color-input-border, transparent)';
    }

    return 'none';
  }};

  transition: all 0.2s ease;

  /* Стили для endAdornment */
  .end-adornment {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: var(--color-text-secondary);
  }
`;

const StyledInput = styled.input<TStyledTextFieldProps>`
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
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};

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

  /* Удаление синей подсветки автозаполнения Chrome */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--color-input-bg) inset !important;
    -webkit-text-fill-color: var(--color-input-text) !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Для темной темы */
  .theme-dark &:-webkit-autofill,
  .theme-dark &:-webkit-autofill:hover,
  .theme-dark &:-webkit-autofill:focus,
  .theme-dark &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--color-input-bg) inset !important;
    -webkit-text-fill-color: var(--color-input-text) !important;
  }

  /* Для светлой темы */
  .theme-light &:-webkit-autofill,
  .theme-light &:-webkit-autofill:hover,
  .theme-light &:-webkit-autofill:focus,
  .theme-light &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--color-input-bg) inset !important;
    -webkit-text-fill-color: var(--color-input-text) !important;
  }
`;

const Label = styled.label<{ $size: 'small' | 'medium' | 'large' }>`
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body2);
  line-height: var(--line-height-body2);
  color: var(--color-text-primary);
  margin-bottom: 4px;
`;

const HelperText = styled.div<{ $error?: boolean }>`
  font-family: var(--font-family);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-body2);
  line-height: var(--line-height-body2);
  color: ${({ $error }) => ($error ? 'var(--color-error)' : 'var(--color-text-secondary)')};
  margin-top: 4px;
`;

const TextFieldComponent = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    {
      label,
      variant = 'outlined',
      error = false,
      helperText,
      disabled = false,
      fullWidth = false,
      size = 'medium',
      placeholder,
      style,
      className,
      InputLabelProps: _InputLabelProps,
      InputProps: _InputProps,
      inputProps: _inputProps,
      inputRef,
      endAdornment,
      ...inputElementProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Use inputRef if provided, otherwise use the forwarded ref
    const finalRef = inputRef || ref;

    return (
      <TextFieldWrapper
        style={style}
        className={className}
        $variant={variant}
        $error={error}
        $disabled={disabled}
        $fullWidth={fullWidth}
        $size={size}
        $isFocused={isFocused}
      >
        {label && (
          <Label $size={size} htmlFor={inputElementProps.id}>
            {label}
          </Label>
        )}
        <InputContainer
          $variant={variant}
          $error={error}
          $disabled={disabled}
          $fullWidth={fullWidth}
          $size={size}
          $isFocused={isFocused}
        >
          <StyledInput
            ref={finalRef}
            disabled={disabled}
            placeholder={placeholder}
            $variant={variant}
            $error={error}
            $disabled={disabled}
            $fullWidth={fullWidth}
            $size={size}
            $isFocused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...inputElementProps}
          />
          {endAdornment && <div className="end-adornment">{endAdornment}</div>}
        </InputContainer>
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      </TextFieldWrapper>
    );
  },
);

TextFieldComponent.displayName = 'TextFieldComponent';

export default TextFieldComponent;
