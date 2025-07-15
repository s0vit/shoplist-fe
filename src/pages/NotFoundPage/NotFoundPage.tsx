import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import Typography from 'src/shared/ui-kit/Typography/Typography';
import Button from 'src/shared/ui-kit/Button/Button';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import notFoundImage from 'src/assets/404notfound.png';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardHeader
        avatar={<Avatar aria-label="404" src={notFoundImage} />}
        title="Worker"
        subheader="We are on it, hold on"
      />
      <CardMedia component="img" image={notFoundImage} alt="404 Not Found" />
      <CardContent>
        <Typography variant="h3" align="center">
          {t('The page you are looking for does not exist')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" label={t('Go to Home')} width="100%" onClick={() => navigate(RoutesEnum.ROOT)} />
      </CardActions>
    </Card>
  );
};

export default NotFoundPage;
