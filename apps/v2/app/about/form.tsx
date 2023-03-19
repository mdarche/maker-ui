'use client'
import { DatePicker, TimePicker } from '@/client'

const unavailableTime = new Date(new Date().setHours(11, 0, 0, 0))
const unavailableTimes = [unavailableTime]

export const Form = () => {
  return (
    <div className="flex">
      <DatePicker />
      <TimePicker
        interval={60}
        duration={120}
        onTimeChange={() => console.log('Changed')}
        unavailableTimes={unavailableTimes}
      />
    </div>
  )
}
