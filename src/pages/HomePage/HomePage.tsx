import { Box, Stack } from '@mui/material';
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
    <Box display="flex" height="100%">
      {isVerified && <Box></Box>}

      <Stack gap={0} flexGrow={1} p={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1} sx={{ width: '100%' }}>
          <Box sx={{ flexBasis: '20%' }}>
            <ExpenseQueryForm />
          </Box>
          <Box sx={{ flexBasis: '60%' }}>
            <SpentThisMonth />
            <ExpensesTable />
          </Box>
          <Box sx={{ flexBasis: { xs: '100%', sm: '20%' } }}>
            <AddExpenseCalculator />
          </Box>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Box sx={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
      <Box
        sx={{
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
