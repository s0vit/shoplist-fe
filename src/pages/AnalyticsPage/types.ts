import type { CURRENCIES } from 'src/shared/constants/currencies.ts';
import type { TTrendGranularity } from 'src/shared/api/expenseAnalyticsApi.ts';

export type AnalyticsFormState = {
  startDate: string;
  endDate: string;
  categoryIds: string[];
  paymentSourceIds: string[];
  currencies: CURRENCIES[];
  amountStart: string;
  amountEnd: string;
  searchTerm: string;
  hasComments: boolean;
  trendGranularity: TTrendGranularity;
};

export type MultiSelectOption = {
  value: string;
  label: string;
};

export type QuickRangeKey = 'thisYear' | 'thisMonth' | 'lastMonth' | 'last90Days';
