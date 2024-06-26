import { create } from 'zustand';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TPaymentSourcesStore = {
  userPaymentSources: TPaymentSource[];
  currentEditingPaymentSource?: Partial<TPaymentSource>;
  isPaymentSourcesModalOpen: boolean;
  setUserPaymentSources: (userPaymentSources: TPaymentSource[]) => void;
  setCurrentEditingPaymentSource: (paymentSource?: Partial<TPaymentSource>) => void;
  setIsPaymentSourceModalOpen: (isPaymentSourcesModalOpen: boolean) => void;
  resetStore: () => void;
};

const usePaymentSourcesStore = create<TPaymentSourcesStore>((set) => ({
  userPaymentSources: [],
  currentEditingPaymentSource: undefined,
  isPaymentSourcesModalOpen: false,
  setUserPaymentSources: (userPaymentSources) => set({ userPaymentSources }),
  setCurrentEditingPaymentSource: (paymentSource) => set({ currentEditingPaymentSource: paymentSource }),
  setIsPaymentSourceModalOpen: (isPaymentSourcesModalOpen) => set({ isPaymentSourcesModalOpen }),
  resetStore: () =>
    set({ userPaymentSources: [], currentEditingPaymentSource: undefined, isPaymentSourcesModalOpen: false }),
}));

export default createSelectors(usePaymentSourcesStore);
