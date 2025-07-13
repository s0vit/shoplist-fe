import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import 'src/shared/themes/colors.css';
import 'src/shared/themes/typography.css';
import 'src/shared/themes/spacing.css';
import 'src/shared/themes/lightTheme.css';
import 'src/shared/themes/darkTheme.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      let currentTheme = context.globals.theme;

      if (!currentTheme) {
        currentTheme = context.globals.backgrounds?.value === '#000000' ? 'light' : 'dark';
      }

      useEffect(() => {
        const rootElement = document.documentElement;

        rootElement.classList.remove('theme-light', 'theme-dark');
        rootElement.classList.add(`theme-${currentTheme}`);
        rootElement.setAttribute('data-theme', currentTheme);
      }, [currentTheme]);

      return (
        <div id="storybook-preview" style={{ backgroundColor: 'var(--color-background)', padding: '20px' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#000000' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    designToken: {
      defaultTab: 'Basic-Colors',
      styleInjection: '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");',
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
  },
};

export default preview;
