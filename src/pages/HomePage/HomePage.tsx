import Box from 'src/shared/ui-kit/Box/Box';
import Stack from 'src/shared/ui-kit/Stack/Stack';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import SpentThisMonth from 'src/entities/expenses/ui/SpentThisMonth.tsx';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { isDesktopWidth, windowHeight } = useWindowWidth();
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const isBigScreen = windowHeight > 740;

  useLoadPaymentSources(true);
  useLoadCategories(true);

  return isDesktopWidth ? (
    <Stack gap={1} className={styles.rootStack}>
      {isVerified && <ExpenseQueryForm />}
      <Stack gap={1} direction="row" className={styles.rowStack}>
        <ExpensesTable />

        <Stack gap={1}>
          <SpentThisMonth />
          <AddExpenseCalculator />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <>
      <SpentThisMonth />
      <Box className={isBigScreen ? styles.addExpenseBox : styles.addExpenseBoxRelative}>
        <AddExpenseCalculator />
      </Box>
    </>
  );
};

export default HomePage;
