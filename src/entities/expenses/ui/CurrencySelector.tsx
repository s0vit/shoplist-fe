import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { currencies } from 'src/shared/constants/currencies';
import { CURRENCIES } from 'src/shared/constants/currencies';
import { Select, type TOption } from 'src/shared/ui-kit';

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
      data-test
    />
  );
};

export default CurrencySelector;
