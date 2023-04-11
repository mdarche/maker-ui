'use client'
import * as React from 'react'
import { FieldProps, Form, FormHelpers, FormValues } from 'maker-ui/forms'

interface User {
  first_name?: string
  last_name?: string
  website?: string
  image?: string
}

const getFields = (user?: User): FieldProps[] => {
  return [
    {
      name: 'first_name',
      type: 'text',
      label: 'First Name',
      placeholder: 'First Name',
      initialValue: user?.first_name,
      required: true,
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Last Name',
      initialValue: user?.last_name,
      required: true,
    },
    {
      name: 'website',
      type: 'url',
      label: 'Website',
      placeholder: 'Website',
      initialValue: user?.website,
      required: true,
    },
    {
      name: 'image',
      type: 'image-picker',
      label: 'Image',
    },
  ]
}

export function DynamicForm() {
  const [error, setError] = React.useState(false)
  const [user, setUser] = React.useState<User | undefined>({
    first_name: 'John',
    last_name: 'Doe',
    website: 'https://example.com',
  })

  const fields = getFields(user)

  const submitHandler = (
    values: FormValues<User>,
    { setIsSubmitting }: FormHelpers
  ) => {
    console.log('Submitted values are', values)

    setTimeout(() => {
      setIsSubmitting(false)
      setUser(values)
    }, 1000)
  }

  return (
    <>
      <div style={{ height: 100 }} />
      <button onClick={() => setUser((s) => ({ ...s, first_name: 'Miguel' }))}>
        Update stateful user
      </button>
      <button onClick={() => setUser(undefined)}>Remove stateful user</button>
      <Form
        error={error}
        fields={fields}
        settings={{
          columns: 2,
          validateFieldOnBlur: false,
          requiredSymbol: true,
        }}
        onSubmit={submitHandler}>
        <Form.Submit lifecycle={{ submitting: 'Submitting...' }}>
          Submit
        </Form.Submit>
        <Form.Error>There was an error. Please try to submit again.</Form.Error>
      </Form>
    </>
  )
}
