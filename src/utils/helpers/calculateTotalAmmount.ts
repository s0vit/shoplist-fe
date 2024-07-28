import { TExpense } from 'src/shared/api/expenseApi';
import { CURRENCIES } from 'src/shared/constants/currencies';

const calculateTotalAmount = (expenses: TExpense[], currency: CURRENCIES) => {
  return expenses
    .reduce((total, expense) => {
      const ratedAmmount = expense.amount * expense.exchangeRates[currency];

      return total + +ratedAmmount.toFixed(2);
    }, 0)
    .toFixed(2);
};

export default calculateTotalAmount;
