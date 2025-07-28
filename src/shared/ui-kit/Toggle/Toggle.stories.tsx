import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ToggleComponent from './Toggle';

const meta: Meta<typeof ToggleComponent> = {
  title: 'UI/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type TStory = StoryObj<typeof ToggleComponent>;

// Интерактивная обертка для Storybook
const InteractiveWrapper = ({ disabled }: { disabled?: boolean }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div style={{ padding: '20px' }}>
      <ToggleComponent checked={checked} onChange={setChecked} disabled={disabled || false} />
      <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--color-text-primary)' }}>
        Состояние: {checked ? 'Включено' : 'Выключено'}
      </div>
    </div>
  );
};

export const Default: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    disabled: false,
  },
  parameters: {
    theme: 'light',
  },
};

export const Checked: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    disabled: false,
  },
  parameters: {
    theme: 'light',
  },
};

export const Dark: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    disabled: false,
  },
  parameters: {
    theme: 'dark',
  },
};

export const Disabled: TStory = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    disabled: true,
  },
  parameters: {
    theme: 'light',
  },
};
