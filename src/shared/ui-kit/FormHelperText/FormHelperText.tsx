import styled from 'styled-components';
import { ReactNode } from 'react';

export type TFormHelperTextProps = {
  children: ReactNode;
  error?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const StyledFormHelperText = styled.div<{
  $error?: boolean;
  $disabled?: boolean;
}>`
  font-family: var(--font-family);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-body2);
  line-height: var(--line-height-body2);
  color: ${({ $error, $disabled }) => {
    if ($error) return 'var(--color-error)';
    if ($disabled) return 'var(--color-text-disabled)';

    return 'var(--color-text-secondary)';
  }};
  margin-top: 4px;
  margin-bottom: 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const FormHelperText = ({ children, error = false, disabled = false, style, className }: TFormHelperTextProps) => (
  <StyledFormHelperText $error={error} $disabled={disabled} style={style} className={className}>
    {children}
  </StyledFormHelperText>
);

export default FormHelperText;
