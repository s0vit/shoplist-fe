import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const ThemeProviderWithToggle = ({ children }: PropsWithChildren) => {
  // get current browser color mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
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
