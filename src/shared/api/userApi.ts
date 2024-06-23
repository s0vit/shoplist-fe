import { apiInstance } from 'src/shared/api/rootApi.ts';
import { TUser } from 'src/shared/api/authApi.ts';

export const findUserByEmail = async (email: string): Promise<TFindUserByEmailResponse> => {
  const response = await apiInstance.get<TFindUserByEmailResponse>(`user/${email}`);

  return response.data;
};

export type TFindUserByEmailResponse = TUser[];

export const deleteMe = async (): Promise<void> => {
  const response = await apiInstance.delete<void>('user/delete-me');

  return response.data;
};

export const uploadAvatar = async (formData: FormData): Promise<void> => {
  const response = await apiInstance.post<void>('user/upload-avatar', formData);

  return response.data;
};
