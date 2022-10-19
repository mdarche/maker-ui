import * as React from 'react'
import { Div } from '@maker-ui/primitives'
import { mount } from '@cypress/react'
import { Announcement } from '@maker-ui/notifications'

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
      <Div>
        <Announcement />
      </Div>
    )
    cy.get('.announcement')
  })

  /* Prop: `background` */

  it('renders with a background color', () => {
    mount(
      <Div>
        <Announcement background="red" />
      </Div>
    )
  })

  it('renders a custom close button inner string or component', () => {
    mount(
      <Div>
        <Announcement closeButton="Close" />
      </Div>
    )
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Div>
        <Announcement css={{ margin: 10 }} _css={{ padding: 20 }} />
      </Div>
    )
    cy.get('.announcement').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
