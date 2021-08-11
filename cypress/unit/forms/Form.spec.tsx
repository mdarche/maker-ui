import * as React from 'react'
import { mount } from '@cypress/react'

import { Form, Yup, FieldProps, FormHelpers } from '@maker-ui/forms'

export interface FormValues {
  username: string
  password: string
}

export const formFields: FieldProps[] = [
  {
    name: 'username',
    id: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    errorPosition: 'bottom-right',
    initialValue: '',
  },
  {
    name: 'password',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    errorPosition: 'bottom-right',
    initialValue: '',
  },
]

export const FormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

describe('Form component', () => {
  it('renders a single page form', () => {
    mount(
      <Form.Provider
        fields={formFields}
        validationSchema={FormSchema}
        onSubmit={(values: FormValues, actions: FormHelpers) => {
          console.log('Actions are', actions)
          console.log('Submitted', values)
        }}>
        <Form id="form-1" data-cy="form">
          <Form.Submit>Submit</Form.Submit>
        </Form>
      </Form.Provider>
    )
    cy.get('[data-cy=form]')
  })

  // it('renders a paginated form', () => {
  //   mount(
  //     <Form.Provider fields={formFields} validationSchema={} onSubmit={}>
  //       <Form.Header />
  //       <Form id="" data-cy="form" columns={} gap={}>
  //         <Form.Progress />
  //         <Form.Page id="" title="" columns={} gap={} fields={}></Form.Page>
  //         <Form.Page id="" title="" columns={} gap={} fields={}></Form.Page>
  //         <Form.Submit />
  //       </Form>
  //       <Form.Footer />
  //     </Form.Provider>
  //   )
  //   cy.get('.announcement')
  // })
})
