import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Locale } from 'date-fns';
import locales from 'src/shared/constants/Locales.ts';

const MuiLocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale | undefined>();

  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0];
    setLocale(browserLocale in locales ? locales[browserLocale as keyof typeof locales] : locales.ru);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      {children}
    </LocalizationProvider>
  );
};

export default MuiLocalizationProvider;
