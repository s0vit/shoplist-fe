import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';
import PrimaryButton from '../Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <PrimaryButton label="Contained" variant="contained" />
      <PrimaryButton label="Outlined" variant="outlined" />
    </ButtonGroup>
  ),
};

export const Joined: Story = {
  render: () => (
    <ButtonGroup joined>
      <PrimaryButton label="Contained" variant="contained" />
      <PrimaryButton label="Outlined" variant="outlined" />
    </ButtonGroup>
  ),
};

export const FullWidthJoined: Story = {
  render: () => (
    <ButtonGroup joined fullWidth>
      <PrimaryButton label="Contained" variant="contained" />
      <PrimaryButton label="Outlined" variant="outlined" />
    </ButtonGroup>
  ),
};
