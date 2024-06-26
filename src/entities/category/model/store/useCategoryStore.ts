import { create } from 'zustand';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TCategoryStore = {
  userCategories: TCategory[];
  currentEditingCategory?: Partial<TCategory>;
  isCategoryModalOpen: boolean;
  setUserCategories: (categories: TCategory[]) => void;
  setCurrentEditingCategory: (category?: Partial<TCategory>) => void;
  setIsCategoryModalOpen: (isCategoryModalOpen: boolean) => void;
  resetStore: () => void;
};

const _useCategoryStore = create<TCategoryStore>((set) => ({
  userCategories: [],
  currentEditingCategory: undefined,
  isCategoryModalOpen: false,
  setUserCategories: (userCategories) => set({ userCategories }),
  setCurrentEditingCategory: (category) => set({ currentEditingCategory: category }),
  setIsCategoryModalOpen: (isCategoryModalOpen) => set({ isCategoryModalOpen }),
  resetStore: () => set({ userCategories: [], currentEditingCategory: undefined, isCategoryModalOpen: false }),
}));

const useCategoryStore = createSelectors(_useCategoryStore);

export default useCategoryStore;
