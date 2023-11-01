'use client'
import * as React from 'react'
import { z } from 'zod'
import { Form, type FormHelpers, type FormValues } from 'maker-ui/forms'

export function SimpleForm() {
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
            name: 'first_name',
            label: 'First Name',
            placeholder: 'First Name',
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
            type: 'textarea',
            name: 'message',
            label: 'Message',
            placeholder: 'Your message...',
            validation: z.string(),
          },
          {
            type: 'text',
            name: 'safe',
            label: 'Size',
            placeholder: 'What is your size?',
            honeypot: true,
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
