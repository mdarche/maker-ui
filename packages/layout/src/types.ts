import * as React from 'react'

/** All configurations for `<Content>` layouts. */
export const contentTypes = [
  'content-sidebar',
  'content-sidenav',
  'content',
  'sidebar-content',
  'sidebar-content sidebar',
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

export interface TopbarOptions {
  hideOnMobile: boolean
  sticky: boolean
  stickyOnMobile: boolean
}

export type ColorButtonProps =
  | React.ReactNode
  | ((
      currentMode?: string,
      attrs?: object,
      preference?: string
    ) => React.ReactNode)

export interface HeaderOptions {
  breakpoint: string | number
  navType: typeof navTypes[number]
  mobileNavType: typeof mobileNavTypes[number]
  absolute: boolean
  sticky: boolean
  stickyOnMobile: boolean
  stickyUpScroll: boolean | { delay: number; start: number }
  scrollClass: {
    scrollTop: number
    className: string
  }
  showColorButtonOnMobile: boolean
  showWidgetsOnMobile: boolean
  menuOverflow: 'wrap' | 'scroll'
  dropdown: {
    caret: boolean | React.ReactElement
    transition: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
  }
  menuButton?:
    | React.ReactNode
    | ((isOpen: boolean, attrs: object) => React.ReactNode)
  colorButton?: ColorButtonProps
}

export interface MobileMenuOptions {
  transition: typeof transitionTypes[number]
  showCloseButton: boolean
  visibleOnDesktop: boolean
  closeOnBlur: boolean
  closeOnRouteChange: boolean
  centerContent: boolean
  closeButton?:
    | React.ReactNode
    | ((isOpen: boolean, attrs: object) => React.ReactNode)
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
  toggleButton?:
    | React.ReactNode
    | ((isOpen: boolean, attributes: object) => React.ReactNode)
  collapse: boolean
  collapseButton?:
    | React.ReactNode
    | ((isOpen: boolean, attributes: object) => React.ReactNode)
}

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export interface MakerUIOptions {
  // Can be applied as root props
  type: typeof contentTypes[number]
  skiplinks: boolean
  /** Make sure you use all of these themes in your css variable declaration file */
  colorThemes: string[]
  /** Use the system preference if you have both 'light' and 'dark' color themes*/
  systemColorTheme: boolean
  // Can be applied as props to the relevant child
  topbar: TopbarOptions
  header: HeaderOptions
  mobileMenu: MobileMenuOptions
  sideNav: SideNavOptions
  sidebar: {
    breakpoint: string | number
  }
}
