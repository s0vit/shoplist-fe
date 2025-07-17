import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

export type TOption = {
  value: string;
  label: string;
};

export type TButtonDropdownProps = {
  options: TOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  'data-testid'?: string;
};

type TStyledButtonDropdownProps = {
  disabled?: boolean;
  $isOpen?: boolean;
};

type TStyledDropdownListProps = {
  $isOpen: boolean;
};

const ButtonDropdown = styled.button<TStyledButtonDropdownProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-pill);
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: var(--color-dropdown-bg);
  color: var(--color-dropdown-text);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-family: var(--font-family);
  font-weight: var(--font-weight-regular);
  font-size: 20px;
  line-height: 1em;
  text-align: left;
  transition: opacity 0.2s ease;
  position: relative;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
  }
`;

const DropdownIcon = styled.div<{ $isOpen?: boolean }>`
  width: 8px;
  height: 8px;
  background-color: var(--color-dropdown-icon);
  mask: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 3L4 5L6 3' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    no-repeat center;
  mask-size: contain;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownList = styled.ul<TStyledDropdownListProps>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  background-color: var(--color-dropdown-bg);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 0;
  padding: var(--spacing-xs) 0;
  list-style: none;
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.2s ease;
  max-height: 200px;
  overflow-y: auto;
  white-space: nowrap;
`;

const DropdownItem = styled.li`
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  color: var(--color-dropdown-text);
  font-family: var(--font-family);
  font-weight: var(--font-weight-regular);
  font-size: 16px;
  line-height: 1.25;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-dropdown-hover-bg, rgba(0, 0, 0, 0.05));
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const ButtonDropdownComponent = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  disabled = false,
  style,
  className,
  'data-testid': dataTestId,
}: TButtonDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <ButtonDropdown
        $isOpen={isOpen}
        disabled={disabled}
        onClick={handleToggle}
        style={style}
        className={className}
        data-testid={dataTestId}
      >
        <span>{displayText}</span>
        <DropdownIcon $isOpen={isOpen} />
      </ButtonDropdown>

      <DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            data-testid={`${dataTestId}-option-${option.value}`}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default ButtonDropdownComponent;
