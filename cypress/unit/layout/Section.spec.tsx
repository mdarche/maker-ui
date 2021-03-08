import * as React from 'react'
import { Section } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, defaults, format } from '../setup'

describe('Section component', () => {
  it('renders a Section with default props', () => {
    mount(
      <Wrapper header isContent>
        <Section className="section">inner</Section>
      </Wrapper>
    )
    cy.get('.section .container').should('exist')
    cy.get('.section .container').should(
      'have.css',
      'max-width',
      format(defaults.content.maxWidthSection)
    )
  })

  it('renders with user-generated options', () => {
    mount(
      <Wrapper header isContent options={{ content: { maxWidthSection: 300 } }}>
        <Section className="section">inner</Section>
      </Wrapper>
    )
    cy.get('.section .container').should('have.css', 'max-width', '300px')
  })

  it('renders with prop values', () => {
    mount(
      <Wrapper header isContent>
        <Section
          className="section"
          maxWidth={700}
          background="#000"
          color="#333">
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section').should('have.backgroundColor', '#000')
    cy.get('.section').should('have.color', '#333')
    cy.get('.section .container').should('have.css', 'max-width', '700px')
  })

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper header isContent>
        <Section
          className="section"
          _css={{ margin: 20 }}
          css={{ padding: 10 }}>
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section').should('have.css', 'margin', '20px')
    cy.get('.section .container').should('have.css', 'padding', '10px')
  })

  it('applies css to root when container is false', () => {
    mount(
      <Wrapper header isContent>
        <Section
          className="section"
          container={false}
          _css={{ margin: 20 }}
          css={{ padding: 10 }}>
          inner
        </Section>
      </Wrapper>
    )
    cy.get('.section .container').should('not.exist')
    cy.get('.section').should('have.css', 'margin', '20px')
    cy.get('.section').should('have.css', 'padding', '10px')
  })
})
