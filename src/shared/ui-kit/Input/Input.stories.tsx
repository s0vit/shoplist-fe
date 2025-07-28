import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый Input с плейсхолдером.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Введите текст...',
    defaultValue: 'Пример текста',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input с предустановленным значением.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Введите текст...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input в отключенном состоянии с серым фоном и пониженной прозрачностью.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Введите текст...',
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input с ошибкой - добавляется красная рамка.',
      },
    },
  },
};

export const WithType: Story = {
  args: {
    placeholder: 'Введите email...',
    type: 'email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input с типом email для валидации.',
      },
    },
  },
};
