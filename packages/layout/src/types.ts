import * as React from 'react'

/** All configurations for `<Content>` layouts. */
export const contentTypes = [
  'content-sidebar',
  'content-sidenav',
  'content',
  'sidebar-content',
  'sidebar-content-sidebar',
  'sidenav-content',
] as const

/** All configurations for `<Navbar>` layouts. */
export const navTypes = [
  'basic',
  'basic-left',
  'basic-center',
  'center',
  'split',
  'minimal',
  'minimal-left',
  'minimal-center',
  'reverse',
] as const

/** All configurations for mobile `<Navbar>` layouts. */
export const mobileNavTypes = [
  'basic',
  'basic-menu-left',
  'logo-center',
  'logo-center-alt',
] as const

/** All configurations for `<MobileMenu>` transitions. */
export const transitionTypes = [
  'fade',
  'fade-up',
  'fade-down',
  'slide-left',
  'slide-right',
] as const

/**
 * A deeply nested partial that makes all props optional.
 */
export type Partial<T> = {
  [P in keyof T]?: Partial<T[P]>
}

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export type MakerUIOptions = Partial<Options>

export interface TopbarOptions {
  hideOnMobile: boolean
  sticky: boolean
  stickyOnMobile: boolean
}

export interface HeaderOptions {
  breakpoint: string | number
  navType: typeof navTypes[number]
  navTypeMobile: typeof mobileNavTypes[number]
  absolute: boolean
  sticky: boolean
  stickyOnMobile: boolean
  stickyUpScroll: boolean | { delay: number; start: number }
  scrollClass?: {
    scrollTop: number
    className: string
  }
  menuButton?: React.ReactNode
}

export interface MobileMenuOptions {
  transition: typeof transitionTypes[number]
  visibleOnDesktop: boolean
  closeOnBlur: boolean
  closeOnRouteChange: boolean
  center: boolean
  closeButton?: React.ReactNode
  closeButtonPosition?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
}

export interface SideNavOptions {
  breakpoint: string | number
  isHeader: boolean
  isPrimaryMobileNav: boolean
  closeOnBlur: boolean
  closeOnRouteChange: boolean
  showToggleOnMobile: boolean
  toggleButton?: React.ReactNode
  collapse: boolean
  collapseButton?: React.ReactNode
  cssTransition?: string
}

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export interface Options {
  // Can be applied as root props
  layout: typeof contentTypes[number]
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
  skiplinks: boolean | { label: string; id: string }[]
  /** Make sure you use all of these themes in your css variable declaration file */
  colorThemes: string[]
  // Can be applied as props to the relevant child
  topbar: TopbarOptions
  header: HeaderOptions
  mobileMenu: MobileMenuOptions
  sideNav: SideNavOptions
  content: {
    breakpoint: string | number
  }
}
