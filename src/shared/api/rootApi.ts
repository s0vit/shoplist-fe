import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
});

// auth interceptor
apiInstance.interceptors.request.use((config: TExtendedInternalAxiosRequestConfig) => {
  const accessToken = useUserStore.getState().user?.accessToken || localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return config;
});
apiInstance.interceptors.request.use((config) => {
  const requestId = Math.random().toString(36).substring(7);
  config.headers['x-request-id'] = requestId;

  return config;
});

// refresh token interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as TExtendedInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }

            return apiInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useUserStore.getState().user?.refreshToken || localStorage.getItem('refreshToken');

      if (!refreshToken) {
        processQueue(error, null);
        isRefreshing = false;

        return Promise.reject(error);
      }

      try {
        const user = await getRefreshToken({ refreshToken });
        const accessToken = user.accessToken;
        localStorage.setItem('accessToken', accessToken);
        useUserStore.getState().setUser(user);

        apiInstance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
        processQueue(null, accessToken);

        return apiInstance(originalRequest);
      } catch (err) {
        const axiosError = err as AxiosError;
        processQueue(axiosError, null);

        return Promise.reject(axiosError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
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

type TExtendedInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
