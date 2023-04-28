import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(timezone)

export { dayjs, type Dayjs }

/** The current year */
export const THIS_YEAR = dayjs().year()

/** The current month starting from 1 */
export const THIS_MONTH = dayjs().month() + 1

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
export const utcDate = (d?: string | Date | Dayjs) => dayjs.utc(d)

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
export function timeHash(date?: Dayjs | null) {
  if (!date) return ''
  return `${date.hour()}-${date.minute()}`
}

/**
 * Returns a boolean that indicates if a day falls on a weekend
 */
export function isWeekend(date: Dayjs): boolean {
  const dayOfWeek = date.day()
  return dayOfWeek === 0 || dayOfWeek === 6
}

/**
 * Returns a boolean that indicates if a date is within a range
 */
export function isDateInRange(
  date: Dayjs,
  startDate: string | Date | Dayjs,
  endDate?: string | Date | Dayjs
): boolean {
  const start = dayjs.utc(startDate)
  const end = endDate ? dayjs.utc(endDate) : null

  if (!end) {
    return date.isSameOrAfter(start, 'day')
  }

  return date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day')
}

/**
 * Returns the number of days between two days, inclusive of both.
 * @param start The start date.
 * @param end The end date.
 * @param disableWeekends Determines whether to include weekends (Saturday and Sunday) in the count.
 * @returns The number of days between the two dates.
 */
export function getTotalDays(start: Dayjs, end: Dayjs, countWeekends = false) {
  let totalDays = 0
  let weekendDays = 0
  let current = start

  while (current.isSameOrBefore(end, 'day')) {
    const isWeekend = current.day() === 0 || current.day() === 6

    if (isWeekend) {
      weekendDays++
    }

    if (countWeekends || !isWeekend) {
      totalDays++
    }

    current = current.add(1, 'day')
  }

  return { totalDays, weekendDays: countWeekends ? 0 : weekendDays }
}

export function moveToNextWeekday(date: Dayjs, disableWeekends = true): Dayjs {
  if (!disableWeekends) {
    return date
  }
  while (date.day() === 0 || date.day() === 6) {
    date = date.add(1, 'day')
  }
  return date
}

export function getDatesOnSameDay(date: Dayjs, arr: string[]): string[] {
  const targetDate = date.format('YYYY-MM-DD')

  return arr.filter((takenDate) => {
    const d = dayjs(takenDate)
    return d.format('YYYY-MM-DD') === targetDate
  })
}

export const isDayOfWeekAvailable = (
  date: Dayjs,
  unavailableDays: number[] = []
) => {
  const dayOfWeek = date.day()
  return !unavailableDays.includes(dayOfWeek)
}

export const isDateAvailable = (date: Dayjs, unavailable: string[] = []) => {
  const isUnavailableDate = unavailable.some((u) =>
    utcDate(u).isSame(date, 'day')
  )
  return !isUnavailableDate
}

export function getWeekendDaysInRange(start: Dayjs, end: Dayjs): number {
  let weekendDays = 0
  let currentDate = start.clone()

  while (currentDate <= end) {
    const dayOfWeek = currentDate.day()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++
    }
    currentDate = currentDate.add(1, 'day')
  }

  return weekendDays
}
