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
    typographyVariant: { control: 'radio', options: ['h1', 'h2', 'h3', 'body1', 'body2', 'button'] },
    typographyWeight: { control: 'radio', options: ['regular', 'medium', 'bold'] },
    typographyAlign: { control: 'radio', options: ['left', 'center', 'right'] },
    typographyColor: { control: 'color' },
  },
};

export default meta;
type TStory = StoryObj<typeof Card>;

export const Default: TStory = {
  args: {
    children: 'Контент карточки по центру',
    typographyVariant: 'body1',
    typographyWeight: 'regular',
    typographyAlign: 'center',
  },
};

export const WithTypography: TStory = {
  args: {
    children: 'Заголовок карточки',
    typographyVariant: 'h2',
    typographyWeight: 'bold',
    typographyAlign: 'center',
    typographyColor: '#1976d2',
    width: '320px',
    height: '120px',
  },
};

const boldText = 'Любой JSX';
const redText = 'внутри карточки';
export const CustomContent: TStory = {
  args: {
    children: (
      <div>
        <b>{boldText}</b> <span style={{ color: 'red' }}>{redText}</span>
      </div>
    ),
    width: '320px',
    height: '120px',
  },
};
