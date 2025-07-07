import { useInfiniteQuery } from '@tanstack/react-query';
import { getExpenses, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';

function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function useInfiniteExpenses() {
  const filters = useFiltersStoreForExpenses.use.filter();

  return useInfiniteQuery<TGetExpensesResponse, TErrorResponse>({
    queryKey: ['expenses-infinite', filters],
    initialPageParam: new Date(),
    queryFn: async ({ pageParam }) => {
      const anchorDate = pageParam as Date;
      const { start, end } = getMonthRange(anchorDate);

      const query: TFilterForQueryTypes = {
        ...filters,
        createdStartDate: start,
        createdEndDate: end,
      };

      return await getExpenses(query);
    },
    getNextPageParam: (_lastPage, allPages) => {
      const date = new Date();
      date.setMonth(date.getMonth() - allPages.length, 1);

      return date;
    },
  });
}

export default useInfiniteExpenses;
