import { currencies } from 'src/shared/constants/currencies.ts';

const getCurrencyLabel = (symbol: string) => currencies.find((currency) => currency.value === symbol)?.label || '';

export default getCurrencyLabel;
