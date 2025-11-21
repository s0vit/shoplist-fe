import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Box, Paper, Stack, Typography } from 'src/shared/ui-kit';
import type { TExpenseAnalyticsTrendPoint } from 'src/shared/api/expenseAnalyticsApi.ts';

import { formatCompactCurrency, formatCurrencyValue } from '../utils';

type TTrendSectionProps = {
  trend: TExpenseAnalyticsTrendPoint[];
  dateRangeLabel: string;
  summaryCurrency: string;
};

const TrendSection = ({ trend, dateRangeLabel, summaryCurrency }: TTrendSectionProps) => {
  const { t } = useTranslation('analyticsPage');

  return (
    <TrendCard>
      <Stack gap={1}>
        <Typography variant="h3">{t('trend.heading')}</Typography>
        <Typography variant="body2" color="secondary">
          {dateRangeLabel}
        </Typography>
      </Stack>
      <Box style={{ width: '100%', height: '100%', marginTop: '16px' }}>
        <ResponsiveContainer>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(tick) => formatCompactCurrency(Number(tick), summaryCurrency)} width={120} />
            <RechartsTooltip formatter={(value, name) => [formatCurrencyValue(Number(value), summaryCurrency), name]} />
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
  );
};

const TrendCard = styled(Paper)`
  padding: 16px 16px 56px;
  height: 360px;
`;

export default TrendSection;
