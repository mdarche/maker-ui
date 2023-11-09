'use client'

import * as React from 'react'
import { z } from 'zod'
import { Form, type FormHelpers, type FormValues } from 'maker-ui/forms'

export default function RepeaterFormPage() {
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
        settings={{ columns: 4, validateFieldOnBlur: true }}
        fields={[
          {
            type: 'text',
            name: 'title',
            label: 'Project Title',
            placeholder: 'Title',
            labelPosition: 'top-left',
            required: 'First name is required',
            colSpan: 2,
            validation: z
              .string()
              .min(2, { message: 'String must contain 2 chars' }),
          },
          {
            type: 'repeater',
            name: 'projects',
            label: 'Projects',
            required: true,
            repeater: {
              max: 3,
            },
            validation: z
              .array(z.any())
              .min(2, 'Array must have at least 2 items.'),
            // initialValue: [
            //   {
            //     status: { label: 'Active', value: 'active' },
            //     description: 'Project 1',
            //   },
            //   {
            //     status: { label: 'Inactive', value: 'inactive' },
            //     description: 'Project 2',
            //   },
            // ],
            subFields: [
              {
                type: 'select',
                name: 'status',
                label: 'Status',
                required: true,
                colSpan: 2,
                options: [
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ],
                select: {
                  search: true,
                  multi: true,
                  creatable: true,
                  returnType: 'value',
                  max: 3,
                },
              },
              {
                type: 'textarea',
                name: 'description',
                label: 'Description',
                colSpan: 2,
                required: true,
                placeholder: 'Project description...',
                validation: z.string(),
              },
            ],
          },
        ]}
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
