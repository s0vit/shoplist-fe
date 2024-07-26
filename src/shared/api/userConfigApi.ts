import { apiInstance } from 'src/shared/api/rootApi.ts';
import { CURRENCIES } from '../constants/currencies';
import { LANGUAGES_ENUM } from '../constants/Locales';

export enum THEME_ENUM {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type TConfig = {
  _id: string;
  theme: THEME_ENUM;
  currency: CURRENCIES;
  language: LANGUAGES_ENUM;
  showCategoryColours: boolean;
  showSourceColours: boolean;
  showCategoryNames: boolean;
  showSourceNames: boolean;
  showSharedExpenses: boolean;
  showSharedCategories: boolean;
  showSharedSources: boolean;
};

export const getMyConfig = async () => {
  const response = await apiInstance.get<TConfig>('user-config');

  return response.data;
};

export const setMyConfig = async (data: Omit<TConfig, '_id'>) => {
  const response = await apiInstance.post('user-config', data);

  return response.data;
};

export const updateMyConfig = async (config: TConfig) => {
  const { _id, ...data } = config;
  const response = await apiInstance.put<TConfig>(`user-config/${_id}`, data);

  return response.data;
};
