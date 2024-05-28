import axios from 'axios';

console.log(import.meta.env.VITE_API_URL);
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
});

export const login = async ({ email, password }: TLoginRequest): Promise<TLoginResponse> => {
  const response = await apiInstance.post<TLoginResponse>('auth/login', { email, password });
  return response.data;
};
type TLoginRequest = {
  email: string;
  password: string;
};
type TLoginResponse = {
  email: string;
  login: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
};
