import { apiInstance } from 'src/shared/api/rootApi.ts';

export const getPaymentSources = async (): Promise<TGetPaymentSourcesResponse> => {
  const response = await apiInstance.get<TGetPaymentSourcesResponse>('payment-source');
  return response.data;
};

export const getPaymentSourceById = async (id: string): Promise<TPaymentSource> => {
  const response = await apiInstance.get<TPaymentSource>(`payment-source/${id}`);
  return response.data;
};

export const createPaymentSource = async (data: TCreatePaymentSourceInput): Promise<TPaymentSource> => {
  const response = await apiInstance.post<TPaymentSource>('payment-source', data);
  return response.data;
};

export const updatePaymentSource = async (id: string, data: TCreatePaymentSourceInput): Promise<TPaymentSource> => {
  const response = await apiInstance.put<TPaymentSource>(`payment-source/${id}`, data);
  return response.data;
};

export const deletePaymentSource = async (id: string): Promise<TPaymentSource> => {
  const response = await apiInstance.delete<TPaymentSource>(`payment-source/${id}`);
  return response.data;
};

export type TGetPaymentSourcesResponse = TPaymentSource[];
export type TPaymentSource = TCreatePaymentSourceInput & {
  _id: string;
  userId: string;
  createdAt: Date;
};
export type TCreatePaymentSourceInput = {
  title: string;
  comments?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
