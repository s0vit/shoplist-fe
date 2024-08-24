import { TConfig, THEME_ENUM } from 'src/shared/api/userConfigApi';
import { CURRENCIES, languageToCurrencyMap } from 'src/shared/constants/currencies';
import { browserLanguageToLanguageMap, LANGUAGES_ENUM } from 'src/shared/constants/Locales';
import createSelectors from 'src/utils/helpers/createSelectors.ts';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TTempConfig = Omit<TConfig, '_id'> & { _id?: string };
const localStorageData = localStorage.getItem('userConfig');
let localStorageConfig: TTempConfig = {} as TTempConfig;

if (localStorageData) {
  localStorageConfig = JSON.parse(localStorageData).state as TTempConfig;
}

const defaultSettings: TTempConfig = {
  currency: localStorageConfig.currency ?? (languageToCurrencyMap[navigator.language] || CURRENCIES.USD),
  language: localStorageConfig.language ?? (browserLanguageToLanguageMap[navigator.language] || LANGUAGES_ENUM.EN),
  theme: localStorageConfig.theme ?? THEME_ENUM.SYSTEM,
  showCategoryColours: localStorageConfig.showCategoryColours ?? false,
  showSourceColours: localStorageConfig.showSourceColours ?? false,
  showCategoryNames: localStorageConfig.showCategoryNames ?? false,
  showSharedCategories: localStorageConfig.showSharedCategories ?? false,
  showSharedExpenses: localStorageConfig.showSharedExpenses ?? false,
  showSharedSources: localStorageConfig.showSharedSources ?? false,
  showSourceNames: localStorageConfig.showSourceNames ?? false,
};

type TUserConfigStore = {
  config: TTempConfig;
  setConfig: (userConfig?: TTempConfig) => void;
  resetStore: () => void;
};

const _useUserConfigStore = create<TUserConfigStore, [['zustand/persist', TTempConfig]]>(
  persist(
    (set) => ({
      config: defaultSettings,
      setConfig: (config) => {
        set(() => ({ config }));
      },
      resetStore: () => set(() => ({ config: undefined })),
    }),
    {
      name: 'userConfig',
      partialize: (state) => state.config,
    },
  ),
);

export default createSelectors(_useUserConfigStore);
