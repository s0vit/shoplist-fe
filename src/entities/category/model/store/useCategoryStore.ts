import { create } from 'zustand';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TCategoryStore = {
  userCategories: TCategory[];
  setUserCategories: (categories: TCategory[]) => void;
};

const _useCategoryStore = create<TCategoryStore>((set) => ({
  userCategories: [],
  setUserCategories: (userCategories) => set({ userCategories }),
}));

const useCategoryStore = createSelectors(_useCategoryStore);

export default useCategoryStore;
