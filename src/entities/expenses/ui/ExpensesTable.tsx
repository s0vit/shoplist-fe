import { Box, Paper, Typography } from '@mui/material';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import selectUserExpenses from 'src/entities/expenses/model/selectors/selectUserExpenses.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { useMutation } from '@tanstack/react-query';
import { deleteExpense, TExpense } from 'src/shared/api/expenseApi.ts';
import ExpenseItem from 'src/entities/expenses/ui/ExpenseItem.tsx';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import { format } from 'date-fns';

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

const calculateTotalAmount = (expenses: TExpense[]) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

type TExpensesTableProps = {
  fetchExpenses: (query: Record<string, string | undefined | Date | number>) => void;
};

const ExpensesTable = ({ fetchExpenses }: TExpensesTableProps) => {
  const userCategories = useCategoryStore.use.userCategories();
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);
  const expenses = useExpensesStore(selectUserExpenses);
  const { mutate } = useMutation({
    mutationKey: ['expenses'],
    mutationFn: deleteExpense,
    onSuccess: () => fetchExpenses({}),
  });

  const groupedExpenses = groupExpensesByDate(expenses);

  return (
    <Box width="100%">
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <Paper key={date} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              {format(new Date(date), 'MM/dd')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {calculateTotalAmount(expenses).toFixed(2)}
            </Typography>
          </Box>
          {expenses.map((expense) => {
            const category = userCategories.find((category) => category._id === expense.categoryId);
            const paymentSource = userPaymentSources.find((source) => source._id === expense.paymentSourceId);

            return (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                category={category}
                paymentSource={paymentSource}
                handleRemove={mutate}
              />
            );
          })}
        </Paper>
      ))}

      <ExpenseModal />
    </Box>
  );
};

export default ExpensesTable;
