import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle, Button, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import handleError from '../errorHandler';
import { getNewLink } from 'src/shared/api/authApi';

export const UnverifiedAlert = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const theme = useTheme();
  const userData = useUserStore.use.user?.();
  const { t } = useTranslation();

  const { mutate: getNewLinkMutate } = useMutation({
    mutationFn: getNewLink,
    onError: (error) => handleError(error),
  });

  if (!isVerified && isLoggedIn) {
    return (
      <div>
        <Alert severity="warning" variant="outlined" sx={{ margin: '10px 15px', ...theme.palette.background }}>
          <AlertTitle>{t('Warning: ')}</AlertTitle>
          {t(
            'To get full functionality you should to confirm your email. Please check your email. Or follow the link to get a new verification code.',
          )}
          {!userData?.isVerified && (
            <Button variant="contained" onClick={() => getNewLinkMutate()} sx={{ ml: 1 }}>
              {t('New verification link')}
            </Button>
          )}
        </Alert>
      </div>
    );
  }

  return null;
};
