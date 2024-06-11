import { TPaymentSourcesStore } from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

const selectUserPaymentSources = (state: TPaymentSourcesStore) => state.userPaymentSources;

export default selectUserPaymentSources;
