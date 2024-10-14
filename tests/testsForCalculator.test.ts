import { expect, test } from "@playwright/test";
import calculateTotalAmount from "../src/utils/helpers/calculateTotalAmmount";

  test('returns 0 when given an empty expenses array', () => {
    expect(calculateTotalAmount([], 'USD')).toBe('0.00');
  });
