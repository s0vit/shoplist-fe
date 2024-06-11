import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect, useRef } from 'react';
import { getExpenses, TGetExpenseQuery, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import selectUserExpenses from 'src/entities/expenses/model/selectors/selectUserExpenses.ts';
import selectSetUserExpenses from 'src/entities/expenses/model/selectors/selectSetUserExpenses.ts';
import handleError from 'src/utils/errorHandler.ts';

const useLoadExpenses = (query?: TGetExpenseQuery, withShared?: boolean, onFetchFinish?: () => void) => {
  const setUserExpenses = useExpensesStore(selectSetUserExpenses);
  const userExpenses = useExpensesStore(selectUserExpenses);

  const isInitialFetch = useRef<boolean>(true);

  const {
    data: expenses,
    isSuccess: isExpensesSuccess,
    isPending: isExpensesLoading,
    error: expensesError,
    mutate: fetchExpenses,
  } = useMutation<TGetExpensesResponse, TErrorResponse, TGetExpenseQuery | undefined>({
    mutationKey: ['expenses'],
    mutationFn: getExpenses,
  });

  if (withShared) {
    console.warn('Shared expenses are not implemented yet');
  }

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchExpenses(query);
    }
  }, [fetchExpenses, query]);

  useEffect(() => {
    if (expensesError) {
      handleError(expensesError);
    }
  }, [expensesError]);

  useEffect(() => {
    if (isExpensesSuccess && !isExpensesLoading) {
      isInitialFetch.current = false;
      setUserExpenses(expenses);
      if (!onFetchFinish) return;
      onFetchFinish();
    }
  }, [isExpensesSuccess, expenses, isExpensesLoading, setUserExpenses, onFetchFinish]);

  return {
    userExpenses,
    isExpensesLoading,
    fetchExpenses,
  };
};

export default useLoadExpenses;
