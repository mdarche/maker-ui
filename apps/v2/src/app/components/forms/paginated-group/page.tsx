'use client'

import * as React from 'react'
import { z } from 'zod'
import { Form, type FormHelpers, type FormValues } from 'maker-ui/forms'

export default function PaginatedGroupPage() {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  const onSubmit = (
    values: FormValues,
    { resetForm, setIsSubmitting, submitCount }: FormHelpers
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
        error={error}
        fields={[
          {
            type: 'page',
            label: 'Page 1',
            name: 'page-1',
            grid: { columns: 4 },
            subFields: [
              {
                type: 'group',
                name: 'group-1',
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
                      .min(2, { message: 'String must contain 2 characters' }),
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
                ],
              },
            ],
          },
          {
            type: 'page',
            name: 'page-2',
            label: 'Page 2',
            subFields: [
              {
                type: 'email',
                name: 'email',
                label: 'Email',
                required: true,
                colSpan: 2,
              },
            ],
          },
        ]}
        settings={{
          columns: 2,
          validateFieldOnBlur: true,
          pageTransition: 'fade-up',
          onPageChange: (page, values) =>
            console.log('Page changed to', page, values),
        }}
        onSubmit={onSubmit}>
        <Form.Progress />
        <Form.Submit lifecycle={{ submitting: 'Submitting' }}>
          Submit
        </Form.Submit>
        <Form.Error>There was an error. Please try to submit again.</Form.Error>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
