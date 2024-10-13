import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle, useTheme } from '@mui/material';

export const UnverifiedAlert = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const theme = useTheme();
  const { t } = useTranslation();

  if (!isVerified && isLoggedIn) {
    return (
      <Alert severity="warning" variant="outlined" sx={{ margin: '10px 15px', ...theme.palette.background }}>
        <AlertTitle>{t('Warning: ')}</AlertTitle>
        {t('To get full functionality you should to confirm your email. Please check your email.')}
      </Alert>
    );
  }

  return null;
};
