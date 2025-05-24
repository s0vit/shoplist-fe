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
    $variant: {
      control: { type: 'radio' },
      options: ['contained', 'outlined'],
    },
    $type: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type TStory = StoryObj<typeof PrimaryButton>;

// Dark Theme Stories
export const PrimaryContainedDark: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'contained',
    $type: 'primary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const PrimaryOutlinedDark: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'outlined',
    $type: 'primary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const SecondaryContainedDark: TStory = {
  args: {
    label: 'Очистить',
    $variant: 'contained',
    $type: 'secondary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const SecondaryOutlinedDark: TStory = {
  args: {
    label: 'Очистить',
    $variant: 'outlined',
    $type: 'secondary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const PrimaryContainedDarkDisabled: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'contained',
    $type: 'primary',
    width: '160px',
    height: '53px',
    disabled: true,
  },
  parameters: {
    theme: 'dark',
  },
};

export const RegisterDark: TStory = {
  args: {
    label: 'Зарегистрироваться',
    $variant: 'contained',
    $type: 'primary',
    width: '296px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const LoginDark: TStory = {
  args: {
    label: 'Войти',
    $variant: 'contained',
    $type: 'primary',
    width: '296px',
    height: '53px',
  },
  parameters: {
    theme: 'dark',
  },
};

// Light Theme Stories
export const PrimaryContainedLight: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'contained',
    $type: 'primary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};

export const PrimaryOutlinedLight: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'outlined',
    $type: 'primary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};

export const SecondaryContainedLight: TStory = {
  args: {
    label: 'Очистить',
    $variant: 'contained',
    $type: 'secondary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};

export const SecondaryOutlinedLight: TStory = {
  args: {
    label: 'Очистить',
    $variant: 'outlined',
    $type: 'secondary',
    width: '160px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};

export const PrimaryContainedLightDisabled: TStory = {
  args: {
    label: 'Сохранить',
    $variant: 'contained',
    $type: 'primary',
    width: '160px',
    height: '53px',
    disabled: true,
  },
  parameters: {
    theme: 'light',
  },
};

export const RegisterLight: TStory = {
  args: {
    label: 'Зарегистрироваться',
    $variant: 'contained',
    $type: 'primary',
    width: '296px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};

export const LoginLight: TStory = {
  args: {
    label: 'Войти',
    $variant: 'contained',
    $type: 'primary',
    width: '296px',
    height: '53px',
  },
  parameters: {
    theme: 'light',
  },
};
