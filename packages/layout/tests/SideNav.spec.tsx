import { mount } from '@cypress/react'
import { SideNav, Content, Main, type MakerUIOptions } from '@maker-ui/layout'
import { Wrapper, defaults, format, testMenu } from './setup'

/**
 * @component
 * SideNav
 *
 * @tests
 * - Render with defaults
 * - Option: `sideNav.width`, `sideNav.cssTransition`
 * - Option: `sideNav.isHeader`
 * - Option: `sideNav.showToggleOnMobile`
 * - Option: `sideNav.closeOnRouteChange`
 * - Option: `sideNav.isPrimaryMobileNav`
 * - Option: `sideNav.toggleButton`
 * - Prop: `menu`
 * - Prop: `children`, `header`, `footer`
 * - Prop: `toggleButton`
 * - Prop: `css`, `_css`
 * - Behavior: toggles via floating side nav toggle on mobile
 * - Behavior: closes on mobile when user clicks blur overlay
 */

interface TestSideNavProps {
  options?: MakerUIOptions
  children?: React.ReactNode
  useHeader?: boolean
  [key: string]: any
}

const TestSideNav = ({
  useHeader = true,
  options,
  children,
  ...props
}: TestSideNavProps) => (
  <Wrapper header={useHeader} footer options={options}>
    <Content>
      <SideNav {...props}>{children}</SideNav>
      <Main>content</Main>
    </Content>
  </Wrapper>
)

/**
 * @component - SideNav
 */

describe('SideNav', () => {
  /* Render with defaults */

  it('renders the SideNav component with default props', () => {
    mount(<TestSideNav />)
    cy.get('#sidenav').should('have.backgroundColor', 'var(--color-bg_sideNav)')
    cy.get('#sidenav').should(
      'have.css',
      'width',
      format(defaults.sideNav.width, 1)
    )
    cy.viewport('iphone-x')
      .get('#sidenav')
      .should('have.css', 'width', format(defaults.sideNav.width, 0))
  })

  /* Option: `sideNav.width`, `sideNav.cssTransition` */

  it('renders the SideNav with user-generated options', () => {
    mount(
      <TestSideNav
        options={{
          sideNav: { width: 500, cssTransition: 'transform 0.8s ease 0s' },
        }}
      />
    )
    cy.get('#sidenav').should('have.css', 'width', '500px')
    cy.should('have.css', 'transition', 'transform 0.8s ease 0s')
  })

  /* Option: `sideNav.isHeader` */

  it('renders as a header element if isHeader === true', () => {
    mount(
      <TestSideNav
        useHeader={false}
        options={{ sideNav: { isHeader: true } }}
      />
    )
    cy.get('header').should('have.id', 'sidenav')
  })

  /* Option: `sideNav.showToggleOnMobile` */

  it('can hide the toggle button on mobile', () => {
    mount(<TestSideNav options={{ sideNav: { showToggleOnMobile: false } }} />)
    cy.viewport('iphone-x').get('#toggle-sidenav').should('not.exist')
  })

  /* Option: `sideNav.closeOnRouteChange` */

  it('can be closed `onRouteChange` by clicking a menu link (mobile)', () => {
    mount(
      <TestSideNav
        menu={testMenu}
        options={{ sideNav: { closeOnRouteChange: true } }}
      />
    )
    cy.viewport('iphone-x').get('#toggle-sidenav').click()
    cy.get('#sidenav .collapse-menu li').eq(0).find('a').click()
    cy.get('#sidenav').should('have.class', 'hide-sidenav')
  })

  /* Option: `sideNav.isPrimaryMobileNav` */

  it('can be controlled by mobile nav button on mobile browsers', () => {
    mount(<TestSideNav options={{ sideNav: { isPrimaryMobileNav: true } }} />)
    cy.viewport('iphone-x').get('header .widget-slot .menu-button').click()
    cy.get('#sidenav').should('not.have.class', 'hide-sidenav')
    cy.get('#site-inner .menu-overlay').click()
    cy.get('#sidenav').should('have.class', 'hide-sidenav')
  })

  /* Option: `sideNav.toggleButton` */

  it('renders a custom toggle button for mobile via options', () => {
    mount(
      <TestSideNav
        options={{
          sideNav: {
            toggleButton: (isOpen, atts) => (
              <button
                className="custom-btn"
                css={{ display: ['flex', 'none'] }}
                {...atts}>
                {isOpen ? 'close' : 'open'}
              </button>
            ),
          },
        }}
      />
    )
    cy.viewport('iphone-x').get('.custom-btn').click()
    cy.get('#sidenav').should('not.have.class', 'hide-sidenav')
  })

  /* Prop: `menu` */

  it('accepts and renders a default collapsible menu', () => {
    const menu = [
      {
        label: 'Carousel',
        path: '/carousel',
        submenu: [{ label: 'Root', path: '/root' }],
      },
      { label: 'Accordion', path: '/accordion' },
    ]
    mount(<TestSideNav menu={menu} />)
    cy.get('#sidenav').contains('Carousel')
    cy.get('.submenu-toggle').click()
    cy.get('#sidenav').contains('Root')
  })

  /* Prop: `children`, `header`, `footer` */

  it('accepts children, a custom header, and a custom footer', () => {
    mount(
      <TestSideNav header={<div>s-header</div>} footer={<div>s-footer</div>}>
        s-inner
      </TestSideNav>
    )
    cy.get('#sidenav').contains('s-header')
    cy.get('#sidenav').contains('s-inner')
    cy.get('#sidenav').contains('s-footer')
  })

  /* Prop: `toggleButton` */

  it('renders custom toggle button inner contents on mobile', () => {
    mount(<TestSideNav toggleButton="Test Open" />)
    cy.viewport('iphone-x').get('#toggle-sidenav').contains('Test Open')
  })

  it('renders a custom toggle button via prop callback', () => {
    mount(
      <TestSideNav
        toggleButton={(isOpen, atts) => (
          <button
            className="custom-btn"
            css={{ display: ['flex', 'none'] }}
            {...atts}>
            {isOpen ? 'close' : 'open'}
          </button>
        )}
      />
    )
    cy.viewport('iphone-x').get('.custom-btn').click()
    cy.get('#sidenav').should('not.have.class', 'hide-sidenav')
  })

  /* Prop: `css`, `_css` */

  it('applies `_css` to root and `css` to the container', () => {
    mount(<TestSideNav _css={{ margin: 20 }} css={{ padding: 10 }} />)
    cy.get('#sidenav').should('have.css', 'margin', '20px')
    cy.get('#sidenav .container').should('have.css', 'padding', '10px')
  })

  /* Behavior: toggling with floating side nav toggle on mobile */

  it('can be controlled by SideNavToggle on mobile', () => {
    mount(<TestSideNav />)
    cy.get('#sidenav').should('have.class', 'hide-sidenav')
    cy.viewport('iphone-x').get('#toggle-sidenav').click()
    cy.get('#sidenav').should('not.have.class', 'hide-sidenav')
  })

  /* Behavior: closes on mobile when user clicks blur overlay */

  it('can be closed by clicking the overlay (mobile)', () => {
    mount(<TestSideNav />)
    cy.viewport('iphone-x').get('#toggle-sidenav').click()
    cy.get('#sidenav').should('not.have.class', 'hide-sidenav')
    cy.get('#site-inner .menu-overlay').click()
    cy.get('#sidenav').should('have.class', 'hide-sidenav')
  })
})
