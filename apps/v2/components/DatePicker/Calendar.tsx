'use client'
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
import { type MakerCSS, Style } from 'maker-ui'

interface DateSelection {
  date?: Date
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
  /** An array of days (0 - 6) that will render disabled calendar days each week.
   * 0 is Sunday and 1 is Monday.
   * @example
   * To disable weekends, use: [0, 6]
   */
  unavailableDays?: number[]
  /** @todo Localization helper. Coming soon... */
  localization?: {}
  /** Callback function that is invoked any time a date is changed or selected. */
  onDateChange: (selection: DateSelection) => void
  /** If true, all days outside of the `startDate` and `endDate` props will be hidden. */
  showRangeOnly?: boolean
  /** Style customizations for the date picker */
  style?: {
    /** A custom border radius for selected dates. Note this does not work for the
     * range picker, only single dates.
     * @default 50%
     */
    borderRadius: number | string | (number | string)[]
    /** A custom border style that will be applied to the edges of the calendar, as well as
     * date cells. */
    border?: boolean
    /** The width of the calendar. Note that the grid contains 7 columns and will auto-fill the
     * available width space.
     * @default '100%' // 100% of the container
     */
    width: number | string | (number | string)[]
    /** Font size of the calendar dates */
    fontSize?: number | string | (number | string)[]
    /** A custom icon for the left month arrow. */
    arrowLeft?: string | React.ReactElement
    /** A custom icon for the right month arrow. */
    arrowRight?: string | React.ReactElement
    /**  Determines where the month navigation arrows should be positioned.
     * @default 'split'
     */
    arrowPos?: 'left' | 'right' | 'split'
    /** If true, the bottom of the calendar will show selected dates.
     * @default true
     */
    showSelections?: boolean
  }
  classNames?: {
    /** Root calendar className */
    calendar?: string
    /** Calendar heading / month navigation container */
    header?: string
    /** The month label  */
    headerMonth?: string
    /** The month previous / next buttons */
    headerButton?: string
    /** The month name cells across the top row of the calendar */
    dayName?: string
    /** The actual date cell */
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
  showRangeOnly = false,
  classNames,
  style,
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
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  })
  const month =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(state.month - 1, 11))]

  const getDates = () => {
    const calMonth = state.month || +state.current?.getMonth()! + 1
    const calYear = state.year || state.current?.getFullYear()
    return getCalendar(calMonth, calYear)
  }

  const calendarStyles = {
    width: style?.width || '100%',
    '.mkui-date.single': {
      borderRadius: style?.borderRadius || '50%',
      border: 'none',
    },
  }

  /**
   * Select a date from the calendar
   * @todo account for maxRange and minRange
   */
  const selectDate = (d: Date) => {
    const isDateObject = isDate(d)
    const date = isDateObject ? d : new Date()
    const isInRange =
      startDate && endDate ? isDateInRange(date, startDate, endDate) : true
    const isEarlier =
      state.dateStart && date.getTime() < state?.dateStart?.getTime()

    if (range && isInRange) {
      // If no start date
      if (!state.dateStart) {
        setState((s) => ({ ...s, dateStart: date }))
      }

      // If start date but no end date yet & invoke callback
      if (state.dateStart && !state.dateEnd) {
        if (isSameDay(state.dateStart, date)) {
          setState((s) => ({ ...s, dateStart: undefined }))
        } else if (isEarlier) {
          setState((s) => ({ ...s, dateStart: date }))
        } else {
          setState((s) => ({ ...s, dateEnd: date }))
          onDateChange({ startDate: state.dateStart, endDate: date })
        }
      }

      // if start date and end date, reset end and set new start date
      if (state.dateStart && state.dateEnd) {
        setState((s) => ({ ...s, dateStart: date, dateEnd: undefined }))
      }

      // If start date and selected date is same as start date -> reset
    } else {
      if (state.current && !isSameDay(d, state.current)) {
        setState({
          current: d,
          month: +d.getMonth() + 1,
          year: d.getFullYear(),
        })
        onDateChange({ date: d })
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
    const isToday = isSameDay(date, today)
    // Check if calendar date is same day as currently selected date
    const isCurrent = !range && state.current && isSameDay(date, state.current)
    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      state.month &&
      state.year &&
      isSameMonth(date, new Date([state.year, state.month, 1].join('-')))
    const isUnavailable =
      unavailableDates.includes(date) || unavailableDays.includes(date.getDay())

    const isRangeStart = state.dateStart && isSameDay(date, state.dateStart)
    const isRangeEnd = state.dateEnd && isSameDay(date, state.dateEnd)
    const isInRange =
      state.dateStart &&
      state.dateEnd &&
      isDateInRange(date, state.dateStart, state.dateEnd)

    const inCalendarRange =
      showRangeOnly &&
      !(startDate && endDate && isDateInRange(date, startDate, endDate))

    const isAvailable = !isUnavailable && inMonth

    const dayClasses = [
      'mkui-btn-date mkui-date',
      classNames?.day,
      range ? 'range' : 'single',
      isUnavailable ? 'unavailable' : '',
      isAvailable ? 'available' : '',
      isCurrent ? 'selected' : '',
      isToday ? 'today' : '',
      range && isRangeStart ? 'range-start' : '',
      range && isRangeEnd ? 'range-end' : '',
      range && !isRangeStart && !isRangeEnd && isInRange ? 'range-inner' : '',
      inCalendarRange ? 'hidden' : '',
    ]

    return (
      <button
        className={cn(dayClasses)}
        title={date.toDateString()}
        onClick={() => selectDate(date)}>
        {date.getDate()}
      </button>
    )
  }

  return (
    <div className={cn(['mkui-calendar', classNames?.calendar])}>
      {/* <Style
        root={styleId}
        css={merge(calendarStyles, css || {})}
        breakpoints={breakpoints}
        mediaQuery={mediaQuery}
      /> */}
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
      {range ? <div></div> : null}
    </div>
  )
}
