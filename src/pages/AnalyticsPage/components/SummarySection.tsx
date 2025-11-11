import { useMemo } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { LegendPayload } from 'recharts';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Box, Chip, Paper, Stack, Typography } from 'src/shared/ui-kit';
import type { TExpenseAnalyticsSummary } from 'src/shared/api/expenseAnalyticsApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback';

import { formatCompactCurrency, formatCurrencyValue } from '../utils';

type SummarySectionProps = {
  summary: TExpenseAnalyticsSummary;
};

const SummarySection = ({ summary }: SummarySectionProps) => {
  const { t } = useTranslation('analyticsPage');
  const summaryCurrency = summary.currency ?? 'USD';

  const summaryChartData = useMemo(
    () => [
      {
        label: t('summary.totalLabel'),
        amountValue: summary.totalAmount,
        countValue: summary.totalCount,
      },
      {
        label: t('summary.averageLabel'),
        amountValue: summary.averageAmount,
      },
      {
        label: t('summary.minLabel'),
        amountValue: summary.minAmount,
      },
      {
        label: t('summary.maxLabel'),
        amountValue: summary.maxAmount,
      },
    ],
    [summary, t],
  );

  const summaryHighlights = useMemo(
    () => [
      { label: t('summary.totalAmount'), value: formatCurrencyValue(summary.totalAmount, summaryCurrency) },
      { label: t('summary.totalCount'), value: summary.totalCount.toLocaleString() },
      { label: t('summary.averageAmount'), value: formatCurrencyValue(summary.averageAmount, summaryCurrency) },
      { label: t('summary.minAmount'), value: formatCurrencyValue(summary.minAmount, summaryCurrency) },
      { label: t('summary.maxAmount'), value: formatCurrencyValue(summary.maxAmount, summaryCurrency) },
    ],
    [
      summary.averageAmount,
      summary.maxAmount,
      summary.minAmount,
      summary.totalAmount,
      summary.totalCount,
      summaryCurrency,
      t,
    ],
  );

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

  return (
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
              <YAxis yAxisId="left" tickFormatter={(value) => formatCompactCurrency(Number(value), summaryCurrency)} />
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
  );
};

const SummaryChartCard = styled(Paper)`
  padding: 16px;
`;

export default SummarySection;
