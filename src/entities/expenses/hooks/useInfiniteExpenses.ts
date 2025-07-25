import { useInfiniteQuery } from '@tanstack/react-query';
import { getExpenses, TGetExpenseQuery } from 'src/shared/api/expenseApi.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import { subMonths } from 'date-fns';

function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function useInfiniteExpenses() {
  const filters = useFiltersStoreForExpenses.use.filter();

  return useInfiniteQuery({
    queryKey: ['expenses-infinite', filters],
    initialPageParam: subMonths(new Date(), 1),
    queryFn: async ({ pageParam }) => {
      const anchorDate = pageParam as Date;
      const { start, end } = getMonthRange(anchorDate);

      const query: TGetExpenseQuery = {
        categoryId: filters.categoryId,
        paymentSourceId: filters.paymentSourceId,
        createdStartDate: start,
        createdEndDate: end,
        amountStart: filters.amountStart ? Number(filters.amountStart) : undefined,
        amountEnd: filters.amountEnd ? Number(filters.amountEnd) : undefined,
        skip: filters.skip ? Number(filters.skip) : undefined,
        limit: filters.limit ? Number(filters.limit) : undefined,
      };

      return await getExpenses(query);
    },
    getNextPageParam: (_lastPage, allPages) => {
      const date = new Date();
      date.setMonth(date.getMonth() - allPages.length);

      return date;
    },
  });
}

export default useInfiniteExpenses;
