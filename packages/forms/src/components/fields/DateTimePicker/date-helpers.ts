import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

/** The current year */
export const THIS_YEAR = +new Date().getFullYear()

/** The current month starting from 1 */
export const THIS_MONTH = +new Date().getMonth() + 1

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
/**
 * Pads a string value with leading zeroes(0) until length is reached
 * @example zeroPad(5, 2) => "05"
 */
export const zeroPad = (value: number, length: number) => {
  return `${value}`.padStart(length, '0')
}

/**
 * Number days in a month for a given year from 28 - 31
 */
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0
  return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31
}

/**
 * First day of the month for a given year from 1 - 7 where
 * Sunday = 1 and Saturday = 7
 */
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1
}

/**
 * Checks if a value is a date - this is just a simple check
 */
export const isDate = (date: Date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]'
  const isValidDate = date && !Number.isNaN(date.valueOf())

  return isDate && isValidDate
}

/**
 * Checks if two date values are of the same month and year
 */
export const isSameMonth = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false
  const basedateMonth = +basedate.getMonth() + 1
  const basedateYear = basedate.getFullYear()
  const dateMonth = +date.getMonth() + 1
  const dateYear = date.getFullYear()
  return +basedateMonth === +dateMonth && +basedateYear === +dateYear
}

/**
 * Checks if two date values are the same day
 */
export const isSameDay = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false
  const basedateDate = basedate.getDate()
  const basedateMonth = +basedate.getMonth() + 1
  const basedateYear = basedate.getFullYear()
  const dateDate = date.getDate()
  const dateMonth = +date.getMonth() + 1
  const dateYear = date.getFullYear()
  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  )
}

/**
 * Formats the given date as YYYY-MM-DD. Months and Days are zero padded
 */
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null
  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2),
  ].join('-')
}

/**
 * Returns the month and year before the given month and year
 * @example
 * getPreviousMonth(1, 2000) => {month: 12, year: 1999}
 * getPreviousMonth(12, 2000) => {month: 11, year: 2000}
 */
export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12
  const prevMonthYear = month > 1 ? year : year - 1
  return { month: prevMonth, year: prevMonthYear }
}

/**
 * Returns the month and year after the given month and year
 * @example
 * getNextMonth(1, 2000) => {month: 2, year: 2000}
 * getNextMonth(12, 2000) => {month: 1, year: 2001}
 */
export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1
  const nextMonthYear = month < 12 ? year : year + 1
  return { month: nextMonth, year: nextMonthYear }
}

/**
 * This function returns an array of calendar dates for a month in the specified year
 * Each calendar date is represented as an array => [YYYY, MM, DD]
 * */
export const getCalendar = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getMonthDays(month, year)
  const monthFirstDay = getMonthFirstDay(month, year)

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays)

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  )
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year)
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear)

  /** Builds dates to be displayed from previous month */
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth)
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)]
  })

  /** Builds dates to be displayed from current month */
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1
    return [year, zeroPad(month, 2), zeroPad(day, 2)]
  })

  /** Builds dates to be displayed from next month */
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)]
  })

  // Combines all dates from previous, current and next months
  const allDates = [...prevMonthDates, ...thisMonthDates, ...nextMonthDates]

  // Remove the last week if it has no dates in the current month
  const lastWeek = allDates.slice(-7)
  const hasCurrentMonthDates = lastWeek.some(
    (date) => date[1] === zeroPad(month, 2)
  )
  if (!hasCurrentMonthDates) {
    allDates.splice(-7)
  }

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
export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay()
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
