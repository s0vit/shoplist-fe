import { apiInstance } from 'src/shared/api/rootApi.ts';
import { CURRENCIES } from 'src/shared/constants/currencies.ts';

export type TTrendGranularity = 'day' | 'week' | 'month' | 'year';

export type TExpenseAnalyticsQuery = {
  createdStartDate?: Date;
  createdEndDate?: Date;
  categoryIds?: string[];
  paymentSourceIds?: string[];
  currencies?: CURRENCIES[];
  amountStart?: number;
  amountEnd?: number;
  searchTerm?: string;
  hasComments?: boolean;
  trendGranularity?: TTrendGranularity;
  includeAiAnalysis?: boolean;
};

export type TExpenseAnalyticsSummary = {
  currency: CURRENCIES | string;
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
  minAmount: number;
  maxAmount: number;
};

export type TExpenseAnalyticsBreakdownItem = {
  id: string;
  name?: string;
  totalAmount: number;
  percentage: number;
  count: number;
};

export type TExpenseAnalyticsTrendPoint = {
  period: string;
  totalAmount: number;
  averageAmount: number;
  count: number;
};

export type TExpenseAnalyticsAppliedFilters = Partial<{
  createdStartDate: string;
  createdEndDate: string;
  categoryIds: string[];
  paymentSourceIds: string[];
  currencies: CURRENCIES[];
  amountStart: number;
  amountEnd: number;
  searchTerm: string;
  hasComments: boolean;
  trendGranularity: TTrendGranularity;
  includeAiAnalysis: boolean;
}>;

export type TExpenseAnalyticsAiInsight = {
  summary: string;
  generatedAt: string;
  model: string;
};

export type TExpenseAnalyticsResponse = {
  summary: TExpenseAnalyticsSummary;
  byCategory: TExpenseAnalyticsBreakdownItem[];
  byPaymentSource: TExpenseAnalyticsBreakdownItem[];
  trend: TExpenseAnalyticsTrendPoint[];
  appliedFilters: TExpenseAnalyticsAppliedFilters;
  aiInsights?: TExpenseAnalyticsAiInsight;
};

export const getExpenseAnalytics = async (query: TExpenseAnalyticsQuery): Promise<TExpenseAnalyticsResponse> => {
  const params = new URLSearchParams();

  const pushParam = (key: string, value?: string | number | boolean) => {
    if (value === undefined || value === null) {
      return;
    }

    params.set(key, String(value));
  };

  if (query.createdStartDate) {
    pushParam('createdStartDate', query.createdStartDate.toISOString());
  }

  if (query.createdEndDate) {
    pushParam('createdEndDate', query.createdEndDate.toISOString());
  }

  if (query.categoryIds?.length) {
    pushParam('categoryIds', query.categoryIds.join(','));
  }

  if (query.paymentSourceIds?.length) {
    pushParam('paymentSourceIds', query.paymentSourceIds.join(','));
  }

  if (query.currencies?.length) {
    pushParam('currencies', query.currencies.join(','));
  }

  pushParam('amountStart', query.amountStart);
  pushParam('amountEnd', query.amountEnd);
  pushParam('searchTerm', query.searchTerm?.trim());

  if (typeof query.hasComments === 'boolean') {
    pushParam('hasComments', query.hasComments);
  }

  if (query.trendGranularity) {
    pushParam('trendGranularity', query.trendGranularity);
  }

  if (typeof query.includeAiAnalysis === 'boolean') {
    pushParam('includeAiAnalysis', query.includeAiAnalysis);
  }

  const url = `expense/analytics${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await apiInstance.get<TExpenseAnalyticsResponse>(url);

  return response.data;
};
