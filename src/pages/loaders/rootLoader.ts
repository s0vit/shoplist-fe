import { jwtDecode } from 'jwt-decode';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';

const rootLoader = async () => {
  const isUserLoggedIn = useUserStore.getState().user?.accessToken;

  if (isUserLoggedIn) return null;

  const refreshToken = localStorage.getItem('refreshToken');

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
    useUserStore.getState().setUser(user);
  }

  return null;
};

export default rootLoader;
