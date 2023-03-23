import * as React from 'react'
import { Calendar } from './Calendar'

export const DatePicker = () => {
  return (
    <div>
      <Calendar onDateChange={(d) => console.log(d)} range />
    </div>
  )
}
