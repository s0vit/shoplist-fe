import { TConfig, THEME_ENUM } from 'src/shared/api/userConfigApi';
import { CURRENCIES, languageToCurrencyMap } from 'src/shared/constants/currencies';
import { browserLanguageToLanguageMap, LANGUAGES_ENUM } from 'src/shared/constants/Locales';
import createSelectors from 'src/utils/helpers/createSelectors.ts';
import { create } from 'zustand';

type TTempConfig = Omit<TConfig, '_id'> & { _id?: string };
const localStorageTheme = localStorage.getItem('userTheme') as THEME_ENUM;
const defaultSettings: TTempConfig = {
  currency: languageToCurrencyMap[navigator.language] || CURRENCIES.USD,
  language: browserLanguageToLanguageMap[navigator.language] || LANGUAGES_ENUM.EN,
  theme: localStorageTheme ?? THEME_ENUM.SYSTEM,
  showCategoryColours: true,
  showSourceColours: true,
  showCategoryNames: true,
  showSharedCategories: true,
  showSharedExpenses: true,
  showSharedSources: true,
  showSourceNames: true,
};

type TUserConfigStore = {
  config: TTempConfig;
  setConfig: (userConfig?: TTempConfig) => void;
  resetStore: () => void;
};

const _useUserConfigStore = create<TUserConfigStore>((set) => ({
  config: defaultSettings,
  setConfig: (config) => set(() => ({ config })),
  resetStore: () => set(() => ({ config: undefined })),
}));

export default createSelectors(_useUserConfigStore);
