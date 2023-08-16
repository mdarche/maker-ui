'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form, type FormHelpers, type FormValues } from 'maker-ui/forms'

export function GroupedForm() {
  const [success, setSuccess] = React.useState(false)

  const onSubmit = (
    values: FormValues,
    { setIsSubmitting, submitCount }: FormHelpers
  ) => {
    console.log('Submit count', submitCount)
    console.log('values are', values)

    setTimeout(() => {
      setSuccess(true)
      setIsSubmitting(false)
      // resetForm()
    }, 6000)

    // resetForm()
  }

  return (
    <>
      <div style={{ height: 100 }} />
      <Form
        success={success}
        settings={{ columns: 2 }}
        fields={[
          {
            type: 'switch',
            name: 'activate',
            label: 'Activate Group',
            initialValue: true,
            colSpan: 1,
          },
          {
            type: 'group',
            name: 'group-1',
            colSpan: 1,
            conditions: [[{ field: 'activate', compare: 'eq', value: true }]],
            subFields: [
              {
                type: 'text',
                name: 'first_name',
                label: 'First Name',
                placeholder: 'First Name',
                labelPosition: 'top-left',
                required: 'First name is required',
                colSpan: 1,
                validation: z
                  .string()
                  .min(2, { message: 'String must contain 2 chars' }),
              },
              {
                type: 'text',
                name: 'last_name',
                label: 'Last Name',
                required: true,
                colSpan: 1,
                validation: z
                  .string()
                  .min(2, { message: 'String must contain 2 chars' }),
              },
            ],
          },
        ]}
        onSubmit={onSubmit}>
        <Form.Submit lifecycle={{ submitting: 'Submitting' }}>
          Submit
        </Form.Submit>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
