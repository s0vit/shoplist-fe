import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalculatorButton } from './CalculatorButton';

const meta: Meta<typeof CalculatorButton> = {
  title: 'UI/CalculatorButton',
  component: CalculatorButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Кнопка калькулятора с поддержкой цифр и backspace. Поддерживает разные цветовые схемы.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст кнопки (цифра или символ)',
    },
    variant: {
      control: { type: 'select' },
      options: ['calculator', 'backspace', 'comma'],
      description: 'Тип кнопки',
    },

    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '1',
    variant: 'calculator',
  },
};

export const BackspaceButton: Story = {
  args: {
    variant: 'backspace',
  },
};

export const CommaButton: Story = {
  args: {
    variant: 'comma',
  },
};

export const Disabled: Story = {
  args: {
    children: '0',
    variant: 'calculator',
    disabled: true,
  },
};

// Интерактивный пример с калькулятором
const CalculatorExample = () => {
  const [display, setDisplay] = useState('0');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumberClick = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: 'var(--color-card-shadow)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-card-bg)',
          padding: '16px',
          borderRadius: '4px',
          textAlign: 'right',
          fontSize: '24px',
          fontFamily: 'monospace',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-calculator-button-hover-bg)',
        }}
      >
        {display}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <CalculatorButton key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </CalculatorButton>
        ))}

        <CalculatorButton variant="comma" onClick={() => handleNumberClick('.')} disabled={display.includes('.')} />

        <CalculatorButton onClick={() => handleNumberClick('0')}>0</CalculatorButton>

        <CalculatorButton variant="backspace" onClick={handleBackspace} />
      </div>
    </div>
  );
};

export const InteractiveCalculator: Story = {
  render: () => <CalculatorExample />,
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример калькулятора с использованием CalculatorButton',
      },
    },
  },
};
