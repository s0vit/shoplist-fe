import { create } from 'zustand';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TExpensesStore = {
  userExpenses: TExpense[];
  currentEditExpense?: TExpense;
  isEditExpenseModalOpen?: boolean;
  setUserExpenses: (expenses: TExpense[]) => void;
  setCurrentEditExpense: (expense: TExpense | undefined) => void;
  setIsEditExpenseModalOpen: (isOpen: boolean) => void;
  resetStore: () => void;
};

const useExpensesStore = create<TExpensesStore>((set) => ({
  userExpenses: [],
  currentEditExpense: undefined,
  isEditExpenseModalOpen: false,
  setUserExpenses: (userExpenses) => set({ userExpenses }),
  setCurrentEditExpense: (currentEditExpense) => set({ currentEditExpense }),
  setIsEditExpenseModalOpen: (isEditExpenseModalOpen) => set({ isEditExpenseModalOpen }),
  resetStore: () => set({ userExpenses: [], currentEditExpense: undefined, isEditExpenseModalOpen: false }),
}));

export default createSelectors(useExpensesStore);
