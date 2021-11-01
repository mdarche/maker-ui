import * as React from 'react'
import { Announcement } from '@maker-ui/elements'
import { mount } from '@cypress/react'
import { Wrapper } from '../setup'

/**
 * @component
 * Announcement
 *
 * @tests
 * - Render with defaults
 * - Prop: `background`
 * - Prop: `css`, `_css`
 *
 * @todo
 * Use cy.clearLocalStorage() to flush cookies
 */

describe('Announcement', () => {
  /* Render with defaults */

  it('renders with the default props', () => {
    mount(
      <Wrapper>
        <Announcement />
      </Wrapper>
    )
    cy.get('.announcement')
  })

  /* Prop: `background` */

  it('renders a custom close button inner string or component', () => {
    mount(
      <Wrapper>
        <Announcement background="red" />
      </Wrapper>
    )
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper footer>
        <Announcement css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Wrapper>
    )
    cy.get('.announcement').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
