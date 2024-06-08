import axios, { AxiosError } from 'axios';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
});

export type TErrorResponse = AxiosError<{
  message: string;
  path: string;
  timestamp: string;
  meta: {
    [key: string]: string[];
  };
}>;
