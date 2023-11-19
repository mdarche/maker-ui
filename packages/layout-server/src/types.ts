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
  /** The destination path or URL applied to the logo */
  path?: string
  /** If not using the `icon` prop for SVGs, you can use Next Image props here. */
  image?: ImageProps
}

export interface HeaderOptions {
  /** The breakpoint where the header navigation collapses to its mobile state
   * @default 960
   */
  breakpoint: number
  /** Desktop navigation type
   * @default basic
   */
  navType: (typeof navTypes)[number]
  /** Mobile navigation type
   * @default basic
   */
  navTypeMobile: (typeof mobileNavTypes)[number]
  /** If true, the header will use absolute and fixed positioning instead of the default
   * relative and sticky positioning. This is useful if you want to show content behind the header
   * like a hero image or video.
   * @default false
   */
  absolute: boolean
  /** Determines if the header is sticky on desktop.
   * @default false
   */
  sticky: boolean
  /** Determines if the header is sticky on mobile.
   * @default false
   */
  stickyOnMobile: boolean
  /** Hides the header on downscroll and reveals it when scrolling back up.
   * @default false
   */
  stickyUpScroll: boolean | { delay: number; start: number }
  /** Applies a custom class to the header once the user scrolls beyond a specified
   * scrollTop position. This is useful for changing header content or adding a background color.
   */
  scrollClass?: {
    /** The scrollTop position to apply the class */
    scrollTop: number
    /** The class to apply */
    className: string
  }
  /** Replaces the Navbar logo-slot grid area with your own custom component. */
  logo?: React.ReactNode | LogoProps
  /** Replaces the Navbar widget-slot grid area with your own custom component. */
  widgets?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component. */
  menu?: React.ReactNode | MenuItemProps[]
  /** Renders the second menu for "split" nav types   */
  menuSplit?: React.ReactNode | MenuItemProps[]
  /** Renders a custom button that controls the MobileMenu.  */
  menuButton?: React.ReactNode | LayoutButtonProps
}

export interface MobileMenuOptions {
  /** The MobileMenu's entrance / exit transition
   * @default fade
   */
  transition: (typeof transitionTypes)[number]
  /** If true, the menuButton will display on desktop, regardless of header type.
   * @default false
   */
  visibleOnDesktop: boolean
  /** If true, the mobile menu will render an overlay that can be used to toggle the menu off.
   * @default true
   */
  closeOnBlur: boolean
  /** If true, the mobile menu will dismiss itself after navigating to a new page route.
   * @default true
   */
  closeOnRouteChange: boolean
  /** If true, all nested children will be centered in the MobileMenu.
   * @default true
   */
  center: boolean
  /** A custom MenuButton or LayoutButtonProps that can be used to position and style the
   * close button. */
  closeButton?: React.ReactNode | LayoutButtonProps
  /** An optional array of MenuItems that will be rendered as a Menu. */
  menu?: MenuItemProps[]
  /** Allows you to set a panel as the primary menu */
  panelMenu?: 'left' | 'right'
}

export interface SideNavOptions {
  /** The breakpoints where the SideNav collapses into its mobile form
   * @default 960
   */
  breakpoint: number
  /** If true, the SideNav will be wrapped in a `<header>` tag. Only use this
   * if the SideNav is used for your primary navigation.
   * @default false
   */
  isHeader: boolean
  /** If true, all instances of the mobile-menu MenuButton will be used to toggle the
   * SideNav instead of the MobileMenu.
   * @default false
   */
  isPrimaryMobileNav: boolean
  /** If true, the SideNav will also render an overlay that can be used to escape the menu on
   * mobile devices.
   * @default true
   */
  closeOnBlur: boolean
  /** If true, the SideNav will dismiss itself after navigating to a new page route.
   * @default true
   */
  closeOnRouteChange: boolean
  /** If true, the SideNav will be collapsible on desktop devices using the `menuButton` prop.
   * @default false
   */
  collapse: boolean
  /** If true, the menuButton prop will be visible on mobile devices.
   * @default true
   */
  showCollapseOnMobile: boolean
  /** Renders a custom button that controls the SideNav. */
  menuButton?: React.ReactNode | LayoutButtonProps
  /** Quick access to the CSS transition property that controls the SideNav's exit / entrance
   * animation.
   * @default 'margin ease 0.3s, transform ease 0.3s'
   */
  cssTransition?: string
}

