import React, { useState } from 'react'
import { cn } from '@maker-ui/utils'
import {
  getCalendar,
  isSameDay,
  getNextMonth,
  getPreviousMonth,
  isSameMonth,
  isDateInRange,
  getNextAvailableDate,
  getTotalDays,
  WEEK_DAYS,
  CALENDAR_MONTHS,
  isDateUnavailable,
  utcDate,
  type Dayjs,
} from './date-helpers'
import { CalendarProps, DateSelection } from '@/types'
import { ArrowIcon } from '@/icons'

interface CalendarState {
  selected?: Dayjs
  rangeStart?: Dayjs
  rangeEnd?: Dayjs
  month: number
  year: number
}

interface CalendarFormProps extends CalendarProps {
  initialValue?: DateSelection
}

interface InitializerProps {
  startDate: CalendarProps['startDate']
  endDate: CalendarProps['endDate']
  unavailable: CalendarProps['unavailable']
  unavailableDays: CalendarProps['unavailableDays']
  autoSelect: CalendarProps['autoSelect']
}

function initState({
  startDate,
  endDate,
  unavailable,
  unavailableDays,
  autoSelect,
}: InitializerProps): CalendarState {
  return {
    selected: '',
    rangeStart: '',
    rangeEnd: '',
    month: 0,
    year: 0,
  }
}

