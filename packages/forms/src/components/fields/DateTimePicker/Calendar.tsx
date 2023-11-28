import React, { useState } from 'react'
import { cn } from '@maker-ui/utils'
import {
  dayjs,
  getCalendar,
  getNextMonth,
  getPreviousMonth,
  isDateInRange,
  getTotalDays,
  WEEK_DAYS,
  CALENDAR_MONTHS,
  isDateAvailable,
  isDayOfWeekAvailable,
  moveToNextWeekday,
  type Dayjs,
  WeekDay,
} from './date-helpers'
import type { DateTimePickerState } from './DateTimePicker'
import { CalendarProps } from '@/types'
import { useForm } from '@/context'

interface CalendarState {
  selected?: Dayjs
  rangeStart?: Dayjs
  rangeEnd?: Dayjs
  month: number
  year: number
}

interface CalendarFormProps extends CalendarProps {
  initialValue?: DateTimePickerState
  onChange?: (selection: DateTimePickerState) => void
}

interface InitializerProps {
  initialValue?: DateTimePickerState
  range?: CalendarProps['range']
  startDate?: CalendarProps['startDate']
  endDate?: CalendarProps['endDate']
  unavailable: CalendarProps['unavailable']
  unavailableDays: CalendarProps['unavailableDays']
  autoSelect?: CalendarProps['autoSelect']
}

const MAX_ITERATIONS = 1000 // Define a maximum number of iterations to avoid infinite loops

