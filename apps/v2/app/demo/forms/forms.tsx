'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form } from '@maker-ui/forms'

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
                type: 'group',
                name: 'group1',
                label: 'Group 1',
                subFields: [
                  {
                    type: 'text',
                    name: 'first_name',
                    label: 'First Name',
                    labelPosition: 'top-left',
                    required: true,
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
                    required: true,
                    colSpan: 2,
                    range: {
                      multi: true,
                      min: 5,
                      max: 100,
                      step: 5,
                    },
                  },
                  {
                    type: 'switch',
                    name: 'switch',
                    label: 'Are you ready?',
                    colSpan: 2,
                    // switch: {
                    //   style: 'circle',
                    // },
                  },
                ],
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
        <Form.FieldError />
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
