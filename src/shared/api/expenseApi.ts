import { apiInstance } from 'src/shared/api/rootApi.ts';

export const getExpenses = async (queryData: TGetExpenseQuery | undefined): Promise<TGetExpensesResponse> => {
  //prepare queries for the request
  const stringifiedQuery = queryData
    ? Object.entries({
        categoryId: queryData.categoryId,
        paymentSourceId: queryData.paymentSourceId,
        createdStartDate: queryData.createdStartDate?.toISOString(),
        createdEndDate: queryData.createdEndDate?.toISOString(),
        amountStart: queryData.amountStart?.toString(),
        amountEnd: queryData.amountEnd?.toString(),
        skip: queryData.skip?.toString(),
        limit: queryData.limit?.toString(),
      }).reduce(
        (acc, [key, value]) => {
          if (value) {
            acc[key] = value;
          }

          return acc;
        },
        {} as Record<string, string>,
      )
    : undefined;

  const url = `expense?${stringifiedQuery ? new URLSearchParams(Object.entries(stringifiedQuery)) : ''}`;
  const response = await apiInstance.get<TGetExpensesResponse>(url);

  return response.data;
};

export const getExpenseById = async (id: string): Promise<TExpense> => {
  const response = await apiInstance.get<TExpense>(`expense/${id}`);

  return response.data;
};

export const getExpensesByIds = async (ids: string[]): Promise<TGetExpensesResponse> => {
  const response = await apiInstance.post<TGetExpensesResponse>('expense/bulk', ids);

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
  createdAt: string;
};

export type TCreateExpenseInput = {
  amount: number;
  categoryId: string;
  paymentSourceId: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TGetExpenseQuery = {
  categoryId?: string;
  paymentSourceId?: string;
  createdStartDate?: Date;
  createdEndDate?: Date;
  amountStart?: number;
  amountEnd?: number;
  skip?: number;
  limit?: number;
};
