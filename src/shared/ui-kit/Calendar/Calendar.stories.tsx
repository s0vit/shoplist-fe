import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta = {
  title: 'UI Kit/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: new Date(),
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
