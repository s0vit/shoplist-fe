import { Card, Avatar, Typography, Button, Box } from 'src/shared/ui-kit';

import { useNavigate } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import notFoundImage from 'src/assets/404notfound.png';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  return (
    <Card style={{ maxWidth: 345, margin: 'auto' }}>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Avatar aria-label="404" src={notFoundImage} />
          <Box style={{ marginLeft: 12 }}>
            <Typography variant="h3">{t('Worker')}</Typography>
            <Typography variant="body2">{t('We are on it, hold on')}</Typography>
          </Box>
        </Box>
      </Box>
      <img src={notFoundImage} alt="404 Not Found" style={{ width: '100%', height: 'auto' }} />
      <Box style={{ padding: 16 }}>
        <Typography variant="h3" align="center">
          {t('The page you are looking for does not exist')}
        </Typography>
      </Box>
      <Box style={{ padding: 16 }}>
        <Button variant="outlined" label={t('Go to Home')} width="100%" onClick={() => navigate(RoutesEnum.ROOT)} />
      </Box>
    </Card>
  );
};

export default NotFoundPage;
