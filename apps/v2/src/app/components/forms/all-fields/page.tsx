'use client'

import * as React from 'react'
import { z } from 'zod'
import { Form } from 'maker-ui/forms'

const unavailableTimes = [
  '2023-06-12T11:00:00-04:00',
  '2023-06-12T15:00:00-04:00',
  '2023-06-14T09:00:00-04:00',
]

export default function AllFieldsFormPage() {
  const submitHandler = (values: any) => {
    console.log('Submitted values are', values)
  }

  return (
    <>
      <div style={{ height: 100 }} />
      <Form
        fields={[
          {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Name',
            required: 'First name is required',
            colSpan: 2,
            validation: z
              .string()
              .min(2, { message: 'String must contain 2 chars' }),
          },
          {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            placeholder: 'Description',
            required: true,
          },
          {
            type: 'range',
            name: 'price',
            label: 'Price',
            colSpan: 2,
            range: {
              multi: true,
              min: 5,
              max: 100,
              step: 5,
            },
          },
          {
            type: 'radio',
            name: 'radio',
            label: 'Radio',
            required: true,
            options: [
              { label: 'One', value: 'one' },
              { label: 'Two', value: 'two' },
            ],
          },
          {
            type: 'checkbox',
            name: 'checkbox',
            label: 'Checkbox',
            required: true,
            options: [
              { label: 'One', value: 'one' },
              { label: 'Two', value: 'two' },
            ],
          },
          {
            type: 'select',
            name: 'single-select',
            label: 'Single Select',
            colSpan: 1,
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
          },
          {
            type: 'select',
            name: 'multi-select',
            label: 'Multi Select',
            colSpan: 1,
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
              multi: true,
              creatable: true,
              max: 3,
            },
          },
          {
            type: 'switch',
            name: 'switch',
            label: 'Switch Field',
            instructions: 'Toggle between true and false boolean',
            colSpan: 2,
            required: true,
            switch: {
              style: 'circle',
            },
          },
          {
            type: 'image-picker',
            name: 'image_upload',
            initialValue: 'https://picsum.photos/id/237/200/300',
            colSpan: 2,
            image: {},
          },
          {
            type: 'url',
            name: 'website',
            label: 'URL field',
            placeholder: 'Website',
            required: true,
            validation: z.string().url('Must be a valid website'),
          },
          {
            type: 'date-picker',
            name: 'calendar-range',
            label: 'Date Range Picker',
            initialValue: {
              startDate: '2023-06-12T13:00:00-04:00',
              endDate: '2023-06-13T13:00:00-04:00',
            },
            calendar: {
              date: {
                range: true,
                rangeMax: 5,
                rangeMin: 3,
                showRangeOnly: true,
                startDate: '2023-06-08T00:00:00-04:00',
                endDate: '2023-07-14T00:00:00-04:00',
              },
            },
          },
          {
            type: 'date-time-picker',
            name: 'calendar',
            label: 'Date / Time Picker',
            errorPosition: 'bottom-left',
            initialValue: '2023-06-12T13:00:00-04:00',
            calendar: {
              date: {
                startDate: '2023-06-08T00:00:00-04:00',
                endDate: '2023-07-14T00:00:00-04:00',
                unavailable: [
                  '2023-06-08T00:00:00-04:00',
                  '2023-06-09T00:00:00-04:00',
                ],
                unavailableDays: [0, 6],
              },
              time: {
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
