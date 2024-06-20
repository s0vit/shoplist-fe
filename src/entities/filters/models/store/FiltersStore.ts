import { create } from 'zustand';
import { FilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';

export type FiltersStoreTypes = {
  filter: FilterForQueryTypes;
  setFilter: (filter: FilterForQueryTypes) => void;
};

const useFiltersStoreForExpenses = create<FiltersStoreTypes>((set) => ({
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
