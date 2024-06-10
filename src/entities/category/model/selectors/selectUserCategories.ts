import { TCategoryStore } from 'src/entities/category/model/store/useCategoryStore.ts';

const selectUserCategories = (state: TCategoryStore) => state.useCategories;

export default selectUserCategories;
