import { faker } from '@faker-js/faker';
import { CURRENCIES } from 'src/shared/constants/currencies.ts';
import { TExpense } from 'src/shared/api/expenseApi.ts';

// keep the seed constant to have the same results on each run
faker.seed(12345);

class ExpenseFactory {
  private static generateExchangeRates(baseCurrency: CURRENCIES): Record<CURRENCIES, number> {
    const rates: Record<CURRENCIES, number> = {} as Record<CURRENCIES, number>;
    Object.values(CURRENCIES).forEach((currency) => {
      if (currency === baseCurrency) {
        rates[currency] = 1;
      } else {
        rates[currency] = parseFloat(faker.finance.amount({ min: 0.5, max: 1.5 }));
      }
    });

    return rates;
  }

  public static generateExpense(): TExpense {
    const currency = faker.helpers.arrayElement(Object.values(CURRENCIES));

    return {
      _id: faker.string.uuid(),
      userId: faker.string.uuid(),
      amount: parseFloat(faker.finance.amount({ min: 5, max: 10 })),
      categoryId: faker.string.uuid(),
      paymentSourceId: faker.string.uuid(),
      comments: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      currency: currency,
      exchangeRates: this.generateExchangeRates(currency),
    };
  }

  public static generateExpenses(count: number): TExpense[] {
    const expenses: TExpense[] = [];

    for (let i = 0; i < count; i++) {
      expenses.push(this.generateExpense());
    }

    return expenses;
  }
}

export default ExpenseFactory;
