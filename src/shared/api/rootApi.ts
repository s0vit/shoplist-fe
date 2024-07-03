import axios, { AxiosError } from 'axios';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
});

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

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;

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
        const error = err as AxiosError;
        processQueue(error, null);

        return Promise.reject(err);
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
