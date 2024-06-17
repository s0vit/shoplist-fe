import { apiInstance } from 'src/shared/api/rootApi.ts';
import { TUserType } from 'src/entities/user/model/types/TUserStore.ts';

export const findUserByEmail = async (email: string): Promise<TFindUserByEmailResponse> => {
  const response = await apiInstance.get<TFindUserByEmailResponse>(`user/${email}`);

  return response.data;
};

export type TFindUserByEmailResponse = TUserType[];

export const deleteMe = async (): Promise<void> => {
  const response = await apiInstance.delete<void>('user/delete-me');

  return response.data;
};
