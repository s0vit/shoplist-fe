import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Box, Chip, Typography } from 'src/shared/ui-kit';
import useStableCallback from 'src/utils/hooks/useStableCallback';

import type { MultiSelectOption } from '../types';

type MultiSelectFieldProps = {
  label: string;
  placeholder: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
};

const MultiSelectField = ({
  label,
  placeholder,
  options,
  values,
  onChange,
  disabled = false,
}: MultiSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const toggleValue = useStableCallback((value: string) => {
    if (disabled) {
      return;
    }

    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value));
    } else {
      onChange([...values, value]);
    }
  });

  const summaryLabel =
    values.length === 0
      ? placeholder
      : values.map((value) => options.find((option) => option.value === value)?.label || value).join(', ');

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body2" weight="bold">
        {label}
      </Typography>
      <MultiSelectContainer>
        <MultiSelectButton
          type="button"
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
          }}
          aria-label={label}
          disabled={disabled}
        >
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {summaryLabel || placeholder}
          </span>
          <span aria-hidden="true">{open ? '^' : 'v'}</span>
        </MultiSelectButton>
        <MultiSelectDropdown $open={open}>
          {options.map((option) => (
            <MultiSelectOptionRow
              key={option.value}
              onClick={() => {
                if (disabled) return;
                toggleValue(option.value);
              }}
              style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              <input
                type="checkbox"
                checked={values.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                onClick={(event) => event.stopPropagation()}
                disabled={disabled}
              />
              <span>{option.label}</span>
            </MultiSelectOptionRow>
          ))}
        </MultiSelectDropdown>
      </MultiSelectContainer>
      {values.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap="8px" sx={{ marginTop: '4px' }}>
          {values.map((value) => {
            const label = options.find((option) => option.value === value)?.label || value;

            return (
              <Chip
                key={value}
                label={label}
                onClick={disabled ? undefined : () => toggleValue(value)}
                variant="outlined"
                color="primary"
                style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
              />
            );
          })}
        </Box>
      )}
    </div>
  );
};

const MultiSelectContainer = styled.div`
  position: relative;
`;

const MultiSelectButton = styled.button`
  width: 100%;
  min-height: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-input-border, transparent);
  background-color: var(--color-input-bg);
  color: var(--color-input-text);
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-body2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const MultiSelectDropdown = styled.ul<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  padding: 8px 0;
  margin: 0;
  list-style: none;
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  z-index: 5;
  overflow-y: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.16s ease;
`;

const MultiSelectOptionRow = styled.li`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-input-hover-bg, rgba(0, 0, 0, 0.06));
  }

  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  span {
    flex: 1;
    font-size: var(--font-size-body2);
  }
`;

export default MultiSelectField;
