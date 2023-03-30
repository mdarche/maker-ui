import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'
import {
  Skiplinks,
  Header,
  Footer,
  Topbar,
  MobileMenu,
  Main,
  Sidebar,
  SideNav,
  Workspace,
  defaultSettings,
  type MakerUIOptions,
  type Options,
  type MenuItemProps,
  type LayoutButtonProps,
} from '@maker-ui/layout-server'
import { Menu, MenuButton } from '@maker-ui/layout-client'

interface LayoutProps {
  /** You can use Layout dot children to build layouts with JSX */
  children?: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options?: MakerUIOptions
}

function isMenu(i: any): i is MenuItemProps[] {
  return !!(i && typeof i[0] === 'object' && i[0].label)
}

function isIcon(i: any): i is LayoutButtonProps {
  return !!(i && typeof i === 'object' && ('icon' in i || 'defaultIcon' in i))
}

/**
 * This function sorts all Layout dot children into an object with corresponding keys.
 * We use this to merge JSX with the slots prop and MakerUIOptions.
 */
function assign(children: React.ReactNode) {
  let c: { [k: string]: any } = {}

  React.Children.toArray(children).forEach((child: any) => {
    const type = child.props._type
    if (type) {
      c[type] = child
    }
  })

  return c
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @link https://maker-ui.com/docs/layout/layout
 */
export const Layout = ({ options = {}, children }: LayoutProps) => {
  const opts = merge(defaultSettings, options) as Options
  const slots = assign(children)
  // Helpers
  const isSidebar = slots.sidebar && opts.layout.includes('sidebar')
  const isSideNav = slots.sideNav && opts.layout.includes('sidenav')
  const isLeft = opts.layout.includes('-content')
  const isRight = opts.layout.includes('content-')

  /**
   * Merged and formatted props for the Header component.
   */
  const headerProps = merge(opts.header, {
    ...slots?.header?.props,
    menu: isMenu(slots?.header?.props?.menu) ? (
      <Menu nav items={slots.header.props.menu} />
    ) : (
      slots?.header?.props?.menu
    ),
    menuSplit: isMenu(slots?.header?.props?.menuSplit) ? (
      <Menu nav items={slots.header.props.menuSplit} />
    ) : (
      slots?.header?.props?.menuSplit
    ),
    menuButton: isIcon(slots?.header?.props?.menuButton) ? (
      <MenuButton type="mobile-menu" {...slots.header.props.menuButton} />
    ) : (
      slots?.header?.props?.menuButton
    ),
  })

  /**
   * Merged and formatted props for the MobileMenu component.
   */
  const mobileMenuProps = merge(opts.mobileMenu, {
    ...slots?.mobileMenu?.props,
    closeButton: isIcon(slots?.mobileMenu?.props?.closeButton) ? (
      <MenuButton type="mobile-menu" {...slots.mobileMenu.props.closeButton} />
    ) : (
      slots?.mobileMenu?.props?.closeButton
    ),
    children: isMenu(slots?.mobileMenu?.props?.menu) ? (
      <Menu items={slots.mobileMenu.props.menu} />
    ) : (
      slots?.mobileMenu?.props?.children
    ),
  })

  /**
   * Merged and formatted props for the SideNav component.
   */
  const sideNavProps = merge(opts.sideNav, {
    ...slots?.sideNav?.props,
    menuButton: isIcon(slots?.sideNav?.props?.menuButton) ? (
      <MenuButton type="side-nav" {...slots.sideNav.props.menuButton} />
    ) : (
      slots?.sideNav?.props?.menuButton
    ),
  })

  /**
   * Merged and formatted props for the Workspace component.
   */
  const workspaceProps = merge(opts.workspace, {
    ...slots?.workspace?.props,
    menuButtons: {
      left: isIcon(slots?.workspace?.props?.menuButtons?.left) ? (
        <MenuButton
          type="ws-left"
          {...slots.workspace.props.menuButtons.left}
        />
      ) : (
        slots?.workspace?.props?.menuButtons?.left
      ),
      right: isIcon(slots?.workspace?.props?.menuButtons?.right) ? (
        <MenuButton
          type="ws-right"
          {...slots.workspace.props.menuButtons.right}
        />
      ) : (
        slots?.workspace?.props?.menuButtons?.right
      ),
    },
  })

  return (
    <>
      <Skiplinks links={opts.skiplinks} />
      {slots?.topbar && <Topbar {...merge(opts.topbar, slots.topbar.props)} />}
      {slots?.header ? (
        <Header
          {...headerProps}
          _mobileMenu={
            slots?.mobileMenu ? <MobileMenu {...mobileMenuProps} /> : null
          }
        />
      ) : null}
      {slots?.workspace ? (
        <Workspace {...workspaceProps} />
      ) : (
        <div
          className={cn([
            'mkui-layout',
            opts.layout,
            isSideNav ? 'l-sn' : isSidebar ? 'l-sb' : undefined,
          ])}>
          <>
            {isLeft ? (
              <>
                {isSidebar && <Sidebar {...slots?.sidebar?.props} />}
                {isSideNav && <SideNav {...sideNavProps} />}
              </>
            ) : null}
            <Main {...slots?.main?.props} />
            {isRight ? (
              <>
                {isSidebar && (
                  <Sidebar
                    {...slots?.sidebar?.props}
                    primary={!(opts.layout === 'sidebar-content-sidebar')}
                  />
                )}
                {isSideNav && <SideNav {...sideNavProps} />}
              </>
            ) : null}
          </>
        </div>
      )}
      {slots?.footer && <Footer {...slots.footer.props} />}
    </>
  )
}

Layout.Header = Header
Layout.MobileMenu = MobileMenu
Layout.Topbar = Topbar
Layout.Main = Main
Layout.Footer = Footer
Layout.Sidebar = Sidebar
Layout.SideNav = SideNav
Layout.Workspace = Workspace

Layout.displayName = 'Layout'