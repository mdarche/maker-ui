import * as React from 'react'
import { Navbar, Header, MakerUIOptions } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, testMenu, format, defaults } from '../setup'

interface NavWrapperProps {
  children: React.ReactNode
  options?: MakerUIOptions
}

const NavWrapper = ({ children, options }: NavWrapperProps) => (
  <Wrapper options={options}>
    <Header>{children}</Header>
  </Wrapper>
)

describe('Navbar component', () => {
  it('renders Navbar component with default props', () => {
    mount(
      <NavWrapper>
        <Navbar />
      </NavWrapper>
    )
    cy.get('.nav-grid')
    cy.get('.layout-basic.m-layout-basic').should(
      'have.css',
      'max-width',
      format(defaults.header.maxWidth)
    )
  })

  it('supports a custom logo component', () => {
    mount(
      <NavWrapper>
        <Navbar logo={<div>Custom</div>} />
      </NavWrapper>
    )
    cy.get('.nav-grid').contains('Custom')
  })

  it('supports custom grid area components', () => {
    mount(
      <NavWrapper>
        <Navbar
          logoArea={<div>logo</div>}
          navArea={<div>nav</div>}
          menuArea={<div>menu</div>}
        />
      </NavWrapper>
    )
    cy.get('.logo-area').contains('logo')
    cy.get('.nav-area').contains('nav')
    cy.get('.menu-area').contains('menu')
  })

  it('renders a nav menu that supports nested drop downs', () => {
    const nestedMenu = [
      { label: 'One', path: '/' },
      { label: 'Two', path: '/two' },
      {
        label: 'Three',
        path: '#',
        submenu: [
          { label: 'Five', path: '/five' },
          { label: 'Six', path: '/six' },
        ],
      },
      { label: 'Four', path: '/four' },
    ]
    mount(
      <NavWrapper>
        <Navbar menu={nestedMenu} />
      </NavWrapper>
    )
    cy.get('.menu-area').contains('Five')
  })

  it('hides the nav menu on mobile', () => {
    mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
      .get('.menu-area')
      .should('have.css', 'display', 'none')
  })

  it('allows for horizontal scroll overlow', () => {
    mount(
      <NavWrapper options={{ header: { menuOverflow: 'scroll' } }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.menu-area').should('have.css', 'overflow-x', 'scroll')
  })

  /**
   * Only way to test layouts without snapshots is by comparing the grid-template-area value.
   * Doesn't seem like a very effective test.
   */
})
