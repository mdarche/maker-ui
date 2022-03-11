import { mount } from '@cypress/react'

import { Header, Topbar } from '../src'
import { Wrapper } from './_setup'

/**
 * @component
 * Header
 *
 * @tests
 * - Render with defaults
 * - Option: `header.sticky`, `colors.light.bg_header`
 * - Option: `header.stickyOnMobile`
 * - Option: `header.stickyUpScroll`
 * - Option: `header.scrollClass`
 * - Option: `header.absolute`
 * - Prop: `background`, `absolute`, `stickyOnMobile`
 * - Behavior: uses fixed positioning when header is sticky and absolute
 * - Behavior: uses Topbar height to calculate top position when sticky
 */

describe('Header component - unit tests', () => {
  /* Render with defaults */

  it('renders the Header with default props', () => {
    mount(
      <Wrapper>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', 'var(--color-bg_header)')
    cy.get('header').should('have.css', 'position', 'relative')
  })

  /* Option: `header.sticky`, `colors.light.bg_header` */

  it('renders with user-generated options', () => {
    mount(
      <Wrapper
        options={{
          colors: { light: { bg_header: '#000' } },
          header: { sticky: true },
        }}>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', '#000')
    cy.get('header').should('have.css', 'position', 'sticky')
  })

  /* Option: `header.stickyOnMobile` */

  it('supports stickyOnMobile option', () => {
    mount(
      <Wrapper options={{ header: { stickyOnMobile: true } }}>
        <Header background="#000">inner</Header>
      </Wrapper>
    )
    cy.viewport('iphone-x')
    cy.get('header').should('have.css', 'position', 'sticky')
  })

  /* Option: `header.stickyUpScroll` */

  it('supports stickyUpScroll option', () => {
    mount(
      <Wrapper options={{ header: { stickyUpScroll: true } }}>
        <Header background="#000">inner</Header>
        <div style={{ height: 3000 }}></div>
      </Wrapper>
    )
    cy.scrollTo(0, 750)
    cy.get('header').should('have.class', 'scroll-active')
    cy.scrollTo(0, 300)
    cy.get('header').should('not.have.class', 'scroll-active')
  })

  /* Option: `header.scrollClass` */

  it('supports scrollClass option', () => {
    mount(
      <Wrapper
        options={{
          header: { scrollClass: { scrollTop: 300, className: 'test-class' } },
        }}>
        <Header background="#000">inner</Header>
        <div style={{ height: 3000 }}></div>
      </Wrapper>
    )
    cy.scrollTo(0, 400)
    cy.get('header').should('have.class', 'test-class')
    cy.scrollTo(0, 0)
    cy.get('header').should('not.have.class', 'test-class')
  })

  /* Option: `header.absolute` */

  it('supports the absolute option', () => {
    mount(
      <Wrapper options={{ header: { absolute: true } }}>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'position', 'absolute')
  })

  /* Prop: `background`, `absolute`, `stickyOnMobile` */

  it('prioritizes prop values', () => {
    mount(
      <Wrapper>
        <Header background="#000" absolute stickyOnMobile>
          inner
        </Header>
      </Wrapper>
    )
    cy.get('header').should('have.backgroundColor', '#000')
    cy.get('header').should('have.css', 'position', 'absolute')
    cy.viewport('iphone-x')
    cy.get('header').should('have.css', 'position', 'fixed')
  })

  /* Behavior: uses fixed positioning when header is sticky and absolute */

  it('transforms absolute into fixed positioning when sticky', () => {
    mount(
      <Wrapper>
        <Header sticky absolute>
          inner
        </Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'position', 'fixed')
  })

  /* Behavior: uses Topbar height to calculate top position when sticky */

  it('uses the Topbar height to calculate its top position when Topbar is sticky', () => {
    mount(
      <Wrapper options={{ topbar: { sticky: true }, header: { sticky: true } }}>
        <Topbar css={{ height: 60 }}>text</Topbar>
        <Header>inner</Header>
      </Wrapper>
    )
    cy.get('header').should('have.css', 'top', '60px')
  })
})
