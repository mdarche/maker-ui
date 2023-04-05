import {
  Navbar,
  Header,
  MobileMenu,
  type MakerUIOptions,
} from '@maker-ui/layout'
import { Wrapper, testMenu, nestedMenu, format, defaults } from './setup'

/**
 * @component
 * Navbar
 *
 * @tests
 * - Render with defaults
 * - Option: `linkFunction`
 * - Option: `header.menuOverflow`
 * - Option: `mobileMenu.visibleOnDesktop`
 * - Option: `header.showWidgetsOnMobile`
 * - Option: `header.showColorButton`, `header.showColorButtonOnMobile`
 * - Option: `header.menuButton` (callback)
 * - Option: `header.colorButton` (callback)
 * - Prop: `logo` (component)
 * - Prop: `logo` (callback)
 * - Prop: `logoArea`, `navArea`, `menuArea`
 * - Prop: `menu`
 * - Prop: `menuButton` (callback)
 * - Prop: `colorButton` (callback)
 * - Behavior: automatically hides the nav menu on mobile
 * - Desktop Layout: `basic`
 * - Desktop Layout: `basic-left`
 * - Desktop Layout: `basic-center`
 * - Desktop Layout: `center`
 * - Desktop Layout: `split`
 * - Desktop Layout: `minimal`
 * - Desktop Layout: `minimal-left`
 * - Desktop Layout: `minimal-center`
 * - Desktop Layout: `minimal-reverse`
 * - Mobile Layout: `basic`
 * - Mobile Layout: `basic-menu-left`
 * - Mobile Layout: `logo-center`
 * - Mobile Layout: `logo-center-alt`
 *
 * @todo
 * The only way to test layouts via code is by comparing the grid-template-area value (not ideal).
 * Add visual diff tests via `cypress-plugin-snapshots`
 */

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

