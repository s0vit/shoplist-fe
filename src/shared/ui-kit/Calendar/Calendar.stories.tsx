import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    calendarType: { control: false },
    inputRef: { control: false },
    tileClassName: { control: false },
    tileContent: { control: false },
    className: { control: false },
  },
  args: {
    value: new Date(),
    calendarType: 'iso8601',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRange: Story = {
  args: {
    selectRange: true,
    defaultValue: [new Date(), new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)],
  },
};
