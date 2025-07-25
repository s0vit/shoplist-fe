import { Box, Stack } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { InView } from 'react-intersection-observer';
import { deleteExpense, TExpense } from 'src/shared/api/expenseApi.ts';
import ExpensesDayGroup from './ExpensesDayGroup';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useInfiniteExpenses from 'src/entities/expenses/hooks/useInfiniteExpenses.ts';
import SkeletonGroup from 'src/utils/components/Skeleton.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';

const groupExpensesByDate = (expenses: TExpense[]) => {
  return expenses.reduce(
    (groups, expense) => {
      const date = format(new Date(expense.createdAt), 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(expense);

      return groups;
    },
    {} as Record<string, TExpense[]>,
  );
};

const ExpensesTable = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const queryClient = useQueryClient();
  const filters = useFiltersStoreForExpenses.use.filter();

  const { userExpenses: currentMonthExpenses, isExpensesLoading } = useLoadExpenses({
    shouldFetchOnLoad: isVerified,
    filters: {
      ...filters,
      createdStartDate: format(new Date(), 'yyyy-MM-01'),
      createdEndDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const { data: infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteExpenses();

  const allExpenses = [...(currentMonthExpenses || []), ...(infiniteData?.pages.flat() || [])];

  const groupedExpenses = groupExpensesByDate(allExpenses);

  const { mutate: handleDeleteExpense } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenses-infinite'] });
    },
  });

  if (!isVerified || isExpensesLoading) {
    return (
      <Stack width="100%">
        <SkeletonGroup
          variant="rounded"
          styles={{ minHeight: '130px', marginBottom: '15px' }}
          dimensions={{ direction: 'column' }}
        />
      </Stack>
    );
  }

  return (
    <Box width="100%" maxHeight="100%" overflow="auto">
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <ExpensesDayGroup key={date} date={date} expenses={expenses} deleteExpense={handleDeleteExpense} />
      ))}

      {hasNextPage && (
        <InView
          onChange={(inView) => {
            if (inView && !isFetchingNextPage) fetchNextPage();
          }}
        >
          {({ ref }) => (
            <div ref={ref} style={{ padding: 16, textAlign: 'center' }}>
              {isFetchingNextPage ? 'Загружается...' : 'Прокрутите вниз, чтобы загрузить ещё'}
            </div>
          )}
        </InView>
      )}
    </Box>
  );
};

export default ExpensesTable;
