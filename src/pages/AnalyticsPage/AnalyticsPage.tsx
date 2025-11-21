import { useEffect, useMemo, useState } from 'react';
import type { CalendarProps } from 'react-calendar';
import { endOfMonth, isSameDay, startOfMonth, subDays, subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Box, Stack } from 'src/shared/ui-kit';
import { currencies } from 'src/shared/constants/currencies.ts';
import { TExpenseAnalyticsAiInsight, getExpenseAnalytics } from 'src/shared/api/expenseAnalyticsApi.ts';
import useExpenseAnalytics from 'src/entities/analytics/hooks/useExpenseAnalytics.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import handleError from 'src/utils/errorHandler.ts';
import getCurrencyLabel from 'src/utils/helpers/getCurrencyLabel.ts';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback';

import AnalyticsHero from './components/AnalyticsHero';
import AiInsightsCard from './components/AiInsightsCard';
import AppliedFiltersPanel from './components/AppliedFiltersPanel';
import BreakdownSection from './components/BreakdownSection';
import EmptyStateCard from './components/EmptyStateCard';
import FiltersAccordion from './components/FiltersAccordion';
import SummarySection from './components/SummarySection';
import TrendSection from './components/TrendSection';
import { ANALYTICS_FILTERS_STORAGE_KEY } from './constants';
import useTypingEffect from './hooks/useTypingEffect';
import type { AnalyticsFormState, MultiSelectOption, QuickRangeKey } from './types';
import { formStateToQuery, formatDateForInput, formatFriendlyDate, parseInputDate } from './utils';

