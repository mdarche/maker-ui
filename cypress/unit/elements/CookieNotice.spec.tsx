import * as React from 'react'
import { CookieNotice } from '@maker-ui/elements'
import { mount } from '@cypress/react'
import { Wrapper } from '../setup'

/**
 * @component
 * CookieNotice
 *
 * @tests
 * - Render with defaults
 * - Prop: `css`, `_css`
 *
 * @todo
 * Use cy.clearLocalStorage() to flush cookies
 */

describe('CookieNotice', () => {
  /* Render with defaults */

  it('renders with the default props', () => {
    mount(
      <Wrapper>
        <CookieNotice />
      </Wrapper>
    )
    cy.get('.announcement')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper header content footer>
        <CookieNotice css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Wrapper>
    )
    cy.get('.cookie-notice').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
