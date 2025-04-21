import { useParams } from 'react-router-dom';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';

const ExpensePage = () => {
  const params = useParams<{ _id: string }>();

  const expenses = useExpensesStore.use.userExpenses();
  const currentExpense = expenses.find((expense) => expense._id === params._id);
  console.log(currentExpense);

  return <div>This is expense page</div>;
};

export default ExpensePage;
