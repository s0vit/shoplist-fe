import { apiInstance } from 'src/shared/api/rootApi.ts';

export const getCategories = async (): Promise<TGetCategoriesResponse> => {
  const response = await apiInstance.get<TGetCategoriesResponse>('category');

  return response.data;
};

export const getCategoryById = async (id: string): Promise<TCategory> => {
  const response = await apiInstance.get<TCategory>(`category/${id}`);

  return response.data;
};

export const createCategory = async (data: TCreateCategoryInput): Promise<TCategory> => {
  const response = await apiInstance.post<TCategory>('category', data);

  return response.data;
};

export const updateCategory = async (id: string, data: TCreateCategoryInput): Promise<TCategory> => {
  const response = await apiInstance.put<TCategory>(`category/${id}`, data);

  return response.data;
};

export const updateCategoryOrder = async (id: string, order: number): Promise<TCategory> => {
  const response = await apiInstance.put<TCategory>(`category/${id}/order`, { order });

  return response.data;
};

export const deleteCategory = async (id: string): Promise<TCategory> => {
  const response = await apiInstance.delete<TCategory>(`category/${id}`);

  return response.data;
};

export type TGetCategoriesResponse = TCategory[];
export type TCategory = TCreateCategoryInput & {
  _id: string;
  userId: string;
  createdAt: Date;
};

export type TCreateCategoryInput = {
  title: string;
  color?: string;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
