import { ThemeProvider } from '@emotion/react';
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { THEME_ENUM } from 'src/shared/api/userConfigApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const ThemeProviderWithToggle = ({ children }: PropsWithChildren) => {
  // get current browser color mode
  const defaultTheme = useUserSettingsStore.use.config().theme;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getInitialTheme = useStableCallback(() => {
    switch (defaultTheme) {
      case THEME_ENUM.DARK:
        return 'dark';
      case THEME_ENUM.LIGHT:
        return 'light';
      case THEME_ENUM.SYSTEM:
        if (prefersDarkMode) return 'dark';
        else return 'light';
      default:
        return 'light';
    }
  });

  useEffect(() => {
    setMode(getInitialTheme());
  }, [getInitialTheme, defaultTheme]);

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    const styleContent = `
    ::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-bg);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-border);
      border-radius: 20px;
      border: 1px solid var(--color-border);
    }
  `;
    const style = document.createElement('style');
    style.innerHTML = styleContent;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [mode]);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.remove('theme-light', 'theme-dark');
    rootElement.classList.add(`theme-${mode}`);
    rootElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={{ mode }}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWithToggle;
