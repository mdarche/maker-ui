'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form } from 'maker-ui/forms'

const unavailableTimes = [
  '2023-06-12T11:00:00-04:00',
  '2023-06-12T15:00:00-04:00',
  '2023-06-14T09:00:00-04:00',
]

export function FormDemo() {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  const submitHandler = (values: any) => {
    console.log(values)
    setSuccess(true)
  }

  return (
    <>
      <Form
        success={success}
        error={error}
        fields={[
          {
            type: 'page',
            name: 'temp',
            subFields: [
              {
                type: 'text',
                name: 'first_name',
                label: 'First Name',
                placeholder: 'First Name',
                labelPosition: 'top-left',
                required: 'First name is required',
                colSpan: 2,
                validation: z
                  .string()
                  .min(2, { message: 'String must contain 2 chars' }),
              },
              {
                type: 'text',
                name: 'last_name',
                label: 'Last Name',
                required: true,
                colSpan: 2,
                validation: z
                  .string()
                  .min(2, { message: 'String must contain 2 chars' }),
              },
              {
                type: 'range',
                name: 'price',
                label: 'Price',
                // required: true,
                colSpan: 2,
                range: {
                  multi: true,
                  min: 5,
                  max: 100,
                  step: 5,
                },
              },
              {
                type: 'select',
                name: 'selector',
                label: 'Choose a number',
                required: true,
                options: [
                  { label: 'One', value: 'one' },
                  { label: 'Two', value: 'two' },
                  { label: 'Three', value: 'three' },
                  { label: 'Four', value: 'four', disabled: true },
                  { label: 'Five', value: 'five' },
                  { label: 'Six', value: 'six' },
                  { label: 'Seven', value: 'seven' },
                  { label: 'A', value: 'a', group: 'Letters' },
                  { label: 'B', value: 'b', group: 'Letters' },
                ],
                select: {
                  search: true,
                  multi: true,
                  creatable: true,
                  max: 3,
                },
              },
              {
                type: 'switch',
                name: 'switch',
                label: 'Are you ready?',
                instructions:
                  'If you are ready to rock, leave this marked as true.',
                colSpan: 2,
                switch: {
                  style: 'circle',
                },
              },
              {
                type: 'image-picker',
                name: 'image_upload',
                label: 'Please upload a file',
                initialValue: 'https://picsum.photos/id/237/200/300',
                colSpan: 2,
                image: {
                  // preview: false,
                  // preview: 'https://picsum.photos/id/237/200/300',
                  dropzone: {
                    // component: <span id="test">Test</span>,
                    // label: "Drop it like it's hot",
                    // activeLabel: 'Dropped',
                  },
                },
              },
              {
                type: 'url',
                name: 'website',
                label: 'Website',
                placeholder: 'Website',
                required: true,
                validation: z.string().url('Must be a valid website'),
                conditions: [
                  [
                    // { field: 'switch', compare: 'eq', value: true }
                    {
                      field: 'selector',
                      compare: 'contains',
                      value: 'two',
                    },
                  ],
                ],
              },
              {
                type: 'date-time-picker',
                name: 'calendar',
                required: true,
                initialValue: { date: '2023-06-12T13:00:00-04:00' },
                // conditions: [
                //   [
                //     // { field: 'switch', compare: 'eq', value: true }
                //     {
                //       field: 'selector',
                //       compare: 'contains',
                //       value: 'two',
                //     },
                //   ],
                // ],
                calendar: {
                  date: {
                    // range: true,
                    // rangeMax: 5,
                    // rangeMin: 3,
                    arrowPos: 'split',
                    // showRangeOnly: true,
                    // autoSelect: true,
                    startDate: '2023-06-08T00:00:00-04:00',
                    endDate: '2023-07-14T00:00:00-04:00',
                    unavailable: [
                      '2023-06-08T00:00:00-04:00',
                      '2023-06-09T00:00:00-04:00',
                    ],
                    unavailableDays: [0, 6],
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
            ],
          },
          {
            type: 'page',
            name: 'temp2',
            subFields: [
              {
                type: 'email',
                name: 'email',
                label: 'Email Address',
                required: true,
                colSpan: 2,
                validation: z.string().email(),
              },
            ],
          },
        ]}
        settings={{ columns: 4, validateFieldOnBlur: false }}
        onSubmit={(vals, { submitCount }) => {
          submitHandler(vals)
          console.log('Submit count: ' + submitCount)
        }}>
        <Form.Progress />
        {/* <Form.BackButton />
        <Form.NextButton /> */}
        <Form.Submit>Submit</Form.Submit>
        {/* <Form.Footer>Form 2 Footer</Form.Footer> */}
        <Form.Error>There was an error. Please try to submit again.</Form.Error>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
