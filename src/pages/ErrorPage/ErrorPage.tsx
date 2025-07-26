import { useRouteError } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Box, Paper, Typography, Button } from 'src/shared/ui-kit';

import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { useTranslation } from 'react-i18next';

type TErrorPageType = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const theme = useTheme();
  const error = useRouteError() as TErrorPageType;
  const { t } = useTranslation('errorBoundary');
  console.error(error);

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        padding: 16,
      }}
    >
      <Box style={{ maxWidth: '600px', width: '100%' }}>
        <Paper style={{ padding: 24, textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h3" gutterBottom>
            {t('Oops!')}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {t('Sorry, an unexpected error has occurred.')}
          </Typography>
          <Typography variant="body1" color="secondary" gutterBottom>
            <i>{error?.statusText || error?.message || 'Unknown error'}</i>
          </Typography>
          <Button
            variant="contained"
            label={t('Go to Home')}
            onClick={() => (window.location.href = RoutesEnum.ROOT)}
            style={{ marginTop: 16 }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
