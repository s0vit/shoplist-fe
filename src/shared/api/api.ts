import axios from 'axios';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
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

export const getExpenses = async (): Promise<TGetExpensesResponse> => {
  const response = await apiInstance.get<TGetExpensesResponse>('expenses');
  return response.data;
};
type TGetExpensesResponse = TExpense[];
type TExpense = {
  _id: string;
  amount: number;
  userId: string;
  categoryId: string;
  paymentSourceId: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
};
