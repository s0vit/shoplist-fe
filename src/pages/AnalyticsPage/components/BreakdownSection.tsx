import { useMemo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Box, Button, ButtonGroup, Paper, Stack, Typography } from 'src/shared/ui-kit';
import type { TExpenseAnalyticsBreakdownItem } from 'src/shared/api/expenseAnalyticsApi.ts';

import { CHART_COLORS } from '../constants';
import { formatCurrencyValue } from '../utils';

type BreakdownSectionProps = {
  breakdownSource: 'category' | 'paymentSource';
  breakdownLimit: number | 'all';
  onBreakdownSourceChange: (value: 'category' | 'paymentSource') => void;
  onBreakdownLimitChange: (value: number | 'all') => void;
  summaryCurrency: string;
  byCategory?: TExpenseAnalyticsBreakdownItem[];
  byPaymentSource?: TExpenseAnalyticsBreakdownItem[];
};

const BreakdownSection = ({
  breakdownSource,
  breakdownLimit,
  onBreakdownSourceChange,
  onBreakdownLimitChange,
  summaryCurrency,
  byCategory,
  byPaymentSource,
}: BreakdownSectionProps) => {
  const { t } = useTranslation('analyticsPage');

  const breakdownDataset = useMemo(() => {
    const sourceArray = breakdownSource === 'category' ? (byCategory ?? []) : (byPaymentSource ?? []);
    const sorted = [...sourceArray].sort((a, b) => b.totalAmount - a.totalAmount);

    if (breakdownLimit === 'all') {
      return sorted;
    }

    return sorted.slice(0, breakdownLimit);
  }, [breakdownLimit, breakdownSource, byCategory, byPaymentSource]);

  const breakdownLegendLabel = breakdownSource === 'category' ? t('breakdown.category') : t('breakdown.paymentSource');

  return (
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
                onClick={() => onBreakdownSourceChange(option)}
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
                onClick={() => onBreakdownLimitChange(option)}
              />
            ))}
          </ButtonGroup>
        </Stack>
        <Box style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="totalAmount" data={breakdownDataset} innerRadius={70} outerRadius={120} paddingAngle={3}>
                {breakdownDataset.map((entry, index) => (
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
  );
};

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

export default BreakdownSection;
