import { Box, Divider, Stack } from '@mui/material';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/shared/hooks/useWindowWidth.ts';

const HomePage = () => {
  const { isDesktopWidth } = useWindowWidth();

  const { fetchExpenses, isExpensesLoading } = useLoadExpenses({ shouldFetchOnLoad: true });
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
    // make box always at bottom
    <Box position="fixed" bottom={0} right={0} maxWidth="100%" width="fit-content" ml="auto">
      <AddExpenseCalculator />
    </Box>
  );
};

export default HomePage;
