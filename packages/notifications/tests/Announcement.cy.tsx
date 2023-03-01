import * as React from 'react'
import { Announcement } from '../src'

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

  it.only('renders with the default props', () => {
    cy.mount(
      <div>
        <Announcement>Inner text</Announcement>
      </div>
    )
    // cy.get('.announcement')
  })

  /* Prop: `background` */

  it('renders with a background color', () => {
    cy.mount(
      <div>
        <Announcement background="red" />
      </div>
    )
  })

  it('renders a custom close button inner string or component', () => {
    cy.mount(
      <div>
        <Announcement closeButton="Close" />
      </div>
    )
  })

  /* Prop: `css`  */

  it('applies _css to root and css to the container', () => {
    cy.mount(
      <div>
        <Announcement css={{ margin: 10 }} />
      </div>
    )
    cy.get('.announcement').should('have.css', 'padding', '20px')
    cy.get('.container').should('have.css', 'margin', '10px')
  })
})
