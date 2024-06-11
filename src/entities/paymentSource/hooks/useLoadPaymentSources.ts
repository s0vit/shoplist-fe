import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect, useRef } from 'react';
import handleError from 'src/utils/errorHandler.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import selectSetUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectSetUserPaymentSources.ts';
import { getPaymentSources, TGetPaymentSourcesResponse } from 'src/shared/api/paymentsSourceApi.ts';

const useLoadPaymentSources = (withShared?: boolean, onFetchFinish?: () => void) => {
  const setUserPaymentSources = usePaymentSourcesStore(selectSetUserPaymentSources);
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);

  const isInitialFetch = useRef<boolean>(true);

  const {
    data: paymentSources,
    isPending: isPaymentSourcesLoading,
    error: paymentSourcesError,
    mutate: fetchPaymentSources,
  } = useMutation<TGetPaymentSourcesResponse, TErrorResponse>({
    mutationKey: ['paymentSources'],
    mutationFn: getPaymentSources,
  });

  if (withShared) {
    console.warn('Shared paymentSources are not implemented yet');
  }

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchPaymentSources();
    }
  }, [fetchPaymentSources]);

  useEffect(() => {
    if (paymentSourcesError) {
      handleError(paymentSourcesError);
    }
  }, [paymentSourcesError]);

  useEffect(() => {
    if (paymentSources && !isPaymentSourcesLoading) {
      setUserPaymentSources(paymentSources);
      if (!onFetchFinish) return;
      onFetchFinish();
    }
  }, [paymentSources, isPaymentSourcesLoading, setUserPaymentSources, onFetchFinish]);

  return {
    userPaymentSources,
    isPaymentSourcesLoading,
    fetchPaymentSources,
  };
};

export default useLoadPaymentSources;
