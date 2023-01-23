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
                type: 'text',
                name: 'first_name',
                label: 'First Name',
                required: true,
                colSpan: 2,
                validation: z
                  .string()
                  .min(2, { message: 'String must contain 2 chars' }),
              },
            ],
          },
          {
            type: 'page',
            name: 'temp2',
            subFields: [
              {
                type: 'text',
                name: 'last_name',
                label: 'Last Name',
                required: true,
                colSpan: 2,
                validation: z.string().min(2),
              },
            ],
          },
        ]}
        onSubmit={(vals, { submitCount }) => {
          submitHandler(vals)
          console.log('Submit count: ' + submitCount)
        }}>
        <Form.Progress />
        <Form.FieldError />
        {/* <Form.BackButton />
        <Form.NextButton /> */}
        <Form.Submit>Submit</Form.Submit>
        <Form.Footer>Form 2 Footer</Form.Footer>
        <Form.Error>There was an error. Please try to submit again.</Form.Error>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
