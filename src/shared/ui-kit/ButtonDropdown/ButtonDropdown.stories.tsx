import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ButtonDropdownComponent from './ButtonDropdown';

const meta: Meta<typeof ButtonDropdownComponent> = {
  title: 'UI/ButtonDropdown',
  component: ButtonDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type TStory = StoryObj<typeof ButtonDropdownComponent>;

const currencyOptions = [
  { value: 'EUR', label: '€' },
  { value: 'USD', label: '$' },
  { value: 'RUB', label: '₽' },
  { value: 'GBP', label: '£' },
];

// Интерактивная обертка для Storybook
const InteractiveWrapper = ({
  options,
  placeholder,
  disabled,
}: {
  options: typeof currencyOptions;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ padding: '20px' }}>
      <ButtonDropdownComponent
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder || 'Выберите...'}
        disabled={disabled || false}
      />
      {value && (
        <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Выбрано: {options.find((opt) => opt.value === value)?.label}
        </div>
      )}
    </div>
  );
};

export const Default: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: currencyOptions,
    placeholder: 'Выберите валюту',
    disabled: false,
  },
  parameters: {
    theme: 'light',
  },
};

export const Disabled: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: currencyOptions,
    placeholder: 'Выберите валюту',
    disabled: true,
  },
  parameters: {
    theme: 'light',
  },
};
