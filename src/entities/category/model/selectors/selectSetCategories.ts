import { TCategoryStore } from 'src/entities/category/model/store/useCategoryStore.ts';

const selectSetUserCategories = (state: TCategoryStore) => state.setUserCategories;

export default selectSetUserCategories;
