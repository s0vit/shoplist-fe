import { useQuery } from '@tanstack/react-query';
import { getCategories, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect } from 'react';
import handleError from 'src/utils/errorHandler.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectSetUserCategories from 'src/entities/category/model/selectors/selectSetCategories.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';

const useLoadCategories = (
  shouldFetchOnLoad: boolean = false,
  withSharedCategories?: boolean,
  onFetchFinish?: () => void,
) => {
  const setUserCategories = useCategoryStore(selectSetUserCategories);
  const userCategories = useCategoryStore(selectUserCategories);

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error: categoriesError,
    refetch: fetchCategories,
  } = useQuery<TGetCategoriesResponse, TErrorResponse>({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: shouldFetchOnLoad,
  });

  if (withSharedCategories) {
    console.warn('Shared categories are not implemented yet');
  }

  useEffect(() => {
    if (categoriesError) {
      handleError(categoriesError);
    }
  }, [categoriesError]);

  useEffect(() => {
    if (!isCategoriesLoading) {
      setUserCategories(categories || []);
      if (!onFetchFinish) return;
      onFetchFinish();
    }
  }, [isCategoriesLoading, categories, setUserCategories, onFetchFinish]);

  return {
    userCategories,
    isCategoriesLoading,
    fetchCategories: fetchCategories,
  };
};

export default useLoadCategories;
