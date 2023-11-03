import React, { useState, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import type { FieldInputProps, DateSelection } from '@/types'
import { useField, useForm } from '@/context'

import { Calendar } from './Calendar'
import { TimePicker } from './TimePicker'
import { type Dayjs, dayjs, getDatesOnSameDay } from './date-helpers'

export interface DateTimePickerState {
  date?: Dayjs
  startDate?: Dayjs
  endDate?: Dayjs
}

export const DateTimePicker = ({ name }: FieldInputProps) => {
  const { resetCount } = useForm()
  const { field, value, error, setValue } = useField(name)
  const [currentValue, setCurrentValue] = useState<DateTimePickerState>(
    initValue(value)
  )
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([])

  const isTimePicker = field?.type === 'date-time-picker'
  const isRange = field?.calendar?.date?.range
  const returnType = field?.calendar?.returnType || 'iso'

  function getUnavailableTimes(selection?: Dayjs) {
    const taken = field?.calendar?.time?.unavailableTimes
    if (!selection || !taken) {
      setUnavailableTimes([])
      return
    }
    const dates = getDatesOnSameDay(selection, taken)
    return setUnavailableTimes(dates)
  }

  const onChangeDate = (selection: DateTimePickerState) => {
    // Invoke callback if it exists & set local state
    field?.calendar?.onChange?.({
      date: selection.date?.toISOString(),
      endDate: selection.endDate?.toISOString(),
      startDate: selection.startDate?.toISOString(),
    })
    // console.log('Current value is', selection)
    setCurrentValue(selection)

    // Update available times if this field is a date-time-picker
    if (selection.date && isTimePicker) {
      getUnavailableTimes(selection.date)
    }

    // Set the field value if this field is not a range or a date-time-picker
    if (selection.date && !isTimePicker) {
      setValue(formatReturn(returnType, selection.date))
    }

    // Set the field value if this field is a range
    if (isRange) {
      setValue({
        startDate: formatReturn(returnType, selection.startDate),
        endDate: formatReturn(returnType, selection.endDate),
      })
    }
  }

  const onChangeTime = (time: Dayjs) => {
    // Invoke callback if it exists
    field?.calendar?.onChange?.({ date: time.toDate() })
    setValue(formatReturn(returnType, time))
  }

  useEffect(() => {
    if (
      isTimePicker &&
      value &&
      (typeof value === 'string' || value instanceof Date)
    ) {
      getUnavailableTimes(dayjs.utc(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handle local state when form reset
   */
  useEffect(() => {
    if (resetCount > 0) {
      setCurrentValue(initValue(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCount])

  return (
    <div className={cn(['mkui-datetime', error ? 'error' : undefined])}>
      <Calendar
        {...field?.calendar?.date}
        initialValue={initValue(value)}
        onChange={onChangeDate}
      />
      {isTimePicker && !isRange ? (
        <TimePicker
          {...field?.calendar?.time}
          initialValue={value ? dayjs.utc(value) : undefined}
          currentValue={
            currentValue?.date
              ? dayjs(currentValue?.date?.format('YYYY-MM-DD'))
              : undefined
          }
          unavailableTimes={unavailableTimes}
          onChange={onChangeTime}
        />
      ) : null}
    </div>
  )
}

function initValue(val?: string | Date | DateSelection) {
  if (!val) return {}
  if (typeof val === 'string' || val instanceof Date)
    return { date: dayjs.utc(val) }
  if (typeof val === 'object' && val.startDate) {
    return {
      startDate: dayjs.utc(val.startDate),
      endDate: val.endDate ? dayjs.utc(val.endDate) : undefined,
    }
  }
  return {}
}

function formatReturn(type: 'date' | 'iso', d?: Dayjs) {
  if (!d) return d
  return type === 'date' ? d.toDate() : d.toISOString()
}
