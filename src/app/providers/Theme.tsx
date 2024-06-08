import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default ThemeProviderWithToggle;
