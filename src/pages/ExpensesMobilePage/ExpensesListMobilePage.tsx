import Stack from 'src/shared/ui-kit/Stack/Stack';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';

const ExpensesListMobilePage = () => {
  return (
    <Stack gap={1}>
      <ExpenseQueryForm />
      <ExpensesTable />
    </Stack>
  );
};

export default ExpensesListMobilePage;
