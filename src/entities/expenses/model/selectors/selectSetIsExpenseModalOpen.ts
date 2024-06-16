import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectSetIsExpenseModalOpen = (state: TExpensesStore) => state.setIsEditExpenseModalOpen;

export default selectSetIsExpenseModalOpen;
