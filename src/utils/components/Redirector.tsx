import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import Loader from 'src/utils/components/Loader.tsx';
import handleError from '../errorHandler';

const Redirector = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore.use.user?.();
  const setUser = useUserStore.use.setUser();
  const navigate = useNavigate();

  const isLoggedIn = !!user?.accessToken;
  const from = `to=${location.pathname}${location.search}`;
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const loginWithRefreshToken = async () => {
      setIsLoading(true);

      if (refreshToken) {
        try {
          const { exp } = jwtDecode<{ exp: number }>(refreshToken);

          if (exp && exp * 1000 < Date.now()) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            useUserStore.getState().setUser(undefined);
            setIsLoading(false);
            toast.error('Session expired. Please log in again.');

            return navigate(`${RoutesEnum.LOGIN}?${from}`);
          }

          const user = await getRefreshToken({ refreshToken });
          localStorage.setItem('accessToken', user.accessToken);
          setUser(user);
        } catch (error) {
          handleError(error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          useUserStore.getState().setUser(undefined);

          navigate(`${RoutesEnum.LOGIN}?${from}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (!isLoggedIn && !isLoading && refreshToken) {
      loginWithRefreshToken();
    } else if (!isLoggedIn && !isLoading && !refreshToken) {
      setIsLoading(false);
    }
  }, [from, isLoading, isLoggedIn, navigate, refreshToken, setUser]);

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
