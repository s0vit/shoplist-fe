import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useUserStore from 'src/entities/user/model/store/useUserStore';
import { getMyConfig } from 'src/shared/api/userConfigApi';
import useUserSettingsStore from '../model/store/useUserSettingsStore';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import i18n from 'i18next';

export const useLoadConfigs = () => {
  const setUserConfig = useUserSettingsStore.use.setConfig();
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = _useUserStore.use.user?.()?.isVerified;

  const { data: userConfig } = useQuery({
    queryKey: ['config'],
    queryFn: getMyConfig,
    enabled: isLoggedIn && isVerified,
  });

  useEffect(() => {
    if (userConfig) {
      setUserConfig(userConfig);

      i18n.changeLanguage(userConfig.language);
    }
  }, [userConfig, setUserConfig]);
};

export default useLoadConfigs;
