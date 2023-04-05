import * as React from 'react'
import { Announcement } from '../src'

/**
 * @component
 * Announcement
 *
 * @tests
 * - Render with defaults
 * - Prop: `background`
 * - Prop: `closeButton`
 * - Prop: `allowClose`
 * - Prop: `css`
 * - Prop: `fixed`
 * - Prop: `storageKey`, `type`, `expiration`
 */

describe('Announcement', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  /* Render with defaults */

  it('renders with the default props', () => {
    cy.mount(<Announcement>Inner text</Announcement>)
    // cy.get('.announcement')
  })

  /* Prop: `background` */

  it('renders with a background color', () => {
    cy.mount(
      <Announcement data-cy="announcement" background="red">
        Announcement
      </Announcement>
    )
    cy.get('[data-cy="announcement"]').should(
      'have.css',
      'background-color',
      'rgb(255, 0, 0)'
    )
  })

  /* Prop: `closeButton` */

  it('renders a custom close button inner string or component', () => {
    cy.mount(
      <Announcement data-cy="announcement" closeButton="Close">
        Announcement text
      </Announcement>
    )
    cy.contains('Close').click()
    cy.get('[data-cy="announcement"]').should('not.exist')
  })

  it('renders a custom close callback function', () => {
    cy.mount(
      <Announcement
        data-cy="announcement"
        closeButton={(atts) => (
          <button data-cy="btn" {...atts}>
            Close!
          </button>
        )}>
        Announcement text
      </Announcement>
    )
    cy.get('[data-cy="btn"]').click()
    cy.get('[data-cy="announcement"]').should('not.exist')
  })

  /* Prop: `allowClose` */

  it('does not render a close button if `allowClose` is false', () => {
    cy.mount(
      <Announcement
        data-cy="announcement"
        closeButton="Close"
        allowClose={false}>
        Announcement text
      </Announcement>
    )
    cy.contains('Close').should('not.exist')
  })

  /* Prop: `css`  */

  it('applies css to the announcement', () => {
    cy.mount(
      <Announcement
        data-cy="announcement"
        css={{ margin: 10, span: { padding: 20 } }}>
        <span>Content</span>
      </Announcement>
    )
    cy.get('[data-cy="announcement"]').should('have.css', 'margin', '10px')
    cy.get('[data-cy="announcement"] span').should(
      'have.css',
      'padding',
      '20px'
    )
  })

  /* Prop: `fixed` */

  it('renders a fixed announcement', () => {
    cy.mount(
      <Announcement
        data-cy="announcement"
        fixed
        css={{ top: 0, left: 0, right: 0 }}>
        Announcement text
      </Announcement>
    )
    cy.get('[data-cy="announcement"]').should('have.css', 'position', 'fixed')
    cy.get('[data-cy="announcement"]').should('have.css', 'top', '0px')
    cy.get('[data-cy="announcement"]').should('have.css', 'left', '0px')
  })

  /* Prop: `storageKey`, `type`, `expiration` */

  it('renders a cookie announcement', () => {
    cy.mount(
      <Announcement
        data-cy="announcement"
        storageKey="announcement"
        type="cookie"
        expiration={1200}>
        Announcement text
      </Announcement>
    )
    cy.get('[data-cy="announcement"]').should('exist')
    cy.get('button').click()
    cy.get('[data-cy="announcement"]').should('not.exist')
    cy.wait(300)
    cy.mount(
      <Announcement
        data-cy="announcement"
        storageKey="announcement"
        type="cookie">
        Announcement text
      </Announcement>
    )
    cy.get('[data-cy="announcement"]').should('exist')
  })
})
