import { Box, Divider, Stack } from '@mui/material';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import SpentThisMonth from 'src/entities/expenses/ui/SpentThisMonth.tsx';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';

const HomePage = () => {
  const { isDesktopWidth, windowHeight } = useWindowWidth();

  useLoadPaymentSources(true);
  useLoadCategories(true);

  return isDesktopWidth ? (
    <Stack spacing={1} maxHeight="100%" overflow="auto">
      <ExpenseQueryForm />
      <Stack
        gap={1}
        direction="row"
        divider={isDesktopWidth && <Divider orientation="vertical" flexItem />}
        maxHeight="100%"
        overflow="auto"
      >
        <ExpensesTable />

        <Stack gap={1} divider={<Divider flexItem />}>
          <SpentThisMonth />
          <AddExpenseCalculator />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <>
      {windowHeight > 680 && <SpentThisMonth />}
      <Box position="fixed" bottom={0} right={0} maxWidth="100%">
        <AddExpenseCalculator />
      </Box>
    </>
  );
};

export default HomePage;
