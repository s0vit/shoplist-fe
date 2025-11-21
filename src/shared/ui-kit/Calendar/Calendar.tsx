import { forwardRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export type { CalendarProps } from 'react-calendar';

const CalendarWrapper = styled.div`
  .react-calendar {
    border: none;
    border-radius: var(--border-radius-lg);
    background: var(--color-card-bg);
    color: var(--color-text-primary);
    box-shadow: var(--color-card-shadow);
    padding: 8px;
  }

  .react-calendar button {
    border-radius: var(--border-radius-md);
    cursor: pointer;
    padding: 8px;
    color: var(--color-text-primary);
    background: transparent;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--hover {
    background: var(--color-button-contained-bg);
    color: var(--color-button-contained-color);
  }

  .react-calendar__tile--now {
    background: var(--color-button-outlined-bg, rgba(0, 0, 0, 0.08));
    color: var(--color-button-outlined-color, var(--color-text-primary));
  }

  .react-calendar__navigation button,
  .react-calendar__navigation span {
    color: var(--color-text-primary);
  }

  .react-calendar button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .react-calendar button:hover {
    background: var(--color-input-hover-bg, rgba(0, 0, 0, 0.08));
  }

  .react-calendar__month-view__weekdays {
    color: var(--color-text-secondary);
  }

  .react-calendar__tile {
    transition: background-color 0.2s ease;
  }
`;

const CalendarComponent = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  return (
    <CalendarWrapper ref={ref}>
      <Calendar prev2Label={null} next2Label={null} calendarType="iso8601" {...props} />
    </CalendarWrapper>
  );
});

CalendarComponent.displayName = 'CalendarComponent';

export default CalendarComponent;
