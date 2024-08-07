import { useQuery } from '@tanstack/react-query';
import { getCategories, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect } from 'react';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { isAxiosError } from 'axios';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

const useLoadCategories = (
  shouldFetchOnLoad: boolean = false,
  withSharedCategories?: boolean,
  onFetchFinish?: () => void,
) => {
  const setUserCategories = useCategoryStore.use.setUserCategories();
  const userCategories = useCategoryStore.use.userCategories();

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error: categoriesError,
    refetch,
  } = useQuery<TGetCategoriesResponse, TErrorResponse>({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: shouldFetchOnLoad,
  });

  if (withSharedCategories) {
    console.warn('Shared categories are not implemented yet');
  }

  const fetchCategories = useStableCallback(async () => {
    const newData = await refetch();
    if (isAxiosError(newData)) handleError(newData);
    setUserCategories((newData.data as unknown as TGetCategoriesResponse) || []);
    if (onFetchFinish) onFetchFinish();
  });

  useEffect(() => {
    if (categoriesError) {
      handleError(categoriesError, shouldFetchOnLoad);
    }
  }, [categoriesError, shouldFetchOnLoad]);

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
    fetchCategories,
  };
};

export default useLoadCategories;
