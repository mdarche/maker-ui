import React, { useState, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import type { FieldInputProps, DateSelection } from '@/types'
import { useField } from '@/hooks'
import { Calendar } from './Calendar'
import { TimePicker } from './TimePicker'
import { getDatesOnSameDay } from './date-helpers'

function initValue(val?: string | Date | DateSelection): DateSelection {
  if (!val) return {}
  if (typeof val === 'string' || val instanceof Date) return { date: val }
  if (val.startDate && val.endDate) {
    return val as DateSelection
  }
  return {}
}

export const DateTimePicker = ({ name }: FieldInputProps) => {
  const { field, error, setValue } = useField(name)
  const [currentValue, setCurrentValue] = useState<DateSelection>(
    initValue(field?.initialValue)
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
      setValue(selection.date)
    }

    // Set the field value if this field is a range
    if (isRange && selection.startDate && selection.endDate) {
      setValue({ startDate: selection.startDate, endDate: selection.endDate })
    }
  }

  const onChangeTime = (time: Date) => {
    // Invoke callback if it exists
    field?.calendar?.time?.onChange?.(time)
    setValue(time)
  }

  useEffect(() => {
    if (
      isTimePicker &&
      field?.initialValue &&
      (typeof field?.initialValue === 'string' ||
        field?.initialValue instanceof Date)
    ) {
      getUnavailableTimes(new Date(field?.initialValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn(['mkui-datetime', error ? 'error' : undefined])}>
      <Calendar
        {...field?.calendar?.date}
        initialValue={initValue(field?.initialValue)}
        onChange={onChangeDate}
      />
      {isTimePicker && !isRange ? (
        <TimePicker
          {...field?.calendar?.time}
          initialValue={field?.initialValue}
          currentValue={currentValue?.date}
          unavailableTimes={unavailableTimes}
          onChange={onChangeTime}
        />
      ) : null}
    </div>
  )
}
