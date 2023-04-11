'use client'
import * as React from 'react'
import {
  Form,
  useField,
  type FormHelpers,
  type FormValues,
} from 'maker-ui/forms'

const CustomField = () => {
  const { value, setValue } = useField('custom_field')
  return (
    <div className="button-group flex align-center">
      <button
        type="button"
        className={value === 'Option 1' ? 'active' : undefined}
        onClick={() => setValue('Option 1')}>
        Option 1
      </button>
      <button
        type="button"
        className={value === 'Option 2' ? 'active' : undefined}
        onClick={() => setValue('Option 2')}>
        Option 2
      </button>
    </div>
  )
}

export function CustomForm() {
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
    }, 3000)

    // resetForm()
  }

  return (
    <>
      <div style={{ height: 100 }} />
      <Form
        success={success}
        fields={[
          {
            type: 'custom',
            name: 'custom_field',
            label: 'Custom Field',
            component: <CustomField />,
            required: true,
          },
        ]}
        settings={{ columns: 4, validateFieldOnBlur: true }}
        onSubmit={onSubmit}>
        <Form.Submit lifecycle={{ submitting: 'Submitting' }}>
          Submit
        </Form.Submit>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
