import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import selectSetUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectSetUserPaymentSources.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import { getPaymentSources, TGetPaymentSourcesResponse } from 'src/shared/api/paymentsSourceApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

const useLoadPaymentSources = (
  shouldFetchOnLoad: boolean = false,
  withShared?: boolean,
  onFetchFinish?: () => void,
) => {
  const setUserPaymentSources = usePaymentSourcesStore(selectSetUserPaymentSources);
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);

  const {
    data: paymentSources,
    isPending: isPaymentSourcesLoading,
    error: paymentSourcesError,
    refetch,
  } = useQuery<TGetPaymentSourcesResponse, TErrorResponse>({
    queryKey: ['paymentSources'],
    queryFn: getPaymentSources,
    enabled: shouldFetchOnLoad,
  });

  if (withShared) {
    console.warn('Shared paymentSources are not implemented yet');
  }

  const fetchPaymentSources = useStableCallback(async () => {
    const newData = await refetch();
    if (isAxiosError(newData)) handleError(newData);
    setUserPaymentSources((newData.data as unknown as TGetPaymentSourcesResponse) || []);
    if (onFetchFinish) onFetchFinish();
  });

  useEffect(() => {
    if (paymentSourcesError) {
      handleError(paymentSourcesError, shouldFetchOnLoad);
    }
  }, [paymentSourcesError, shouldFetchOnLoad]);

  useEffect(() => {
    if (!isPaymentSourcesLoading) {
      setUserPaymentSources(paymentSources || []);
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