export interface WorkspaceOptions {
  /** The breakpoint where the header navigation collapses to its mobile state
   * @default 960
   */
  breakpoint: number
  /** If true, the center panel will be rendered as a `main` element instead of a `div`.
   * @default true
   */
  main: boolean
  /** If true, the workspace layout will render an overlay on mobile that can be used to
   * collapse any active workspace panels.
   * @default true
   */
  closeOnBlur: boolean
  defaultOpen?: {
    left?: boolean
    right?: boolean
  }
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  menuButtons?: {
    left?: React.ReactNode | LayoutButtonProps
    right?: React.ReactNode | LayoutButtonProps
  }
}

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export interface Options {
  // Can be applied as root props
  layout: (typeof contentTypes)[number]
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
  /** Make sure you use all of these themes in your CSS variable declaration file */
  colorThemes: string[]
  topbar: TopbarOptions
  header: HeaderOptions
  mobileMenu: MobileMenuOptions
  sideNav: SideNavOptions
  content: {
    /** The breakpoint at which main and sidebar layouts break down into a single column
     * for mobile. */
    breakpoint: number
    sidebar?: 'left' | 'right'
  }
  workspace: WorkspaceOptions
  leftPanel?: PanelOptions
  rightPanel?: PanelOptions
}

export interface PanelOptions {
  isHeader?: boolean
  primaryMobileNav?: boolean
  defaultOpen?: boolean
  collapseWidth?: number
  closeOnRouteChange?: boolean
  menuButton?: React.ReactNode | LayoutButtonProps
}

export interface MenuItemProps {
  /** The menu item label. Can be a React Element. */
  label: string | React.ReactElement
  /** The destination path for the menu item. */
  path?: string
  /** An optional class selector for the menu item. */
  className?: string
  /** An optional icon for the menu item that will be displayed to the left of the label. */
  icon?: React.ReactElement | string
  /** If true, the destination URL will open in a new tab. */
  newTab?: boolean
  /** A nested array of MenuItems for generating submenus. */
  submenu?: MenuItemProps[]
  /** If true, the submenu will be visible by default. */
  openNested?: boolean
  /** If true, this menu item will not render a link and instead be used as a divider. */
  divider?: boolean
  /** If true, the entire menu item will serve as an expand or collapse button for the nested
   * submenu.
   */
  isExpandButton?: boolean
  /** If true, the menu item will render a nested custom component in place of a submenu. */
  megamenu?: React.ReactElement
  /** Props that will be applied directly to the `<li>` element for this menu item. */
  liAttributes?: object
}

type Style = string | number | (string | number)[]

export interface LayoutButtonProps extends MakerCSS {
  /** A string or SVG element that will be used as the button's inner content */
  icon?: React.ReactNode | string
  /** An aria-label for improved accessibility */
  label?: string
  /** The menu that this button controls. */
  type?: 'mobile-menu' | 'left-panel' | 'right-panel'
  /** An optional default icon that you can use instead of providing your own. */
  defaultIcon?: 'menu' | 'close'
  className?: string
  /** An optional class selector for when the content it controls is considered active.
   * @default active
   */
  activeClassName?: string
  /** If true, the button will have fixed positioning */
  fixed?: boolean
  /** If true, the button will have absolute positioning */
  absolute?: boolean
  /** If true, the button will have sticky positioning */
  sticky?: boolean
  /** Quick access to responsive CSS `height` attribute for the icon. */
  height?: Style
  /** Quick access to responsive CSS `width` attribute for the icon. */
  width?: Style
  /** Quick access to responsive CSS `margin` attribute for the icon. */
  margin?: Style
  /** Quick access to responsive CSS `padding` attribute for the icon. */
  padding?: Style
  /** Quick access to responsive CSS `fill` attribute for the SVG icon. */
  fill?: Style
  /** Quick access to responsive CSS `stroke` attribute for the SVG icon. */
  stroke?: Style
  /** Quick access to responsive CSS `strokeWidth` attribute for the SVG icon. */
  strokeWidth?: Style
  /** Quick access to responsive CSS `top`, `right`, `bottom`, and `left` attributes
   * for easy fixed, absolute, or sticky positioning.
   */
  position?: {
    /** The button's top position. */
    top?: Style
    /** The button's right position. */
    right?: Style
    /** The button's bottom position. */
    bottom?: Style
    /** The button's left position. */
    left?: Style
  }
}
