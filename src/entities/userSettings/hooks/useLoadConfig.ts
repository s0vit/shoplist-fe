import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useUserStore from 'src/entities/user/model/store/useUserStore';
import { getMyConfig } from 'src/shared/api/userConfigApi';
import useUserSettingsStore from '../model/store/useUserSettingsStore';

export const useLoadConfigs = () => {
  const setUserConfig = useUserSettingsStore.use.setConfig();
  const isLoggedIn = useUserStore.use.user?.() !== undefined;

  const { data: userConfig } = useQuery({
    queryKey: ['config'],
    queryFn: getMyConfig,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (userConfig) {
      setUserConfig(userConfig);
    }
  }, [userConfig, setUserConfig]);
};

export default useLoadConfigs;
