import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { getExpenses, TGetExpenseQuery, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';

type TUseLoadExpensesArgs =
  | {
      onFetchFinish?: () => void;
      shouldFetchOnLoad?: boolean;
      withShared?: boolean;
      filters?: TFilterForQueryTypes;
    }
  | undefined;

const formatFiltersToQuery = (filters?: TFilterForQueryTypes): TGetExpenseQuery => {
  if (!filters) return {};

  return {
    ...filters,
    createdStartDate: filters.createdStartDate ? new Date(filters.createdStartDate) : undefined,
    createdEndDate: filters.createdEndDate ? new Date(filters.createdEndDate) : undefined,
    amountStart: filters.amountStart ? parseFloat(filters.amountStart) : undefined,
    amountEnd: filters.amountEnd ? parseFloat(filters.amountEnd) : undefined,
    skip: filters.skip ? parseInt(filters.skip, 10) : undefined,
    limit: filters.limit ? parseInt(filters.limit, 10) : undefined,
  };
};

const useLoadExpenses = ({ shouldFetchOnLoad = false, onFetchFinish, withShared }: TUseLoadExpensesArgs = {}) => {
  const setUserExpenses = useExpensesStore.use.setUserExpenses();
  const userExpenses = useExpensesStore.use.userExpenses();
  const filters = useFiltersStoreForExpenses.use.filter();
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const debouncedQuery = useDebouncedValue(filters, 300);

  const {
    data: expenses,
    isPending: isExpensesLoading,
    error: expensesError,
  } = useQuery<TGetExpensesResponse, TErrorResponse>({
    queryKey: ['expenses', debouncedQuery],
    queryFn: () => getExpenses(formatFiltersToQuery(filters)),
    enabled: shouldFetchOnLoad && isVerified,
  });

  if (withShared) {
    console.warn('Shared expenses are not implemented yet');
  }

  useEffect(() => {
    if (expensesError) {
      handleError(expensesError, shouldFetchOnLoad);
    }
  }, [expensesError, shouldFetchOnLoad]);

  useEffect(() => {
    if (!isExpensesLoading && expenses) {
      setUserExpenses(expenses);
      onFetchFinish?.();
    }
  }, [expenses, isExpensesLoading, setUserExpenses, onFetchFinish]);

  const fetchExpenses = useStableCallback(async () => {
    const formattedQuery = formatFiltersToQuery(filters);

    try {
      const result = await getExpenses(formattedQuery);
      setUserExpenses(result);
      onFetchFinish?.();
    } catch (err) {
      handleError(err);
    }
  });

  return {
    userExpenses,
    isExpensesLoading,
    fetchExpenses,
  };
};

export default useLoadExpenses;
