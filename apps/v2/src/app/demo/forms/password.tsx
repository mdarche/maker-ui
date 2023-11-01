'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form, type FormHelpers, type FormValues } from 'maker-ui/forms'

export function PasswordForm() {
  const [error, setError] = React.useState(false)

  const onSubmit = (
    values: FormValues,
    { resetForm, setIsSubmitting, submitCount }: FormHelpers
  ) => {
    console.log('Submit count', submitCount)
    console.log('values are', values)

    setTimeout(() => {
      setIsSubmitting(false)
      resetForm()
    }, 1000)

    // resetForm()
  }

  return (
    <>
      <div style={{ height: 100 }} />
      <Form
        error={error}
        fields={[
          {
            type: 'text',
            name: 'tel',
            label: 'Telephone',
            placeholder: '(555) 555-5555',
            text: {
              format: 'phone',
              returnFormatted: true,
            },
            required: true,
          },
          {
            type: 'number',
            name: 'price',
            label: 'Retail Price',
            placeholder: '500.00',
            text: {
              format: 'currency',
              prepend: (
                <div style={{ fontWeight: 700, marginRight: 10, fontSize: 20 }}>
                  $
                </div>
              ),
            },
            required: true,
          },
          {
            type: 'password',
            name: 'pass',
            label: 'Password',
            required: true,
            password: {
              toggle: true,
            },
            colSpan: 2,
            validation: z
              .string()
              .min(5, { message: 'String must contain 5 chars' }),
          },
        ]}
        settings={{
          columns: 4,
          requiredSymbol: true,
        }}
        onSubmit={onSubmit}>
        <Form.Submit lifecycle={{ submitting: 'Submitting' }}>
          Submit
        </Form.Submit>
        <Form.Error>There was an error. Please try to submit again.</Form.Error>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
