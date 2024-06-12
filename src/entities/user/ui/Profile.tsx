import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { Link as RouterLink } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { Link, Paper, Typography } from '@mui/material';

const Profile = () => {
  const userData = useUserStore(selectUserData);

  return (
    <Paper>
      <Typography variant="h4">Profile</Typography>
      <Link to={RoutesEnum.ROOT} component={RouterLink}>
        Home
      </Link>
      <Typography variant="h6">User data:</Typography>
      <Typography variant="body1">
        {userData?.email}
        <br />
        isVerified: {`${userData?.isVerified}`}
        <br />
        login:{userData?.login}
      </Typography>
    </Paper>
  );
};

export default Profile;
