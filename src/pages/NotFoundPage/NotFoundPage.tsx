import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import notFoundImage from 'src/assets/404notfound.png';

const NotFoundPage = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardHeader
        avatar={<Avatar aria-label="404" src={notFoundImage} />}
        title="Worker"
        subheader="We are on it, hold on"
      />
      <CardMedia component="img" image={notFoundImage} alt="404 Not Found" />
      <CardContent>
        <Typography variant="h5" align="center">
          The page you are looking for does not exist
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="outlined" component={RouterLink} to={RoutesEnum.ROOT} size="small">
          Go to Home
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotFoundPage;
