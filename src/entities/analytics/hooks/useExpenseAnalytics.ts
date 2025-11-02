import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  TExpenseAnalyticsQuery,
  TExpenseAnalyticsResponse,
  getExpenseAnalytics,
} from 'src/shared/api/expenseAnalyticsApi.ts';

type UseExpenseAnalyticsOptions = Omit<
  UseQueryOptions<TExpenseAnalyticsResponse, Error, TExpenseAnalyticsResponse>,
  'queryKey' | 'queryFn'
>;

const normalizeQuery = (query: TExpenseAnalyticsQuery) => {
  return {
    ...query,
    createdStartDate: query.createdStartDate?.toISOString(),
    createdEndDate: query.createdEndDate?.toISOString(),
    categoryIds: query.categoryIds ?? [],
    paymentSourceIds: query.paymentSourceIds ?? [],
    currencies: query.currencies ?? [],
    includeAiAnalysis: query.includeAiAnalysis ?? false,
  };
};

const useExpenseAnalytics = (query: TExpenseAnalyticsQuery, options?: UseExpenseAnalyticsOptions) => {
  const normalizedQuery = useMemo(() => normalizeQuery(query), [query]);

  return useQuery({
    queryKey: ['expense-analytics', normalizedQuery],
    queryFn: () => getExpenseAnalytics(query),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

export default useExpenseAnalytics;
