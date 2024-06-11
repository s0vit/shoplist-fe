import { TPaymentSourcesStore } from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

const selectSetUserPaymentSources = (state: TPaymentSourcesStore) => state.setUserPaymentSources;

export default selectSetUserPaymentSources;
