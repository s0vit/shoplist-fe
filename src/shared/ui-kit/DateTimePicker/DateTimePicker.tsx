import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, setHours, setMinutes } from 'date-fns';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '../TextField/TextField';
import IconButton from '../IconButton/IconButton';
import Modal from '../Modal/Modal';
import Paper from '../Paper/Paper';
import Stack from '../Stack/Stack';
import { useDayPickerLocale } from './locales';

import 'react-day-picker/dist/style.css';

export type TDateTimePickerProps = {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disableFuture?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const DateTimePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TimeInput = styled.input`
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-card-bg);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-body2);
  line-height: var(--line-height-body2);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CalendarContainer = styled(Paper)`
  padding: var(--spacing-md);
  max-width: 350px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 400px;
    padding: var(--spacing-lg);
  }
`;

const TimeContainer = styled.div`
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
`;

const DateTimePicker: React.FC<TDateTimePickerProps> = ({
  label,
  value,
  onChange,
  disableFuture = false,
  disabled = false,
  style,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(() => {
    if (value) {
      return format(value, 'HH:mm');
    }

    return '00:00';
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);

      return;
    }

    // Combine date with time
    const [hours, minutes] = timeValue.split(':').map(Number);
    const newDate = setHours(setMinutes(date, minutes), hours);
    onChange?.(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setTimeValue(time);

    if (value) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = setHours(setMinutes(value, minutes), hours);
      onChange?.(newDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Parse the input value and update the date
    // This is a simplified version - you might want to add more robust parsing
    const parsedDate = new Date(inputValue);
    if (!isNaN(parsedDate.getTime())) {
      onChange?.(parsedDate);
    }
  };

  const { t } = useTranslation();
  const locale = useDayPickerLocale();
  const displayValue = value ? format(value, 'PPpp', { locale }) : '';

  const disabledDays = disableFuture ? { after: new Date() } : undefined;

  return (
    <DateTimePickerWrapper style={style} className={className}>
      <Stack direction="row" gap={1} align="center">
        <TextField
          label={label}
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="MM/DD/YYYY HH:MM"
          style={{ flex: 1 }}
        />
        <IconButton icon="calendar" onClick={() => setIsOpen(true)} disabled={disabled} />
      </Stack>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CalendarContainer>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            locale={locale}
            footer={
              <TimeContainer>
                <label>
                  {t('Time')}:{' '}
                  <TimeInput type="time" value={timeValue} onChange={handleTimeChange} disabled={disabled} />
                </label>
              </TimeContainer>
            }
          />
        </CalendarContainer>
      </Modal>
    </DateTimePickerWrapper>
  );
};

export default DateTimePicker;
