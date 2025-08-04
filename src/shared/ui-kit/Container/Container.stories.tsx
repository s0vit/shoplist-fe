import type { Meta, StoryObj } from '@storybook/react';
import Container from './Container';
import Typography from '../Typography/Typography';

const meta: Meta<typeof Container> = {
  title: 'UI/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl', false] },
  },
};

export default meta;
type TStory = StoryObj<typeof Container>;

export const Default: TStory = {
  args: {
    children: <Typography variant="body1">This is a container with default maxWidth</Typography>,
    maxWidth: 'lg',
  },
  parameters: {
    theme: 'dark',
  },
};

export const Small: TStory = {
  args: {
    children: <Typography variant="body1">This is a small container</Typography>,
    maxWidth: 'sm',
  },
  parameters: {
    theme: 'dark',
  },
};

export const ExtraSmall: TStory = {
  args: {
    children: <Typography variant="body1">This is an extra small container</Typography>,
    maxWidth: 'xs',
  },
  parameters: {
    theme: 'dark',
  },
};
