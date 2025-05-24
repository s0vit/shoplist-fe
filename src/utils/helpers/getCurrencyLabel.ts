import { CURRENCIES, currencies } from 'src/shared/constants/currencies.ts';

const getCurrencyLabel = (symbol: CURRENCIES) => currencies.find((currency) => currency.value === symbol)?.label || '';

export default getCurrencyLabel;
