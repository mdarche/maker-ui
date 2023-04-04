import React, { useState } from 'react'
import { cn } from '@maker-ui/utils'
import {
  getCalendar,
  isSameDay,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  isSameMonth,
  isDateInRange,
  getNextAvailableDate,
  getTotalDays,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from './date-helpers'
import { CalendarProps, DateSelection } from '@/types'
import { ArrowIcon } from '@/icons'

interface CalendarState {
  selected?: Date
  rangeStart?: Date
  rangeEnd?: Date
  month: number
  year: number
}

interface CalendarFormProps extends CalendarProps {
  initialValue?: DateSelection
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
  const [unavailableDates] = useState(unavailable.map((d) => new Date(d)) || [])
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
    const calMonth = state.month || +state.selected?.getMonth()! + 1
    const calYear = state.year || state.selected?.getFullYear()
    return getCalendar(calMonth, calYear)
  }

  /**
   * Select a date from the calendar
   */
  const selectDate = (d: Date) => {
    const date = new Date(d)
    const isInRange =
      startDate && endDate ? isDateInRange(date, startDate, endDate) : true
    const isEarlier =
      state.rangeStart && date.getTime() < state?.rangeStart?.getTime()

    if (range && isInRange) {
      // If no start date
      if (!state.rangeStart) {
        setState((s) => ({ ...s, rangeStart: date }))
      }

      // If start date but no end date yet & invoke callback
      if (state.rangeStart && !state.rangeEnd) {
        if (isSameDay(state.rangeStart, date)) {
          setState((s) => ({ ...s, rangeStart: undefined }))
        } else if (isEarlier) {
          setState((s) => ({ ...s, rangeStart: date }))
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
      }
    } else {
      if (isInRange) {
        setState({
          selected: d,
          month: +d.getMonth() + 1,
          year: d.getFullYear(),
        })
        onChange?.({ date: d })
      }
    }
  }

  const changeMonth = (isNext = true) => {
    setState((s) => {
      const target = isNext
        ? getNextMonth(s.month, s.year)
        : getPreviousMonth(s.month, s.year)
      return {
        ...s,
        month: target.month,
        year: target.year,
      }
    })
  }

  const changeYear = (isNext = true) => {
    setState((s) => ({
      ...s,
      month: s.month,
      year: isNext ? s.year + 1 : s.year - 1,
    }))
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e?.preventDefault()
    return e?.shiftKey ? changeYear(false) : changeMonth(false)
  }

  const handleNext = (e: React.MouseEvent) => {
    e?.preventDefault()
    return e?.shiftKey ? changeYear() : changeMonth()
  }

  const Day = ({ date }: { date: Date }) => {
    const isToday = isSameDay(date, new Date())
    const isSelected =
      !range && state.selected && isSameDay(date, state.selected)
    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      state.month &&
      state.year &&
      isSameMonth(date, new Date([state.year, state.month, 1].join('-')))

    const isRangeStart = state.rangeStart && isSameDay(date, state.rangeStart)
    const isRangeEnd = state.rangeEnd && isSameDay(date, state.rangeEnd)
    const isInRange =
      state.rangeStart &&
      state.rangeEnd &&
      isDateInRange(date, state.rangeStart, state.rangeEnd)

    const inCalendarRange =
      startDate && endDate && isDateInRange(date, startDate, endDate)
        ? true
        : false
    const isUnavailable =
      unavailableDates.includes(date) ||
      unavailableDays.includes(date.getDay()) ||
      !inCalendarRange
    const isAvailable = !isUnavailable && inMonth && inCalendarRange

    const dayClasses = [
      'mkui-date',
      classNames?.day,
      range ? 'range' : 'single',
      !inMonth ? 'diff-month' : '',
      isUnavailable ? 'unavailable' : isAvailable ? 'available' : '',
      isSelected ? 'selected' : '',
      isToday ? 'today' : '',
      range && isRangeStart ? 'range-start' : '',
      range && isRangeEnd ? 'range-end' : '',
      range && !isRangeStart && !isRangeEnd && isInRange ? 'range-inner' : '',
      showRangeOnly && !inCalendarRange ? 'hidden' : '',
    ]

    return (
      <button
        type="button"
        className={cn(dayClasses)}
        title={date.toDateString()}
        onClick={() => selectDate(date)}>
        {date.getDate()}
      </button>
    )
  }

  const MonthButton = ({ isNext = false }: { isNext?: boolean }) => {
    let show = true

    if (showRangeOnly && startDate && endDate) {
      const rangeMonth = new Date(isNext ? endDate : startDate).getMonth() + 1
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
        onClick={isNext ? handleNext : handlePrevious}
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
        {getDates().map((d) => {
          const date = new Date(d.join('-'))
          return <Day key={getDateISO(date)} date={date} />
        })}
      </div>
      {showSelections ? (
        <div className="mkui-date-selection flex">
          {range ? (
            <>
              <div className="mkui-date-start">
                <strong>Start Date</strong>
                <div>{state.rangeStart && state.rangeStart.toDateString()}</div>
              </div>
              <div className="mkui-date-end">
                <strong>End Date</strong>
                <div>{state.rangeEnd && state.rangeEnd.toDateString()}</div>
              </div>
            </>
          ) : (
            <div className="mkui-date-selected">
              <strong>Date Selected</strong>
              <div>{state.selected && state.selected.toDateString()}</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
