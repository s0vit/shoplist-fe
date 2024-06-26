import { Box, Divider, Stack } from '@mui/material';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { TGetExpenseQuery } from 'src/shared/api/expenseApi.ts';
import SpentThisMonth from 'src/entities/expenses/ui/SpentThisMonth.tsx';

const HomePage = () => {
  const { isDesktopWidth, windowHeight } = useWindowWidth();

  const { fetchExpenses, isExpensesLoading, userExpenses } = useLoadExpenses({ shouldFetchOnLoad: true });
  useLoadPaymentSources(true);
  useLoadCategories(true);

  //<ExpenseQueryForm onSubmit={fetchExpenses} isLoading={isExpensesLoading} /> filters work only one time

  const test = (value: TGetExpenseQuery | undefined) => {
    fetchExpenses(value);
  };

  return isDesktopWidth ? (
    <Stack spacing={1}>
      <ExpenseQueryForm onSubmit={test} isLoading={isExpensesLoading} />
      <Stack gap={1} direction="row" divider={isDesktopWidth && <Divider orientation="vertical" flexItem />}>
        <ExpensesTable fetchExpenses={fetchExpenses} />

        <Stack gap={1} divider={<Divider flexItem />}>
          <SpentThisMonth expenses={userExpenses} />
          <AddExpenseCalculator />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <>
      {windowHeight > 680 && <SpentThisMonth expenses={userExpenses} />}
      <Box position="fixed" bottom={0} right={0} maxWidth="100%">
        <AddExpenseCalculator />
      </Box>
    </>
  );
};

export default HomePage;
