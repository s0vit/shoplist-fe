import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';

const HomePage = () => {
  const { isDesktopWidth, windowHeight } = useWindowWidth();

  const { fetchExpenses, isExpensesLoading, userExpenses } = useLoadExpenses({ shouldFetchOnLoad: true });
  useLoadPaymentSources(true);
  useLoadCategories(true);

  return isDesktopWidth ? (
    <Stack spacing={1}>
      <ExpenseQueryForm onSubmit={fetchExpenses} isLoading={isExpensesLoading} />
      <Stack gap={1} direction="row" divider={isDesktopWidth && <Divider orientation="vertical" flexItem />}>
        <ExpensesTable fetchExpenses={fetchExpenses} />
        <AddExpenseCalculator />
      </Stack>
    </Stack>
  ) : (
    <>
      {windowHeight > 650 && (
        <Paper>
          <Typography variant="h6" textAlign="center">
            Spent this month:
          </Typography>
          <Box textAlign="center">
            <Typography variant="h3" color="primary">
              {userExpenses.reduce(
                (acc, expense) =>
                  new Date(expense.createdAt).getMonth() === new Date().getMonth() ? acc + expense.amount : acc,
                0,
              )}
            </Typography>
          </Box>
        </Paper>
      )}
      <Box position="fixed" bottom={0} right={0} maxWidth="100%">
        <AddExpenseCalculator />
      </Box>
    </>
  );
};

export default HomePage;
