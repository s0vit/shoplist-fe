import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from './Button';

const meta: Meta<typeof PrimaryButton> = {
  title: 'UI/Buttons',
  component: PrimaryButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    textColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['contained', 'outlined'],
    },
  },
};

export default meta;
type TStory = StoryObj<typeof PrimaryButton>;

export const SaveDark: TStory = {
  args: {
    label: 'Сохранить',
    variant: 'contained',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
};

export const SaveLight: TStory = {
  args: {
    label: 'Сохранить',
    variant: 'contained',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
};

export const ClearDark: TStory = {
  args: {
    label: 'Очистить',
    textColor: '#FFFFFF',
    variant: 'contained',
    backgroundColor: '#151516',
    borderColor: '#FFFFFF',
  },
};

export const ClearLight: TStory = {
  args: {
    label: 'Очистить',
    textColor: '#000000',
    variant: 'outlined',
    borderColor: '#000000',
  },
};

export const CancelDark: TStory = {
  args: {
    label: 'Отменить',
    variant: 'contained',
    textColor: '#FFFFFF',
    backgroundColor: '#151516',
    borderColor: '#FFFFFF',
  },
};

export const CancelLight: TStory = {
  args: {
    label: 'Отменить',
    variant: 'outlined',
    textColor: '#000000',
    borderColor: '#000000',
  },
};

export const RegisterDark: TStory = {
  args: {
    label: 'Зарегистрироваться',
    variant: 'contained',
    width: '296px',
    height: '53px',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
};

export const RegisterLight: TStory = {
  args: {
    label: 'Зарегистрироваться',
    variant: 'contained',
    width: '296px',
    height: '53px',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
};

export const LoginDark: TStory = {
  args: {
    label: 'Войти',
    variant: 'contained',
    width: '296px',
    height: '53px',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
};

export const LoginLight: TStory = {
  args: {
    label: 'Войти',
    variant: 'contained',
    width: '296px',
    height: '53px',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
};
