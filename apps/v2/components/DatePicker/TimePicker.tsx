import * as React from 'react'
import { cn } from 'maker-ui/utils'

type DivisibleBy15 = number & { __divisibleBy15: never }

function isDivisibleBy15(value: number): value is DivisibleBy15 {
  return value % 15 === 0
}

interface TimePickerProps {
  /** The start time for the time picker.
   * @default [9, 0] // 9:00 AM ([Hour,  Minute])
   */
  startTime?: Date | number[]
  /** The last possible start time for the time picker.
   * @default [18, 0] // 6:00 PM ([Hour,  Minute])
   */
  endTime?: Date | number[]
  /** The duration in minutes of each time slot. This must be divisible by 15.
   * @default 30 // 30 minutes
   */
  interval?: number
  /** An optional message that will display above the time picker. */
  header?: string
  /** An array of times that should not be available for selection. */
  unavailableTimes?: Date[]
  /** A callback that will be called when a time is selected. */
  onTimeChange: (time: Date) => void
}

export const TimePicker = ({
  startTime = [9, 0],
  endTime = [18, 0],
  interval,
  header,
  unavailableTimes = [],
  onTimeChange,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null)
  const intervalValue =
    interval !== undefined && isDivisibleBy15(interval) ? interval : 30
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
    onTimeChange(newTime)
  }

  const timeOptions: Date[] = []
  let currentTime = new Date(start)
  while (currentTime <= end) {
    if (isDivisibleBy15(currentTime.getMinutes())) {
      timeOptions.push(new Date(currentTime))
    }
    currentTime.setTime(currentTime.getTime() + intervalValue * 60 * 1000)
  }

  console.log('props', start, end, unavailableTimes)

  // const filteredOptions = timeOptions.filter(
  //   (option) =>
  //     !unavailableTimes.find(
  //       (unavailableTime) => option.getTime() === unavailableTime.getTime()
  //     )
  // )

  const unavailableSet = new Set(
    unavailableTimes.map((time) => time.getHours() * 60 + time.getMinutes())
  )

  const filtered = timeOptions.filter((option) => {
    const timeInMinutes = option.getHours() * 60 + option.getMinutes()
    return !unavailableSet.has(timeInMinutes)
  })

  return (
    <div className="mkui-timepicker">
      {header && <div>{header}</div>}
      <ul className="mkui-time-list">
        {filtered.map((option) => (
          <li key={`${option.getTime()}-${intervalValue}`}>
            <button
              className={cn([
                'mkui-time-option',
                selectedTime?.toISOString() === option.toISOString()
                  ? 'active'
                  : undefined,
              ])}
              onClick={(e) => handleTimeChange(option)}>
              {option.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
