import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateTimePicker from './DateTimePicker';

const meta: Meta<typeof DateTimePicker> = {
  title: 'UI Kit/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disableFuture: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Date and Time',
  },
};

const WithInitialValueComponent = (args: Story['args']) => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return <DateTimePicker {...args} value={value} onChange={setValue} />;
};

export const WithInitialValue: Story = {
  args: {
    label: 'Select Date and Time',
  },
  render: WithInitialValueComponent,
};

export const DisableFuture: Story = {
  args: {
    label: 'Select Date and Time',
    disableFuture: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select Date and Time',
    disabled: true,
  },
};
