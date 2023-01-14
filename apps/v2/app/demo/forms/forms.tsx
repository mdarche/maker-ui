'use client'
import * as React from 'react'
import { Form } from '@maker-ui/forms'

export function FormDemo() {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  const submitHandler = (values: any) => {
    console.log(values)
    setSuccess(true)
  }

  return (
    <>
      <Form
        success={success}
        error={error}
        fields={[]}
        onSubmit={(vals) => {
          submitHandler(vals)
        }}>
        <Form.Header>Form 2 Header</Form.Header>
        {/* <Form.Submit>Submit</Form.Submit> */}
        <Form.Footer>Form 2 Footer</Form.Footer>
        <Form.Error>There was an error</Form.Error>
        <Form.Success>Successful Form</Form.Success>
      </Form>
    </>
  )
}
