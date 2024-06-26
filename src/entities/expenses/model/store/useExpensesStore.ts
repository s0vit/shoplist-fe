import { create } from 'zustand';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TExpensesStore = {
  useExpensesStore: TExpense[];
  currentEditExpense?: TExpense;
  isEditExpenseModalOpen?: boolean;
  setUserExpenses: (expenses: TExpense[]) => void;
  setCurrentEditExpense: (expense: TExpense | undefined) => void;
  setIsEditExpenseModalOpen: (isOpen: boolean) => void;
  resetStore: () => void;
};

const useExpensesStore = create<TExpensesStore>((set) => ({
  useExpensesStore: [],
  currentEditExpense: undefined,
  isEditExpenseModalOpen: false,
  setUserExpenses: (useExpensesStore) => set({ useExpensesStore }),
  setCurrentEditExpense: (currentEditExpense) => set({ currentEditExpense }),
  setIsEditExpenseModalOpen: (isEditExpenseModalOpen) => set({ isEditExpenseModalOpen }),
  resetStore: () => set({ useExpensesStore: [], currentEditExpense: undefined, isEditExpenseModalOpen: false }),
}));

export default createSelectors(useExpensesStore);
