import { mount } from '@cypress/react'
import { Sidebar } from '@maker-ui/layout'
import { Wrapper } from './setup'

/**
 * @component
 * Sidebar
 *
 * @tests
 * - Render with defaults
 * - Prop: `className`, `css`
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

  /* Prop: `className`, `css` */

  it('renders with prop values', () => {
    mount(
      <Wrapper>
        <Sidebar className="test-bar" css={{ padding: 5 }}>
          content
        </Sidebar>
      </Wrapper>
    )
    cy.get('.sidebar').should('have.css', 'padding', '5px')
    cy.get('.sidebar').should('have.class', 'test-bar')
  })
})
