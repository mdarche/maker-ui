import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'
import { MobileMenu } from '../MobileMenu'
import { Footer } from '../Footer'
import { Topbar } from '../Topbar'
import { Main } from '../Main'
import { SideNav } from '../SideNav'
import { Sidebar } from '../Sidebar'
import { Workspace } from '../Workspace'
import { Skiplinks } from '../Skiplinks'
import { Header } from '../Header'
import { defaults } from '@/defaults'
import type { MakerUIOptions, Options } from '@/types'

interface LayoutProps {
  children: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options?: MakerUIOptions
}

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
  const opts = merge(defaults, options) as Options
  const slots = assign(children)
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
        <Workspace {...slots.workspace.props} />
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
