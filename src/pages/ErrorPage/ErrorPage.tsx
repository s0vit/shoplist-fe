import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography, useTheme } from '@mui/material';
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
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
          <ReportGmailerrorred color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            {t('Oops!')}
          </Typography>
          <Typography variant="h6" gutterBottom>
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
            sx={{ marginTop: 4 }}
          >
            {t('Go to Home')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
