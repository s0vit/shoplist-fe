import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from 'src/shared/ui-kit';
import { useTheme } from 'src/shared/ui-kit';

import { Button } from 'src/shared/ui-kit';

import { useMutation } from '@tanstack/react-query';
import handleError from '../errorHandler';
import { getNewLink } from 'src/shared/api/authApi';
import useNotificationsStore from 'src/entities/notifications/model/store/useNotificationsStore.ts';

export const UnverifiedAlert = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const theme = useTheme();
  const userData = useUserStore.use.user?.();
  const { t } = useTranslation();
  const isModalOpen = useNotificationsStore.use.isModalOpen();

  const { mutate: getNewLinkMutate } = useMutation({
    mutationFn: getNewLink,
    onError: (error) => handleError(error),
  });

  if (!isVerified && isLoggedIn && isModalOpen) {
    return (
      <div>
        <Alert severity="warning" style={{ margin: '10px 15px', backgroundColor: theme.colors.cardBg }}>
          <AlertTitle>{t('Warning: ')}</AlertTitle>
          {t(
            'To get full functionality you should to confirm your email. Please check your email. Or follow the link to get a new verification code.',
          )}
          {!userData?.isVerified && (
            <Button
              variant="contained"
              label={t('Send verification link again')}
              width="100%"
              onClick={getNewLinkMutate}
            />
          )}
        </Alert>
      </div>
    );
  }

  return null;
};
