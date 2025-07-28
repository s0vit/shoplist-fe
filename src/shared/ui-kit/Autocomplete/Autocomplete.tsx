import React, { useState, useRef, useEffect } from 'react';
import { TTextFieldProps } from '../TextField/TextField';
import styled from 'styled-components';

export type AutocompleteProps<T> = {
  value: T | null;
  options: T[];
  onChange: (event: React.SyntheticEvent, value: T | null) => void;
  getOptionLabel: (option: T) => string;
  renderInput: (params: TTextFieldProps) => React.ReactNode;
  renderOption?: (option: T) => React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  label?: string;
};

const Dropdown = styled.ul<{
  $open: boolean;
  $fullWidth?: boolean;
}>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: absolute;
  z-index: 10;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '328px')};
  margin: 0;
  padding: 0;
  background: var(--color-input-bg, #fff);
  border: 1px solid var(--color-input-border, #ccc);
  border-radius: var(--border-radius-lg, 8px);
  max-height: 220px;
  overflow-y: auto;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Option = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: var(--color-input-hover-bg, #f5f5f5);
  }
`;

function Autocomplete<T>({
  value,
  options,
  onChange,
  getOptionLabel,
  renderInput,
  renderOption,
  disabled,
  fullWidth,
  size = 'medium',
  placeholder,
  label,
}: AutocompleteProps<T>) {
  const [inputValue, setInputValue] = useState(value ? getOptionLabel(value) : '');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value ? getOptionLabel(value) : '');
  }, [value, getOptionLabel]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div ref={ref} style={{ position: 'relative', width: fullWidth ? '100%' : undefined }}>
      {renderInput({
        value: inputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        disabled,
        fullWidth,
        size,
        placeholder,
        label,
      })}
      <Dropdown $open={open && filteredOptions.length > 0} $fullWidth={fullWidth}>
        {filteredOptions.map((option, idx) => (
          <Option
            key={idx}
            onClick={() => {
              setInputValue(getOptionLabel(option));
              setOpen(false);
              onChange({} as React.SyntheticEvent, option);
            }}
          >
            {renderOption ? renderOption(option) : getOptionLabel(option)}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
}

export default Autocomplete;
