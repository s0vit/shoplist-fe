import { Box, Stack } from 'src/shared/ui-kit';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import SpentThisMonth from 'src/entities/expenses/ui/SpentThisMonth.tsx';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

const HomePage = () => {
  const { isDesktopWidth } = useWindowWidth();
  const isVerified = _useUserStore.use.user?.()?.isVerified;

  useLoadPaymentSources(true);
  useLoadCategories(true);

  return isDesktopWidth ? (
    <Box style={{ display: 'flex', height: '100%' }}>
      {isVerified && <Box></Box>}

      <Stack gap={0} style={{ flexGrow: 1, padding: '8px' }}>
        <Stack direction="row" justify="space-between" align="flex-start" gap={1} style={{ width: '100%' }}>
          <Box style={{ flexBasis: '20%' }}>
            <ExpenseQueryForm />
          </Box>
          <Box style={{ flexBasis: '60%' }}>
            <SpentThisMonth />
            <ExpensesTable />
          </Box>
          <Box style={{ flexBasis: '20%' }}>
            <AddExpenseCalculator />
          </Box>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Box style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
      <Box
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <SpentThisMonth />
        <AddExpenseCalculator />
      </Box>
    </Box>
  );
};

export default HomePage;
