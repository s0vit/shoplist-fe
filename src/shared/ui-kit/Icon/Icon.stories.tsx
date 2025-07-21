import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент для отображения SVG иконок. Полная документация доступна в разделе Iconography.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'plus',
        'decline',
        'chevroneRight',
        'pencilSquare',
        'calendar',
        'burgerMenu',
        'home',
        'card',
        'coin',
        'menu',
      ],
      description: 'Название иконки',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Размер иконки',
    },
    color: {
      control: 'color',
      description: 'Цвет иконки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'plus',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовая иконка с размером md (24px).',
      },
    },
  },
};

export const Large: Story = {
  args: {
    name: 'plus',
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Большая иконка размером xl (48px).',
      },
    },
  },
};

export const Small: Story = {
  args: {
    name: 'plus',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Маленькая иконка размером sm (16px).',
      },
    },
  },
};

export const Colored: Story = {
  args: {
    name: 'plus',
    size: 'md',
    color: '#FF0000',
  },
  parameters: {
    docs: {
      description: {
        story: 'Иконка с кастомным цветом.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    name: 'plus',
    size: 'md',
    onClick: () => alert('Icon clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Кликабельная иконка с обработчиком события.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="plus" size="xs" />
      <Icon name="plus" size="sm" />
      <Icon name="plus" size="md" />
      <Icon name="plus" size="lg" />
      <Icon name="plus" size="xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров иконок.',
      },
    },
  },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
      <Icon name="plus" size="md" />
      <Icon name="decline" size="md" />
      <Icon name="chevroneRight" size="md" />
      <Icon name="pencilSquare" size="md" />
      <Icon name="calendar" size="md" />
      <Icon name="burgerMenu" size="md" />
      <Icon name="home" size="md" />
      <Icon name="card" size="md" />
      <Icon name="coin" size="md" />
      <Icon name="menu" size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех доступных иконок. Для полной документации смотрите раздел Iconography.',
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
      <Icon name="plus" size="md" color="#FF0000" />
      <Icon name="plus" size="md" color="#00FF00" />
      <Icon name="plus" size="md" color="#0000FF" />
      <Icon name="plus" size="md" color="#FFD700" />
      <Icon name="plus" size="md" color="#FF69B4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация иконок с разными цветами.',
      },
    },
  },
};
