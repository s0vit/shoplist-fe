import { useQuery } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect } from 'react';
import { getExpenses, TGetExpenseQuery, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import selectUserExpenses from 'src/entities/expenses/model/selectors/selectUserExpenses.ts';
import selectSetUserExpenses from 'src/entities/expenses/model/selectors/selectSetUserExpenses.ts';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { isAxiosError } from 'axios';

type TUseLoadExpensesArgs =
  | {
      query?: TGetExpenseQuery;
      withShared?: boolean;
      onFetchFinish?: () => void;
      shouldFetchOnLoad?: boolean;
    }
  | undefined;

const useLoadExpenses = ({
  shouldFetchOnLoad = false,
  query,
  onFetchFinish,
  withShared,
}: TUseLoadExpensesArgs = {}) => {
  const setUserExpenses = useExpensesStore(selectSetUserExpenses);
  const userExpenses = useExpensesStore(selectUserExpenses);

  const {
    data: expenses,
    isPending: isExpensesLoading,
    error: expensesError,
    refetch,
  } = useQuery<TGetExpensesResponse, TErrorResponse>({
    queryKey: ['expenses'],
    queryFn: () => getExpenses(query),
    enabled: shouldFetchOnLoad,
  });

  if (withShared) {
    console.warn('Shared expenses are not implemented yet');
  }

  useEffect(() => {
    if (expensesError) {
      handleError(expensesError);
    }
  }, [expensesError]);

  useEffect(() => {
    if (!isExpensesLoading) {
      setUserExpenses(expenses || []);
      if (onFetchFinish) onFetchFinish();
    }
  }, [expenses, isExpensesLoading, setUserExpenses, onFetchFinish]);

  const fetchExpenses = useStableCallback(async (newQuery?: TGetExpenseQuery) => {
    if (newQuery) {
      query = newQuery;
    }

    const newData = await refetch();
    if (isAxiosError(newData)) handleError(newData);
    setUserExpenses((newData.data as unknown as TGetExpensesResponse) || []);
    if (onFetchFinish) onFetchFinish();
  });

  return {
    userExpenses,
    isExpensesLoading,
    fetchExpenses,
  };
};

export default useLoadExpenses;
