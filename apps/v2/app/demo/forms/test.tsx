'use client'
import * as React from 'react'
import {
  FieldProps,
  Form,
  type FormHelpers,
  type FormValues,
} from 'maker-ui/forms'

const fields: FieldProps[] = [
  {
    name: 'logo',
    type: 'image-picker',
    label: 'Company Logo',
    initialValue: undefined,
  },
  {
    name: 'company_name',
    label: 'Company Name',
    placeholder: 'Company name',
    type: 'text',
    required: true,
    initialValue: undefined,

    colSpan: 2,
  },
  {
    name: 'website',
    label: 'Website',
    placeholder: 'Website URL',
    type: 'text',
    required: true,
    initialValue: undefined,

    colSpan: 2,
  },
  {
    name: 'company_description',
    label: 'Company Description',
    placeholder: 'What does your company do?',
    type: 'textarea',
    initialValue: undefined,

    required: true,
  },
  {
    name: 'categories',
    instructions:
      'Please select up to 3 categories that best describe your industry.',
    label: 'Business Categories',
    type: 'select',
    required: true,
    initialValue: undefined,
    errorPosition: 'bottom-left',
    options: [
      {
        label: 'Accounting',
        value: 'ACCOUNTING',
      },
      {
        label: 'Agriculture',
        value: 'AGRICULTURE',
      },
      {
        label: 'Computer Science',
        value: 'COMPUTER_SCIENCE',
      },
      {
        label: 'Construction',
        value: 'CONSTRUCTION',
      },
      {
        label: 'Consulting',
        value: 'CONSULTING',
      },
      {
        label: 'Education',
        value: 'EDUCATION',
      },
      {
        label: 'Engineering',
        value: 'ENGINEERING',
      },
      {
        label: 'Entrepreneurship',
        value: 'ENTREPRENEURSHIP',
      },
      {
        label: 'Finance',
        value: 'FINANCE',
      },
      {
        label: 'Goverment',
        value: 'GOVERNMENT',
      },
      {
        label: 'Healthcare',
        value: 'HEALTHCARE',
      },
      {
        label: 'Law & Law Enforcement',
        value: 'LAW_AND_LAW_ENFORCEMENT',
      },
      {
        label: 'Media & Entertainment',
        value: 'MEDIA_AND_ENTERTAINMENT',
      },
      {
        label: 'Military',
        value: 'MILITARY',
      },
      {
        label: 'Politics',
        value: 'POLITICS',
      },
      {
        label: 'Real Estate',
        value: 'REAL_ESTATE',
      },
      {
        label: 'Retail',
        value: 'RETAIL',
      },
      {
        label: 'Sales & Trading',
        value: 'SALES_AND_TRADING',
      },
      {
        label: 'Science',
        value: 'SCIENCE',
      },
      {
        label: 'Software',
        value: 'SOFTWARE',
      },
      {
        label: 'Sports',
        value: 'SPORTS',
      },
    ],
    select: {
      multi: true,
      max: 3,
      returnType: 'value',
    },
    colSpan: 3,
  },
  {
    name: 'host-divider',
    type: 'divider',
  },
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'What is your role in the company?',
    type: 'text',
    initialValue: null,
    required: true,
    colSpan: 2,
  },
  {
    name: 'job_description',
    label: 'Job Description',
    placeholder: 'What are your typical responsibilities in your role?',
    type: 'textarea',
    initialValue: null,
    required: true,
  },
]

export function TestForm() {
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
        fields={fields}
        settings={{ columns: 4, validateFieldOnBlur: true }}
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
