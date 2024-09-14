import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { setMyConfig, TConfig, THEME_ENUM, updateMyConfig } from 'src/shared/api/userConfigApi';
import { CURRENCIES } from 'src/shared/constants/currencies';
import { LANGUAGES_ENUM } from 'src/shared/constants/Locales';
import handleError from 'src/utils/errorHandler';
import useUserSettingsStore from '../model/store/useUserSettingsStore';
import i18n from 'src/shared/api/i18nConfig';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const userSettings = useUserSettingsStore.use.config();
  const setUserConfig = useUserSettingsStore.use.setConfig();
  const { t } = useTranslation('profile');

  const theme = useTheme();

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

  return (
    <Paper elevation={2} style={{ padding: '16px', margin: '0 auto' }}>
      <Box display="flex" flexDirection="column" gap="16px">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="currency-label">{t('Currency')}</InputLabel>
          <Select
            size="small"
            labelId="currency-label"
            id="currency"
            value={userSettings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value as CURRENCIES)}
            disabled={isUpdating || isSaving}
            label={t('Currency')}
          >
            {Object.values(CURRENCIES).map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel id="language-label">{t('Language')}</InputLabel>
          <Select
            size="small"
            labelId="language-label"
            id="language"
            value={userSettings.language}
            onChange={(e) => {
              handleSettingChange('language', e.target.value as LANGUAGES_ENUM);
              setNewLanguage(e.target.value as LANGUAGES_ENUM);
            }}
            disabled={isUpdating || isSaving}
            label={t('Language')}
          >
            {Object.values(LANGUAGES_ENUM).map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel id="theme-label">{t('Theme')}</InputLabel>
          <Select
            size="small"
            labelId="theme-label"
            id="theme"
            value={userSettings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value as THEME_ENUM)}
            disabled={isUpdating || isSaving}
            label={t('Theme')}
          >
            {Object.values(THEME_ENUM).map((theme) => (
              <MenuItem key={theme} value={theme}>
                {t(theme)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          display="flex"
          flexDirection="column"
          gap="8px"
          border={`1px solid ${theme.palette.grey[700]}`}
          borderRadius="4px"
          padding="8px"
        >
          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showCategoryColours}
                onChange={(e) => handleSettingChange('showCategoryColours', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Category Colours')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showSourceColours}
                onChange={(e) => handleSettingChange('showSourceColours', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Source Colours')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showCategoryNames}
                onChange={(e) => handleSettingChange('showCategoryNames', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Category Names')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showSourceNames}
                onChange={(e) => handleSettingChange('showSourceNames', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Source Names')}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="8px"
          border={`1px solid ${theme.palette.grey[700]}`}
          borderRadius="4px"
          padding="8px"
        >
          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showSharedExpenses}
                onChange={(e) => handleSettingChange('showSharedExpenses', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Shared Expenses')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showSharedCategories}
                onChange={(e) => handleSettingChange('showSharedCategories', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Shared Categories')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={userSettings.showSharedSources}
                onChange={(e) => handleSettingChange('showSharedSources', e.target.checked)}
                disabled={isUpdating || isSaving}
              />
            }
            label={t('Shared Sources')}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Settings;
