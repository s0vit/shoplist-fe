import { create } from 'zustand';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TFiltersStoreTypes = {
  filter: TFilterForQueryTypes;
  setFilter: (filter: TFilterForQueryTypes) => void;
};

const _useFiltersStoreForExpenses = create<TFiltersStoreTypes>((set) => ({
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
