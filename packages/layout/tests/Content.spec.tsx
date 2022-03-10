import * as React from 'react'
import { Content, Main, SideNav, Sidebar } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, defaults, format } from '../setup'

/**
 * @component
 * Content
 *
 * @tests
 * - Render with defaults
 * - Behavior: renders error when nested JSX is incompatible
 * - Behavior: renders child components that have accepted display names
 * - Behavior: renders error when nested child is a string
 * - Layout: `content`
 * - Layout: `content-sidebar`
 * - Layout: `sidebar-content`
 * - Layout: `sidebar-content-sidebar`
 * - Layout: `sidenav-content`
 * - Layout: `content-sidenav`
 */

describe('Content component', () => {
  /* Render with defaults */
  it('renders the Content component', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
        </Content>
      </Wrapper>
    )
    cy.get('#site-inner')
  })

  /* Behavior: renders error when nested JSX is incompatible */

  it('shows a helpful error when layout child component is unknown', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <div>unregistered child</div>
        </Content>
      </Wrapper>
    )
    cy.contains('Invalid layout configuration')
  })

  /* Behavior: renders child components that have accepted display names */

  it('accepts children with specified display names', () => {
    const Fixed = (props) => <div style={{ position: 'fixed' }} {...props} />
    Fixed.displayName = 'Fixed'

    const Provider = () => <></>
    Provider.displayName = 'Provider'

    const Context = () => <></>
    Context.displayName = 'Context'

    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <Fixed>registered child</Fixed>
          <Provider />
          <Context />
        </Content>
      </Wrapper>
    )
    cy.get('main')
  })

  /* Behavior: renders error when nested child is a string */

  it('shows a helpful error when layout is a string', () => {
    mount(
      <Wrapper>
        <Content>string value</Content>
      </Wrapper>
    )
    cy.contains('Invalid layout configuration')
  })

  /* Layout: `content` */

  it('identifies a `content` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
        </Content>
      </Wrapper>
    )
    cy.get('#site-inner').should(
      'have.css',
      'max-width',
      format(defaults.content.maxWidth)
    )
    cy.get('main')
  })

  /* Layout: `content-sidebar` */

  it('identifies a `content-sidebar` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <Sidebar>sidebar</Sidebar>
        </Content>
      </Wrapper>
    )
    cy.get('#site-inner').should('have.css', 'display', 'grid')
    cy.get('main').next('div').should('have.class', 'sidebar')
  })

  /* Layout: `sidebar-content` */

  it('identifies a `sidebar-content` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Sidebar>sidebar</Sidebar>
          <Main>content</Main>
        </Content>
      </Wrapper>
    )
    cy.get('.sidebar').next('main')
    cy.viewport('iphone-x')
      .get('.sidebar')
      .should('have.css', 'grid-row', '2 / auto')
  })

  /* Layout: `sidebar-content-sidebar` */

  it('identifies a `sidebar-content-sidebar` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Sidebar>sidebar</Sidebar>
          <Main>content</Main>
          <Sidebar>sidebar</Sidebar>
        </Content>
      </Wrapper>
    )
    cy.get('.sidebar').eq(0).next('main').next('.sidebar')
    cy.viewport('iphone-x')
      .get('.sidebar')
      .eq(0)
      .should('have.css', 'grid-row', '2 / auto')
  })

  /* Layout: `content-sidenav` */

  it('identifies a `content-sidenav` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <SideNav>sidenav</SideNav>
        </Content>
      </Wrapper>
    )
    /**
     *  SideNav test part 1 -- display and position
     */
    cy.get('#sidenav').should('have.css', 'right', '0px')
    cy.get('#site-inner').should('have.css', 'display', 'inline-flex')
    cy.viewport('iphone-x')
      .get('#sidenav')
      .should('have.css', 'position', 'fixed')
  })

  /* Layout: `sidenav-content` */

  it('identifies a `sidenav-content` layout', () => {
    mount(
      <Wrapper>
        <Content>
          <Main>content</Main>
          <SideNav>sidenav</SideNav>
        </Content>
      </Wrapper>
    )
    /**
     *  SideNav test part 2 -- container height and position
     *
     * @todo - find a good way to test the calculateTop() function impact on
     * the `#sidenav .container` top and height. Cypress doesn't play nicely with calc() styles
     */
    cy.get('#sidenav').should('have.css', 'left', '0px')
    cy.get('#sidenav .container').should('have.css', 'top', '0px')
    cy.get('#sidenav .container').should('have.css', 'height')
  })
})
