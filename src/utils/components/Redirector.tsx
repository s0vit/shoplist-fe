import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { Navigate, Outlet } from 'react-router-dom';

const Redirector = () => {
  const user = useUserStore.use.user?.();

  const isLoggedIn = !!user?.accessToken;
  const from = `to=${location.pathname}${location.search}`;

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: RoutesEnum.LOGIN,
          search: from,
        }}
      />
    );
  }

  return <Outlet />;
};

export default Redirector;
