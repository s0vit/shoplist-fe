import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { Button, Container, useTheme } from '@mui/material';
import { Box, Paper, Typography } from 'src/shared/ui-kit';

import { HomeOutlined, ReportGmailerrorred } from '@mui/icons-material';
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
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper style={{ padding: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
          <ReportGmailerrorred color="error" style={{ fontSize: 80, marginBottom: 16 }} />
          <Typography variant="h3" gutterBottom>
            {t('Oops!')}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {t('Sorry, an unexpected error has occurred.')}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <i>{error?.statusText || error?.message || 'Unknown error'}</i>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeOutlined />}
            component={RouterLink}
            to={RoutesEnum.ROOT}
            style={{ marginTop: 4 }}
          >
            {t('Go to Home')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
