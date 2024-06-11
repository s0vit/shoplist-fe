import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectSetUserExpenses = (state: TExpensesStore) => state.setUserExpenses;

export default selectSetUserExpenses;
