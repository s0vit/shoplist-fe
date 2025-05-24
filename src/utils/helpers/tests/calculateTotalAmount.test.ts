import { describe, expect, it } from 'vitest';
import { CURRENCIES } from 'src/shared/constants/currencies.ts';
import calculateTotalAmount from 'src/utils/helpers/calculateTotalAmmount.ts';
import ExpenseFactory from 'src/utils/testFactories/expensesFactory.ts';

describe('calculateTotalAmount', () => {
  const expenses = ExpenseFactory.generateExpenses(5);

  it('should return total amount in BGN if expenses provided', () => {
    expect(calculateTotalAmount(expenses, CURRENCIES.BGN)).toBe('33.74');
  });
  it('should return zero if no expenses provided', () => {
    expect(calculateTotalAmount([], CURRENCIES.BGN)).toBe('0.00');
  });
  it('should return same amount if only one expense provided and currency is same as in expense', () => {
    expect(calculateTotalAmount([expenses[0]], expenses[0].currency)).toBe(expenses[0].amount.toString());
  });
});
