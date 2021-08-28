import * as React from 'react'
import { Sidebar } from 'maker-ui'
import { mount } from '@cypress/react'
import { Wrapper } from '../setup'

/**
 * @component
 * Sidebar
 *
 * @tests
 * - Render with defaults
 * - Prop: `className`, `css`, `background`
 */

describe('Sidebar', () => {
  /* Render with defaults */

  it('renders the Sidebar component with default props', () => {
    mount(
      <Wrapper>
        <Sidebar>content</Sidebar>
      </Wrapper>
    )
    cy.get('.sidebar')
  })

  /* Prop: `className`, `css`, `background` */

  it('renders with prop values', () => {
    mount(
      <Wrapper>
        <Sidebar className="test-bar" background="#000" css={{ padding: 5 }}>
          content
        </Sidebar>
      </Wrapper>
    )
    cy.get('.sidebar').should('have.backgroundColor', '#000')
    cy.get('.sidebar').should('have.css', 'padding', '5px')
    cy.get('.sidebar').should('have.class', 'test-bar')
  })
})
