import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(timezone)

export type Dayjs = dayjs.Dayjs

/** The current year */
export const THIS_YEAR = new Date().getFullYear()

/** The current month starting from 1 */
export const THIS_MONTH = new Date().getMonth() + 1

/** Week days names and shortnames */
export const WEEK_DAYS = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
}

/** Calendar months names and short names */
export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
}

/** Number of weeks displayed on calendar */
export const CALENDAR_WEEKS = 6

/** Returns a UTC compliant DayJS date */
export const utcDate = (d: string | Date) => dayjs.utc(d)

/**
 * Checks if a value is a date - this is just a simple check
 */
export const isDate = (date: any) => dayjs(date).isValid()

/**
 * Checks if two date values are of the same month and year
 */
export const isSameMonth = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false

  const dayjsDate = dayjs(date)
  const dayjsBasedate = dayjs(basedate)

  return dayjsDate.isSame(dayjsBasedate, 'month')
}

/**
 * Checks if two date values are the same day
 */
export const isSameDay = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false

  const dayjsDate = dayjs(date)
  const dayjsBasedate = dayjs(basedate)

  return dayjsDate.isSame(dayjsBasedate, 'day')
}

/**
 * Returns the month and year before the given month and year
 * @example
 * getPreviousMonth(1, 2000) => {month: 12, year: 1999}
 * getPreviousMonth(12, 2000) => {month: 11, year: 2000}
 */
export const getPreviousMonth = (month: number, year: number) => {
  const dayjsDate = dayjs()
    .year(year)
    .month(month - 1) // Month is zero-based in Day.js
  const previousMonthDate = dayjsDate.subtract(1, 'month')
  return {
    month: previousMonthDate.month() + 1,
    year: previousMonthDate.year(),
  }
}

/**
 * Returns the month and year after the given month and year
 * @example
 * getNextMonth(1, 2000) => {month: 2, year: 2000}
 * getNextMonth(12, 2000) => {month: 1, year: 2001}
 */
export const getNextMonth = (month: number, year: number) => {
  const dayjsDate = dayjs()
    .year(year)
    .month(month - 1) // Month is zero-based in Day.js
  const nextMonthDate = dayjsDate.add(1, 'month')
  return { month: nextMonthDate.month() + 1, year: nextMonthDate.year() }
}

/**
 * This function returns an array of calendar dates for a month in the specified year
 * Each calendar date is represented as an array => [YYYY, MM, DD]
 * */
export const getCalendar = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthStart = dayjs()
    .year(year)
    .month(month - 1)
    .startOf('month')
  const monthDays = monthStart.daysInMonth()
  const monthFirstDay = monthStart.day()

  const daysFromPrevMonth = monthFirstDay === 0 ? 0 : monthFirstDay
  const daysFromNextMonth =
    (CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays)) % 7

  const prevMonthStart = monthStart.subtract(1, 'month')
  const nextMonthStart = monthStart.add(1, 'month')
  const prevMonthDays = prevMonthStart.daysInMonth()

  const formatDate = (date: dayjs.Dayjs) => {
    return date.format('YYYY-MM-DD')
  }

  /** Builds dates to be displayed from previous month */
  const prevMonthDates = Array.from(
    { length: daysFromPrevMonth },
    (_, index) => {
      const day = index + 1 + (prevMonthDays - daysFromPrevMonth)
      return formatDate(prevMonthStart.date(day))
    }
  )

  /** Builds dates to be displayed from current month */
  const thisMonthDates = Array.from({ length: monthDays }, (_, index) => {
    const day = index + 1
    return formatDate(monthStart.date(day))
  })

  /** Builds dates to be displayed from next month */
  const nextMonthDates = Array.from(
    { length: daysFromNextMonth },
    (_, index) => {
      const day = index + 1
      return formatDate(nextMonthStart.date(day))
    }
  )

  const allDates = [...prevMonthDates, ...thisMonthDates, ...nextMonthDates]

  return allDates
}

/**
 * Creates a string using the time hours and minutes
 */
export function timeHash(date?: Date | null) {
  if (!date) return ''
  return `${date.getHours()}-${date.getMinutes()}`
}

/**
 * Returns a boolean that indicates if a day falls on a weekend
 */
export function isWeekend(date: dayjs.Dayjs): boolean {
  const dayOfWeek = date.day()
  return dayOfWeek === 0 || dayOfWeek === 6
}

/**
 * Returns a boolean that indicates if a date is within a range
 */
export function isDateInRange(
  date: Date | string,
  startDate: Date | string,
  endDate?: Date | string
): boolean {
  const dateObj = dayjs(date)
  const startObj = dayjs(startDate)
  const endObj = endDate ? dayjs(endDate) : null

  if (!endObj) {
    return dateObj.isSameOrAfter(startObj, 'day')
  }

  return (
    dateObj.isSameOrAfter(startObj, 'day') &&
    dateObj.isSameOrBefore(endObj, 'day')
  )
}

/**
 * Returns the next available date based on the given start date, end date, unavailable days
 * and off-limit days
 */
export function getNextAvailableDate(
  autoSelect?: boolean,
  startDate?: string | Date | null,
  endDate?: string | Date | null,
  unavailableDays: (string | Date)[] = [],
  offLimitDays: number[] = []
): Date | undefined {
  if (!autoSelect) return undefined
  if (!startDate) return new Date()
  let current = new Date(startDate)
  let end = endDate ? new Date(endDate) : null

  while (end === null || current <= end) {
    const dayOfWeek = current.getDay()
    if (
      !unavailableDays.some(
        (unavailableDay) =>
          new Date(unavailableDay).getTime() === current.getTime()
      ) &&
      !offLimitDays.includes(dayOfWeek)
    ) {
      return current
    }
    current.setDate(current.getDate() + 1)
  }

  return undefined
}

/**
 * Returns the number of days between two days, inclusive of both.
 * @param start The start date.
 * @param end The end date.
 * @param disableWeekends Determines whether to include weekends (Saturday and Sunday) in the count.
 * @returns The number of days between the two dates.
 */
export function getTotalDays(
  start: Date,
  end: Date,
  disableWeekends = false
): number {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  let diff = endDate.diff(startDate, 'day') + 1

  if (disableWeekends) {
    const numWeekends = countWeekends(startDate, endDate)
    diff -= numWeekends
  }

  return diff
}

function countWeekends(start: dayjs.Dayjs, end: dayjs.Dayjs): number {
  let numWeekends = 0
  let current = start

  while (current.isBefore(end, 'day')) {
    if (current.day() === 0 || current.day() === 6) {
      numWeekends++
    }
    current = current.add(1, 'day')
  }

  if (end.day() === 0 || end.day() === 6) {
    numWeekends++
  }

  return numWeekends
}

export function getDatesOnSameDay(date: Date, arr: string[]): string[] {
  const targetDate = dayjs(date).format('YYYY-MM-DD')

  return arr.filter((takenDate) => {
    const d = dayjs(takenDate)
    return d.format('YYYY-MM-DD') === targetDate
  })
}

export function isDateUnavailable(
  dateStrings: string[],
  currentDate: Date
): boolean {
  const currentDayjsDate = dayjs(currentDate).startOf('day')

  return dateStrings.some((dateString) => {
    const inputDayjsDate = dayjs(dateString).startOf('day')
    return inputDayjsDate.isSame(currentDayjsDate)
  })
}
