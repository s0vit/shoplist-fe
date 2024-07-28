import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Locale } from 'date-fns';
import { useEffect, useState } from 'react';

const MuiLocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale | undefined>();

  useEffect(() => {
    let allLocales;

    import('date-fns/locale').then((module) => {
      allLocales = module;
    });

    const browserLocale = navigator.language.replace('-', '');
    const rootLocale = browserLocale.substring(0, 2);

    if (allLocales && allLocales[rootLocale] && browserLocale) {
      setLocale(allLocales[browserLocale]);
    } else {
      setLocale(allLocales?.[rootLocale]);
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      {children}
    </LocalizationProvider>
  );
};

export default MuiLocalizationProvider;
