import { CssBaseline, createTheme } from '@mui/material';
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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    const styleContent = `
    ::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.palette.background.default};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${theme.palette.grey[500]};
      border-radius: 20px;
      border: 1px solid ${theme.palette.grey[600]};
    }
  `;
    const style = document.createElement('style');
    style.innerHTML = styleContent;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWithToggle;
