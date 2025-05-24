import styled from 'styled-components';

type TPrimaryButtonProps = {
  label?: string;
  width?: string;
  height?: string;
  $variant?: 'contained' | 'outlined';
  $type?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
};

const Button = styled.button<TPrimaryButtonProps>`
  width: ${({ width }) => width || '160px'};
  height: ${({ height }) => height || '53px'};
  border-radius: var(--border-radius-lg); /* Using theme border radius */
  font-family: var(--font-family); /* Using theme font family */
  font-weight: var(--font-weight-bold); /* Using theme font weight */
  font-size: var(--font-size-button); /* Using theme font size */
  line-height: var(--line-height-button); /* Using theme line height */
  letter-spacing: 0;
  text-transform: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: ${({ $variant, $type }) =>
    $variant === 'outlined' ? `1px solid var(--color-button-${$type}-outlined-border)` : 'none'};
  color: ${({ $variant, $type }) => `var(--color-button-${$type}-${$variant}-color)`};
  background-color: ${({ $variant, $type }) => `var(--color-button-${$type}-${$variant}-bg)`};
  padding: var(--spacing-sm) var(--spacing-md); /* Using theme spacing */
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${({ $variant, $type }) => `var(--color-button-${$type}-${$variant}-hover)`};
  }

  &:active {
    background-color: ${({ $variant, $type }) => `var(--color-button-${$type}-${$variant}-active)`};
  }

  &:disabled {
    background-color: ${({ $variant, $type }) =>
      $variant === 'outlined'
        ? `var(--color-button-${$type}-outlined-bg)`
        : `var(--color-button-${$type}-${$variant}-disabled)`};
    color: var(--color-text-disabled);
    border: ${({ $variant, $type }) =>
      $variant === 'outlined' ? `1px solid var(--color-button-${$type}-outlined-disabled)` : 'none'};
  }
`;

const PrimaryButton = ({
  label = 'Сохранить',
  $variant = 'contained',
  $type = 'primary',
  width = '160px',
  height = '53px',
  disabled = false,
  onClick,
}: TPrimaryButtonProps) => {
  return (
    <Button $type={$type} $variant={$variant} width={width} height={height} disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
};

export default PrimaryButton;
