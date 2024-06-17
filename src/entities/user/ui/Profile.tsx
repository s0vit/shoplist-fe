import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { Link as RouterLink } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { Button, Link, Paper, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { getNewLink } from 'src/shared/api/authApi.ts';
import { useEffect } from 'react';
import handleError from 'src/utils/errorHandler.ts';

const Profile = () => {
  const userData = useUserStore(selectUserData);
  const { mutate: getNewLinkMutate, error: getNewLinkError } = useMutation<void, TErrorResponse>({
    mutationFn: getNewLink,
  });

  useEffect(() => {
    if (getNewLinkError) {
      handleError(getNewLinkError);
    }
  }, [getNewLinkError]);

  const sendNewLink = () => getNewLinkMutate();

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
      <Button variant="contained" onClick={sendNewLink}>
        New verification link
      </Button>
    </Paper>
  );
};

export default Profile;
