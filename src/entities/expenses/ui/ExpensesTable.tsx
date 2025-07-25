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
// import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
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

  // 1. Загружаем текущий месяц через useLoadExpenses
  const { userExpenses: currentMonthExpenses, isExpensesLoading } = useLoadExpenses({
    shouldFetchOnLoad: isVerified,
    filters: {
      // Теперь filters будет принят
      ...filters,
      createdStartDate: format(new Date(), 'yyyy-MM-01'),
      createdEndDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  // 2. Загружаем предыдущие месяцы через useInfiniteExpenses
  const { data: infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteExpenses();

  // 3. Объединяем данные
  const allExpenses = [...(currentMonthExpenses || []), ...(infiniteData?.pages.flat() || [])];

  const groupedExpenses = groupExpensesByDate(allExpenses);

  // Обработка удаления
  const { mutate: handleDeleteExpense } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      // Инвалидируем оба запроса

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
