import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    variant: { control: 'radio', options: ['circular', 'rounded', 'square'] },
    name: { control: 'text' },
  },
};

export default meta;
type TStory = StoryObj<typeof Avatar>;

export const Default: TStory = {
  args: {
    children: 'JD',
    width: '40px',
    height: '40px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithImage: TStory = {
  args: {
    src: 'https://i.pravatar.cc/50',
    alt: 'User Avatar',
    width: '40px',
    height: '40px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithName: TStory = {
  args: {
    name: 'John Doe',
    width: '40px',
    height: '40px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithFullName: TStory = {
  args: {
    name: 'Alice Johnson Smith',
    width: '40px',
    height: '40px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const Large: TStory = {
  args: {
    name: 'John Doe',
    width: '80px',
    height: '80px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const Rounded: TStory = {
  args: {
    name: 'Jane Smith',
    width: '40px',
    height: '40px',
    variant: 'rounded',
  },
  parameters: {
    theme: 'dark',
  },
};

export const Square: TStory = {
  args: {
    name: 'Bob Wilson',
    width: '40px',
    height: '40px',
    variant: 'square',
  },
  parameters: {
    theme: 'dark',
  },
};

export const MultipleAvatars: TStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol Davis" />
      <Avatar name="David Wilson" />
      <Avatar name="Eva Brown" />
    </div>
  ),
  parameters: {
    theme: 'dark',
  },
};