const AnalyticsPage = () => {
  const { t, i18n } = useTranslation('analyticsPage');

  useLoadCategories(true);
  useLoadPaymentSources(true);

  const categories = useCategoryStore.use.userCategories();
  const paymentSources = usePaymentSourcesStore.use.userPaymentSources();

  const defaultFormState = useMemo<AnalyticsFormState>(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);

    return {
      startDate: formatDateForInput(monthStart),
      endDate: formatDateForInput(today),
      categoryIds: [],
      paymentSourceIds: [],
      currencies: [],
      amountStart: '',
      amountEnd: '',
      searchTerm: '',
      hasComments: false,
      trendGranularity: 'month',
    };
  }, []);

  const [formState, setFormState] = useState<AnalyticsFormState>(defaultFormState);
  const debouncedFormState = useDebouncedValue(formState, 500);
  const analyticsQuery = useMemo(() => formStateToQuery(debouncedFormState, false), [debouncedFormState]);
  const [breakdownSource, setBreakdownSource] = useState<'category' | 'paymentSource'>('category');
  const [breakdownLimit, setBreakdownLimit] = useState<number | 'all'>(10);
  const [aiInsights, setAiInsights] = useState<TExpenseAnalyticsAiInsight | undefined>();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<'start' | 'end' | null>(null);
  const [isAITyping, setIsAITyping] = useState(false);
  const [hasLoadedFilters, setHasLoadedFilters] = useState(false);

  const getQuickRangeDates = useStableCallback((key: QuickRangeKey) => {
    const today = new Date();
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (key === 'thisYear') {
      const start = new Date(normalizedToday.getFullYear(), 0, 1);

      return { start, end: normalizedToday };
    }

    if (key === 'thisMonth') {
      return { start: startOfMonth(normalizedToday), end: normalizedToday };
    }

    if (key === 'lastMonth') {
      const lastMonthDate = subMonths(normalizedToday, 1);

      return { start: startOfMonth(lastMonthDate), end: endOfMonth(lastMonthDate) };
    }

    return { start: subDays(normalizedToday, 89), end: normalizedToday };
  });

  const applyQuickRange = useStableCallback((key: QuickRangeKey) => {
    const range = getQuickRangeDates(key);

    setFormState((prev) => ({
      ...prev,
      startDate: formatDateForInput(range.start),
      endDate: formatDateForInput(range.end),
    }));
  });

  const activeQuickRange = useMemo<QuickRangeKey | undefined>(() => {
    const currentStart = parseInputDate(formState.startDate);
    const currentEnd = parseInputDate(formState.endDate);

    return (['thisYear', 'thisMonth', 'lastMonth', 'last90Days'] as QuickRangeKey[]).find((key) => {
      const range = getQuickRangeDates(key);

      return isSameDay(currentStart, range.start) && isSameDay(currentEnd, range.end);
    });
  }, [formState.endDate, formState.startDate, getQuickRangeDates]);

  const { data, isLoading, isFetching, error } = useExpenseAnalytics(analyticsQuery);
  const isLoadingAnalytics = isLoading || isFetching;

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.summary.totalCount === 0) {
      setAiInsights(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (hasLoadedFilters) {
      return;
    }

    try {
      const stored = localStorage.getItem(ANALYTICS_FILTERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AnalyticsFormState>;

        setFormState((prev) => ({
          ...prev,
          startDate: typeof parsed.startDate === 'string' ? parsed.startDate : prev.startDate,
          endDate: typeof parsed.endDate === 'string' ? parsed.endDate : prev.endDate,
          categoryIds: Array.isArray(parsed.categoryIds) ? parsed.categoryIds : prev.categoryIds,
          paymentSourceIds: Array.isArray(parsed.paymentSourceIds) ? parsed.paymentSourceIds : prev.paymentSourceIds,
          currencies: Array.isArray(parsed.currencies) ? parsed.currencies : prev.currencies,
          amountStart: typeof parsed.amountStart === 'string' ? parsed.amountStart : prev.amountStart,
          amountEnd: typeof parsed.amountEnd === 'string' ? parsed.amountEnd : prev.amountEnd,
          searchTerm: typeof parsed.searchTerm === 'string' ? parsed.searchTerm : prev.searchTerm,
          hasComments: typeof parsed.hasComments === 'boolean' ? parsed.hasComments : prev.hasComments,
          trendGranularity:
            parsed.trendGranularity && ['day', 'week', 'month', 'year'].includes(parsed.trendGranularity)
              ? parsed.trendGranularity
              : prev.trendGranularity,
        }));
      }
    } catch (loadError) {
      console.warn('Failed to load analytics filters from storage', loadError);
    } finally {
      setHasLoadedFilters(true);
    }
  }, [hasLoadedFilters]);

  useEffect(() => {
    if (!hasLoadedFilters) {
      return;
    }

    localStorage.setItem(ANALYTICS_FILTERS_STORAGE_KEY, JSON.stringify(debouncedFormState));
  }, [debouncedFormState, hasLoadedFilters]);

  useEffect(() => {
    setAiInsights(undefined);
    setIsAITyping(false);
  }, [debouncedFormState]);

  const onFieldChange = useStableCallback((field: keyof AnalyticsFormState, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  });

  const handleReset = useStableCallback(() => {
    setFormState(defaultFormState);
    setBreakdownSource('category');
    setBreakdownLimit(10);
    setAiInsights(undefined);
  });

  const hasData = data && data.summary.totalCount > 0;
  const summaryCurrency = data?.summary.currency ?? 'EUR';

  const handleRequestAi = useStableCallback(async () => {
    if (!data || data.summary.totalCount === 0) {
      return;
    }

    setIsAiLoading(true);
    setIsAITyping(true);
    setAiInsights(undefined);
    try {
      const response = await getExpenseAnalytics({ ...analyticsQuery, includeAiAnalysis: true });
      setAiInsights(response.aiInsights ?? undefined);
      if (!response.aiInsights) {
        setIsAITyping(false);
      }
    } catch (aiError) {
      handleError(aiError);
      setIsAITyping(false);
    } finally {
      setIsAiLoading(false);
    }
  });

  const handleCalendarSelect = useStableCallback<Parameters<NonNullable<CalendarProps['onChange']>>, void>(
    (selectedValue) => {
      if (!activeCalendar) {
        return;
      }

      const selectedDate = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;

      if (!selectedDate) {
        return;
      }

      const iso = formatDateForInput(selectedDate);
      onFieldChange(activeCalendar === 'start' ? 'startDate' : 'endDate', iso);
      setActiveCalendar(null);
    },
  );

  const formatFriendlyDateValue = useStableCallback((value: string) => formatFriendlyDate(value, i18n.language));

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (formState.categoryIds.length) count += 1;
    if (formState.paymentSourceIds.length) count += 1;
    if (formState.currencies.length) count += 1;
    if (formState.amountStart) count += 1;
    if (formState.amountEnd) count += 1;
    if (formState.searchTerm.trim()) count += 1;
    if (formState.hasComments) count += 1;

    return count;
  }, [
    formState.amountEnd,
    formState.amountStart,
    formState.categoryIds.length,
    formState.currencies.length,
    formState.hasComments,
    formState.paymentSourceIds.length,
    formState.searchTerm,
  ]);

  const filterSummaryLabel =
    activeFiltersCount > 0 ? t('filters.summary', { count: activeFiltersCount }) : t('filters.summaryNone');
  const dateSummaryLabel = t('filters.summaryDates', {
    start: formatFriendlyDateValue(formState.startDate),
    end: formatFriendlyDateValue(formState.endDate),
  });
  const filtersSummaryText = `${filterSummaryLabel} · ${dateSummaryLabel}`;
  const startDateLabel = formatFriendlyDateValue(formState.startDate);
  const endDateLabel = formatFriendlyDateValue(formState.endDate);
  const calendarInitialDate = useMemo(() => {
    if (activeCalendar === 'start') {
      return parseInputDate(formState.startDate);
    }

    if (activeCalendar === 'end') {
      return parseInputDate(formState.endDate);
    }

    return new Date();
  }, [activeCalendar, formState.endDate, formState.startDate]);

  const appliedFilterChips = useMemo(() => {
    if (!data?.appliedFilters) {
      return [];
    }

    const chips: string[] = [];
    const filters = data.appliedFilters;

    if (filters.createdStartDate || filters.createdEndDate) {
      const startLabel = filters.createdStartDate
        ? new Date(filters.createdStartDate).toLocaleDateString(i18n.language)
        : 'N/A';
      const endLabel = filters.createdEndDate
        ? new Date(filters.createdEndDate).toLocaleDateString(i18n.language)
        : 'N/A';

      chips.push(`${t('filters.dateRange')}: ${startLabel} -> ${endLabel}`);
    }

    if (filters.categoryIds?.length) {
      const titles = filters.categoryIds
        .map((id) => categories?.find((category) => category._id === id)?.title)
        .filter(Boolean)
        .join(', ');

      chips.push(`${t('filters.categories')}: ${titles}`);
    }

    if (filters.paymentSourceIds?.length) {
      const titles = filters.paymentSourceIds
        .map((id) => paymentSources?.find((source) => source._id === id)?.title)
        .filter(Boolean)
        .join(', ');

      chips.push(`${t('filters.paymentSources')}: ${titles}`);
    }

    if (filters.currencies?.length) {
      const currencyLabels = filters.currencies.map((cur) => `${cur} ${getCurrencyLabel(cur)}`).join(', ');

      chips.push(`${t('filters.currencies')}: ${currencyLabels}`);
    }

    if (typeof filters.amountStart === 'number') {
      chips.push(`${t('filters.amountFrom')}: ${filters.amountStart}`);
    }

    if (typeof filters.amountEnd === 'number') {
      chips.push(`${t('filters.amountTo')}: ${filters.amountEnd}`);
    }

    if (filters.searchTerm) {
      chips.push(`${t('filters.search')}: "${filters.searchTerm}"`);
    }

    if (filters.hasComments) {
      chips.push(t('filters.hasComments'));
    }

    if (filters.trendGranularity) {
      chips.push(`${t('filters.granularity')}: ${t(`filters.granularityOptions.${filters.trendGranularity}`)}`);
    }

    if (aiInsights || isAiLoading) {
      chips.push(t('filters.includeAi'));
    }

    return chips.filter(Boolean);
  }, [aiInsights, categories, data?.appliedFilters, i18n.language, isAiLoading, paymentSources, t]);

  const categoryOptions: MultiSelectOption[] = useMemo(
    () => categories?.map((category) => ({ value: category._id, label: category.title })) ?? [],
    [categories],
  );

  const paymentSourceOptions: MultiSelectOption[] = useMemo(
    () => paymentSources?.map((source) => ({ value: source._id, label: source.title })) ?? [],
    [paymentSources],
  );

  const currencyOptions: MultiSelectOption[] = useMemo(
    () =>
      currencies.map((item) => ({
        value: item.value,
        label: `${item.value} ${item.label}`,
      })),
    [],
  );

  const handleTypingComplete = useStableCallback(() => setIsAITyping(false));
  const aiText = useTypingEffect(aiInsights?.summary ?? null, !isAiLoading && isAITyping, {
    onComplete: handleTypingComplete,
  });

  useEffect(() => {
    if (!isAiLoading && aiInsights) {
      setIsAITyping(false);
    }
  }, [aiInsights, isAiLoading]);

  const dateRangeLabel = t('filters.summaryDates', {
    start: formatFriendlyDateValue(formState.startDate),
    end: formatFriendlyDateValue(formState.endDate),
  });

  return (
    <Box sx={{ height: '100%', overflowY: 'auto', padding: '16px 0 32px' }}>
      <Stack gap={3} sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 32px' }}>
        <AnalyticsHero
          title={t('title')}
          heading={t('intro.heading')}
          description={t('intro.description')}
          loadingLabel={t('loading')}
          isLoading={isLoadingAnalytics}
        />

        <FiltersAccordion
          formState={formState}
          categoryOptions={categoryOptions}
          paymentSourceOptions={paymentSourceOptions}
          currencyOptions={currencyOptions}
          onFieldChange={onFieldChange}
          isLoading={isLoadingAnalytics}
          filtersSummaryText={filtersSummaryText}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          activeQuickRange={activeQuickRange}
          onQuickRangeSelect={applyQuickRange}
          onReset={handleReset}
          activeCalendar={activeCalendar}
          onCalendarToggle={(value) => setActiveCalendar(value)}
          onCalendarClose={() => setActiveCalendar(null)}
          calendarInitialDate={calendarInitialDate}
          onCalendarSelect={handleCalendarSelect}
        />

        {data && <AppliedFiltersPanel chips={appliedFilterChips} />}

        {hasData ? (
          <Stack gap={3}>
            {data && <SummarySection summary={data.summary} />}
            <BreakdownSection
              breakdownSource={breakdownSource}
              breakdownLimit={breakdownLimit}
              onBreakdownSourceChange={setBreakdownSource}
              onBreakdownLimitChange={setBreakdownLimit}
              summaryCurrency={summaryCurrency}
              byCategory={data?.byCategory}
              byPaymentSource={data?.byPaymentSource}
            />
            <TrendSection trend={data.trend} dateRangeLabel={dateRangeLabel} summaryCurrency={summaryCurrency} />
            <AiInsightsCard
              aiInsights={aiInsights}
              aiText={aiText}
              isAiLoading={isAiLoading}
              isTyping={isAITyping}
              onRequestAi={handleRequestAi}
              isAnalyticsLoading={isLoadingAnalytics}
            />
          </Stack>
        ) : (
          data && !isLoadingAnalytics && <EmptyStateCard />
        )}
      </Stack>
    </Box>
  );
};

export default AnalyticsPage;
