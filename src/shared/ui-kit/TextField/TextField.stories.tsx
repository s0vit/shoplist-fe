import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    placeholder: { control: 'text' },
  },
};

export default meta;
type TStory = StoryObj<typeof TextField>;

export const Default: TStory = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'outlined',
    size: 'medium',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithHelperText: TStory = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'outlined',
    helperText: 'Password must be at least 8 characters long',
    type: 'password',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithError: TStory = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'outlined',
    error: true,
    helperText: 'Please enter a valid email address',
  },
  parameters: {
    theme: 'dark',
  },
};

export const Disabled: TStory = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    variant: 'outlined',
    disabled: true,
  },
  parameters: {
    theme: 'dark',
  },
};

export const FullWidth: TStory = {
  args: {
    label: 'Full Width Field',
    placeholder: 'This field takes full width',
    variant: 'outlined',
    fullWidth: true,
  },
  parameters: {
    theme: 'dark',
  },
};
