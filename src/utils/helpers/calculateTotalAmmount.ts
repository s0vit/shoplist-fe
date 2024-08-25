import { TExpense } from 'src/shared/api/expenseApi';
import { CURRENCIES } from 'src/shared/constants/currencies';

const calculateTotalAmount = (expenses: TExpense[], currency: CURRENCIES) => {
  return expenses
    .reduce((total, expense) => {
      const ratedAmount = expense.amount * expense.exchangeRates[currency];

      return total + +ratedAmount.toFixed(2);
    }, 0)
    .toFixed(2);
};

export default calculateTotalAmount;
