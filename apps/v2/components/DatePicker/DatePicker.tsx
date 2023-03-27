import * as React from 'react'
import { Calendar } from './Calendar'

export const DatePicker = () => {
  return (
    <div>
      <Calendar
        unavailableDays={[0, 6]}
        onDateChange={(d) => console.log(d)}
        range
      />
    </div>
  )
}
