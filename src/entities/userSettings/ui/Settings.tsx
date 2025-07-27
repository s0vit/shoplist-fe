import { FormControl } from 'src/shared/ui-kit';
import { Box, Paper, Typography } from 'src/shared/ui-kit';

import { Select, Toggle, type TOption } from 'src/shared/ui-kit';

import { useMutation } from '@tanstack/react-query';
import { setMyConfig, TConfig, THEME_ENUM, updateMyConfig } from 'src/shared/api/userConfigApi';
import { CURRENCIES } from 'src/shared/constants/currencies';
import { LANGUAGES_ENUM } from 'src/shared/constants/Locales';
import handleError from 'src/utils/errorHandler';
import useUserSettingsStore from '../model/store/useUserSettingsStore';
import i18n from 'src/shared/api/i18nConfig';
import { useTranslation } from 'react-i18next';
import styles from './Settings.module.scss';

const Settings = () => {
  const userSettings = useUserSettingsStore.use.config();
  const setUserConfig = useUserSettingsStore.use.setConfig();
  const { t } = useTranslation('profile');

  const setNewLanguage = async (newLanguage: LANGUAGES_ENUM) => {
    await i18n.changeLanguage(newLanguage);
  };

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: () => updateMyConfig({ ...userSettings, _id: userSettings._id! }),
    onSuccess: (data) => {
      setUserConfig(data);
    },
    onError: (error) => handleError(error),
  });

  const { mutate: saveSettings, isPending: isSaving } = useMutation({
    mutationFn: () => setMyConfig(userSettings),
    onSuccess: (data) => setUserConfig(data),
    onError: (error) => handleError(error),
  });

  const handleSave = () => {
    if (userSettings._id) {
      updateSettings();
    } else {
      saveSettings();
    }
  };

  const handleSettingChange = <K extends keyof TConfig>(field: K, value: TConfig[K]) => {
    setUserConfig({ ...userSettings, [field]: value });
    handleSave();
  };

  const currencyOptions: TOption[] = Object.values(CURRENCIES).map((currency) => ({
    value: currency,
    label: currency,
  }));
  const languageOptions: TOption[] = Object.values(LANGUAGES_ENUM).map((language) => ({
    value: language,
    label: language,
  }));
  const themeOptions: TOption[] = Object.values(THEME_ENUM).map((theme) => ({ value: theme, label: t(theme) }));

  return (
    <Paper elevation={2} className={styles.settingsPaper}>
      <Box display="flex" flexDirection="column" gap="16px">
        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('Currency')}
          </Typography>
          <Select
            options={currencyOptions}
            value={userSettings.currency}
            onChange={(value) => handleSettingChange('currency', value as CURRENCIES)}
            disabled={isUpdating || isSaving}
            data-test
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('Language')}
          </Typography>
          <Select
            options={languageOptions}
            value={userSettings.language}
            onChange={(value) => {
              handleSettingChange('language', value as LANGUAGES_ENUM);
              setNewLanguage(value as LANGUAGES_ENUM);
            }}
            disabled={isUpdating || isSaving}
            data-test
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('Theme')}
          </Typography>
          <Select
            options={themeOptions}
            value={userSettings.theme}
            onChange={(value) => handleSettingChange('theme', value as THEME_ENUM)}
            disabled={isUpdating || isSaving}
            data-test
          />
        </FormControl>

        <Box
          display="flex"
          flexDirection="column"
          gap="8px"
          style={{
            border: '1px solid var(--color-text-secondary)',
            borderRadius: '4px',
            padding: '8px',
          }}
        >
          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Category Colours')}</Typography>
            <Toggle
              checked={userSettings.showCategoryColours}
              onChange={(checked) => handleSettingChange('showCategoryColours', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Source Colours')}</Typography>
            <Toggle
              checked={userSettings.showSourceColours}
              onChange={(checked) => handleSettingChange('showSourceColours', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Category Names')}</Typography>
            <Toggle
              checked={userSettings.showCategoryNames}
              onChange={(checked) => handleSettingChange('showCategoryNames', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Source Names')}</Typography>
            <Toggle
              checked={userSettings.showSourceNames}
              onChange={(checked) => handleSettingChange('showSourceNames', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="8px"
          style={{
            border: '1px solid var(--color-text-secondary)',
            borderRadius: '4px',
            padding: '8px',
          }}
        >
          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Shared Expenses')}</Typography>
            <Toggle
              checked={userSettings.showSharedExpenses}
              onChange={(checked) => handleSettingChange('showSharedExpenses', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Shared Categories')}</Typography>
            <Toggle
              checked={userSettings.showSharedCategories}
              onChange={(checked) => handleSettingChange('showSharedCategories', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            <Typography variant="body2">{t('Shared Sources')}</Typography>
            <Toggle
              checked={userSettings.showSharedSources}
              onChange={(checked) => handleSettingChange('showSharedSources', checked)}
              disabled={isUpdating || isSaving}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Settings;
