import { useMutation } from '@tanstack/react-query';
import { getCategories, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect } from 'react';
import { handleError } from 'src/utils/errorHandler.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectSetUserCategories from 'src/entities/category/model/selectors/selectSetCategories.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';

const useLoadCategories = (withSharedCategories?: boolean) => {
  const setUserCategories = useCategoryStore(selectSetUserCategories);
  const userCategories = useCategoryStore(selectUserCategories);

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error: categoriesError,
    mutate: fetchCategories,
  } = useMutation<TGetCategoriesResponse, TErrorResponse>({
    mutationKey: ['category'],
    mutationFn: getCategories,
  });

  if (withSharedCategories) {
    console.warn('Shared categories are not implemented yet');
  }

  useEffect(() => {
    if (!userCategories.length) {
      fetchCategories();
    }
  }, [fetchCategories, userCategories.length]);

  useEffect(() => {
    if (categoriesError) {
      handleError(categoriesError);
    }
  }, [categoriesError]);

  useEffect(() => {
    if (categories) {
      setUserCategories(categories);
    }
  }, [categories, setUserCategories]);

  return {
    userCategories,
    isCategoriesLoading,
    getCategoriesMutation: fetchCategories,
  };
};

export default useLoadCategories;
