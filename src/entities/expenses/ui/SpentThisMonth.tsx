import { FormControl, Paper, Select, Stack, type TOption, Typography } from 'src/shared/ui-kit';

import { useState } from 'react';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { CURRENCIES, currencies } from 'src/shared/constants/currencies';
import calculateTotalAmount from 'src/utils/helpers/calculateTotalAmmount';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import styles from './SpentThisMonth.module.scss';

const SpentThisMonth = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const defaultCurrency = useUserSettingsStore.use.config().currency;
  const [currency, setCurrency] = useState<CURRENCIES>(defaultCurrency ?? CURRENCIES.EUR);
  const { userExpenses } = useLoadExpenses({ shouldFetchOnLoad: isVerified });
  const { t } = useTranslation('homePage');
  const { windowHeight } = useWindowWidth();

  const isBigScreen = windowHeight > 740;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const filteredExpenses = userExpenses.filter(
    (expense) =>
      new Date(expense.createdAt).getMonth() === currentMonth &&
      new Date(expense.createdAt).getFullYear() === currentYear,
  );

  return (
    <Paper className={styles.root}>
      <Typography variant="h3" align="center">
        {t('Spent this month:')}
      </Typography>
      <Stack align="center" direction="row" gap={2} justify="center">
        <Typography variant="h3">{calculateTotalAmount(filteredExpenses, currency)}</Typography>
        <FormControl>
          <Select
            options={currencies as TOption[]}
            value={currency}
            onChange={(value) => setCurrency(value as CURRENCIES)}
            style={{ fontSize: isBigScreen ? '2rem' : '1.5rem' }}
            data-test
          />
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default SpentThisMonth;
