import { apiInstance } from 'src/shared/api/rootApi.ts';

export const shareWith = async (data: TCreateAccessControlRequest): Promise<TAccessControl> => {
  const response = await apiInstance.post<TAccessControl>('access-control', data);

  return response.data;
};

export const getSharedWithMe = async (): Promise<TAccessControl[]> => {
  const response = await apiInstance.get<TAccessControl[]>('access-control/me');

  return response.data;
};

export const deleteMeFromShared = async (
  id: string,
  data: Partial<Pick<TAccessControl, 'expenseIds' | 'categoryIds' | 'paymentSourceIds'>>,
): Promise<TAccessControl> => {
  const response = await apiInstance.put<TAccessControl>(`access-control/delete-me`, { accessId: id, ...data });

  return response.data;
};

export const updateAccessControl = async (id: string, data: TCreateAccessControlRequest): Promise<TAccessControl> => {
  const response = await apiInstance.put<TAccessControl>(`access-control/${id}`, data);

  return response.data;
};

export const deleteAccessControl = async (id: string): Promise<void> => {
  await apiInstance.delete(`access-control/${id}`);
};

export const getMyAccessControls = async (): Promise<TAccessControl[]> => {
  const response = await apiInstance.get<TAccessControl[]>('access-control');

  return response.data;
};

export type TCreateAccessControlRequest = {
  sharedWith: string;
  expenseIds?: string[];
  categoryIds?: string[];
  paymentSourceIds?: string[];
};

export type TAccessControl = {
  _id: string;
  ownerId: string;
  sharedWith: string;
  expenseIds: string[];
  categoryIds: string[];
  paymentSourceIds: string[];
};
