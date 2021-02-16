import * as React from 'react'
import { MobileMenu, Header, Navbar, MakerUIOptions, MenuProps } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, testMenu } from '../setup'

interface TestMobileMenuProps {
  options?: MakerUIOptions
  children?: React.ReactNode
  menu?: MenuProps[]
  [key: string]: any
}

const TestMobileMenu = ({
  menu = testMenu,
  options,
  children,
  ...props
}: TestMobileMenuProps) => (
  <Wrapper content footer options={options}>
    <Header>
      <Navbar logo="Logo" menu={menu} />
      <MobileMenu menu={menu} {...props}>
        {children}
      </MobileMenu>
    </Header>
  </Wrapper>
)

describe('MobileMenu component', () => {
  it('renders the MobileMenu component with default props', () => {
    mount(
      <TestMobileMenu options={{ mobileMenu: { closeOnRouteChange: true } }} />
    )
    cy.get('#mobile-menu').should(
      'have.backgroundColor',
      'var(--color-bg_mobileMenu)'
    )
  })

  it('accepts children, a custom header, and a custom footer', () => {
    mount(
      <TestMobileMenu header={<div>s-header</div>} footer={<div>s-footer</div>}>
        s-inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('#mobile-menu')
      .contains('s-header')
    cy.get('#mobile-menu').contains('s-inner')
    cy.get('#mobile-menu').contains('s-footer')
  })

  it('centers the mobile menu content with the center prop', () => {
    mount(<TestMobileMenu center>s-inner</TestMobileMenu>)
    cy.viewport('iphone-x')
      .get('#mobile-menu')
      .should('have.css', 'align-items', 'center')
  })

  it('accepts and renders a default collapsible menu', () => {
    const menu = [
      {
        label: 'Carousel',
        path: '/carousel',
        submenu: [{ label: 'Root', path: '/root' }],
      },
      { label: 'Accordion', path: '/accordion' },
    ]
    mount(<TestMobileMenu menu={menu} />)
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').contains('Carousel')
    cy.get('#mobile-menu .submenu-toggle').click()
    cy.get('#mobile-menu').contains('Root')
  })

  it('can be closed with the close button', () => {
    mount(<TestMobileMenu />)
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').should('have.class', 'active')
    cy.get('#mobile-menu .menu-button').click()
    cy.get('#mobile-menu').should('not.have.class', 'active')
  })

  it('can be closed `onBlur` by clicking the overlay (mobile)', () => {
    mount(<TestMobileMenu />)
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('header .menu-overlay').click()
    cy.get('#mobile-menu').should('not.have.class', 'active')
  })

  it('removes the close button when specified', () => {
    mount(
      <TestMobileMenu options={{ mobileMenu: { showCloseButton: false } }}>
        s-inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('#mobile-menu .menu-button')
      .should('not.exist')
  })

  it('can be closed `onRouteChange` by clicking a menu link', () => {
    mount(
      <TestMobileMenu
        menu={testMenu}
        options={{ mobileMenu: { closeOnRouteChange: true } }}
      />
    )
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu .collapse-menu li')
      .eq(0)
      .find('a')
      .click()
    cy.get('#mobile-menu').should('not.have.class', 'active')
  })

  it('renders a custom close button via options', () => {
    mount(
      <TestMobileMenu
        options={{
          mobileMenu: {
            closeButton: (isOpen, atts) => (
              <button {...atts}>Custom-btn</button>
            ),
          },
        }}>
        inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.contains('Custom-btn').click()
    cy.get('#mobile-menu').should('not.have.class', 'active')
  })

  it('renders a custom close button via props', () => {
    mount(
      <TestMobileMenu
        closeButton={(isOpen, atts) => <button {...atts}>Custom-btn</button>}>
        inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.contains('Custom-btn').click()
    cy.get('#mobile-menu').should('not.have.class', 'active')
  })

  it('supports `top-right` position for the close button', () => {
    mount(<TestMobileMenu>inner</TestMobileMenu>)
    cy.get('#mobile-menu .menu-button').should('have.css', 'top')
    cy.get('#mobile-menu .menu-button').should('have.css', 'right')
  })

  it('supports `top-left` position for the close button', () => {
    mount(<TestMobileMenu closeButtonPosition="top-left">inner</TestMobileMenu>)
    cy.get('#mobile-menu .menu-button').should('have.css', 'top')
    cy.get('#mobile-menu .menu-button').should('have.css', 'left')
  })

  it('supports `bottom-right` position for the close button', () => {
    mount(<TestMobileMenu closeButtonPosition="top-left">inner</TestMobileMenu>)
    cy.get('#mobile-menu .menu-button').should('have.css', 'bottom')
    cy.get('#mobile-menu .menu-button').should('have.css', 'right')
  })

  it('supports `bottom-left` position for the close button', () => {
    mount(<TestMobileMenu closeButtonPosition="top-left">inner</TestMobileMenu>)
    cy.get('#mobile-menu .menu-button').should('have.css', 'bottom')
    cy.get('#mobile-menu .menu-button').should('have.css', 'left')
  })

  it('supports the `fade`, `fade-up`, and `fade-down` transitions', () => {
    // Check if fade transitions are full width
    mount(
      <TestMobileMenu options={{ mobileMenu: { transition: 'fade-down' } }}>
        inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').should('have.css', 'opacity', '1')
    cy.get('#mobile-menu').should('have.css', 'width', '375px')
    mount(
      <TestMobileMenu options={{ mobileMenu: { transition: 'fade-up' } }}>
        inner
      </TestMobileMenu>
    )
    cy.get('#mobile-menu').should('have.css', 'width', '375px')
  })

  it('supports the `slide-left` and `slide-right` transitions', () => {
    mount(
      <TestMobileMenu
        options={{ mobileMenu: { width: 300, transition: 'slide-left' } }}>
        inner
      </TestMobileMenu>
    )
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').should('have.css', 'width', '300px')
    cy.get('#mobile-menu').should('have.css', 'left', '0px')
    mount(
      <TestMobileMenu
        options={{ mobileMenu: { width: 200, transition: 'slide-right' } }}>
        inner
      </TestMobileMenu>
    )
    cy.get('#mobile-menu').should('have.css', 'width', '200px')
    cy.get('#mobile-menu').should('have.css', 'right', '0px')
  })
})
