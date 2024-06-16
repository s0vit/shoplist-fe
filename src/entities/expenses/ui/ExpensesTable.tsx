import { Box } from '@mui/material';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import selectUserExpenses from 'src/entities/expenses/model/selectors/selectUserExpenses.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { useMutation } from '@tanstack/react-query';
import { deleteExpense } from 'src/shared/api/expenseApi.ts';
import ExpenseItem from 'src/entities/expenses/ui/ExpenseItem.tsx';

type TExpensesTableProps = {
  fetchExpenses: (query: Record<string, string | undefined | Date | number>) => void;
};

const ExpensesTable = ({ fetchExpenses }: TExpensesTableProps) => {
  const userCategories = useCategoryStore(selectUserCategories);
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);
  const expenses = useExpensesStore(selectUserExpenses);
  const { mutate } = useMutation({
    mutationKey: ['expenses'],
    mutationFn: deleteExpense,
    onSuccess: () => fetchExpenses({}),
  });

  return (
    <Box>
      {expenses?.map((expense) => {
        const category = userCategories.find((category) => category._id === expense.categoryId);
        const paymentSource = userPaymentSources.find((source) => source._id === expense.paymentSourceId);

        return (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            category={category}
            paymentSource={paymentSource}
            handleRemove={mutate}
          />
        );
      })}
    </Box>
  );
};

export default ExpensesTable;