function initState({
  range,
  initialValue,
  startDate,
  endDate,
  unavailable,
  unavailableDays,
  autoSelect,
}: InitializerProps): CalendarState {
  /**
   * Returns the next available date based on the given start date, end date, unavailable days
   * and off-limit days
   */
  const getInitialDate = () => {
    if (!autoSelect) return undefined
    if (!startDate) return dayjs()

    let current = dayjs(startDate)
    const end = endDate ? dayjs.utc(endDate) : null

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      if (end === null || current <= end) {
        if (
          isDateAvailable(current, unavailable) &&
          isDayOfWeekAvailable(current, unavailableDays)
        ) {
          return current
        } else {
          current = current.add(1, 'day')
        }
      } else {
        break
      }
    }

    return undefined
  }

  const getInitialMonth = () => {
    const date = initialValue?.date || initialValue?.startDate

    return date ? date.month() + 1 : undefined
  }

  // Store the computed values in variables
  const initialDate = getInitialDate()
  const initialMonth = getInitialMonth()

  const selectedDate = !range
    ? initialValue?.date
      ? initialValue.date
      : initialDate
    : undefined

  const rangeStartDate =
    range && initialValue?.startDate
      ? initialValue.startDate
      : range
      ? initialDate
      : undefined

  const rangeEndDate =
    range && initialValue?.endDate ? initialValue.endDate : undefined

  const defaultDate = initialDate || dayjs.utc(startDate) || dayjs()
  const month = initialMonth || defaultDate.month() + 1
  const year = defaultDate.year()

  return {
    selected: selectedDate,
    rangeStart: rangeStartDate,
    rangeEnd: rangeEndDate,
    month,
    year,
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
  arrowPos = 'split',
  showSelections = false,
  autoSelect = false,
  dateFormat = 'ddd MMM DD YYYY',
  initialValue,
}: CalendarFormProps) => {
  const {
    settings: { icons },
  } = useForm()
  const [state, setState] = useState<CalendarState>(
    initState({
      range,
      initialValue,
      startDate,
      endDate,
      unavailable,
      unavailableDays,
      autoSelect,
    })
  )
  const month =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(state.month - 1, 11))]

  const getDates = () => {
    const calMonth =
      state.month ?? (state.selected?.month() ?? dayjs().month()) + 1
    const calYear = state.year ?? state.selected?.year() ?? dayjs().year()
    return getCalendar(calMonth, calYear)
  }

  /**
   * Select a date from the calendar
   */
  const selectDate = (date: Dayjs) => {
    const isInRange =
      startDate && endDate ? isDateInRange(date, startDate, endDate) : true
    const isEarlier = state.rangeStart && date.isSameOrBefore(state?.rangeStart)

    if (range && isInRange) {
      // If no start date
      if (!state.rangeStart) {
        setState((s) => ({ ...s, rangeStart: date }))
        onChange?.({ startDate: date, endDate: undefined })
      }

      // If start date but no end date yet & invoke callback
      if (state.rangeStart && !state.rangeEnd) {
        if (date.isSame(state.rangeStart, 'day')) {
          setState((s) => ({ ...s, rangeStart: undefined }))
          onChange?.({ startDate: undefined, endDate: undefined })
        } else if (isEarlier) {
          setState((s) => ({ ...s, rangeStart: date }))
          onChange?.({ startDate: date, endDate: undefined })
        } else {
          // Check for range min and max
          const disableWeekends =
            unavailableDays?.includes(0) && unavailableDays?.includes(6)
          const totals = getTotalDays(state.rangeStart, date, !disableWeekends)
          const totalDays = totals.totalDays
          const weekendDays = totals.weekendDays
          const start = state.rangeStart

          const rangeEnd =
            rangeMax && totalDays > rangeMax
              ? start.add(rangeMax + weekendDays - 1, 'day')
              : rangeMin && totalDays < rangeMin
              ? moveToNextWeekday(
                  start.add(rangeMin + weekendDays - 1, 'day'),
                  disableWeekends
                )
              : date

          setState((s) => ({ ...s, rangeEnd }))
          onChange?.({
            startDate: state.rangeStart,
            endDate: rangeEnd,
          })
        }
      }

      // If start date and end date, reset end and set new start date
      if (state.rangeStart && state.rangeEnd) {
        if (
          isDateAvailable(date, unavailable) &&
          isDayOfWeekAvailable(date, unavailableDays)
        ) {
          setState((s) => ({ ...s, rangeStart: date, rangeEnd: undefined }))
          onChange?.({ startDate: date, endDate: undefined })
        }
      }
    } else {
      if (isInRange) {
        setState({
          selected: date,
          month: date.month() + 1,
          year: date.year(),
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
    const date = dayjs.utc(props.date).startOf('day')
    // Handle single selection
    const isSelected =
      !range && state.selected && date.isSame(state.selected, 'day')

    // Handle current month
    const currentMonth = dayjs()
      .year(state.year)
      .month(state.month - 1)
    const inMonth =
      date.isSame(currentMonth, 'month') && date.isSame(currentMonth, 'year')

    // Handle Range classes
    const isRangeStart =
      state.rangeStart && date.isSame(state.rangeStart, 'day')
    const isRangeEnd = state.rangeEnd && date.isSame(state.rangeEnd, 'day')
    const isInRange =
      state.rangeStart &&
      state.rangeEnd &&
      isDateInRange(date, state.rangeStart, state.rangeEnd)

    // Handle Availability classes
    const isDayAvailable = isDayOfWeekAvailable(date, unavailableDays)
    const isAvailable = (() => {
      let available = true
      // Check past dates
      if (!allowPastDates && date.isBefore(dayjs(), 'day')) {
        return false
      }
      // Check off-limit days of week
      if (unavailableDays.length) {
        available = isDayAvailable
      }
      // Check unavailable date array
      if (available && unavailable?.length) {
        available = isDateAvailable(date, unavailable)
      }
      // If range start is selected, allow all proceeding dates that are not off-limits
      if (
        !available &&
        range &&
        state.rangeStart &&
        date.isSameOrAfter(state.rangeStart, 'day') &&
        isDayAvailable
      ) {
        available = true
      }

      // Check if date is inside calendar date range
      if (available && startDate && endDate) {
        available = isDateInRange(date, startDate, endDate)
      }

      return available
    })()

    const dayClasses = [
      'mkui-date',
      classNames?.day,
      range ? 'range' : 'single',
      !inMonth ? 'diff-month' : '',
      isAvailable ? 'available' : 'unavailable',
      !isDayAvailable ? 'unavailable-day' : '',
      isSelected ? 'selected' : '',
      date.isSame(dayjs(), 'day') ? 'today' : '',
      range && isRangeStart ? 'range-start' : '',
      range && isRangeEnd ? 'range-end' : '',
      range && !isRangeStart && !isRangeEnd && isInRange ? 'range-inner' : '',
      showRangeOnly &&
      startDate &&
      endDate &&
      !isDateInRange(date, startDate, endDate)
        ? 'hidden'
        : '',
    ]

    return (
      <button
        type="button"
        className={cn(dayClasses)}
        title={date.utc().format('MM/DD/YYYY')}
        onClick={() => selectDate(date)}>
        {date.date()}
      </button>
    )
  }

  const MonthButton = ({ isNext = false }: { isNext?: boolean }) => {
    let show = true

    if (showRangeOnly && startDate && endDate) {
      const rangeMonth = dayjs.utc(isNext ? endDate : startDate).month() + 1
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
        {isNext ? icons?.nextArrow : icons?.prevArrow}
      </button>
    ) : (
      <div className="mkui-btn-month placeholder" />
    )
  }

  return (
    <div
      className={cn([
        'mkui-calendar',
        range ? 'range' : 'single',
        classNames?.calendar,
      ])}>
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
      <div className={cn(['mkui-calendar-grid'])}>
        {Object.keys(WEEK_DAYS).map((day) => (
          <div
            key={day}
            className={cn(['mkui-day-label', classNames?.dayName])}>
            {Object.hasOwnProperty.call(WEEK_DAYS, day)
              ? WEEK_DAYS[day as WeekDay]
              : null}
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
                <div>
                  {state.rangeStart && state.rangeStart.format(dateFormat)}
                </div>
              </div>
              {state?.rangeEnd ? (
                <div className="mkui-date-end">
                  <strong>End Date</strong>
                  <div>
                    {state.rangeEnd && state.rangeEnd.format(dateFormat)}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mkui-date-selected">
              <strong>Selected</strong>
              <div>{state.selected && state.selected.format(dateFormat)}</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
