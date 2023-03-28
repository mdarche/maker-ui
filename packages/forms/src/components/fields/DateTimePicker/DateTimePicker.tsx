import React, { useState } from 'react'
import { cn } from '@maker-ui/utils'
import { FieldInputProps, DateSelection } from '@/types'
import { useField } from 'src/hooks/useForm'
import { Calendar } from './Calendar'
import { TimePicker } from './TimePicker'

/**
 *
 * @todo - determine type and set up initial state (local)
 * @todo - Combine date and time - ask GPT
 */
export const DateTimePicker = ({ name }: FieldInputProps) => {
  const { field, error, setValue } = useField(name)
  const [val, setVal] = useState<DateSelection>({})

  const isBoth = field?.type === 'date-time-picker'
  const isRange = field?.datetime?.date?.range

  const onChangeDate = (selection: DateSelection) => {
    // if is not range and is both, combine date with time
  }

  const onChangeTime = (time: Date) => {
    // if is not
  }

  return (
    <div className={cn(['mkui-datetime', error ? 'error' : undefined])}>
      <Calendar
        {...field?.datetime?.date}
        initialValue={field?.initialValue}
        onChangeDate={onChangeDate}
      />
      {isBoth ? (
        <TimePicker
          {...field?.datetime?.time}
          initialValue={field?.initialValue?.date}
          onChangeTime={onChangeTime}
        />
      ) : null}
    </div>
  )
}
