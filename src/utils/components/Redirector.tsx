import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { Navigate, Outlet } from 'react-router-dom';

const Redirector = () => {
  const user = useUserStore(selectUserData);

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
