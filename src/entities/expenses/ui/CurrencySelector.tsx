import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { currencies } from 'src/shared/constants/currencies';
import { CURRENCIES } from 'src/shared/constants/currencies';

const CurrencySelector = () => {
  const selectedCurrency = useExpensesStore.use.selectedCurrency();
  const setSelectedCurrency = useExpensesStore.use.setSelectedCurrency();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value as CURRENCIES);
  };

  return (
    <Select value={selectedCurrency} onChange={handleChange} size="small">
      {currencies.map((currency) => (
        <MenuItem key={currency.value} value={currency.value}>
          {currency.label} ({currency.value})
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
