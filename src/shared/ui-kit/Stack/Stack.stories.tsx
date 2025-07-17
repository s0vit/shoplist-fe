import type { Meta, StoryObj } from '@storybook/react';
import Stack from './Stack';
import PrimaryButton from '../Button/Button';

const meta: Meta<typeof Stack> = {
  title: 'UI/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column'],
    },
    gap: { control: 'number' },
    align: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    justify: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    flexWrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
    sx: { control: 'object' },
    children: { control: false },
  },
  args: {
    direction: 'column',
    gap: 2,
    align: 'stretch',
    justify: 'flex-start',
    flexWrap: 'nowrap',
  },
};
export default meta;

type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
  render: () => (
    <Stack gap={2}>
      <PrimaryButton label="Кнопка 1" />
      <PrimaryButton label="Кнопка 2" />
      <PrimaryButton label="Кнопка 3" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальный Stack с gap=2.',
      },
    },
  },
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap={2}>
      <PrimaryButton label="Кнопка 1" />
      <PrimaryButton label="Кнопка 2" />
      <PrimaryButton label="Кнопка 3" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальный Stack с gap=2.',
      },
    },
  },
};
