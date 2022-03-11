import { mount } from '@cypress/react'
import { Topbar } from '@maker-ui/layout'
import { Wrapper, defaults, format } from './setup'

/**
 * @component
 * Topbar
 *
 * @tests
 * - Render with defaults
 * - Option: `topbar.maxWidth`, `colors.light.bg_topbar`
 * - Option: `topbar.sticky`, `topbar.stickyOnMobile`
 * - Prop: `stickyOnMobile`
 * - Prop: `scrollOverflow`
 * - Prop: `css`, `_css`
 */

describe('Topbar', () => {
  /* Render with defaults */

  it('renders the Topbar component with default props', () => {
    mount(
      <Wrapper>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.backgroundColor', 'var(--color-bg_topbar)')
    cy.get('#topbar .container').should(
      'have.css',
      'max-width',
      format(defaults.topbar.maxWidth)
    )
  })

  /*  Option: `topbar.maxWidth`, `colors.light.bg_topbar` */

  it('renders with user-generated options', () => {
    mount(
      <Wrapper
        options={{
          colors: { light: { bg_topbar: '#e5e1e8' } },
          topbar: { maxWidth: 600 },
        }}>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.backgroundColor', '#e5e1e8')
    cy.get('#topbar .container').should('have.css', 'max-width', '600px')
  })

  /* Option: `topbar.sticky`, `topbar.stickyOnMobile` */

  it('applies sticky styles according to options', () => {
    mount(
      <Wrapper options={{ topbar: { sticky: true, stickyOnMobile: false } }}>
        <Topbar>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.css', 'position', 'sticky')
    cy.viewport('iphone-x')
      .get('#topbar')
      .should('have.css', 'position', 'relative')
  })

  /* Prop: `stickyOnMobile` */

  it.only('applies sticky styles according to props', () => {
    mount(
      <Wrapper>
        <Topbar stickyOnMobile>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar').should('have.css', 'position', 'relative')
    cy.viewport('iphone-x')
      .get('#topbar')
      .should('have.css', 'position', 'sticky')
  })

  /* Prop: `scrollOverlow` */

  it('sets the scrollOverflow prop', () => {
    mount(
      <Wrapper>
        <Topbar scrollOverflow>inner</Topbar>
      </Wrapper>
    )
    cy.get('#topbar .container').should('have.css', 'overflow-x', 'scroll')
    cy.get('#topbar .container').should('have.css', 'white-space', 'nowrap')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper>
        <Topbar _css={{ margin: 10 }} css={{ padding: 20 }}>
          topbar
        </Topbar>
      </Wrapper>
    )

    cy.get('#topbar').should('have.css', 'margin', '10px')
    cy.get('#topbar .container').should('have.css', 'padding', '20px')
  })
})
