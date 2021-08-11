import * as React from 'react'
import { mount } from '@cypress/react'

import { FormProvider, Form } from '@maker-ui/forms'

describe('Form component', () => {
  it('renders with the default props', () => {
    mount(
      <FormProvider data-cy="form">
        <Form>Form beginning</Form>
      </FormProvider>
    )
    cy.get('.announcement')
  })
})
