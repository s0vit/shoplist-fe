import { create } from 'zustand';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TFiltersStoreTypes = {
  filter: TFilterForQueryTypes;
  setFilter: (filter: TFilterForQueryTypes) => void;
  resetStore: () => void;
};

const initialState: TFiltersStoreTypes['filter'] = {
  categoryId: '',
  paymentSourceId: '',
  createdStartDate: '',
  createdEndDate: '',
  amountStart: '',
  amountEnd: '',
  skip: '',
  limit: '',
};

const _useFiltersStoreForExpenses = create<TFiltersStoreTypes>((set) => ({
  filter: initialState,
  setFilter: (filter) => set({ filter }),
  resetStore: () => set({ filter: initialState }),
}));

const useFiltersStoreForExpenses = createSelectors(_useFiltersStoreForExpenses);
export default useFiltersStoreForExpenses;
