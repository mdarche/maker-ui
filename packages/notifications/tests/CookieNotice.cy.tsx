import * as React from 'react'
import { CookieNotice } from '../src'

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
    cy.mount(
      <div>
        <CookieNotice />
      </div>
    )
    cy.get('.announcement')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    cy.mount(
      <div>
        <CookieNotice css={{ margin: 10 }} _css={{ padding: 20 }} />
      </div>
    )
    cy.get('.cookie-notice').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
