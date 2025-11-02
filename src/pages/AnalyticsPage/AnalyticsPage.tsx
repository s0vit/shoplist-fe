import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  ComposedChart,
  Bar,
} from 'recharts';
import type { LegendPayload } from 'recharts';
import styled from 'styled-components';
import styles from './AnalyticsPage.module.scss';
import { endOfMonth, format, isSameDay, startOfMonth, subDays, subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import {
  Box,
  Stack,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  ButtonGroup,
  TextField,
  Toggle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  CircularProgress,
  Calendar,
  Modal,
} from 'src/shared/ui-kit';
import type { CalendarProps } from 'react-calendar';
import { currencies, CURRENCIES } from 'src/shared/constants/currencies.ts';
import {
  TExpenseAnalyticsAiInsight,
  TExpenseAnalyticsBreakdownItem,
  TExpenseAnalyticsQuery,
  TTrendGranularity,
  getExpenseAnalytics,
} from 'src/shared/api/expenseAnalyticsApi.ts';
import useExpenseAnalytics from 'src/entities/analytics/hooks/useExpenseAnalytics.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import handleError from 'src/utils/errorHandler.ts';
import getCurrencyLabel from 'src/utils/helpers/getCurrencyLabel.ts';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback';

const ANALYTICS_FILTERS_STORAGE_KEY = 'analyticsFilters';

type AnalyticsFormState = {
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

type MultiSelectOption = {
  value: string;
  label: string;
};

const CHART_COLORS = [
  '#4D7CFE',
  '#06D6A0',
  '#EF476F',
  '#FFD166',
  '#8338EC',
  '#118AB2',
  '#F72585',
  '#00BFA6',
  '#F8961E',
  '#577590',
  '#FF8A5B',
  '#7F5AF0',
  '#8AC926',
  '#FF6B6B',
  '#3A86FF',
];

const MultiSelectContainer = styled.div`
  position: relative;
`;

const MultiSelectButton = styled.button`
  width: 100%;
  min-height: 36px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-input-border, transparent);
  background-color: var(--color-input-bg);
  color: var(--color-input-text);
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-body2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const MultiSelectDropdown = styled.ul<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  padding: 8px 0;
  margin: 0;
  list-style: none;
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  z-index: 5;
  overflow-y: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.16s ease;
`;

const MultiSelectOptionRow = styled.li`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-input-hover-bg, rgba(0, 0, 0, 0.06));
  }

  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  span {
    flex: 1;
    font-size: var(--font-size-body2);
  }
`;

const HeroCard = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AppliedFiltersWrapper = styled(Paper)`
  padding: 16px;
`;

const SummaryChartCard = styled(Paper)`
  padding: 16px;
`;

const BreakdownTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-family: var(--font-family);
  font-size: var(--font-size-body2);
`;

const BreakdownHeadCell = styled.th`
  text-align: left;
  padding: 8px;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
  border-bottom: 1px solid var(--color-divider, rgba(0, 0, 0, 0.1));
  background-color: var(--color-card-bg);
`;

const BreakdownCell = styled.td`
  padding: 10px 8px;
  border-bottom: 1px solid var(--color-divider, rgba(0, 0, 0, 0.08));
  vertical-align: middle;
  color: var(--color-text-primary);
`;

const BreakdownRow = styled.tr`
  &:nth-child(odd) {
    background-color: var(--color-table-row-odd, rgba(255, 255, 255, 0.03));
  }

  &:nth-child(even) {
    background-color: var(--color-table-row-even, rgba(255, 255, 255, 0));
  }

  &:hover {
    background-color: var(--color-input-hover-bg, rgba(0, 0, 0, 0.04));
  }
`;

const TrendCard = styled(Paper)`
  padding: 16px 16px 56px;
  height: 360px;
`;

const AiCard = styled(Paper)`
  padding: 16px;
  white-space: pre-wrap;
`;

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ul,
  ol {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  strong {
    font-weight: var(--font-weight-bold);
  }
`;

const MultiSelectField = ({
  label,
  placeholder,
  options,
  values,
  onChange,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const toggleValue = useStableCallback((value: string) => {
    if (disabled) {
      return;
    }

    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value));
    } else {
      onChange([...values, value]);
    }
  });

  const summaryLabel =
    values.length === 0
      ? placeholder
      : values.map((value) => options.find((option) => option.value === value)?.label || value).join(', ');

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="body2" weight="bold">
        {label}
      </Typography>
      <MultiSelectContainer>
        <MultiSelectButton
          type="button"
          onClick={() => {
            if (disabled) return;
            setOpen((prev) => !prev);
          }}
          aria-label={label}
          disabled={disabled}
        >
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {summaryLabel || placeholder}
          </span>
          <span aria-hidden="true">{open ? '^' : 'v'}</span>
        </MultiSelectButton>
        <MultiSelectDropdown $open={open}>
          {options.map((option) => (
            <MultiSelectOptionRow
              key={option.value}
              onClick={() => {
                if (disabled) return;
                toggleValue(option.value);
              }}
              style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              <input
                type="checkbox"
                checked={values.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                onClick={(event) => event.stopPropagation()}
                disabled={disabled}
              />
              <span>{option.label}</span>
            </MultiSelectOptionRow>
          ))}
        </MultiSelectDropdown>
      </MultiSelectContainer>
      {values.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap="8px" sx={{ marginTop: '4px' }}>
          {values.map((value) => {
            const label = options.find((option) => option.value === value)?.label || value;

            return (
              <Chip
                key={value}
                label={label}
                onClick={disabled ? undefined : () => toggleValue(value)}
                variant="outlined"
                color="primary"
                style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
              />
            );
          })}
        </Box>
      )}
    </div>
  );
};

const DateFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DateButton = styled.button`
  width: 100%;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-input-border, transparent);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-body1);

  &:hover {
    background-color: var(--color-input-hover-bg, rgba(0, 0, 0, 0.05));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CalendarPopover = styled.div`
  background: var(--color-card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--color-card-shadow);
  padding: 16px;
`;

const formStateToQuery = (form: AnalyticsFormState, includeAi: boolean): TExpenseAnalyticsQuery => ({
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

const formatCurrencyValue = (value: number, currency: string) => {
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

const formatCompactCurrency = (value: number, currency: string) => {
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

const parseInputDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
};

const formatDateForInput = (date: Date) => format(date, 'yyyy-MM-dd');

const markdownComponents: Components = {
  p({ children }) {
    return (
      <Typography variant="body1" style={{ marginBottom: '8px' }}>
        {children}
      </Typography>
    );
  },
  ul({ children }) {
    return <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>{children}</ul>;
  },
  ol({ children }) {
    return <ol style={{ margin: '0 0 8px', paddingLeft: '20px' }}>{children}</ol>;
  },
  li({ children }) {
    return (
      <li style={{ marginBottom: '4px' }}>
        <Typography variant="body1">{children}</Typography>
      </li>
    );
  },
  h2({ children }) {
    return (
      <Typography variant="h3" weight="bold" style={{ margin: '12px 0 4px' }}>
        {children}
      </Typography>
    );
  },
  h3({ children }) {
    return (
      <Typography variant="body1" weight="bold" style={{ margin: '12px 0 4px' }}>
        {children}
      </Typography>
    );
  },
  strong({ children }) {
    return <strong>{children}</strong>;
  },
  em({ children }) {
    return <em>{children}</em>;
  },
};

type TTypingEffectOptions = {
  speed?: number;
  onComplete?: () => void;
};

const useTypingEffect = (text: string | null, isActive: boolean, options: TTypingEffectOptions = {}) => {
  const { speed = 20, onComplete } = options;
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const textRef = useRef(text ?? '');

  useEffect(() => {
    const nextText = text ?? '';
    textRef.current = nextText;
    indexRef.current = 0;

    if (!isActive) {
      setDisplayed(nextText);
    } else {
      setDisplayed('');
    }
  }, [text, isActive]);

  useEffect(() => {
    const currentText = textRef.current;

    if (!isActive) {
      if (currentText) {
        setDisplayed(currentText);
      }

      return;
    }

    if (!currentText) {
      setDisplayed('');
      onComplete?.();

      return;
    }

    const interval = setInterval(() => {
      indexRef.current += 1;

      if (indexRef.current >= currentText.length) {
        setDisplayed(currentText);
        clearInterval(interval);
        onComplete?.();

        return;
      }

      setDisplayed(currentText.slice(0, indexRef.current));
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, speed, onComplete]);

  return displayed;
};

type QuickRangeKey = 'thisYear' | 'thisMonth' | 'lastMonth' | 'last90Days';

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
      startDate: format(monthStart, 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
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
    } catch (error) {
      console.warn('Failed to load analytics filters from storage', error);
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
  const summaryCurrency = data?.summary.currency ?? 'USD';

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

  const formatFriendlyDate = useStableCallback((value: string) => {
    if (!value) {
      return '-';
    }

    try {
      return parseInputDate(value).toLocaleDateString(i18n.language);
    } catch {
      return value;
    }
  });

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
    start: formatFriendlyDate(formState.startDate),
    end: formatFriendlyDate(formState.endDate),
  });
  const filtersSummaryText = `${filterSummaryLabel} · ${dateSummaryLabel}`;
  const startDateLabel = formatFriendlyDate(formState.startDate);
  const endDateLabel = formatFriendlyDate(formState.endDate);
  const calendarInitialDate = useMemo(() => {
    if (activeCalendar === 'start') {
      return parseInputDate(formState.startDate);
    }

    if (activeCalendar === 'end') {
      return parseInputDate(formState.endDate);
    }

    return new Date();
  }, [activeCalendar, formState.endDate, formState.startDate]);

  const summaryChartData = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        label: t('summary.totalLabel'),
        amountValue: data.summary.totalAmount,
        countValue: data.summary.totalCount,
      },
      {
        label: t('summary.averageLabel'),
        amountValue: data.summary.averageAmount,
      },
      {
        label: t('summary.minLabel'),
        amountValue: data.summary.minAmount,
      },
      {
        label: t('summary.maxLabel'),
        amountValue: data.summary.maxAmount,
      },
    ];
  }, [data, t]);

  const summaryHighlights = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      { label: t('summary.totalAmount'), value: formatCurrencyValue(data.summary.totalAmount, summaryCurrency) },
      { label: t('summary.totalCount'), value: data.summary.totalCount.toLocaleString() },
      { label: t('summary.averageAmount'), value: formatCurrencyValue(data.summary.averageAmount, summaryCurrency) },
      { label: t('summary.minAmount'), value: formatCurrencyValue(data.summary.minAmount, summaryCurrency) },
      { label: t('summary.maxAmount'), value: formatCurrencyValue(data.summary.maxAmount, summaryCurrency) },
    ];
  }, [data, summaryCurrency, t]);

  const summaryLegendFormatter = useStableCallback((value: string, entry: LegendPayload) => {
    let dataKeyValue = entry?.dataKey;

    if (typeof dataKeyValue === 'number') {
      dataKeyValue = String(dataKeyValue);
    }

    const dataKey = (dataKeyValue as string | undefined) ?? value;

    if (dataKey === 'amountValue') {
      return t('summary.totalLabel');
    }

    if (dataKey === 'countValue') {
      return t('summary.countLabel');
    }

    return value;
  });

  const breakdownDataset = useMemo(() => {
    if (!data) {
      return [];
    }

    const sourceArray = breakdownSource === 'category' ? (data.byCategory ?? []) : (data.byPaymentSource ?? []);

    const sorted = [...sourceArray].sort((a, b) => b.totalAmount - a.totalAmount);

    if (breakdownLimit === 'all') {
      return sorted;
    }

    return sorted.slice(0, breakdownLimit);
  }, [breakdownLimit, breakdownSource, data]);

  const breakdownLegendLabel = breakdownSource === 'category' ? t('breakdown.category') : t('breakdown.paymentSource');

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

  return (
    <Box sx={{ height: '100%', overflowY: 'auto', padding: '16px 0 32px' }}>
      <Stack gap={3} sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 32px' }}>
        <HeroCard>
          <Typography variant="body2" color="secondary" weight="bold">
            {t('title')}
          </Typography>
          <Typography variant="h2">{t('intro.heading')}</Typography>
          <Typography variant="body1" color="secondary">
            {t('intro.description')}
          </Typography>
          {isLoadingAnalytics && (
            <Stack direction="row" gap={1} align="center">
              <CircularProgress size={24} />
              <Typography variant="body2" color="secondary">
                {t('loading')}
              </Typography>
            </Stack>
          )}
        </HeroCard>

        <Paper>
          <Accordion>
            <AccordionSummary
              expandIcon={<Icon name="chevronDown" size="md" />}
              style={{ minHeight: '56px', padding: '0 16px' }}
            >
              <Stack gap={0.5}>
                <Typography variant="h3">{t('filters.heading')}</Typography>
                <Typography variant="body2" color="secondary">
                  {filtersSummaryText}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '0 16px 16px' }}>
              <Stack gap={2}>
                <Stack gap={1}>
                  <Typography variant="body2" color="secondary">
                    {t('filters.quickRanges.label')}
                  </Typography>
                  <ButtonGroup joined>
                    {(['thisYear', 'thisMonth', 'lastMonth', 'last90Days'] as QuickRangeKey[]).map((key) => (
                      <Button
                        key={key}
                        label={t(`filters.quickRanges.${key}`)}
                        variant={activeQuickRange === key ? 'contained' : 'outlined'}
                        width="auto"
                        size="small"
                        disabled={isLoadingAnalytics}
                        onClick={() => applyQuickRange(key)}
                      />
                    ))}
                  </ButtonGroup>
                </Stack>

                <Stack direction="row" gap={1.5} flexWrap="wrap">
                  <DateFieldWrapper style={{ minWidth: '220px', flex: '1 1 220px' }}>
                    <Typography variant="body2" weight="bold">
                      {t('filters.startDate')}
                    </Typography>
                    <DateButton disabled={isLoadingAnalytics} onClick={() => setActiveCalendar('start')}>
                      <Stack direction="row" gap={1} align="center">
                        <Icon name="calendar" size="sm" />
                        <Typography variant="body1">{startDateLabel}</Typography>
                      </Stack>
                    </DateButton>
                  </DateFieldWrapper>
                  <DateFieldWrapper style={{ minWidth: '220px', flex: '1 1 220px' }}>
                    <Typography variant="body2" weight="bold">
                      {t('filters.endDate')}
                    </Typography>
                    <DateButton disabled={isLoadingAnalytics} onClick={() => setActiveCalendar('end')}>
                      <Stack direction="row" gap={1} align="center">
                        <Icon name="calendar" size="sm" />
                        <Typography variant="body1">{endDateLabel}</Typography>
                      </Stack>
                    </DateButton>
                  </DateFieldWrapper>
                  <TextField
                    label={t('filters.amountFrom')}
                    type="number"
                    size="small"
                    fullWidth
                    value={formState.amountStart}
                    onChange={(event) => onFieldChange('amountStart', event.target.value)}
                    style={{ minWidth: '220px', flex: '1 1 220px' }}
                    disabled={isLoadingAnalytics}
                  />
                  <TextField
                    label={t('filters.amountTo')}
                    type="number"
                    size="small"
                    fullWidth
                    value={formState.amountEnd}
                    onChange={(event) => onFieldChange('amountEnd', event.target.value)}
                    style={{ minWidth: '220px', flex: '1 1 220px' }}
                    disabled={isLoadingAnalytics}
                  />
                  <TextField
                    label={t('filters.search')}
                    placeholder={t('filters.search')}
                    size="small"
                    fullWidth
                    value={formState.searchTerm}
                    onChange={(event) => onFieldChange('searchTerm', event.target.value)}
                    style={{ minWidth: '220px', flex: '1 1 220px' }}
                    disabled={isLoadingAnalytics}
                  />
                </Stack>

                <Stack direction="row" gap={1.5} flexWrap="wrap">
                  <Box style={{ minWidth: '220px', flex: '1 1 220px' }}>
                    <MultiSelectField
                      label={t('filters.categories')}
                      placeholder={t('filters.categories')}
                      options={categoryOptions}
                      values={formState.categoryIds}
                      onChange={(next) => onFieldChange('categoryIds', next)}
                      disabled={isLoadingAnalytics}
                    />
                  </Box>
                  <Box style={{ minWidth: '220px', flex: '1 1 220px' }}>
                    <MultiSelectField
                      label={t('filters.paymentSources')}
                      placeholder={t('filters.paymentSources')}
                      options={paymentSourceOptions}
                      values={formState.paymentSourceIds}
                      onChange={(next) => onFieldChange('paymentSourceIds', next)}
                      disabled={isLoadingAnalytics}
                    />
                  </Box>
                  <Box style={{ minWidth: '220px', flex: '1 1 220px' }}>
                    <MultiSelectField
                      label={t('filters.currencies')}
                      placeholder={t('filters.currencies')}
                      options={currencyOptions}
                      values={formState.currencies}
                      onChange={(next) => onFieldChange('currencies', next as CURRENCIES[])}
                      disabled={isLoadingAnalytics}
                    />
                  </Box>
                </Stack>

                <Stack direction="row" gap={2} flexWrap="wrap" align="center">
                  <Stack direction="row" gap={1} align="center">
                    <Typography variant="body2">{t('filters.hasComments')}</Typography>
                    <Toggle
                      checked={formState.hasComments}
                      onChange={(checked) => onFieldChange('hasComments', checked)}
                      disabled={isLoadingAnalytics}
                    />
                  </Stack>
                  <Stack direction="row" gap={1} align="center">
                    <Typography variant="body2">{t('filters.granularity')}</Typography>
                    <ButtonGroup joined>
                      {(['day', 'week', 'month', 'year'] as TTrendGranularity[]).map((option) => (
                        <Button
                          key={option}
                          label={t(`filters.granularityOptions.${option}`)}
                          variant={formState.trendGranularity === option ? 'contained' : 'outlined'}
                          size="small"
                          width="auto"
                          disabled={isLoadingAnalytics}
                          onClick={() => onFieldChange('trendGranularity', option)}
                        />
                      ))}
                    </ButtonGroup>
                  </Stack>
                </Stack>

                <Button
                  label={t('filters.reset')}
                  variant="outlined"
                  onClick={handleReset}
                  width="auto"
                  disabled={isLoadingAnalytics}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Modal
          open={activeCalendar !== null}
          onClose={() => setActiveCalendar(null)}
          closeAfterTransition
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <CalendarPopover>
            <Calendar value={calendarInitialDate} onChange={handleCalendarSelect} locale={navigator?.language} />
          </CalendarPopover>
        </Modal>

        {data && (
          <AppliedFiltersWrapper>
            <Typography variant="body2" weight="bold">
              {t('appliedFilters.heading')}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap="8px" sx={{ marginTop: '12px' }}>
              {appliedFilterChips.length > 0 ? (
                appliedFilterChips.map((label) => (
                  <Chip key={label} label={label} variant="outlined" style={{ cursor: 'default' }} />
                ))
              ) : (
                <Typography variant="body2">{t('appliedFilters.none')}</Typography>
              )}
            </Box>
          </AppliedFiltersWrapper>
        )}

        {hasData ? (
          <Stack gap={3}>
            <SummaryChartCard>
              <Stack gap={2}>
                <Stack gap={0.5}>
                  <Typography variant="h3">{t('summary.heading')}</Typography>
                  <Typography variant="body2" color="secondary">
                    {t('summary.helper')}
                  </Typography>
                </Stack>
                <Box style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer>
                    <ComposedChart data={summaryChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis
                        yAxisId="left"
                        tickFormatter={(value) => formatCompactCurrency(Number(value), summaryCurrency)}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        allowDecimals={false}
                        tickFormatter={(value) => Number(value).toLocaleString()}
                      />
                      <RechartsTooltip
                        formatter={(value, _name, entry) => {
                          if (entry?.dataKey === 'countValue') {
                            return [Number(value as number).toLocaleString(), t('summary.countLabel')];
                          }

                          const label =
                            typeof entry?.payload?.label === 'string' ? entry.payload.label : t('summary.totalLabel');

                          return [formatCurrencyValue(Number(value), summaryCurrency), label];
                        }}
                      />
                      <Legend formatter={summaryLegendFormatter} />
                      <Bar
                        dataKey="amountValue"
                        yAxisId="left"
                        name={t('summary.totalLabel')}
                        fill="#4D7CFE"
                        radius={[8, 8, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="countValue"
                        name={t('summary.countLabel')}
                        yAxisId="right"
                        stroke="#06D6A0"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        connectNulls
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Box>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {summaryHighlights.map((item) => (
                    <Chip
                      key={item.label}
                      label={`${item.label}: ${item.value}`}
                      variant="outlined"
                      style={{ cursor: 'default' }}
                    />
                  ))}
                </Stack>
              </Stack>
            </SummaryChartCard>

            <Paper>
              <Stack gap={2}>
                <Stack direction="row" gap={2} align="center" flexWrap="wrap" justify="space-between">
                  <Typography variant="h3">{breakdownLegendLabel}</Typography>
                  <ButtonGroup gap="8px" joined>
                    {(['category', 'paymentSource'] as const).map((option) => (
                      <Button
                        key={option}
                        label={option === 'category' ? t('breakdown.category') : t('breakdown.paymentSource')}
                        variant={breakdownSource === option ? 'contained' : 'outlined'}
                        width="auto"
                        size="small"
                        onClick={() => setBreakdownSource(option)}
                      />
                    ))}
                  </ButtonGroup>
                </Stack>
                <Typography variant="body2" color="secondary">
                  {t('breakdown.tableHeading')}
                </Typography>
                <Stack direction="row" gap={2} align="center" flexWrap="wrap">
                  <Typography variant="body2">{t('breakdown.topN')}</Typography>
                  <ButtonGroup gap="8px" joined>
                    {[5, 10, 15, 'all' as const].map((option) => (
                      <Button
                        key={option}
                        label={option === 'all' ? t('breakdown.all') : option.toString()}
                        variant={breakdownLimit === option ? 'contained' : 'outlined'}
                        width="auto"
                        size="small"
                        onClick={() => setBreakdownLimit(option)}
                      />
                    ))}
                  </ButtonGroup>
                </Stack>
                <Box style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        dataKey="totalAmount"
                        data={breakdownDataset}
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                      >
                        {breakdownDataset.map((entry: TExpenseAnalyticsBreakdownItem, index) => (
                          <Cell key={entry.id} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <RechartsTooltip
                        formatter={(value: unknown, _name, payload) => {
                          const item = payload?.payload as TExpenseAnalyticsBreakdownItem | undefined;

                          return [formatCurrencyValue(Number(value), summaryCurrency), item?.name ?? item?.id ?? ''];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <BreakdownTable>
                  <thead>
                    <tr>
                      <BreakdownHeadCell>{t('breakdown.name')}</BreakdownHeadCell>
                      <BreakdownHeadCell>{t('breakdown.amount')}</BreakdownHeadCell>
                      <BreakdownHeadCell>{t('breakdown.percentage')}</BreakdownHeadCell>
                      <BreakdownHeadCell>{t('breakdown.count')}</BreakdownHeadCell>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdownDataset.map((item) => (
                      <BreakdownRow key={item.id}>
                        <BreakdownCell>{item.name || item.id}</BreakdownCell>
                        <BreakdownCell>{formatCurrencyValue(item.totalAmount, summaryCurrency)}</BreakdownCell>
                        <BreakdownCell>{`${item.percentage.toFixed(1)}%`}</BreakdownCell>
                        <BreakdownCell>{item.count.toLocaleString()}</BreakdownCell>
                      </BreakdownRow>
                    ))}
                  </tbody>
                </BreakdownTable>
              </Stack>
            </Paper>

            <TrendCard>
              <Stack gap={1}>
                <Typography variant="h3">{t('trend.heading')}</Typography>
                <Typography variant="body2" color="secondary">
                  {t('filters.summaryDates', {
                    start: formatFriendlyDate(formState.startDate),
                    end: formatFriendlyDate(formState.endDate),
                  })}
                </Typography>
              </Stack>
              <Box style={{ width: '100%', height: '100%', marginTop: '16px' }}>
                <ResponsiveContainer>
                  <LineChart data={data.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis tickFormatter={(tick) => formatCompactCurrency(Number(tick), summaryCurrency)} width={120} />
                    <RechartsTooltip
                      formatter={(value, name) => [formatCurrencyValue(Number(value), summaryCurrency), name]}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalAmount"
                      stroke="#4D7CFE"
                      strokeWidth={3}
                      dot={false}
                      name={t('trend.totalAmount')}
                    />
                    <Line
                      type="monotone"
                      dataKey="averageAmount"
                      stroke="#06D6A0"
                      strokeWidth={2}
                      dot={false}
                      name={t('trend.averageAmount')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </TrendCard>

            <AiCard>
              <Stack direction="row" gap={2} align="center" justify="space-between" flexWrap="wrap">
                <Typography variant="h3">{t('ai.heading')}</Typography>
                <Button
                  label={aiInsights ? t('ai.refresh') : t('ai.request')}
                  variant="contained"
                  width="auto"
                  size="large"
                  style={{ minWidth: '220px' }}
                  disabled={isAiLoading || isLoadingAnalytics}
                  onClick={handleRequestAi}
                />
              </Stack>
              <Typography variant="body2" color="secondary" style={{ marginTop: '8px' }}>
                {t('ai.helper')}
              </Typography>
              {isAiLoading && (
                <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
                  {t('ai.loading')}
                </Typography>
              )}
              {aiInsights ? (
                <>
                  <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
                    {t('ai.model', { model: aiInsights.model })} -{' '}
                    {t('ai.generated', {
                      date: new Date(aiInsights.generatedAt).toLocaleString(i18n.language),
                    })}
                  </Typography>
                  <Divider style={{ margin: '16px 0' }} />
                  <MarkdownContainer className={styles.aiInsightText}>
                    <div className={isAITyping ? styles.typingCursor : undefined}>
                      <ReactMarkdown components={markdownComponents}>{aiText}</ReactMarkdown>
                    </div>
                  </MarkdownContainer>
                </>
              ) : (
                !isAiLoading && (
                  <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
                    {t('ai.empty')}
                  </Typography>
                )
              )}
            </AiCard>
          </Stack>
        ) : (
          data &&
          !isLoadingAnalytics && (
            <Paper>
              <Typography variant="h3">{t('emptyState.title')}</Typography>
              <Typography variant="body2" color="secondary" style={{ marginTop: '8px' }}>
                {t('emptyState.description')}
              </Typography>
            </Paper>
          )
        )}
      </Stack>
    </Box>
  );
};

export default AnalyticsPage;
