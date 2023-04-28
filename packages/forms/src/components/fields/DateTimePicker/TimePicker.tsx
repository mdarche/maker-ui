import React, { useState } from 'react'
import { cn } from '@maker-ui/utils'
import type { TimePickerProps } from '@/types'
import { dayjs, type Dayjs } from './date-helpers'

type DivisibleBy15 = number & { __divisibleBy15: never }

function isDivisibleBy15(value: number): value is DivisibleBy15 {
  return value % 15 === 0
}

const parseTime = (time: string): [number, number] => {
  if (typeof time !== 'string') {
    throw new Error('Invalid startTime or endTime format')
  }
  const [hours, minutes] = time.split(':').map(Number)
  return [hours, minutes || 0]
}

interface TimePickerFormProps extends TimePickerProps {
  initialValue?: Dayjs
  currentValue?: Dayjs
  onChange?: (time: Dayjs) => void
}

export const TimePicker = ({
  timezone,
  startTime = '9:00',
  endTime = '17:00',
  showSelectedDate = true,
  duration,
  interval,
  header,
  unavailableTimes = [],
  onChange,
  initialValue,
  currentValue,
  timeFormat = 'h:mm A',
  dateFormat = 'ddd MMM DD YYYY',
  classNames,
}: TimePickerFormProps) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | undefined>(
    initialValue
  )

  const intervalValue =
    interval !== undefined && isDivisibleBy15(interval) ? interval : 30
  const durationValue =
    duration !== undefined && isDivisibleBy15(duration) ? duration : 30

  const base = currentValue?.utc() || dayjs.utc()
  const parsedStart = parseTime(startTime)
  const parsedEnd = parseTime(endTime)
  const tz = timezone || dayjs.tz.guess()

  const start = dayjs
    .utc(base)
    .tz(tz)
    .set('hour', parsedStart[0])
    .set('minute', parsedStart[1])

  const end = dayjs
    .utc(base)
    .tz(tz)
    .set('hour', parsedEnd[0])
    .set('minute', parsedEnd[1])

  const handleTimeChange = (newTime: Dayjs) => {
    const t = selectedTime && selectedTime.isSame(newTime) ? undefined : newTime
    setSelectedTime(t)
    if (t) {
      onChange?.(t)
    }
  }

  const timeOptions: Dayjs[] = []
  let currentTime = start
  while (currentTime <= end) {
    if (isDivisibleBy15(currentTime.minute())) {
      timeOptions.push(currentTime)
    }
    currentTime = currentTime.add(intervalValue, 'minute')
  }

  let unavailable: number[] = []

  unavailableTimes.forEach((time) => {
    const _time = new Date(time)
    const t = _time.getHours() * 60 + _time.getMinutes()
    unavailable.push(t)
    const divisible = durationValue / intervalValue
    if (durationValue > intervalValue) {
      ;[...new Array(divisible - 1)].forEach((_, i) => {
        // Removes times before the unavailable time since they will overlap
        unavailable.push(t - intervalValue * (i + 1))
        // Removes all intervals during the unavailable time
        unavailable.push(t + intervalValue * (i + 1))
      })
    }
  })

  const filtered = timeOptions.filter((option) => {
    const timeInMinutes = option.hour() * 60 + option.minute()
    return !unavailable.includes(timeInMinutes)
  })

  return currentValue ? (
    <div className={cn(['mkui-timepicker', classNames?.root])}>
      <div>
        {showSelectedDate && (
          <div className="mkui-current-date flex justify-center">
            {currentValue && currentValue.format(dateFormat)}
          </div>
        )}
        {header && <div className="mkui-time-header">{header}</div>}
      </div>
      <ul className={cn(['mkui-time-options', classNames?.ul])}>
        {filtered.map((option, i) => (
          <li key={`${option.millisecond()}-${i}`} className={classNames?.li}>
            <button
              type="button"
              className={cn([
                'mkui-time-option',
                classNames?.button,
                selectedTime?.isSame(option)
                  ? classNames?.selected || 'selected'
                  : undefined,
              ])}
              onClick={(e) => handleTimeChange(option)}>
              {option.format(timeFormat)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
