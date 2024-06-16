import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectSetCurrentEditExpense = (state: TExpensesStore) => state.setCurrentEditExpense;

export default selectSetCurrentEditExpense;
