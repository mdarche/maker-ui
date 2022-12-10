import * as React from 'react'
import { merge } from '@maker-ui/utils'
import { MobileMenu } from '../MobileMenu'
import { Footer } from '../Footer'
import { Topbar } from '../Topbar'
import { Main } from '../Main'
import { SideNav } from '../SideNav'
import { Sidebar } from '../Sidebar'
import { Skiplinks } from '../Skiplinks'
import { Header } from '../Header'
import { defaults } from '@/defaults'
import type { MakerUIOptions, Options } from '@/types'
import styles from './Layout.module.css'

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
  const opts = merge(options, defaults) as Options
  const slots = assign(children)
  const isSidebar = slots.sidebar && opts.type.includes('sidebar')
  const isSideNav = slots.sideNav && opts.type.includes('sidenav')
  const isLeft = opts.type.includes('-content')
  const isRight = opts.type.includes('content-')

  return (
    <>
      <Skiplinks links={opts.skiplinks} />
      {slots?.topbar && <Topbar {...merge(opts.topbar, slots.topbar.props)} />}
      <Header
        {...merge(opts.header, slots?.header?.props)}
        _mobileMenu={
          slots?.mobileMenu ? (
            <MobileMenu {...slots?.mobileMenu?.props} />
          ) : null
        }
      />
      <div className={styles.layout}>
        <>
          {isLeft ? (
            <>
              {isSidebar && (
                <Sidebar {...merge(opts.sidebar, slots?.sidebar?.props)} />
              )}
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
                  {...merge(opts.sidebar, slots?.sidebar?.props)}
                  primary={!(opts.type === 'sidebar-content-sidebar')}
                />
              )}
              {isSideNav && (
                <SideNav {...merge(opts.sideNav, slots?.sideNav?.props)} />
              )}
            </>
          ) : null}
        </>
      </div>
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

Layout.displayName = 'Layout'
