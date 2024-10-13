import { FormControl, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { CURRENCIES, currencies } from 'src/shared/constants/currencies';
import calculateTotalAmount from 'src/utils/helpers/calculateTotalAmmount';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

const SpentThisMonth = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const defaultCurrency = useUserSettingsStore.use.config().currency;
  const [currency, setCurrency] = useState<CURRENCIES>(defaultCurrency ?? CURRENCIES.EUR);
  const { userExpenses } = useLoadExpenses({ shouldFetchOnLoad: isVerified });
  const { t } = useTranslation('homePage');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const filteredExpenses = userExpenses.filter(
    (expense) =>
      new Date(expense.createdAt).getMonth() === currentMonth &&
      new Date(expense.createdAt).getFullYear() === currentYear,
  );

  return (
    <Paper>
      <Typography variant="h6" textAlign="center">
        {t('Spent this month:')}
      </Typography>
      <Stack textAlign="center" direction="row" spacing={2} justifyContent="center">
        <Typography variant="h3" color="primary">
          {calculateTotalAmount(filteredExpenses, currency)}
        </Typography>
        <FormControl>
          <Select
            autoWidth
            sx={{ fontSize: '2rem' }}
            variant="standard"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CURRENCIES)}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default SpentThisMonth;
