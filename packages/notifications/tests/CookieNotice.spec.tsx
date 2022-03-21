import { mount } from '@cypress/react'
import { Div } from '@maker-ui/primitives'
import { CookieNotice } from '@maker-ui/notifications'

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
      <Div>
        <CookieNotice />
      </Div>
    )
    cy.get('.announcement')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Div>
        <CookieNotice css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Div>
    )
    cy.get('.cookie-notice').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
