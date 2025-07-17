import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';

const meta: Meta<typeof Box> = {
  title: 'UI/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'radio',
      options: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'inline-grid', 'none'],
    },
    flexDirection: {
      control: 'radio',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    flexWrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    alignItems: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    justifyContent: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    gap: { control: 'number' },
    gridTemplateColumns: { control: 'text' },
    gridColumn: { control: 'text' },
    gridRow: { control: 'text' },
    gridArea: { control: 'text' },
    gridTemplateRows: { control: 'text' },
    gridTemplateAreas: { control: 'text' },
    columnGap: { control: 'number' },
    rowGap: { control: 'number' },
    sx: { control: 'object' },
    className: { control: 'text' },
    style: { control: 'object' },
    component: { control: 'text' },
    children: { control: false },
  },
  args: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    style: { background: '#eee', padding: 16 },
    children: [
      <div key={1} style={{ background: '#1976d2', color: '#fff', padding: 8 }}>
        Item 1
      </div>,
      <div key={2} style={{ background: '#1976d2', color: '#fff', padding: 8 }}>
        Item 2
      </div>,
      <div key={3} style={{ background: '#1976d2', color: '#fff', padding: 8 }}>
        Item 3
      </div>,
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Flex: Story = {
  render: () => (
    <Box display="flex" gap={2} style={{ background: '#eee', padding: 16 }}>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>Item 1</div>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>Item 2</div>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>Item 3</div>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box с display="flex" и gap=2.',
      },
    },
  },
};

export const Grid: Story = {
  render: () => (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} style={{ background: '#eee', padding: 16 }}>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>1</div>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>2</div>
      <div style={{ background: '#1976d2', color: '#fff', padding: 8 }}>3</div>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box с display="grid" и 3 колонками.',
      },
    },
  },
};

export const CustomComponent: Story = {
  render: () => (
    <Box component="span" display="block" style={{ background: '#1976d2', color: '#fff', padding: 8 }}>
      Я span, но как Box
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box с кастомным компонентом (span).',
      },
    },
  },
};
