import { mount } from '@cypress/react'

import { Wrapper, defaults, format } from './_setup'
import { Footer } from '../src'

/**
 * @component
 * Footer
 *
 * @tests
 * - Render with defaults
 * - Option: `footer.maxWidth`, `colors.light.bg_footer`
 * - Prop: `maxWidth`, `background`
 * - Prop: `css`, `_css`
 */

describe('Footer component', () => {
  /* Render with defaults */

  it('renders the Footer with default props', () => {
    mount(
      <Wrapper header content isFooter>
        <Footer>inner</Footer>
      </Wrapper>
    )

    cy.get('footer').should('have.backgroundColor', 'var(--color-bg_footer)')
    cy.get('footer .container').should(
      'have.css',
      'max-width',
      format(defaults.footer.maxWidth)
    )
  })

  /* Option: `footer.maxWidth`, `colors.light.bg_footer` */

  it('renders with user-generated options', () => {
    mount(
      <Wrapper
        header
        content
        isFooter
        options={{
          colors: { light: { bg_footer: '#e6e6e6' } },
          footer: { maxWidth: 500 },
        }}>
        <Footer>inner</Footer>
      </Wrapper>
    )
    cy.get('footer').should('have.backgroundColor', '#e6e6e6')
    cy.get('footer .container').should('have.css', 'max-width', '500px')
  })

  /* Prop: `maxWidth`, `background` */

  it('prioritizes prop values', () => {
    mount(
      <Wrapper header content isFooter>
        <Footer maxWidth={650} background="#333">
          inner
        </Footer>
      </Wrapper>
    )
    cy.get('footer').should('have.backgroundColor', '#333')
    cy.get('footer .container').should('have.css', 'max-width', '650px')
  })

  /* Prop: `css`, `_css` */

  it('applies _css to root and css to the container', () => {
    mount(
      <Wrapper header content isFooter>
        <Footer _css={{ margin: 10 }} css={{ padding: 20 }}>
          footer
        </Footer>
      </Wrapper>
    )

    cy.get('footer').should('have.css', 'margin', '10px')
    cy.get('footer .container').should('have.css', 'padding', '20px')
  })
})
