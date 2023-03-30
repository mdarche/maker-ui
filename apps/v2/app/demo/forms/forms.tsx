'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form } from 'maker-ui/forms'

export function FormDemo() {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  const submitHandler = (values: any) => {
    console.log(values)
    // setError(true)
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
                  { label: 'A', value: 'a', group: 'Letters' },
                  { label: 'B', value: 'b', group: 'Letters' },
                  { label: 'One', value: 'one' },
                  { label: 'Two', value: 'two' },
                  { label: 'Three', value: 'three' },
                  { label: 'Four', value: 'four', disabled: true },
                  { label: 'Five', value: 'five' },
                  { label: 'Six', value: 'six' },
                  { label: 'Seven', value: 'seven' },
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
