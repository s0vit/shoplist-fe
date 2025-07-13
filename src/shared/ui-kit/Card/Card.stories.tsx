import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type TStory = StoryObj<typeof Card>;

export const Default: TStory = {
  args: {
    children: 'Контент карточки по центру',
  },
};

export const WithDimensions: TStory = {
  args: {
    children: 'Контент карточки по центру',
    width: '320px',
    height: '200px',
  },
};
