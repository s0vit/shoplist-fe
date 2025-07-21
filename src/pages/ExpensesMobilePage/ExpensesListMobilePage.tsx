import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import { Stack } from 'src/shared/ui-kit';

const ExpensesListMobilePage = () => {
  return (
    <Stack gap={1}>
      <ExpenseQueryForm />
      <ExpensesTable />
    </Stack>
  );
};

export default ExpensesListMobilePage;
