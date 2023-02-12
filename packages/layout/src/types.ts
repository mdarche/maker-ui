/** All configurations for `<Content>` layouts. */
export const contentTypes = [
  'content-sidebar',
  'content-sidenav',
  'content',
  'sidebar-content',
  'sidebar-content-sidebar',
  'sidenav-content',
  'workspace',
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
  /** Determines if the topbar should be visible on mobile. This breakpoint abides by
   * the value from `header.breakpoint`.
   * @default true
   */
  hideOnMobile: boolean
  /** Determines if the topbar is sticky on desktop.
   * @default false
   */
  sticky: boolean
  /** Determines if the topbar is sticky on mobile.
   * @default false
   */
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
}

export interface MobileMenuOptions {
  transition: typeof transitionTypes[number]
  visibleOnDesktop: boolean
  closeOnBlur: boolean
  closeOnRouteChange: boolean
  center: boolean
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
  collapse: boolean
  showCollapseOnMobile: boolean
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
  topbar: TopbarOptions
  header: HeaderOptions
  mobileMenu: MobileMenuOptions
  sideNav: SideNavOptions
  content: {
    breakpoint: string | number
  }
  workspace: {
    main: boolean
    closeOnBlur: boolean
  }
}
