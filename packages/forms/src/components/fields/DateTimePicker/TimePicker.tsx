import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { TimePickerProps } from '@/types'
import { timeHash } from './date-helpers'

type DivisibleBy15 = number & { __divisibleBy15: never }

function isDivisibleBy15(value: number): value is DivisibleBy15 {
  return value % 15 === 0
}

export const TimePicker = ({
  startTime = [9, 0],
  endTime = [18, 0],
  duration,
  interval,
  header,
  unavailableTimes = [],
  onChangeTime,
  initialValue,
  classNames,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(
    initialValue ? new Date(initialValue) : null
  )
  const formatted = timeHash(selectedTime)
  const intervalValue =
    interval !== undefined && isDivisibleBy15(interval) ? interval : 30
  const durationValue =
    duration !== undefined && isDivisibleBy15(duration) ? duration : 30

  const start =
    startTime && Array.isArray(startTime)
      ? new Date(new Date().setHours(startTime[0], startTime[1] || 0))
      : startTime
  const end =
    endTime && Array.isArray(endTime)
      ? new Date(new Date().setHours(endTime[0], endTime[1] || 0))
      : endTime

  const handleTimeChange = (newTime: Date) => {
    setSelectedTime(newTime)
    onChangeTime?.(newTime)
  }

  const timeOptions: Date[] = []
  let currentTime = new Date(start)
  while (currentTime <= end) {
    if (isDivisibleBy15(currentTime.getMinutes())) {
      timeOptions.push(new Date(currentTime))
    }
    currentTime.setTime(currentTime.getTime() + intervalValue * 60 * 1000)
  }

  let unavailable: number[] = []

  unavailableTimes.forEach((time) => {
    const t = time.getHours() * 60 + time.getMinutes()
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
    const timeInMinutes = option.getHours() * 60 + option.getMinutes()
    return !unavailable.includes(timeInMinutes)
  })

  return (
    <div className={cn(['mkui-timepicker', classNames?.root])}>
      {header && <div>{header}</div>}
      <ul className={classNames?.ul}>
        {filtered.map((option) => {
          const s = timeHash(option)
          return (
            <li key={s} className={classNames?.li}>
              <button
                className={cn([
                  'mkui-time-option',
                  classNames?.button,
                  s === formatted
                    ? classNames?.selected || 'selected'
                    : undefined,
                ])}
                onClick={(e) => handleTimeChange(option)}>
                {option.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
