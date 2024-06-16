import { Button, Stack } from '@mui/material';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import ExpensesTable from 'src/entities/expenses/ui/ExpensesTable.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import ExpenseQueryForm from 'src/entities/expenses/ui/expensesQueryForm.tsx';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import selectIsExpenseModalOpen from 'src/entities/expenses/model/selectors/selectIsExpenseModalOpen.ts';
import selectSetIsExpenseModalOpen from 'src/entities/expenses/model/selectors/selectSetIsExpenseModalOpen.ts';
import selectSetCurrentEditExpense from 'src/entities/expenses/model/selectors/selectSetCurrentEditExpense.ts';

const HomePage = () => {
  const isExpenseModalOpen = useExpensesStore(selectIsExpenseModalOpen);
  const setCurrentExpense = useExpensesStore(selectSetCurrentEditExpense);
  const setIsExpenseModalOpen = useExpensesStore(selectSetIsExpenseModalOpen);

  const { fetchExpenses, isExpensesLoading } = useLoadExpenses({ shouldFetchOnLoad: true });
  useLoadPaymentSources(true);
  useLoadCategories(true);

  const closeExpenseModal = useStableCallback(() => {
    setIsExpenseModalOpen(false);
    setCurrentExpense(undefined);
  });

  const openExpenseModal = useStableCallback(() => setIsExpenseModalOpen(true));

  return (
    <Stack gap={2}>
      <Button onClick={openExpenseModal}>Add Expense</Button>
      <ExpenseQueryForm onSubmit={fetchExpenses} isLoading={isExpensesLoading} />
      <ExpensesTable fetchExpenses={fetchExpenses} />
      <ExpenseModal closeModal={closeExpenseModal} isExpenseModalOpen={isExpenseModalOpen} />
    </Stack>
  );
};

export default HomePage;
