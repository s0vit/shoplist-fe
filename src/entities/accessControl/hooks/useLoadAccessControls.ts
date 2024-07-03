import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { isAxiosError } from 'axios';
import useAccessControlStore from 'src/entities/accessControl/model/useAccessControlStore.ts';
import { getMyAccessControls, TAccessControl } from 'src/shared/api/accessControlApi.ts';

const useLoadAccessControls = (shouldFetchOnLoad: boolean = false, onFetchFinish?: () => void) => {
  const setMyAccessControls = useAccessControlStore.use.setMyAccessControls();
  const myAccessControls = useAccessControlStore.use.myAccessControls();

  const {
    data: accessControls,
    isPending: isAccessControlLoading,
    error: accessControl,
    refetch,
  } = useQuery({
    queryKey: ['access-control'],
    queryFn: getMyAccessControls,
    enabled: shouldFetchOnLoad,
  });

  const fetchAccessControls = useStableCallback(async () => {
    const newData = await refetch();
    if (isAxiosError(newData)) handleError(newData);
    setMyAccessControls((newData.data as unknown as TAccessControl[]) || []);
    if (onFetchFinish) onFetchFinish();
  });

  useEffect(() => {
    if (accessControl) {
      handleError(accessControl);
    }
  }, [accessControl]);

  useEffect(() => {
    if (!isAccessControlLoading) {
      setMyAccessControls(accessControls || []);
      if (!onFetchFinish) return;
      onFetchFinish();
    }
  }, [isAccessControlLoading, accessControls, setMyAccessControls, onFetchFinish]);

  return {
    myAccessControls,
    isCategoriesLoading: isAccessControlLoading,
    fetchAccessControls,
  };
};

export default useLoadAccessControls;
