import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Calendar,
  Icon,
  Modal,
  Stack,
  TextField,
  Toggle,
  Typography,
} from 'src/shared/ui-kit';
import type { CalendarProps } from 'react-calendar';
import { CURRENCIES } from 'src/shared/constants/currencies.ts';

import type { AnalyticsFormState, MultiSelectOption, QuickRangeKey } from '../types';
import MultiSelectField from './MultiSelectField';

type FiltersAccordionProps = {
  formState: AnalyticsFormState;
  categoryOptions: MultiSelectOption[];
  paymentSourceOptions: MultiSelectOption[];
  currencyOptions: MultiSelectOption[];
  onFieldChange: (field: keyof AnalyticsFormState, value: unknown) => void;
  isLoading: boolean;
  filtersSummaryText: string;
  startDateLabel: string;
  endDateLabel: string;
  activeQuickRange?: QuickRangeKey;
  onQuickRangeSelect: (key: QuickRangeKey) => void;
  onReset: () => void;
  activeCalendar: 'start' | 'end' | null;
  onCalendarToggle: (value: 'start' | 'end') => void;
  onCalendarClose: () => void;
  calendarInitialDate: Date;
  onCalendarSelect: NonNullable<CalendarProps['onChange']>;
};

const FiltersAccordion = ({
  formState,
  categoryOptions,
  paymentSourceOptions,
  currencyOptions,
  onFieldChange,
  isLoading,
  filtersSummaryText,
  startDateLabel,
  endDateLabel,
  activeQuickRange,
  onQuickRangeSelect,
  onReset,
  activeCalendar,
  onCalendarToggle,
  onCalendarClose,
  calendarInitialDate,
  onCalendarSelect,
}: FiltersAccordionProps) => {
  const { t } = useTranslation('analyticsPage');

  return (
    <>
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
                    disabled={isLoading}
                    onClick={() => onQuickRangeSelect(key)}
                  />
                ))}
              </ButtonGroup>
            </Stack>

            <Stack direction="row" gap={1.5} flexWrap="wrap">
              <DateFieldWrapper style={{ minWidth: '220px', flex: '1 1 220px' }}>
                <Typography variant="body2" weight="bold">
                  {t('filters.startDate')}
                </Typography>
                <DateButton disabled={isLoading} onClick={() => onCalendarToggle('start')}>
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
                <DateButton disabled={isLoading} onClick={() => onCalendarToggle('end')}>
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
                disabled={isLoading}
              />
              <TextField
                label={t('filters.amountTo')}
                type="number"
                size="small"
                fullWidth
                value={formState.amountEnd}
                onChange={(event) => onFieldChange('amountEnd', event.target.value)}
                style={{ minWidth: '220px', flex: '1 1 220px' }}
                disabled={isLoading}
              />
              <TextField
                label={t('filters.search')}
                placeholder={t('filters.search')}
                size="small"
                fullWidth
                value={formState.searchTerm}
                onChange={(event) => onFieldChange('searchTerm', event.target.value)}
                style={{ minWidth: '220px', flex: '1 1 220px' }}
                disabled={isLoading}
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
                  disabled={isLoading}
                />
              </Box>
              <Box style={{ minWidth: '220px', flex: '1 1 220px' }}>
                <MultiSelectField
                  label={t('filters.paymentSources')}
                  placeholder={t('filters.paymentSources')}
                  options={paymentSourceOptions}
                  values={formState.paymentSourceIds}
                  onChange={(next) => onFieldChange('paymentSourceIds', next)}
                  disabled={isLoading}
                />
              </Box>
              <Box style={{ minWidth: '220px', flex: '1 1 220px' }}>
                <MultiSelectField
                  label={t('filters.currencies')}
                  placeholder={t('filters.currencies')}
                  options={currencyOptions}
                  values={formState.currencies}
                  onChange={(next) => onFieldChange('currencies', next as CURRENCIES[])}
                  disabled={isLoading}
                />
              </Box>
            </Stack>

            <Stack direction="row" gap={2} flexWrap="wrap" align="center">
              <Stack direction="row" gap={1} align="center">
                <Typography variant="body2">{t('filters.hasComments')}</Typography>
                <Toggle
                  checked={formState.hasComments}
                  onChange={(checked) => onFieldChange('hasComments', checked)}
                  disabled={isLoading}
                />
              </Stack>
              <Stack direction="row" gap={1} align="center">
                <Typography variant="body2">{t('filters.granularity')}</Typography>
                <ButtonGroup joined>
                  {(['day', 'week', 'month', 'year'] as const).map((option) => (
                    <Button
                      key={option}
                      label={t(`filters.granularityOptions.${option}`)}
                      variant={formState.trendGranularity === option ? 'contained' : 'outlined'}
                      size="small"
                      width="auto"
                      disabled={isLoading}
                      onClick={() => onFieldChange('trendGranularity', option)}
                    />
                  ))}
                </ButtonGroup>
              </Stack>
            </Stack>

            <Button label={t('filters.reset')} variant="outlined" onClick={onReset} width="auto" disabled={isLoading} />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Modal
        open={activeCalendar !== null}
        onClose={onCalendarClose}
        closeAfterTransition
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CalendarPopover>
          <Calendar value={calendarInitialDate} onChange={onCalendarSelect} locale={navigator?.language} />
        </CalendarPopover>
      </Modal>
    </>
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

export default FiltersAccordion;
