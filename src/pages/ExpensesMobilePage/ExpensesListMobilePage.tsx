import { Stack } from '@mui/material';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';

const ExpensesListMobilePage = () => {
  return (
    <Stack spacing={1}>
      <ExpenseQueryForm />
      <ExpensesTable />
    </Stack>
  );
};

export default ExpensesListMobilePage;
