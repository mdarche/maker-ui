import * as React from 'react'
// import { merge } from '@maker-ui/utils'
import { MobileMenu } from '../MobileMenu'
import { Footer } from '../Footer'
import { Topbar } from '../Topbar'
import { Main } from '../Main'
import { SideNav } from '../SideNav'
import { Sidebar } from '../Sidebar'
import { Client } from './Client'
import { Skiplinks, LinkItem } from '../Skiplinks'
import type { MakerUIOptions } from '@/types'
import { Header } from '../Header'

interface LayoutProps {
  children: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options?: MakerUIOptions
  /**
   * Replaces the default Maker UI skiplinks with your own custom on-page links.
   * You don't need to add `#` to your id selectors:
   *
   * @example
   * [
   *  { id: 'main-content', label: 'Skip to main content' },
   *  { id: 'footer', label: 'Skip to footer' },
   * ]
   */
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @link https://maker-ui.com/docs/layout/layout
 */
export const Layout = ({ options, skiplinks, children }: LayoutProps) => {
  console.log('Children are', children)
  // React child props, determine where they belong, and copy relevant options props to the new element using `React.cloneElement`
  return (
    <>
      <Skiplinks links={skiplinks} />
      {children}
      {/* <Client options={options} /> */}
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

Layout.displayName = 'Maker_Layout'
