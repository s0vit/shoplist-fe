import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'radio', options: ['h1', 'h2', 'h3', 'body1', 'body2', 'button'] },
    weight: { control: 'radio', options: ['regular', 'medium', 'bold'] },
    align: { control: 'radio', options: ['left', 'center', 'right'] },
    color: { control: 'color' },
  },
};

export default meta;
type TStory = StoryObj<typeof Typography>;

export const Heading1: TStory = {
  args: {
    children: 'Заголовок H1',
    variant: 'h1',
    weight: 'bold',
    align: 'left',
  },
};

export const Body1: TStory = {
  args: {
    children: 'Текст body1',
    variant: 'body1',
    weight: 'regular',
    align: 'left',
  },
};

export const ButtonText: TStory = {
  args: {
    children: 'Текст кнопки',
    variant: 'button',
    weight: 'medium',
    align: 'center',
  },
};
