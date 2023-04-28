'use client'
import * as React from 'react'
import { Form, FormHelpers, FormValues } from 'maker-ui/forms'

// const unavailableTimes = [
//   '2023-06-12T11:00:00-04:00',
//   '2023-06-12T15:00:00-04:00',
//   '2023-06-14T09:00:00-04:00',
// ]

const unavailableTimes = [
  '2023-06-29 21:00:00.000000 +00:00',
  '2023-06-29 15:00:00.000000 +00:00',
]

export function CalendarForm() {
  const submitHandler = (
    values: FormValues,
    { setIsSubmitting }: FormHelpers
  ) => {
    console.log('Submitted values are', values)
    setIsSubmitting(false)
  }

  const unavailable = ['2023-06-14', '2023-06-16', '2023-06-20']

  return (
    <>
      <div style={{ height: 100 }} />
      <Form
        fields={[
          {
            type: 'date-picker',
            name: 'calendar-range',
            label: 'Date Range Picker',
            required: true,
            initialValue: {
              startDate: '2023-07-07T00:00:00+00:00',
              endDate: undefined,
            },
            calendar: {
              returnType: 'iso',
              date: {
                range: true,
                // rangeMax: 5,
                // rangeMin: 3,
                unavailable,
                unavailableDays: [0, 6],
                startDate: '2023-06-08',
                endDate: '2023-07-14',
                showSelections: true,
                // showRangeOnly: true,
              },
            },
          },
          {
            type: 'date-time-picker',
            name: 'calendar',
            label: 'Date / Time Picker',
            errorPosition: 'bottom-left',
            // initialValue: '2023-07-04 18:00:00.000000 +00:00',
            required: true,
            calendar: {
              date: {
                startDate: '2023-06-08',
                endDate: '2023-07-14',
                unavailable,
                unavailableDays: [0, 6],
              },
              time: {
                timezone: 'America/New_York',
                startTime: '9:00',
                endTime: '17:00',
                interval: 60,
                duration: 120,
                unavailableTimes,
                header: 'Meeting times can begin at 9am to 5pm EST',
              },
            },
          },
        ]}
        settings={{ columns: 2, validateFieldOnBlur: false }}
        onSubmit={submitHandler}>
        <Form.Submit>Submit</Form.Submit>
      </Form>
    </>
  )
}
