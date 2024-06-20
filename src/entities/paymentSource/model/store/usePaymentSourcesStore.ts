import { create } from 'zustand';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

export type TPaymentSourcesStore = {
  userPaymentSources: TPaymentSource[];
  setUserPaymentSources: (userPaymentSources: TPaymentSource[]) => void;
};

const usePaymentSourcesStore = create<TPaymentSourcesStore>((set) => ({
  userPaymentSources: [],
  setUserPaymentSources: (userPaymentSources) => set({ userPaymentSources }),
}));

export default createSelectors(usePaymentSourcesStore);
