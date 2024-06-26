import axios, { AxiosError } from 'axios';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';
import { jwtDecode } from 'jwt-decode';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
});

// auth interceptor
apiInstance.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().user?.accessToken || localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return config;
});

// refresh token interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const oldRefreshToken = useUserStore.getState().user?.refreshToken || localStorage.getItem('refreshToken');
    let exp = 0;

    if (oldRefreshToken) {
      exp = jwtDecode(oldRefreshToken).exp || 0;
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry && exp * 1000 < Date.now()) {
      originalRequest._retry = true;
      const oldRefreshToken = useUserStore.getState().user?.refreshToken || localStorage.getItem('refreshToken');
      if (!oldRefreshToken) throw new Error('No refresh token');
      const user = await getRefreshToken({ refreshToken: oldRefreshToken });
      localStorage.setItem('accessToken', user.accessToken);

      const setUser = useUserStore.getState().setUser;
      setUser(user);

      apiInstance.defaults.headers['Authorization'] = 'Bearer ' + user.accessToken;

      return apiInstance(originalRequest);
    }

    throw error;
  },
);

export type TErrorResponse = AxiosError<{
  message: string;
  path: string;
  timestamp: string;
  meta: {
    [key: string]: string[];
  };
}>;
