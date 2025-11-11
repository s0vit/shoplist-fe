import { format } from 'date-fns';

import type { TExpenseAnalyticsQuery } from 'src/shared/api/expenseAnalyticsApi.ts';

import type { AnalyticsFormState } from './types';

export const formStateToQuery = (form: AnalyticsFormState, includeAi: boolean): TExpenseAnalyticsQuery => ({
  createdStartDate: form.startDate ? new Date(form.startDate) : undefined,
  createdEndDate: form.endDate ? new Date(form.endDate) : undefined,
  categoryIds: form.categoryIds.length ? form.categoryIds : undefined,
  paymentSourceIds: form.paymentSourceIds.length ? form.paymentSourceIds : undefined,
  currencies: form.currencies.length ? form.currencies : undefined,
  amountStart: form.amountStart !== '' ? Number(form.amountStart) : undefined,
  amountEnd: form.amountEnd !== '' ? Number(form.amountEnd) : undefined,
  searchTerm: form.searchTerm.trim() || undefined,
  hasComments: form.hasComments || undefined,
  includeAiAnalysis: includeAi ? true : undefined,
  trendGranularity: form.trendGranularity,
});

export const formatCurrencyValue = (value: number, currency: string) => {
  if (Number.isNaN(value)) {
    return 'N/A';
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`;
  }
};

export const formatCompactCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${currency}`;
  }
};

export const parseInputDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
};

export const formatDateForInput = (date: Date) => format(date, 'yyyy-MM-dd');

export const formatFriendlyDate = (value: string, locale: string) => {
  if (!value) {
    return '-';
  }

  try {
    return parseInputDate(value).toLocaleDateString(locale);
  } catch {
    return value;
  }
};
