import { create } from 'zustand';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';
import { CURRENCIES } from 'src/shared/constants/currencies';

const LOCAL_STORAGE_KEY = 'selectedCurrency';

export type TExpensesStore = {
  userExpenses: TExpense[];
  currentEditExpense?: TExpense;
  isEditExpenseModalOpen?: boolean;
  selectedCurrency: CURRENCIES;
  setUserExpenses: (expenses: TExpense[]) => void;
  setCurrentEditExpense: (expense: TExpense | undefined) => void;
  setIsEditExpenseModalOpen: (isOpen: boolean) => void;
  setSelectedCurrency: (currency: CURRENCIES) => void;
  resetStore: () => void;
};

const getInitialCurrency = (): CURRENCIES => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('selectedCurrency');

    if (saved && Object.values(CURRENCIES).includes(saved as CURRENCIES)) {
      return saved as CURRENCIES;
    }
  }

  return CURRENCIES.RUB;
};

const useExpensesStore = create<TExpensesStore>((set) => ({
  userExpenses: [],
  currentEditExpense: undefined,
  isEditExpenseModalOpen: false,
  selectedCurrency: getInitialCurrency(),
  setUserExpenses: (userExpenses) => set({ userExpenses }),
  setCurrentEditExpense: (currentEditExpense) => set({ currentEditExpense }),
  setIsEditExpenseModalOpen: (isEditExpenseModalOpen) => set({ isEditExpenseModalOpen }),
  setSelectedCurrency: (currency) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, currency);
    set({ selectedCurrency: currency });
  },

  resetStore: () =>
    set({
      userExpenses: [],
      currentEditExpense: undefined,
      isEditExpenseModalOpen: false,
      selectedCurrency: CURRENCIES.USD,
    }),
}));

export default createSelectors(useExpensesStore);
