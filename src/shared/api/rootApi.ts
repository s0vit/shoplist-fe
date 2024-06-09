import axios, { AxiosError } from 'axios';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { refreshToken } from 'src/shared/api/authApi.ts';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${useUserStore.getState().user?.accessToken || localStorage.getItem('accessToken')}`,
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const oldRefreshToken = useUserStore.getState().user?.refreshToken || localStorage.getItem('refreshToken');
      if (!oldRefreshToken) throw new Error('No refresh token');
      const user = await refreshToken({ refreshToken: oldRefreshToken });
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
