import { create } from 'zustand';
import { TExpense } from 'src/shared/api/expenseApi.ts';

export type TExpensesStore = {
  useExpensesStore: TExpense[];
  setUserExpenses: (expenses: TExpense[]) => void;
};

const useExpensesStore = create<TExpensesStore>((set) => ({
  useExpensesStore: [],
  setUserExpenses: (useExpensesStore) => set({ useExpensesStore }),
}));

export default useExpensesStore;
