import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI Kit/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const currencyOptions = [
  { value: 'EUR', label: '€' },
  { value: 'USD', label: '$' },
  { value: 'RUB', label: '₽' },
  { value: 'GBP', label: '£' },
];

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
      <Select
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

export const Default: Story = {
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

export const Disabled: Story = {
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
