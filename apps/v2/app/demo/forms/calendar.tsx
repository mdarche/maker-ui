'use client'
import * as React from 'react'
import { Form, FormHelpers, FormValues } from 'maker-ui/forms'

// const unavailableTimes = [
//   '2023-06-12T11:00:00-04:00',
//   '2023-06-12T15:00:00-04:00',
//   '2023-06-14T09:00:00-04:00',
// ]

const unavailableTimes = ['2023-06-29 21:00:00.000000 +00:00']

export function CalendarForm() {
  const submitHandler = (
    values: FormValues,
    { setIsSubmitting }: FormHelpers
  ) => {
    console.log('Submitted values are', values)
    setIsSubmitting(false)
  }

  const unavailable = ['2023-06-14', '2023-06-16']

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
            // initialValue: {
            //   startDate: '2023-07-08T00:00:00+00:00',
            //   endDate: undefined,
            // },
            calendar: {
              date: {
                range: true,
                // rangeMax: 5,
                // rangeMin: 3,
                // showRangeOnly: true,
                unavailable,
                startDate: '2023-06-08T00:00:00-04:00',
                endDate: '2023-07-14T00:00:00-04:00',
                showSelections: true,
              },
            },
          },
          {
            type: 'date-time-picker',
            name: 'calendar',
            label: 'Date / Time Picker',
            errorPosition: 'bottom-left',
            // initialValue: '2023-07-12T13:00:00-04:00',
            required: true,
            calendar: {
              date: {
                startDate: '2023-06-08T00:00:00-04:00',
                endDate: '2023-07-14T00:00:00-04:00',
                unavailable,
                unavailableDays: [0, 6],
                showSelections: true,
              },
              time: {
                startTime: [9, 0],
                endTime: [17, 0],
                interval: 60,
                duration: 120,
                unavailableTimes,
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
