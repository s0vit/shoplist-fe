import Select, { TOption } from 'src/shared/ui-kit/Select';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { currencies } from 'src/shared/constants/currencies';
import { CURRENCIES } from 'src/shared/constants/currencies';

const CurrencySelector = () => {
  const selectedCurrency = useExpensesStore.use.selectedCurrency();
  const setSelectedCurrency = useExpensesStore.use.setSelectedCurrency();

  const handleChange = (value: string) => {
    setSelectedCurrency(value as CURRENCIES);
  };

  return (
    <Select
      options={
        currencies.map((currency) => ({ ...currency, label: `${currency.label} (${currency.value})` })) as TOption[]
      }
      value={selectedCurrency}
      onChange={handleChange}
      data-testid="currency-selector"
    />
  );
};

export default CurrencySelector;
