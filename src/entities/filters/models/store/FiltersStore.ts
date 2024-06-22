import { create } from 'zustand';
import { FilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type FiltersStoreTypes = {
  filter: FilterForQueryTypes;
  setFilter: (filter: FilterForQueryTypes) => void;
};

const _useFiltersStoreForExpenses = create<FiltersStoreTypes>((set) => ({
  filter: {
    categoryId: '',
    paymentSourceId: '',
    createdStartDate: '',
    createdEndDate: '',
    amountStart: '',
    amountEnd: '',
    skip: '',
    limit: '',
  },
  setFilter: (filter) => set({ filter }),
}));

const useFiltersStoreForExpenses = createSelectors(_useFiltersStoreForExpenses);
export default useFiltersStoreForExpenses;
