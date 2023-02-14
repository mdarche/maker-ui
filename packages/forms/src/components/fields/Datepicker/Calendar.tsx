import { cn } from '@maker-ui/utils'
import React, { useState, useEffect } from 'react'
import {
  getCalendar,
  isDate,
  isSameDay,
  // isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from './helper'

/**
 * TODO - Parameters for date input
 * - Start Date, End Date
 * - Disabled Days (specific + weekend boolean)
 * - Localized month / day names
 * - Range, maximum range
 * TODO - Parameters for time input
 * - Start Time, End Time
 * - Time increment for schedule (by 15 mins)
 * - Timezone
 * - Disabled days, disabled days + times, weekend boolean
 */

interface CalendarProps {
  date: Date
  onDateChanged: (date: Date) => void
}

interface CalendarState {
  current?: Date | null
  month: number
  year: number
}

export const Calendar = ({ date, onDateChanged }: CalendarProps) => {
  const [today] = useState(new Date())
  const [state, setState] = useState<CalendarState>({
    current: new Date(),
    month: 0,
    year: 0,
  })
  const month =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(state.month - 1, 11))]

  const addDateToState = (d: Date) => {
    const isDateObject = isDate(d)
    const _date = isDateObject ? d : new Date()
    setState({
      current: isDateObject ? d : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    })
  }

  const getDates = () => {
    const calMonth = state.month || +state.current?.getMonth()! + 1
    const calYear = state.year || state.current?.getFullYear()
    return getCalendar(calMonth, calYear)
  }

  /** Event Handlers */

  const goToDate = (d: Date) => {
    !(state.current && isSameDay(d, state.current)) && addDateToState(d)
    onDateChanged(d)
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

  /** Lifecycle Methods */

  useEffect(() => {
    addDateToState(date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Day = ({ date }: { date: Date }) => {
    const isToday = isSameDay(date, today)
    // Check if calendar date is same day as currently selected date
    const isCurrent = state.current && isSameDay(date, state.current)
    // Check if calendar date is in the same month as the state month and year
    // const inMonth =
    //   month &&
    //   state.year &&
    //   isSameMonth(date, new Date([state.year, state.month, 1].join('-')))
    // todo - ensure date is in the accepted range
    const isDisabled = false

    return (
      <button
        className={cn([
          'mkui-btn-date mkui-calendar-date',
          isDisabled ? 'disabled' : '',
          isCurrent ? 'selected' : '',
          isToday ? 'today' : '',
        ])}
        title={date.toDateString()}
        disabled={isDisabled}
        onClick={() => goToDate(date)}>
        {date.getDate()}
      </button>
    )
  }

  return (
    <div className="mkui-calendar">
      <div className="mkui-calendar-header">
        <button
          className="mkui-btn-month previous"
          onClick={handlePrevious}
          title="Previous Month">
          Prev
        </button>
        <div className="mkui-month">
          {month} {state.year}
        </div>
        <button
          className="mkui-btn-month next"
          onClick={handleNext}
          title="Next Month">
          Next
        </button>
      </div>
      <div className="mkui-calendar-grid">
        {Object.keys(WEEK_DAYS).map((day) => (
          <div key={day} className="mkui-day-label">
            {/* @ts-ignore */}
            {WEEK_DAYS[day].toUpperCase()}
          </div>
        ))}
        {getDates().map((d) => {
          const date = new Date(d.join('-'))
          return <Day key={getDateISO(date)} date={date} />
        })}
      </div>
    </div>
  )
}
