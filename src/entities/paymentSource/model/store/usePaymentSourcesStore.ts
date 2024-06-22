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
};

const usePaymentSourcesStore = create<TPaymentSourcesStore>((set) => ({
  userPaymentSources: [],
  currentEditingPaymentSource: undefined,
  isPaymentSourcesModalOpen: false,
  setUserPaymentSources: (userPaymentSources) => set({ userPaymentSources }),
  setCurrentEditingPaymentSource: (paymentSource) => set({ currentEditingPaymentSource: paymentSource }),
  setIsPaymentSourceModalOpen: (isPaymentSourcesModalOpen) => set({ isPaymentSourcesModalOpen }),
}));

export default createSelectors(usePaymentSourcesStore);
