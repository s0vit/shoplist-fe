import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { deleteExpense, TExpense } from 'src/shared/api/expenseApi.ts';
import ExpensesDayGroup from './ExpensesDayGroup';

const groupExpensesByDate = (expenses: TExpense[]) => {
  return expenses.reduce(
    (groups, expense) => {
      const date = format(new Date(expense.createdAt), 'yyyy-MM-dd');

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(expense);

      return groups;
    },
    {} as Record<string, TExpense[]>,
  );
};

const ExpensesTable = () => {
  const { fetchExpenses } = useLoadExpenses({ shouldFetchOnLoad: true });
  const expenses = useExpensesStore.use.userExpenses();
  const { mutate: handleDeleteExpense } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => fetchExpenses({}),
  });

  const groupedExpenses = groupExpensesByDate(expenses);

  return (
    <Box width="100%" maxHeight="100%" overflow="auto">
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <ExpensesDayGroup key={date} date={date} expenses={expenses} deleteExpense={handleDeleteExpense} />
      ))}
    </Box>
  );
};

export default ExpensesTable;
