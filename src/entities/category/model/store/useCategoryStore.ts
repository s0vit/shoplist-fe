import { create } from 'zustand';
import { TCategory } from 'src/shared/api/categoryApi.ts';

export type TCategoryStore = {
  useCategories: TCategory[];
  setUserCategories: (categories: TCategory[]) => void;
};

const useCategoryStore = create<TCategoryStore>((set) => ({
  useCategories: [],
  setUserCategories: (useCategories) => set({ useCategories }),
}));

export default useCategoryStore;
