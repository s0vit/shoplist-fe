import type { Meta, StoryObj } from '@storybook/react';
import Grid, { GridItem } from './Grid';
import Box from '../Box/Box';
import React, { useEffect, useState } from 'react';

const breakpointLabels = [
  { name: 'xs', max: 600 },
  { name: 'sm', max: 900 },
  { name: 'md', max: 1200 },
  { name: 'lg', max: 1536 },
  { name: 'xl', max: Infinity },
];

const getBreakpoint = (width: number) => {
  for (const bp of breakpointLabels) {
    if (width < bp.max) return bp.name;
  }

  return 'xl';
};

const BreakpointInfo = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(width));

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      setBreakpoint(getBreakpoint(w));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 9999,
        background: 'rgba(25, 118, 210, 0.9)',
        color: '#fff',
        padding: '6px 16px',
        borderRadius: 8,
        fontSize: 14,
        fontFamily: 'monospace',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        pointerEvents: 'none',
      }}
    >
      <span>width: {width}px</span> | <span>breakpoint: {breakpoint}</span>
    </div>
  );
};

const meta: Meta<typeof Grid> = {
  title: 'UI/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    container: { control: 'boolean' },
    item: { control: 'boolean' },
    spacing: { control: 'number' },
    rowSpacing: { control: 'number' },
    columnSpacing: { control: 'number' },
    direction: {
      control: 'radio',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    alignItems: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    justifyContent: {
      control: 'radio',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    wrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    size: { control: 'number' },
    style: { control: 'object' },
    className: { control: 'text' },
    sx: { control: 'object' },
    children: { control: false },
  },
  args: {
    container: true,
    spacing: 2,
    direction: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    wrap: 'wrap',
    children: [
      <GridItem key={1} size={4}>
        <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 1</Box>
      </GridItem>,
      <GridItem key={2} size={4}>
        <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 2</Box>
      </GridItem>,
      <GridItem key={3} size={4}>
        <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 3</Box>
      </GridItem>,
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Container: Story = {
  render: () => (
    <>
      <BreakpointInfo />
      <Grid container spacing={2}>
        <Grid item size={4}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 1</Box>
        </Grid>
        <Grid item size={4}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 2</Box>
        </Grid>
        <Grid item size={4}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>Item 3</Box>
        </Grid>
      </Grid>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid-контейнер с 3 Grid-элементами по 4/12.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <>
      <BreakpointInfo />
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>xs=12 sm=6</Box>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>xs=12 sm=6</Box>
        </Grid>
      </Grid>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid с responsive size (xs=12, sm=6).',
      },
    },
  },
};

export const AllBreakpoints: Story = {
  render: () => (
    <>
      <BreakpointInfo />
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <Box style={{ background: '#1976d2', color: '#fff', padding: 16 }}>
            xs=12
            <br />
            sm=6
            <br />
            md=4
            <br />
            lg=3
            <br />
            xl=2
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <Box style={{ background: '#388e3c', color: '#fff', padding: 16 }}>
            xs=12
            <br />
            sm=6
            <br />
            md=4
            <br />
            lg=3
            <br />
            xl=2
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 2 }}>
          <Box style={{ background: '#fbc02d', color: '#222', padding: 16 }}>
            xs=12
            <br />
            sm=12
            <br />
            md=4
            <br />
            lg=3
            <br />
            xl=2
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 3, xl: 6 }}>
          <Box style={{ background: '#d32f2f', color: '#fff', padding: 16 }}>
            xs=12
            <br />
            sm=12
            <br />
            md=12
            <br />
            lg=3
            <br />
            xl=6
          </Box>
        </Grid>
      </Grid>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grid с явным указанием всех брейкпоинтов для каждого GridItem. Меняйте ширину окна, чтобы увидеть адаптивность.',
      },
    },
  },
};