describe('Navbar', () => {
  /*  Render with defaults */
  it('renders Navbar component with default props', () => {
    cy.mount(
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

  /*  Option: `linkFunction` */

  it('renders a menu that supports a custom `linkFunction`', () => {
    cy.mount(
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
    cy.get('.menu-slot .menu-primary li').eq(0).get('.custom-menu-link')
  })

  /*  Option: `header.menuOverflow` */

  it('allows for horizontal scroll overlow', () => {
    cy.mount(
      <NavWrapper options={{ header: { menuOverflow: 'scroll' } }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.menu-slot').should('have.css', 'overflow-x', 'scroll')
  })

  /*  Option: `mobileMenu.visibleOnDesktop` */

  it('shows the mobile menu button on desktop screens', () => {
    cy.mount(
      <NavWrapper options={{ mobileMenu: { visibleOnDesktop: true } }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.widget-slot .menu-button').click()
  })

  /*  Option: `header.showWidgetsOnMobile` */

  it('hides the widget area on mobile when specified', () => {
    cy.mount(
      <NavWrapper options={{ header: { showWidgetsOnMobile: false } }}>
        <Navbar menu={testMenu} widgetSlot={<div>Widgets</div>} />
      </NavWrapper>
    )
    cy.contains('Widgets')
    cy.viewport('iphone-x')
      .get('.nav-widgets')
      .should('have.css', 'display', 'none')
  })

  /*  Option: `header.showColorButton`, `header.shideColorButtonOnMobile` */

  it('hides the color button when specified', () => {
    cy.mount(
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
          header: { showColorButton: true, showColorButtonOnMobile: false },
        }}>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.get('.widget-slot .color-button')
    cy.viewport('iphone-x')
      .get('.widget-slot .color-button')
      .should('have.css', 'display', 'none')
  })

  /*  Option: `header.menuButton` (callback) */

  it('renders a custom menu button via options', () => {
    cy.mount(
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
    cy.viewport('iphone-x').get('.widget-slot .menu-button').click()
    cy.get('#mobile-menu').should('have.class', 'active')
  })

  /*  Option: `header.colorButton` (callback) */

  it('renders a custom color button via options', () => {
    cy.mount(
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

  /*  Prop: `logo` (component) */

  it('supports a custom logo component', () => {
    cy.mount(
      <NavWrapper>
        <Navbar logo={<div>Custom</div>} />
      </NavWrapper>
    )
    cy.get('.logo-slot a').contains('Custom')
  })

  /*  Prop: `logo` (callback) */

  it('renders a logo that supports a custom `linkFunction`', () => {
    cy.mount(
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

  /*  Prop: `logoArea`, `navArea`, `menuArea` */

  it('supports custom grid area components', () => {
    cy.mount(
      <NavWrapper>
        <Navbar
          logoSlot={<div>logo</div>}
          widgetSlot={<div>nav</div>}
          menuSlot={<div>menu</div>}
        />
      </NavWrapper>
    )
    cy.get('.logo-slot').contains('logo')
    cy.get('.widget-slot').contains('nav')
    cy.get('.menu-slot').contains('menu')
  })

  /*  Prop: `menu` */

  it('renders a nav menu that supports nested drop downs', () => {
    cy.mount(
      <NavWrapper>
        <Navbar menu={nestedMenu} />
      </NavWrapper>
    )
    cy.get('.menu-text').contains('Three').should('have.css', 'content')
    cy.get('.menu-slot').contains('Five')
  })

  /*  Prop: `menuButton` (callback) */

  it('renders a custom menu button via props', () => {
    cy.mount(
      <NavWrapper>
        <Navbar
          menu={testMenu}
          menuButton={(isOpen, atts) => <button {...atts}>Custom-Btn!</button>}
        />
      </NavWrapper>
    )
    cy.contains('Custom-Btn!')
    cy.viewport('iphone-x').get('.widget-slot .menu-button').click()
    cy.get('#mobile-menu').should('have.class', 'active')
  })

  /*  Prop: `colorButton` (callback) */

  it('renders a custom color button via props', () => {
    cy.mount(
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

  /*  Behavior: automatically hides the nav menu on mobile */

  it('hides the nav menu on mobile', () => {
    cy.mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
      .get('.menu-slot')
      .should('have.css', 'display', 'none')
  })
})

describe('Navbar - Desktop Layouts', () => {
  /*  Desktop Layout: `basic` */

  it('renders a `basic` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `basic-left` */

  it('renders a `basic-left` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="basic-left" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `basic-center` */

  it('renders a `basic-center` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="basic-center" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `center` */

  it('renders a `center` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="center" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `split` */

  it('renders a `split` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="split" menu={testMenu} />
      </NavWrapper>
    )
    // Check for 2 menus
  })

  /*  Desktop Layout: `minimal` */

  it('renders a `minimal` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="minimal" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `minimal-left` */

  it('renders a `minimal-left` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="minimal-left" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `minimal-center` */

  it('renders a `minimal-center` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="minimal-center" menu={testMenu} />
      </NavWrapper>
    )
  })

  /*  Desktop Layout: `minimal-reverse` */

  it('renders a `minimal-reverse` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar type="reverse" menu={testMenu} />
      </NavWrapper>
    )
  })
})

describe('Navbar - Mobile Layouts', () => {
  /*  Mobile Layout: `basic` */

  it('renders a `basic` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  /*  Mobile Layout: `basic-menu-left` */

  it('renders a `basic-menu-left` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar mobileType="basic-menu-left" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  /*  Mobile Layout: `logo-center` */

  it('renders a `logo-center` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar mobileType="logo-center" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })

  /*  Mobile Layout: `logo-center-alt` */

  it('renders a `logo-center-alt` layout', () => {
    cy.mount(
      <NavWrapper>
        <Navbar mobileType="logo-center-alt" menu={testMenu} />
      </NavWrapper>
    )
    cy.viewport('iphone-x')
  })
})
