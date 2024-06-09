import { apiInstance } from 'src/shared/api/rootApi.ts';

export const getExpenses = async (): Promise<TGetExpensesResponse> => {
  const response = await apiInstance.get<TGetExpensesResponse>('expense');

  return response.data;
};

export const getExpenseById = async (id: string): Promise<TExpense> => {
  const response = await apiInstance.get<TExpense>(`expense/${id}`);

  return response.data;
};

export const createExpense = async (data: TCreateExpenseInput): Promise<TExpense> => {
  const response = await apiInstance.post<TExpense>('expense', data);

  return response.data;
};

export const updateExpense = async (id: string, data: TCreateExpenseInput): Promise<TExpense> => {
  const response = await apiInstance.put<TExpense>(`expense/${id}`, data);

  return response.data;
};

export const deleteExpense = async (id: string): Promise<TExpense> => {
  const response = await apiInstance.delete<TExpense>(`expense/${id}`);

  return response.data;
};

export type TGetExpensesResponse = TExpense[];
export type TExpense = TCreateExpenseInput & {
  _id: string;
  userId: string;
  createdAt: Date;
};

export type TCreateExpenseInput = {
  amount: number;
  categoryId: string;
  paymentSourceId: string;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