export const Calendar = ({
  startDate,
  endDate,
  range,
  rangeMin,
  rangeMax,
  unavailable = [],
  unavailableDays = [],
  onChange,
  showRangeOnly = false,
  allowPastDates = false,
  classNames,
  arrowLeft = <ArrowIcon style={{ transform: 'rotate(90deg)' }} />,
  arrowRight = <ArrowIcon style={{ transform: 'rotate(-90deg)' }} />,
  arrowPos = 'split',
  showSelections = false,
  autoSelect = false,
  initialValue,
}: CalendarFormProps) => {
  const initialDate = getNextAvailableDate(
    autoSelect,
    startDate,
    endDate,
    unavailable,
    unavailableDays
  )

  function getInitialValueMonth() {
    const date = initialValue?.date
      ? utcDate(initialValue.date)
      : initialValue?.startDate
      ? utcDate(initialValue.startDate)
      : undefined

    return date ? date.month() + 1 : undefined
  }

  const [state, setState] = useState<CalendarState>({
    selected: !range
      ? initialValue?.date
        ? new Date(initialValue.date)
        : initialDate
      : undefined,
    rangeStart:
      range && initialValue?.startDate
        ? new Date(initialValue.startDate)
        : range
        ? initialDate
        : undefined,
    rangeEnd:
      range && initialValue?.endDate
        ? new Date(initialValue?.endDate)
        : undefined,
    month:
      getInitialValueMonth() ||
      (initialDate
        ? initialDate
        : startDate
        ? new Date(startDate)
        : new Date()
      ).getMonth() + 1,
    year: (initialDate
      ? initialDate
      : startDate
      ? new Date(startDate)
      : new Date()
    ).getFullYear(),
  })
  const month =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(state.month - 1, 11))]

  const getDates = () => {
    const calMonth =
      state.month ?? (state.selected?.getMonth() ?? new Date().getMonth()) + 1
    const calYear =
      state.year ?? state.selected?.getFullYear() ?? new Date().getFullYear()
    return getCalendar(calMonth, calYear)
  }

  /**
   * Select a date from the calendar
   */
  const selectDate = (date: Date) => {
    const isInRange =
      startDate && endDate ? isDateInRange(date, startDate, endDate) : true
    const isEarlier =
      state.rangeStart && date.getTime() < state?.rangeStart?.getTime()

    if (range && isInRange) {
      // If no start date
      if (!state.rangeStart) {
        setState((s) => ({ ...s, rangeStart: date }))
        onChange?.({ startDate: date, endDate: undefined })
      }

      // If start date but no end date yet & invoke callback
      if (state.rangeStart && !state.rangeEnd) {
        if (isSameDay(state.rangeStart, date)) {
          setState((s) => ({ ...s, rangeStart: undefined }))
          onChange?.({ startDate: undefined, endDate: undefined })
        } else if (isEarlier) {
          setState((s) => ({ ...s, rangeStart: date }))
          onChange?.({ startDate: date, endDate: undefined })
        } else {
          // Check for range min and max
          const disableWeekends =
            unavailableDays?.includes(0) && unavailableDays?.includes(6)
          const totalDays = getTotalDays(
            state.rangeStart,
            date,
            disableWeekends
          )
          const start = new Date(state.rangeStart)
          // TODO - account for weekends in this range
          const rangeEnd =
            rangeMax && totalDays > rangeMax
              ? new Date(start.setDate(start.getDate() + rangeMax - 1))
              : rangeMin && totalDays < rangeMin
              ? new Date(start.setDate(start.getDate() + rangeMin - 1))
              : date

          setState((s) => ({ ...s, rangeEnd }))
          onChange?.({ startDate: state.rangeStart, endDate: date })
        }
      }

      // If start date and end date, reset end and set new start date
      if (state.rangeStart && state.rangeEnd) {
        setState((s) => ({ ...s, rangeStart: date, rangeEnd: undefined }))
        onChange?.({ startDate: date, endDate: undefined })
      }
    } else {
      if (isInRange) {
        setState({
          selected: date,
          month: +date.getMonth() + 1,
          year: date.getFullYear(),
        })
        onChange?.({ date })
      }
    }
  }

  const changeMonth = (isNext = true, isYear = false) => {
    setState((s) => {
      if (isYear) {
        return {
          ...s,
          year: isNext ? s.year + 1 : s.year - 1,
        }
      } else {
        const target = isNext
          ? getNextMonth(s.month, s.year)
          : getPreviousMonth(s.month, s.year)
        return {
          ...s,
          month: target.month,
          year: target.year,
        }
      }
    })
  }

  const handleMonthChange = (e: React.MouseEvent, isNext: boolean) => {
    e?.preventDefault()
    return changeMonth(isNext, e?.shiftKey)
  }

  const Day = (props: { date: string }) => {
    const utc = utcDate(props.date)
    const date = utc.toDate()

    const isSelected =
      !range && state.selected && isSameDay(date, state.selected)
    const inMonth =
      state.month &&
      state.year &&
      isSameMonth(date, new Date(state.year, state.month - 1, 1))

    const isRangeStart = state.rangeStart && isSameDay(date, state.rangeStart)
    const isRangeEnd = state.rangeEnd && isSameDay(date, state.rangeEnd)
    const isInRange =
      state.rangeStart &&
      state.rangeEnd &&
      isDateInRange(date, state.rangeStart, state.rangeEnd)

    const inCalendarRange =
      startDate && endDate
        ? isDateInRange(date, startDate, endDate)
          ? true
          : false
        : true
    // TODO - add allowPastDates check here
    // TODO - remove any unavailable dates if type === range, rangeStart exists, and date occurs after range start
    const isUnavailable =
      isDateUnavailable(unavailable, date) ||
      unavailableDays.includes(utc.day()) ||
      !inCalendarRange

    const isAvailable = !isUnavailable && inMonth && inCalendarRange

    const dayClasses = [
      'mkui-date',
      classNames?.day,
      range ? 'range' : 'single',
      !inMonth ? 'diff-month' : '',
      isUnavailable ? 'unavailable' : isAvailable ? 'available' : '',
      isSelected ? 'selected' : '',
      isSameDay(date, new Date()) ? 'today' : '',
      range && isRangeStart ? 'range-start' : '',
      range && isRangeEnd ? 'range-end' : '',
      range && !isRangeStart && !isRangeEnd && isInRange ? 'range-inner' : '',
      showRangeOnly && !inCalendarRange ? 'hidden' : '',
    ]

    return (
      <button
        type="button"
        className={cn(dayClasses)}
        title={utc.format('MM/DD/YYYY')}
        onClick={() => selectDate(date)}>
        {utc.date()}
      </button>
    )
  }

  const MonthButton = ({ isNext = false }: { isNext?: boolean }) => {
    let show = true

    if (showRangeOnly && startDate && endDate) {
      const rangeMonth = utcDate(isNext ? endDate : startDate).month() + 1
      const buttonMonth = (
        isNext
          ? getNextMonth(state.month, state.year)
          : getPreviousMonth(state.month, state.year)
      ).month
      show = isNext ? buttonMonth <= rangeMonth : buttonMonth >= rangeMonth
    }

    return show ? (
      <button
        type="button"
        className={cn([
          'mkui-btn-month',
          isNext ? 'next' : 'previous',
          classNames?.headerButton,
        ])}
        onClick={(e) => handleMonthChange(e, isNext)}
        title={`${isNext ? 'Next' : 'Previous'} Month`}>
        {isNext ? arrowRight : arrowLeft}
      </button>
    ) : (
      <div className="mkui-btn-month placeholder" />
    )
  }

  return (
    <div className={cn(['mkui-calendar', classNames?.calendar])}>
      <div
        className={cn(['mkui-calendar-header', arrowPos, classNames?.header])}>
        {arrowPos === 'split' ? (
          <>
            <MonthButton />
            <div
              className={cn([
                'mkui-month',
                classNames?.headerMonth,
              ])}>{`${month} ${state.year}`}</div>
            <MonthButton isNext />
          </>
        ) : (
          <>
            <div className="mkui-month-buttons flex align-center">
              <MonthButton />
              <MonthButton isNext />
            </div>
            <div
              className={cn([
                'mkui-month flex-1',
                classNames?.headerMonth,
              ])}>{`${month} ${state.year}`}</div>
          </>
        )}
      </div>
      <div className={cn(['mkui-calendar-grid', range ? 'range' : 'single'])}>
        {Object.keys(WEEK_DAYS).map((day) => (
          <div
            key={day}
            className={cn(['mkui-day-label', classNames?.dayName])}>
            {/* @ts-ignore */}
            {WEEK_DAYS[day]}
          </div>
        ))}
        {getDates().map((d) => (
          <Day key={d} date={d} />
        ))}
      </div>
      {showSelections ? (
        <div className="mkui-date-selection flex">
          {range ? (
            <>
              <div className="mkui-date-start">
                <strong>{state?.rangeEnd ? 'Start Date' : 'Date'}</strong>
                <div>{state.rangeStart && state.rangeStart.toDateString()}</div>
              </div>
              {state?.rangeEnd ? (
                <div className="mkui-date-end">
                  <strong>End Date</strong>
                  <div>{state.rangeEnd && state.rangeEnd.toDateString()}</div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mkui-date-selected">
              <strong>Date</strong>
              <div>{state.selected && state.selected.toDateString()}</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
