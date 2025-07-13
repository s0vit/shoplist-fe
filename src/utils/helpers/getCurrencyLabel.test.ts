import { describe, it, expect } from 'vitest';
import getCurrencyLabel from 'src/utils/helpers/getCurrencyLabel.ts';
import { CURRENCIES } from 'src/shared/constants/currencies.ts';

describe('getCurrencyLabel', () => {
  it('возвращает символ для USD', () => {
    expect(getCurrencyLabel(CURRENCIES.USD)).toBe('$');
  });

  it('возвращает пустую строку', () => {
    expect(getCurrencyLabel('LDS' as CURRENCIES)).toBe('');
  });
});
