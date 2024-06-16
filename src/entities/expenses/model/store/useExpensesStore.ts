import { create } from 'zustand';
import { TExpense } from 'src/shared/api/expenseApi.ts';

export type TExpensesStore = {
  useExpensesStore: TExpense[];
  currentEditExpense?: TExpense;
  isEditExpenseModalOpen?: boolean;
  setUserExpenses: (expenses: TExpense[]) => void;
  setCurrentEditExpense: (expense: TExpense | undefined) => void;
  setIsEditExpenseModalOpen: (isOpen: boolean) => void;
};

const useExpensesStore = create<TExpensesStore>((set) => ({
  useExpensesStore: [],
  setUserExpenses: (useExpensesStore) => set({ useExpensesStore }),
  setCurrentEditExpense: (currentEditExpense) => set({ currentEditExpense }),
  setIsEditExpenseModalOpen: (isEditExpenseModalOpen) => set({ isEditExpenseModalOpen }),
}));

export default useExpensesStore;
