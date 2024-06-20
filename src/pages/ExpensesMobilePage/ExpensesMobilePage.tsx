import { Stack } from '@mui/material';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';

const ExpensesMobilePage = () => {
  const { fetchExpenses, isExpensesLoading } = useLoadExpenses();

  return (
    <Stack spacing={1}>
      <ExpenseQueryForm onSubmit={fetchExpenses} isLoading={isExpensesLoading} />
      <ExpensesTable fetchExpenses={fetchExpenses} />
    </Stack>
  );
};

export default ExpensesMobilePage;
