import type { Meta, StoryObj } from '@storybook/react';
import Paper from './Paper';
import Typography from '../Typography/Typography';

const meta: Meta<typeof Paper> = {
  title: 'UI/Paper',
  component: Paper,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    elevation: { control: 'number', min: 0, max: 24 },
    padding: { control: 'text' },
    borderRadius: { control: 'text' },
  },
};

export default meta;
type TStory = StoryObj<typeof Paper>;

export const Default: TStory = {
  args: {
    children: <Typography variant="body1">This is a paper component</Typography>,
    width: '300px',
    height: '200px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithCustomPadding: TStory = {
  args: {
    children: <Typography variant="body1">Paper with custom padding</Typography>,
    width: '300px',
    height: '200px',
    padding: '32px',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithCustomBorderRadius: TStory = {
  args: {
    children: <Typography variant="body1">Paper with custom border radius</Typography>,
    width: '300px',
    height: '200px',
    borderRadius: '8px',
  },
  parameters: {
    theme: 'dark',
  },
};
