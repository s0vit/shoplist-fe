import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from './Button';

const meta: Meta<typeof PrimaryButton> = {
  title: 'UI/Buttons',
  component: PrimaryButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    variant: { control: 'radio', options: ['contained', 'outlined'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type TStory = StoryObj<typeof PrimaryButton>;

// Dark Theme Stories
export const PrimaryContained: TStory = {
  args: {
    label: 'Сохранить',
    variant: 'contained',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const PrimaryOutlined: TStory = {
  args: {
    label: 'Сохранить',
    variant: 'outlined',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};
