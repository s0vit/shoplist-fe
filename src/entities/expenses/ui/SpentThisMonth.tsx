import { FormControl, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { CURRENCIES, currencies } from 'src/shared/constants/currencies';
import calculateTotalAmount from 'src/utils/helpers/calculateTotalAmmount';

const SpentThisMonth = () => {
  const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.EUR);
  const { userExpenses } = useLoadExpenses({ shouldFetchOnLoad: true });

  return (
    <Paper>
      <Typography variant="h6" textAlign="center">
        Spent this month:
      </Typography>
      <Stack textAlign="center" direction="row" spacing={2} justifyContent="center">
        <Typography variant="h3" color="primary">
          {calculateTotalAmount(userExpenses, currency)}
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
