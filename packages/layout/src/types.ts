import * as React from 'react'
import { Interpolation, ResponsiveScale } from '@maker-ui/css'

import { mobileNavTypes, navTypes, transitionTypes } from './constants'

export type ResponsiveString = string | string[]

export interface MakerProps {
  css?: Interpolation<any>
  breakpoints?: (string | number)[]
}

type ThemeColors = {
  [key: string]: {
    /** The site's primary text color. */
    text: string
    /** The color of all links. */
    link: string
    /** The hover color for all links. */
    link_hover: string
    /** The site's primary brand or accent color. */
    primary: string
    /** The site's secondary brand or accent color. */
    secondary: string
    /** The site's background color. */
    background: string
    /** The topbar background color. */
    bg_topbar: string
    /** The header background color. */
    bg_header: string
    /** The navbar's dropdown menu background color. */
    bg_dropdown: string
    /** The mobile menu's background color. */
    bg_mobileMenu: string
    /** The side navigation background color. */
    bg_sideNav: string
    /** The footer background color. */
    bg_footer: string
    /** The toolbar background color for workspace layouts. */
    bg_toolbar: string
    /** The side panel background color for workspace layouts. */
    bg_panel: string
  } & {
    [key: string]: string
  }
}

type ThemeFonts = {
  /** The document's default font. */
  body?: string
  /** The default font for all heading tags. */
  heading?: string
  /** The default font for `pre` and `code` tags. */
  monospace?: string
} & {
  [key: string]: string
}

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-options
 *
 */
export interface MakerOptions {
  /**
   * SSG framework optimizations for Gatsby and NextJS.
   */
  framework?: 'gatsby' | 'next'
  /**
   * An array of browser widths that is used as the default breakpoints for
   * all nested Maker UI components and primitives.
   *
   * @default
   * ['568px', '768px', '1440px']
   */
  breakpoints: (string | number)[]
  /**
   * Your site's default fonts that are mapped to CSS variables.
   */
  fonts: ThemeFonts
  /**
   * Your site's default colors that are mapped to CSS variables.
   */
  colors: ThemeColors
  /**
   * A callback function that lets you wrap your framework's local
   * Link or Route component around all native Maker UI anchor tags.
   */
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: React.ReactElement
  ): React.ReactElement
  topbar: {
    maxWidth: ResponsiveScale
    sticky?: boolean
    stickyOnMobile?: boolean
    hideOnMobile?: boolean
    breakpoint: number | string
  }
  header: {
    /**
     * The Navbar's layout on desktop.
     */
    navType: typeof navTypes[number]
    /**
     * The Navbar's layout on mobile devices.
     */
    mobileNavType: typeof mobileNavTypes[number]
    /**
     * The max-width of the header's content container.
     */
    maxWidth: ResponsiveScale
    /**
     * Determines if the header sticks to the top of the viewport while scrolling.
     */
    sticky: boolean
    /**
     * Determines if the header sticks to the top of the viewport on mobile.
     */
    stickyOnMobile: boolean
    /**
     * Hides the sticky header on down scroll and reveals when scrolling back up.
     */
    stickyUpScroll: boolean
    /**
     * Adds a custom class to the header when the user has scrolled past
     * a specified point.
     */
    scrollClass: {
      /** The scrollTop value that triggers adding or removing a class (in pixels).*/
      scrollTop: number
      /** The target class selector.*/
      className: string
    }
    showColorButton: boolean
    hideColorButtonOnMobile: boolean
    hideWidgetsOnMobile: boolean
    dropdown: {
      caret: boolean | 'default' | React.ReactNode
      transition: 'scale' | 'fade' | 'fade-down' | 'fade-up'
    }
    menuOverflow: 'wrap' | 'scroll'
    menuButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    colorButton?:
      | 'default'
      | React.ReactNode
      | ((currentMode?: string, attributes?: object) => React.ReactNode)
    breakpoint: number | string
  }
  mobileMenu: {
    width: ResponsiveScale
    transition: typeof transitionTypes[number]
    easingCurve?: string
    visibleOnDesktop?: boolean
    closeButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    showCloseButton: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
  }
  sideNav: {
    width: ResponsiveScale
    easingCurve: string
    isHeader: boolean
    isPrimaryMobileNav: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
    showToggleOnMobile: boolean
    toggleButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    breakpoint: string | number
  }
  content: {
    maxWidth?: ResponsiveScale
    maxWidthSection?: ResponsiveScale
    sidebarGap?: ResponsiveScale
    deferMeasurements?: number
    breakpoint: string | number
  }
  sidebar: {
    width?: ResponsiveScale
    secondWidth?: ResponsiveScale // TODO
  }
  footer: {
    maxWidth?: ResponsiveScale
  }
  a11y: {
    skiplinks?: boolean
  }
  errors: {
    logFunction?(error: string, errorDetails: object, component: string): any
    showStackTrace?: boolean
    errorMessage?: {
      topbar?: React.ReactNode
      header?: React.ReactNode
      mobileMenu?: React.ReactNode
      content?: React.ReactNode
      main?: React.ReactNode
      sideNav?: React.ReactNode
      sidebar?: React.ReactNode
      footer?: React.ReactNode
      section?: React.ReactNode
    }
  }
  workspace: {
    canvasMaxWidth?: ResponsiveScale
    panelLeft?: PanelProps
    panelRight?: PanelProps
    dock?: {
      width?: ResponsiveScale
      hideOnMobile?: boolean
      breakpoint: string | number
    }
    breakpoint: string | number
  }
}

type PanelProps = {
  width?: ResponsiveScale
  /** `NOTE` Will cause a repaint */
  collapsible?: boolean
  collapseWidth?: ResponsiveScale
  collapseButton?:
    | 'default'
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  defaultOpen?: boolean
  animationStyle?: 'slide' | 'scale'
}
