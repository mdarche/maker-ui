import * as React from 'react'
import { Navbar, Header, MobileMenu, MakerUIOptions } from 'maker-ui'
import { mount } from '@cypress/react'

import { Wrapper, testMenu, nestedMenu, format, defaults } from '../setup'

interface NavWrapperProps {
  children: React.ReactNode
  options?: MakerUIOptions
}

const NavWrapper = ({ children, options }: NavWrapperProps) => (
  <Wrapper options={options}>
    <Header>
      {children}
      <MobileMenu />
    </Header>
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

  it('renders a logo that supports a custom `linkFunction`', () => {
    mount(
      <NavWrapper
        options={{
          linkFunction: (path, children, attributes) => (
            <div className="custom-link-wrapper">
              <a href={path} {...attributes}>
                {children}
              </a>
            </div>
          ),
        }}>
        <Navbar logo={<div>Custom</div>} />
      </NavWrapper>
    )
    cy.get('.custom-link-wrapper').contains('Custom')
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
    mount(
      <NavWrapper>
        <Navbar menu={nestedMenu} />
      </NavWrapper>
    )
    cy.get('.menu-text')
      .contains('Three')
      .should('have.css', 'content')
    cy.get('.menu-area').contains('Five')
  })

  it('renders a menu that supports a custom `linkFunction`', () => {
    mount(
      <NavWrapper
        options={{
          linkFunction: (path, children, attributes) => (
            <div className="custom-menu-link">
              <a href={path} {...attributes}>
                {children}
              </a>
            </div>
          ),
        }}>
        <Navbar menu={nestedMenu} />
      </NavWrapper>
    )
    cy.get('.menu-area .menu-primary li')
      .eq(0)
      .get('.custom-menu-link')
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

  it('shows the mobile menu button on desktop screens', () => {
    mount(
      <NavWrapper options={{ mobileMenu: { visibleOnDesktop: true } }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.nav-area .menu-button').click()
  })

  it('hides the widget area on mobile when specified', () => {
    mount(
      <NavWrapper options={{ header: { hideWidgetsOnMobile: true } }}>
        <Navbar menu={testMenu} navArea={<div>Widgets</div>} />
      </NavWrapper>
    )
    cy.contains('Widgets')
    cy.viewport('iphone-x')
      .get('.widget-area')
      .should('have.css', 'display', 'none')
  })

  it('hides the color button when specified', () => {
    mount(
      <NavWrapper
        options={{
          colors: {
            light: {
              text: 'red',
            },
            dark: {
              text: '#000',
            },
          },
          header: { showColorButton: true, hideColorButtonOnMobile: true },
        }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.nav-area .color-button')
    cy.viewport('iphone-x')
      .get('.nav-area .color-button')
      .should('have.css', 'display', 'none')
  })

  it('renders a custom menu button via options', () => {
    mount(
      <NavWrapper
        options={{
          header: {
            menuButton: (isOpen, atts) => (
              <button {...atts}>Custom-Btn!</button>
            ),
          },
        }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.contains('Custom-Btn!')
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').should('have.class', 'active')
  })

  it('renders a custom menu button via props', () => {
    mount(
      <NavWrapper>
        <Navbar
          menu={testMenu}
          menuButton={(isOpen, atts) => <button {...atts}>Custom-Btn!</button>}
        />
      </NavWrapper>
    )
    cy.contains('Custom-Btn!')
    cy.viewport('iphone-x')
      .get('.nav-area .menu-button')
      .click()
    cy.get('#mobile-menu').should('have.class', 'active')
  })

  it('renders a custom color button via options', () => {
    mount(
      <NavWrapper
        options={{
          header: {
            showColorButton: true,
            colorButton: (currentMode, atts) => (
              <button {...atts}>test-{currentMode}</button>
            ),
          },
          colors: {
            light: {
              text: 'red',
            },
            dark: {
              text: '#000',
            },
          },
        }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.contains('test-light')
    cy.get('.color-button').click()
  })

  it('renders a custom color button via props', () => {
    mount(
      <NavWrapper
        options={{
          header: {
            showColorButton: true,
          },
          colors: {
            light: {
              text: 'red',
            },
            dark: {
              text: '#000',
            },
          },
        }}>
        <Navbar
          menu={testMenu}
          colorButton={(currentMode, atts) => (
            <button {...atts}>test-{currentMode}</button>
          )}
        />
      </NavWrapper>
    )
    cy.contains('test-light')
    cy.get('.color-button').click()
  })
})

/**
 * Only way to test layouts in code is by comparing the grid-template-area value (Not ideal)
 * @todo - Add visual diff tests via `cypress-plugin-snapshots`
 */

describe('Navbar - Desktop Layouts', () => {
  it('renders a `basic` layout', () => {
    mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `basic-left` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="basic-left" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `basic-center` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="basic-center" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `center` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="center" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `split` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="split" menu={testMenu} />
      </NavWrapper>
    )
    // Check for 2 menus
  })

  it('renders a `minimal` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="minimal" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `minimal-left` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="minimal-left" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `minimal-center` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="minimal-center" menu={testMenu} />
      </NavWrapper>
    )
  })

  it('renders a `minimal-reverse` layout', () => {
    mount(
      <NavWrapper>
        <Navbar type="reverse" menu={testMenu} />
      </NavWrapper>
    )
  })
})

describe('Navbar - Mobile Layouts', () => {
  it('renders a `basic` layout', () => {
    mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  it('renders a `basic-menu-left` layout', () => {
    mount(
      <NavWrapper>
        <Navbar mobileType="basic-menu-left" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  it('renders a `logo-center` layout', () => {
    mount(
      <NavWrapper>
        <Navbar mobileType="logo-center" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  it('renders a `logo-center-alt` layout', () => {
    mount(
      <NavWrapper>
        <Navbar mobileType="logo-center-alt" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })
})
