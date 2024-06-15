import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { Button, Link, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';

const HomePage = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { fetchExpenses, isExpensesLoading } = useLoadExpenses({ shouldFetchOnLoad: true });
  useLoadPaymentSources(true);
  useLoadCategories(true);

  const closeExpenseModal = useStableCallback(() => {
    setIsExpenseModalOpen(false);
  });

  const openExpenseModal = useStableCallback(() => setIsExpenseModalOpen(true));

  return (
    <>
      <Stack gap={2}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Home Page</Typography>
          <Link component={RouterLink} to={RoutesEnum.PROFILE}>
            Profile
          </Link>
        </Paper>
        <Button onClick={openExpenseModal}>Add Expense</Button>

        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">Expenses</Typography>
        </Paper>
        <ExpenseQueryForm onSubmit={fetchExpenses} isLoading={isExpensesLoading} />
        <ExpensesTable fetchExpenses={fetchExpenses} />
      </Stack>
      <ExpenseModal closeModal={closeExpenseModal} isExpenseModalOpen={isExpenseModalOpen} />
    </>
  );
};

export default HomePage;
