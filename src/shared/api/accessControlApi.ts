import { apiInstance } from 'src/shared/api/rootApi.ts';

export const shareWith = async (data: TCreateAccessControlRequest): Promise<TCreateAccessControlResponse> => {
  const response = await apiInstance.post<TCreateAccessControlResponse>('access-control', data);

  return response.data;
};

export type TCreateAccessControlRequest = {
  sharedWith: string;
  expenseIds: string[];
  categoryIds: string[];
  paymentSourceIds: string[];
};

export type TCreateAccessControlResponse = {
  _id: string;
  ownerId: string;
  sharedWith: string;
  expenseIds: string[];
  categoryIds: string[];
  paymentSourceIds: string[];
};
