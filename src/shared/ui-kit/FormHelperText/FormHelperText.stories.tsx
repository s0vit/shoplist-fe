import type { Meta, StoryObj } from '@storybook/react';
import FormHelperText from './FormHelperText';

const meta: Meta<typeof FormHelperText> = {
  title: 'UI/FormHelperText',
  component: FormHelperText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type TStory = StoryObj<typeof FormHelperText>;

export const Default: TStory = {
  args: {
    children: 'This is a helper text',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithError: TStory = {
  args: {
    children: 'This field is required',
    error: true,
  },
  parameters: {
    theme: 'dark',
  },
};

export const Disabled: TStory = {
  args: {
    children: 'This field is disabled',
    disabled: true,
  },
  parameters: {
    theme: 'dark',
  },
};
