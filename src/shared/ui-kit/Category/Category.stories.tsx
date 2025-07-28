import type { Meta, StoryObj } from '@storybook/react';
import Category from './Category';
import { TCategoryName, categoryColorPresets } from './Category';

const meta: Meta<typeof Category> = {
  title: 'UI/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'food',
        'transport',
        'house',
        'entertainment',
        'health',
        'education',
        'shopping',
        'travel',
        'work',
        'family',
        'pets',
        'sports',
        'technology',
        'beauty',
        'books',
        'gifts',
        'charity',
        'other',
      ] as TCategoryName[],
    },
    color: {
      control: 'text',
      description: 'CSS цвет или CSS переменная (например: #ff0000 или var(--color-category-food))',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'food',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    name: 'transport',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    name: 'house',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    name: 'entertainment',
    disabled: true,
  },
};

export const AllCategories: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', maxWidth: '400px' }}>
      {(
        [
          'food',
          'transport',
          'house',
          'entertainment',
          'health',
          'education',
          'shopping',
          'travel',
          'work',
          'family',
          'pets',
          'sports',
          'technology',
          'beauty',
          'books',
          'gifts',
          'charity',
          'other',
        ] as TCategoryName[]
      ).map((name) => (
        <Category key={name} name={name} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    name: 'food',
    onClick: () => alert('Category clicked!'),
  },
};

export const CustomColors: Story = {
  args: {
    name: 'food',
    color: '#ff6b6b',
  },
};

export const WithPresetColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', maxWidth: '400px' }}>
      {(
        [
          'food',
          'transport',
          'house',
          'entertainment',
          'health',
          'education',
          'shopping',
          'travel',
          'work',
          'family',
          'pets',
          'sports',
          'technology',
          'beauty',
          'books',
          'gifts',
          'charity',
          'other',
        ] as TCategoryName[]
      ).map((name) => (
        <Category key={name} name={name} />
      ))}
    </div>
  ),
};

export const CustomColorExamples: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '300px' }}>
      <Category name="food" color="#ff6b6b" />
      <Category name="transport" color="#4ecdc4" />
      <Category name="house" color="#45b7d1" />
      <Category name="entertainment" color="#96ceb4" />
    </div>
  ),
};

export const PresetColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '300px' }}>
      <Category name="food" color={categoryColorPresets.green} />
      <Category name="transport" color={categoryColorPresets.blue} />
      <Category name="house" color={categoryColorPresets.red} />
      <Category name="entertainment" color={categoryColorPresets.purple} />
    </div>
  ),
};
