import styled from 'styled-components';

export type TToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  'data-testid'?: string;
};

type TStyledToggleProps = {
  $checked: boolean;
  disabled?: boolean;
};

const ToggleContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const ToggleButton = styled.button<TStyledToggleProps>`
  width: 24px;
  height: 15px;
  border-radius: 7.5px;
  border: 2px solid var(--color-toggle-border);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $checked }) => ($checked ? 'var(--color-toggle-bg-on)' : 'var(--color-toggle-bg-off)')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
  }

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: var(--color-toggle-thumb);
    border: 2px solid var(--color-toggle-thumb-border);
    transform: ${({ $checked }) => ($checked ? 'translateX(11px)' : 'translateX(0)')};
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const ToggleComponent = ({
  checked = false,
  onChange,
  disabled = false,
  style,
  className,
  'data-testid': dataTestId,
}: TToggleProps) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <ToggleContainer>
      <ToggleButton
        $checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        style={style}
        className={className}
        data-testid={dataTestId}
        type="button"
        role="switch"
        aria-checked={checked}
      />
    </ToggleContainer>
  );
};

export default ToggleComponent;
