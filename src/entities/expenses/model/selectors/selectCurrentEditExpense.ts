import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectCurrentEditExpense = (state: TExpensesStore) => state.currentEditExpense;

export default selectCurrentEditExpense;
