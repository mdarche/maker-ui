import React, { useState, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import { FieldInputProps, DateSelection } from '@/types'
import { useField } from '@/hooks'
import { Calendar } from './Calendar'
import { TimePicker } from './TimePicker'
import { getDatesOnSameDay } from './date-helpers'

export const DateTimePicker = ({ name }: FieldInputProps) => {
  const { field, error, setValue } = useField(name)
  const [currentValue, setCurrentValue] = useState<DateSelection>(
    field?.initialValue
  )
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([])

  const isTimePicker = field?.type === 'date-time-picker'
  const isRange = field?.calendar?.date?.range

  function getUnavailableTimes(selection?: Date) {
    const takenDates = field?.calendar?.time?.unavailableTimes
    if (!selection || !takenDates) {
      setUnavailableTimes([])
      return
    }
    const dates = getDatesOnSameDay(selection, takenDates)
    return setUnavailableTimes(dates)
  }

  const onChangeDate = (selection: DateSelection) => {
    // Invoke callback if it exists & set local state
    field?.calendar?.date?.onChange?.(selection)
    setCurrentValue(selection)

    // Update available times if this field is a date-time-picker
    if (selection.date && isTimePicker) {
      getUnavailableTimes(new Date(selection.date))
    }

    // Set the field value if this field is not a range or a date-time-picker
    if (selection.date && !isTimePicker) {
      setValue({ date: selection.date })
    }

    // Set the field value if this field is a range
    if (isRange && selection.startDate && selection.endDate) {
      setValue({ startDate: selection.startDate, endDate: selection.endDate })
    }
  }

  const onChangeTime = (time: Date) => {
    // Invoke callback if it exists
    field?.calendar?.time?.onChange?.(time)
    setValue({ date: time })
  }

  useEffect(() => {
    if (field?.initialValue?.date) {
      getUnavailableTimes(new Date(field?.initialValue?.date))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn(['mkui-datetime', error ? 'error' : undefined])}>
      <Calendar
        {...field?.calendar?.date}
        initialValue={field?.initialValue}
        onChange={onChangeDate}
      />
      {isTimePicker && !isRange ? (
        <TimePicker
          {...field?.calendar?.time}
          initialValue={field.initialValue?.date}
          currentValue={currentValue?.date}
          unavailableTimes={unavailableTimes}
          onChange={onChangeTime}
        />
      ) : null}
    </div>
  )
}
