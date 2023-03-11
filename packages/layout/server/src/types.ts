import type { MakerCSS } from '@maker-ui/style'
import type { ImageProps } from 'next/image'

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

export interface LogoProps extends MakerCSS, LayoutButtonProps {
  path?: string
  image?: ImageProps
}

export interface HeaderOptions {
  /** The breakpoint where the header navigation collapses to its mobile state */
  breakpoint: string | number
  /** Desktop navigation type */
  navType: typeof navTypes[number]
  /** Mobile navigation type */
  navTypeMobile: typeof mobileNavTypes[number]
  /** If true, the header will use absolute and fixed positioning instead of the default
   * relative and sticky positioning. This is useful if you want to show content behind the header
   * like a hero image or video.
   */
  absolute: boolean
  /** Determines if the header is sticky on desktop. */
  sticky: boolean
  /** Determines if the header is sticky on mobile. */
  stickyOnMobile: boolean
  /** Hides the header on downscroll and reveals it when scrolling back up. */
  stickyUpScroll: boolean | { delay: number; start: number }
  /** Applies a custom class to the header once the user scrolls beyond a specified
   * scrollTop position. This is useful for changing header content or adding a background color.
   */
  scrollClass?: {
    scrollTop: number
    className: string
  }
  /** Replaces the Navbar logo-slot grid area with your own custom component.    */
  logo?: React.ReactNode | LogoProps
  /** Replaces the Navbar widget-slot grid area with your own custom component.    */
  widgets?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component.    */
  menu?: React.ReactNode | MenuItemProps[]
  /** Renders the second menu for "split" nav types   */
  menuSplit?: React.ReactNode | MenuItemProps[]
  /** Replaces the Navbar button-slot grid area with your own custom component.    */
  menuButton?: React.ReactNode | LayoutButtonProps
}

export interface MobileMenuOptions {
  transition: typeof transitionTypes[number]
  visibleOnDesktop: boolean
  closeOnBlur: boolean
  closeOnRouteChange: boolean
  center: boolean
  closeButton?: React.ReactNode | LayoutButtonProps
  menu?: React.ReactNode | MenuItemProps[]
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

export interface MenuItemProps {
  label: string
  path?: string
  className?: string
  icon?: React.ReactElement | string
  newTab?: boolean
  submenu?: MenuItemProps[]
  openNested?: boolean
  divider?: boolean
  isExpandButton?: boolean
  megamenu?: React.ReactElement
  liAttributes?: object
}

type Style = string | number | (string | number)[]

export interface LayoutButtonProps extends MakerCSS {
  icon?: React.ReactNode | string
  height?: Style
  width?: Style
  margin?: Style
  padding?: Style
  fill?: Style
  stroke?: Style
  position?: Style // for fixed and absolute positioning
}
