import { TExpensesStore } from 'src/entities/expenses/model/store/useExpensesStore.ts';

const selectIsExpenseModalOpen = (state: TExpensesStore) => state.isEditExpenseModalOpen;

export default selectIsExpenseModalOpen;
