import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectUserExpenses = (state: TExpensesStore) => state.useExpensesStore;

export default selectUserExpenses;
