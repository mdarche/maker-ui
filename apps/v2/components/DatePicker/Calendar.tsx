import React, { useState } from 'react'
import { cn, generateId, merge } from 'maker-ui/utils'
import {
  getCalendar,
  isDate,
  isSameDay,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
  isSameMonth,
  isDateInRange,
} from './helper'
import { MakerCSS, Style } from 'maker-ui'

interface DateSelection {
  date: Date
  startDate?: Date
  endDate?: Date
}

interface CalendarProps extends MakerCSS {
  /** Earliest date that will be visible in the Calendar. Required if `range` is true.  */
  startDate?: Date
  /** Latest date that will be visible in the Calendar. Required if `range` is true. */
  endDate?: Date
  /** If true, users can select a start and end date. */
  range?: boolean
  /** The maximum number of days that a user can select in their date range. */
  rangeMax?: number
  /** The minimum number of days that a user can select in their date range. */
  rangeMin?: number
  /** An array of unavailable dates or date strings that will render disabled calendar days. */
  unavailable?: string[]
  /** An array of days (1-7) that will render disabled calendar days each week.
   * 1 is Monday and 7 is Sunday.
   * @example
   * To disable weekends, use: [6, 7]
   */
  unavailableDays?: number[]
  /** @todo Localization helper. Coming soon... */
  localization?: {}
  /** Callback function that is invoked any time a date is changed or selected. */
  onDateChange: (selection: DateSelection) => void
  /** If true, all days outside of the `startDate` and `endDate` props will be hidden. */
  showRangeOnly?: boolean
  style?: {
    border?: boolean
    width: number | string | (number | string)[]
    fontSize?: number | string | (number | string)[]
    arrowLeft?: string | React.ReactElement
    arrowRight?: string | React.ReactElement
    arrowPos?: 'left' | 'right' | 'split'
  }
  classNames?: {
    calendar?: string
    header?: string
    headerMonth?: string
    headerButton?: string
    dayName?: string
    day?: string
  }
}

interface CalendarState {
  current?: Date | null
  dateStart?: Date
  dateEnd?: Date
  month: number
  year: number
}

export const Calendar = ({
  startDate,
  endDate,
  range,
  rangeMax,
  rangeMin,
  unavailable = [],
  unavailableDays = [],
  onDateChange,
  showRangeOnly,
  classNames,
  css,
  breakpoints,
  mediaQuery,
}: CalendarProps) => {
  const now = new Date()
  const [today] = useState(now)
  const [styleId] = useState(generateId())
  const [unavailableDates] = useState(unavailable.map((d) => new Date(d)) || [])
  const [state, setState] = useState<CalendarState>({
    current: now,
    dateStart: undefined,
    dateEnd: undefined,
    month: now.getMonth(),
    year: now.getFullYear(),
  })
  const month =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(state.month, 11))]

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
    const calMonth = state.month || +state.current?.getMonth()!
    const calYear = state.year || state.current?.getFullYear()
    return getCalendar(calMonth, calYear)
  }

  /** Event Handlers */

  const selectDate = (d: Date) => {
    // handle range selection or single date selection
    !(state.current && isSameDay(d, state.current)) && addDateToState(d)
    // onDateChange(d)
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
    const isToday = isSameDay(date, today)
    // Check if calendar date is same day as currently selected date
    const isCurrent = state.current && isSameDay(date, state.current)
    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      state.month &&
      state.year &&
      isSameMonth(date, new Date([state.year, state.month, 1].join('-')))
    const isUnavailable =
      unavailableDates.includes(date) ||
      unavailableDays.includes(date.getDay() + 1)

    const isRangeStart = state.dateStart && isSameDay(date, state.dateStart)
    const isRangeEnd = state.dateEnd && isSameDay(date, state.dateEnd)
    const isInRange =
      state.dateStart && isDateInRange(date, state.dateStart, state.dateEnd)

    const inCalendarRange =
      showRangeOnly && isDateInRange(date, startDate as Date, endDate as Date)

    const valid = !isUnavailable && inMonth

    const dayClasses = [
      'mkui-btn-date mkui-date',
      classNames?.day,
      isUnavailable ? 'disabled' : '',
      valid ? 'valid' : '',
      isCurrent ? 'selected' : '',
      isToday ? 'today' : '',
      range && isRangeStart ? 'range-start' : '',
      range && isRangeEnd ? 'range-end' : '',
      range && isInRange ? 'range-inner' : '',
      showRangeOnly && !inCalendarRange ? 'hidden' : '',
    ]

    return (
      <button
        className={cn(dayClasses)}
        title={date.toDateString()}
        disabled={isUnavailable}
        onClick={() => selectDate(date)}>
        {date.getDate()}
      </button>
    )
  }

  return (
    <div className={cn(['mkui-calendar', classNames?.calendar, styleId])}>
      <Style
        root={styleId}
        css={{ ...css }}
        breakpoints={breakpoints}
        mediaQuery={mediaQuery}
      />
      <div className={cn(['mkui-calendar-header', classNames?.header])}>
        <button
          className={cn(['mkui-btn-month previous', classNames?.headerButton])}
          onClick={handlePrevious}
          title="Previous Month">
          Prev
        </button>
        <div
          className={cn([
            'mkui-month',
            classNames?.headerMonth,
          ])}>{`${month} ${state.year}`}</div>
        <button
          className={cn(['mkui-btn-month next', classNames?.headerButton])}
          onClick={handleNext}
          title="Next Month">
          Next
        </button>
      </div>
      <div className="mkui-calendar-grid">
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
    </div>
  )
}
