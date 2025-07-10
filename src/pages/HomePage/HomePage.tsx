import { Box, Divider, Stack } from '@mui/material';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import SpentThisMonth from 'src/entities/expenses/ui/SpentThisMonth.tsx';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

const HomePage = () => {
  const { isDesktopWidth, windowHeight } = useWindowWidth();
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const isBigScreen = windowHeight > 740;

  useLoadPaymentSources(true);
  useLoadCategories(true);

  return isDesktopWidth ? (
    <Box display="flex" height="100%">
      {isVerified && (
        <Box sx={{ width: 250, borderRight: '1px solid #ddd', p: 1 }}>
          <ExpenseQueryForm />
        </Box>
      )}

      <Stack gap={1} flexGrow={1} overflow="auto" p={1}>
        <SpentThisMonth />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ width: '100%' }}
        >
          <Box sx={{ flex: 1 }}>
            {' '}
            <ExpensesTable />
          </Box>
          <Box sx={{ width: 350 }}>
            {' '}
            <AddExpenseCalculator />
          </Box>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <>
      <SpentThisMonth />
      <Box position={isBigScreen ? 'fixed' : undefined} bottom={0} right={0} maxWidth="100%">
        <AddExpenseCalculator />
      </Box>
    </>
  );
};

export default HomePage;
