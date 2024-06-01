import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shoplist-be.vercel.app/api/',
  timeout: 5000,
  withCredentials: true,
});

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
