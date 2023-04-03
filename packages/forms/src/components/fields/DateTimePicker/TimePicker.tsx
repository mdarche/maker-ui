import React, { useState, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import type { DateSelection, TimePickerProps } from '@/types'
import { isSameDay, timeHash } from './date-helpers'

type DivisibleBy15 = number & { __divisibleBy15: never }

function isDivisibleBy15(value: number): value is DivisibleBy15 {
  return value % 15 === 0
}

interface TimePickerFormProps extends TimePickerProps {
  initialValue?: DateSelection['date']
  currentValue?: DateSelection['date']
}

export const TimePicker = ({
  startTime = [9, 0],
  endTime = [18, 0],
  duration,
  interval,
  header,
  unavailableTimes = [],
  onChange,
  initialValue,
  currentValue,
  classNames,
}: TimePickerFormProps) => {
  const [initial, setInitial] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const formatted = timeHash(selectedTime)
  const intervalValue =
    interval !== undefined && isDivisibleBy15(interval) ? interval : 30
  const durationValue =
    duration !== undefined && isDivisibleBy15(duration) ? duration : 30

  const base = currentValue ? new Date(currentValue) : new Date()

  const start =
    startTime && Array.isArray(startTime)
      ? new Date(base.setHours(startTime[0], startTime[1] || 0))
      : startTime
  const end =
    endTime && Array.isArray(endTime)
      ? new Date(base.setHours(endTime[0], endTime[1] || 0))
      : endTime

  const handleTimeChange = (newTime: Date) => {
    setSelectedTime(newTime)
    onChange?.(newTime)
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
    const timeInMinutes = option.getHours() * 60 + option.getMinutes()
    return !unavailable.includes(timeInMinutes)
  })

  useEffect(() => {
    if (initialValue) {
      const v = new Date(initialValue)
      setInitial(v)
      setSelectedTime(v)
    } else {
      setInitial(null)
    }
  }, [initialValue])

  useEffect(() => {
    if (currentValue && initial) {
      setSelectedTime(
        isSameDay(initial, new Date(currentValue)) ? initial : null
      )
    } else {
      setSelectedTime(null)
    }
  }, [currentValue, initial])

  return (
    <div className={cn(['mkui-timepicker', classNames?.root])}>
      <div>
        {header && <div className="mkui-time-header">{header}</div>}
        <div className="mkui-current-date flex justify-center">
          {currentValue && new Date(currentValue).toDateString()}
        </div>
      </div>
      <ul className={cn(['mkui-time-options', classNames?.ul])}>
        {currentValue
          ? filtered.map((option) => {
              const s = timeHash(option)
              return (
                <li key={s} className={classNames?.li}>
                  <button
                    type="button"
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
            })
          : null}
      </ul>
    </div>
  )
}
