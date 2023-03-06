import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'

import { Skiplinks } from '../Skiplinks'
import { Footer, type FooterProps } from '../Footer'
import { Topbar, type TopbarProps } from '../Topbar'
import { MobileMenu, type MobileMenuProps } from '../MobileMenu'
import { Main, type MainProps } from '../Main'
import { SideNav, type SideNavProps } from '../SideNav'
import { Sidebar, type SidebarProps } from '../Sidebar'
import { Workspace, type WorkspaceProps } from '../Workspace'
import { Header, type HeaderProps } from '../Header'
import type { MakerUIOptions, Options } from '@/types'
import { defaults } from '@/defaults'

interface LayoutProps {
  children: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options?: MakerUIOptions
  /** All Layout dot props in object form. This comes in handy if you have many layouts
   * or if you need to fetch layouts with network requests. */
  slots?: {
    topbar?: Partial<TopbarProps>
    header?: Partial<HeaderProps>
    mobileMenu?: Partial<MobileMenuProps>
    main?: Partial<MainProps>
    sidebar?: Partial<SidebarProps>
    sideNav?: Partial<SideNavProps>
    footer?: Partial<FooterProps>
    workspace?: Partial<WorkspaceProps>
  }
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
export const Layout = ({ options = {}, children, ...props }: LayoutProps) => {
  const opts = merge(defaults, options) as Options
  const slots = assign(children)
  // const slots = merge(assign(children), props?.slots || {})
  // Helpers
  const isSidebar = slots.sidebar && opts.layout.includes('sidebar')
  const isSideNav = slots.sideNav && opts.layout.includes('sidenav')
  const isLeft = opts.layout.includes('-content')
  const isRight = opts.layout.includes('content-')

  return (
    <>
      <Skiplinks links={opts.skiplinks} />
      {slots?.topbar && <Topbar {...merge(opts.topbar, slots.topbar.props)} />}
      {slots?.header ? (
        <Header
          {...merge(opts.header, slots?.header?.props)}
          _mobileMenu={
            slots?.mobileMenu ? (
              <MobileMenu
                {...merge(opts.mobileMenu, slots?.mobileMenu?.props)}
              />
            ) : null
          }
        />
      ) : null}
      {slots?.workspace ? (
        <Workspace {...merge(opts.workspace, slots.workspace.props)} />
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
                {isSideNav && (
                  <SideNav {...merge(opts.sideNav, slots?.sideNav?.props)} />
                )}
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
                {isSideNav && (
                  <SideNav {...merge(opts.sideNav, slots?.sideNav?.props)} />
                )}
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
