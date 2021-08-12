import * as React from 'react'
import { mount } from '@cypress/react'

import { BasicForm } from './setup'

/**
 * @remark
 * These tests are not designed to cover Formik or Yup functionality. These libraries
 * are covered extensively by their authors. We test for @maker-ui/forms-specific
 * features and the integration with Formik/Yup.
 */

// Test grid

// Test submit

// Test validation

describe('Form component', () => {
  it('renders a basic form with test fields', () => {
    mount(<BasicForm />)
    cy.get('[data-cy=wrapper]')
    cy.get('[data-cy=submit]')
    // cy.get('[data-cy=form]')
    //   .find('.field-container')
    //   .should('have.length', 2)
  })

  it('renders basic field elements', () => {
    // Check for name, id, containerClass, label, description, placeholder,
    mount(<BasicForm />)
    cy.get('[data-cy=submit]')
    // cy.get('[data-cy=form]')
    //   .find('.field-container')
    //   .should('have.length', 2)
  })

  it('enforces field validation', () => {
    mount(<BasicForm />)
    cy.get('#username').type('mikedarche')
    cy.get('[data-cy=submit]').click()
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
