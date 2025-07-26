import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент для отображения SVG иконок с автоматической адаптацией к теме. Полная документация доступна в разделе Iconography.',
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
        'camera',
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
      description: 'Кастомный цвет иконки (переопределяет variant)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled'],
      description: 'Вариант иконки (адаптируется к теме)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'plus',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовая иконка с размером md (24px) и primary вариантом.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    name: 'plus',
    size: 'xl',
    variant: 'primary',
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
    variant: 'primary',
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
        story: 'Иконка с кастомным цветом (переопределяет variant).',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    name: 'plus',
    size: 'md',
    variant: 'primary',
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
      <Icon name="plus" size="xs" variant="primary" />
      <Icon name="plus" size="sm" variant="primary" />
      <Icon name="plus" size="md" variant="primary" />
      <Icon name="plus" size="lg" variant="primary" />
      <Icon name="plus" size="xl" variant="primary" />
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

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="plus" size="md" variant="primary" />
      <Icon name="plus" size="md" variant="secondary" />
      <Icon name="plus" size="md" variant="disabled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация вариантов иконок (primary, secondary, disabled). Цвета автоматически адаптируются к теме.',
      },
    },
  },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
      <Icon name="plus" size="md" variant="primary" />
      <Icon name="decline" size="md" variant="primary" />
      <Icon name="chevroneRight" size="md" variant="primary" />
      <Icon name="pencilSquare" size="md" variant="primary" />
      <Icon name="calendar" size="md" variant="primary" />
      <Icon name="burgerMenu" size="md" variant="primary" />
      <Icon name="home" size="md" variant="primary" />
      <Icon name="card" size="md" variant="primary" />
      <Icon name="coin" size="md" variant="primary" />
      <Icon name="menu" size="md" variant="primary" />
      <Icon name="camera" size="md" variant="primary" />
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
        story: 'Демонстрация иконок с кастомными цветами.',
      },
    },
  },
};

export const ThemeAdaptation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Primary Variant</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="plus" size="md" variant="primary" />
          <Icon name="home" size="md" variant="primary" />
          <Icon name="card" size="md" variant="primary" />
        </div>
      </div>
      <div>
        <h4>Secondary Variant</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="plus" size="md" variant="secondary" />
          <Icon name="home" size="md" variant="secondary" />
          <Icon name="card" size="md" variant="secondary" />
        </div>
      </div>
      <div>
        <h4>Disabled Variant</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="plus" size="md" variant="disabled" />
          <Icon name="home" size="md" variant="disabled" />
          <Icon name="card" size="md" variant="disabled" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация адаптации иконок к теме. Цвета автоматически меняются в зависимости от активной темы (светлая/темная).',
      },
    },
  },
};
