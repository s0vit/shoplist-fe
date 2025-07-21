import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'plus',
        'decline',
        'chevroneRight',
        'pencilSquare',
        'calendar',
        'burgerMenu',
        'home',
        'card',
        'coin',
        'menu',
        'camera',
      ],
    },
    iconSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'camera',
    iconSize: 'md',
    variant: 'text',
    disabled: false,
  },
};

export const Contained: Story = {
  args: {
    icon: 'plus',
    iconSize: 'md',
    variant: 'contained',
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    icon: 'pencilSquare',
    iconSize: 'md',
    variant: 'outlined',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    icon: 'camera',
    iconSize: 'md',
    variant: 'text',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    icon: 'home',
    iconSize: 'lg',
    variant: 'text',
    disabled: false,
    width: '60px',
    height: '60px',
  },
};
