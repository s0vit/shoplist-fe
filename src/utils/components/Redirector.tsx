import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getRefreshToken } from 'src/shared/api/authApi.ts';
import Loader from 'src/utils/components/Loader.tsx';

const Redirector = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore.use.user?.();
  const setUser = useUserStore.use.setUser();

  const isLoggedIn = !!user?.accessToken;
  const from = `to=${location.pathname}${location.search}`;
  const refreshToken = localStorage.getItem('refreshToken');

  const loginWithRefreshToken = async () => {
    setIsLoading(true);

    if (refreshToken) {
      const { exp } = jwtDecode(refreshToken);

      if (exp && exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        useUserStore.getState().setUser(undefined);

        return null;
      }

      const user = await getRefreshToken({ refreshToken });
      localStorage.setItem('accessToken', user.accessToken);
      setUser(user);
    }
  };

  if (!isLoggedIn && !isLoading && refreshToken) {
    loginWithRefreshToken().finally(() => setIsLoading(false));
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedIn && !isLoading && !refreshToken) {
    return (
      <Navigate
        to={{
          pathname: RoutesEnum.LOGIN,
          search: from,
        }}
      />
    );
  } else {
    return <Outlet />;
  }
};

export default Redirector;
