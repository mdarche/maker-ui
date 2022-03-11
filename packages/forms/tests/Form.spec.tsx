import { mount } from '@cypress/react'

import type { FieldProps } from '@maker-ui/forms'
import { BasicForm } from './setup'

describe('Form component', () => {
  it('renders a basic form with test fields', () => {
    mount(<BasicForm />)
    cy.get('[data-cy=wrapper]')
    cy.get('[data-cy=submit]')
    cy.get('[data-cy=form]').find('.field-container').should('have.length', 2)
  })

  it('renders a custom grid gap with the gap prop', () => {
    mount(<BasicForm formProps={{ gap: 30 }} />)
    cy.get('.form-grid').should('have.css', 'grid-gap', '30px 30px')
  })

  const gridFields: FieldProps[] = [
    {
      name: 'username',
      label: 'Your Username',
      type: 'text',
      initialValue: '',
      colSpan: 1,
    },
    {
      name: 'telephone',
      label: 'Your Telephone',
      type: 'tel',
      initialValue: '',
      colSpan: 2,
    },
    {
      name: 'email',
      label: 'Your Email address',
      type: 'email',
      initialValue: '',
    },
  ]

  // TODO create a custom command to handle these calculated widths (this text and the next)

  it('renders a custom css grid container via `columns` number value', () => {
    cy.viewport(1200, 800)
    mount(<BasicForm fields={gridFields} formProps={{ columns: 3 }} />)
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('374.656px 374.672px 374.672px')
      })
    cy.viewport(600, 800)
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('584px')
      })
  })

  it('renders a custom css grid container via `columns` responsive string value', () => {
    cy.viewport(1200, 800)
    mount(
      <BasicForm
        fields={gridFields}
        formProps={{ columns: ['1fr 100px', 'repeat(4, 1fr)'] }}
      />
    )
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('273.5px 273.5px 273.5px 273.5px')
      })
    cy.viewport(600, 800)
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('454px 100px')
      })
  })

  it('enforces multiple field validation', () => {
    mount(<BasicForm />)
    cy.get('.form-error').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.form-error').should('have.length', 2)
    cy.get('[type=text]').type('mkdarche')
    cy.get('[data-cy=submit]').click()
    cy.get('.form-error').should('have.length', 1)
  })
})
