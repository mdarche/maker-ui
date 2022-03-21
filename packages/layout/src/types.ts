import * as React from 'react'
import type {
  ResponsiveScale,
  ResponsiveString,
  MakerProps,
} from '@maker-ui/css'

import { mobileNavTypes, navTypes, transitionTypes } from './constants'

declare module 'react' {
  interface Attributes extends MakerProps {}
}

/**
 * A deeply nested partial that makes all props optional.
 */
export type Partial<T> = {
  [P in keyof T]?: Partial<T[P]>
}

interface ColorKeys {
  /** The site's primary text color. */
  text: ResponsiveString
  /** The default color for all anchor tags. */
  link: ResponsiveString
  /** The default hover color for all anchor tags. */
  link_hover: ResponsiveString
  /** The site's primary brand or accent color. */
  primary: ResponsiveString
  /** The site's secondary brand or accent color. */
  secondary: ResponsiveString
  /** The site's background color. */
  background: ResponsiveString
  /** The topbar background color. */
  bg_topbar: ResponsiveString
  /** The header background color. */
  bg_header: ResponsiveString
  /** The navbar's dropdown menu background color. */
  bg_dropdown: ResponsiveString
  /** The mobile menu's background color. */
  bg_mobileMenu: ResponsiveString
  /** The side navigation background color. */
  bg_sideNav: ResponsiveString
  /** The footer background color. */
  bg_footer: ResponsiveString
}

/**
 * Color configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
type ThemeColors =
  | {
      [key: string]: ColorKeys & {
        [key: string]: ResponsiveString
      }
    }
  | (ColorKeys & {
      [key: string]: ResponsiveString
    })

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
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export type MakerUIOptions = Partial<MakerOptions>

/**

/**
 * Configuration for the Maker UI layout system.
 *
 * @link https://maker-ui.com/docs/maker-ui-options
 *
 */
export interface MakerOptions {
  /**
   * An array of browser widths that is used as the default breakpoints for
   * all nested Maker UI components and primitives.
   *
   * @default ['768px', '960px', '1440px']
   */
  breakpoints: (string | number)[]
  /**
   * Your site's default fonts that are mapped to CSS variables.
   *
   * @remarks
   * - Make sure to add the font to your website by self hosting
   * or connecting to Google Fonts, Adobe Fonts, or another type foundry.
   * - You can add as many custom keys as you would like. They will all be available
   * as CSS variables: `var(--font-<key>)`
   */
  fonts: ThemeFonts
  /**
   * Your site's default colors that are mapped to CSS variables.
   *
   * @remarks
   * - Maker UI uses a few predefined values for its layout components, but
   * you can add as many custom keys as you would like. They will be available
   * as CSS variables: `var(--color-<key>)`
   */
  colors: ThemeColors
  /**
   * An option that lets you save the user's color mode preference to the browser's local storage.
   */
  persistentColorMode: boolean | { key: string; expiration: number }
  /**
   * A boolean that lets you turn off Maker UI's default color CSS variables.
   */
  useColorDefaults: boolean
  /**
   * A boolean that lets you turn off Maker UI's default measurement CSS variables.
   */
  useMeasurementDefaults: boolean
  /**
   * A dictionary of custom CSS variable objects
   */
  variables: {
    [key: string]: ResponsiveScale
  }
  /**
   * A JSX callback function that lets you wrap your framework's local
   * Link or Route component around all native Maker UI anchor tags.
   */
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: React.ReactElement | string
  ): React.ReactElement
  /**
   * Configuration object for the Maker UI topbar.
   */
  topbar: {
    /**
     * The max-width of the topbar's content container. Can be a responsive array.
     * @default 1260
     */
    maxWidth: ResponsiveScale
    /**
     * Determines if the topbar sticks to the top of the viewport while scrolling.
     * @default false
     */
    sticky?: boolean
    /**
     * Determines if the header sticks to the top of the viewport on mobile.
     * @default false
     */
    stickyOnMobile?: boolean
    /**
     * Determines if the topbar is visible on mobile.
     * @default false
     */
    hideOnMobile?: boolean
    /**
     * A specific breakpoint that determines when the topbar is visible. You may also use an index
     * to access a specific breakpoint in the `options.breakpoints` array.
     * @default 0 (breakpoints[0], or 768px)
     *
     * @remark This is only helpful if `hideOnMobile` is true.
     */
    breakpoint: number | string
    /**
     * An option to add an optional error boundary to the Topbar container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI header.
   */
  header: {
    /**
     * The Navbar's layout on desktop.
     * @default 'basic'
     */
    navType: typeof navTypes[number]
    /**
     * The Navbar's layout on mobile devices.
     * @default 'basic'
     */
    mobileNavType: typeof mobileNavTypes[number]
    /**
     * The max-width of the header's content container. Can be a responsive array.
     * @default 1460
     */
    maxWidth: ResponsiveScale
    /**
     * Determines if the header should be absolutely positioned so site content
     * begins at the top of the viewport.
     * @default false
     *
     * @remark
     * - This is helpful for transparent headers.
     * - If you only want this effect on certain pages, conditionally set it via
     * the Header component's `absolute` prop in your Layout.
     * - When true, all of the sticky settings will use absolute / fixed positioning instead of
     * sticky / relative positioning.
     */
    absolute: boolean
    /**
     * Determines if the header sticks to the top of the viewport while scrolling.
     * @default false
     */
    sticky: boolean
    /**
     * Determines if the header sticks to the top of the viewport on mobile.
     * @default false
     */
    stickyOnMobile: boolean
    /**
     * Hides the sticky header on down scroll and reveals when scrolling back up.
     * @default false
     */
    stickyUpScroll:
      | boolean
      | {
          /** Determines the number of milliseconds that should pass before the nav is triggered back into view on up-scroll */
          delay: number
          /** The scroll distance (in pixels) from the top of the document where the effect should begin  @default 500*/
          start: number
        }
    /**
     * Adds a custom class to the header when the user has scrolled past a specified point.
\     */
    scrollClass: {
      /** The scrollTop value that triggers adding or removing a class (in pixels).*/
      scrollTop: number
      /** The target class selector.*/
      className: string
    }
    /**
     * Determines whether the header nav area displays a color toggle button.
     * @default true (only appears if multiple color modes are present)
     */
    showColorButton: boolean
    /**
     * Lets you hide the header's color toggle button on mobile.
     * @default true
     */
    showColorButtonOnMobile: boolean
    /**
     * Hides the header nav area on mobile (typically containing search, social icons,
     * or other custom components).
     * @default false
     */
    showWidgetsOnMobile: boolean
    /**
     * Controls the header's default dropdown menu settings.
     */
    dropdown: {
      /**
       * A boolean that displays the default caret or a React Element that lets you
       * use a custom caret component.
       * @default 'default'
       * */
      caret: boolean | 'default' | React.ReactElement
      /**
       * The transition animation for showing/hiding header dropdown menus on hover or focus.
       * @default 'fade'
       * */
      transition: 'scale' | 'fade' | 'fade-down' | 'fade-up' | 'none'
    }
    /**
     * Lets you decide if your nav menu should wrap to the next line or scroll horizontally
     * when the menu is larger than its container width.
     * @default 'wrap'
     */
    menuOverflow: 'wrap' | 'scroll'
    /**
     * Lets you customize the mobile menu toggle. By default, it uses a traditional hamburger
     * icon, but you can use a custom React component or a JSX callback to animate the icon's state.
     */
    menuButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    /**
     * Lets you customize the header's color toggle. By default, it prints the name of the current
     * color mode, but you can use a custom React component or a JSX callback to animate the icon's
     * state.
     */
    colorButton?:
      | 'default'
      | React.ReactNode
      | ((currentMode?: string, attributes?: object) => React.ReactNode)
    /**
     * A specific breakpoint that controls when the header switches from desktop navigation
     * to mobile navigation. You may also use an index to access a specific breakpoint in
     * the `options.breakpoints` array.
     * @default 0 (breakpoints[0], or 768px)
     */
    breakpoint: number | string
    /**
     * An option to add an optional error boundary to the Header container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI mobile menu.
   */
  mobileMenu: {
    /**
     * The width of the mobile menu when active. This can be a responsive array.
     * @default '70vw'
     */
    width: ResponsiveScale
    /**
     * The transition style for the mobile menu when a user clicks the header's
     * mobile menu button.
     * @default 'slide-left'
     */
    transition: typeof transitionTypes[number]
    /**
     * Displays the header's mobile menu button at all times.
     * @default false
     */
    visibleOnDesktop?: boolean
    /**
     * Lets you customize the mobile menu's close button. By default, it displays an 'X' icon,
     * but you can use a custom React component or a JSX callback to animate the icon's state.
     */
    closeButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    /**
     * Displays a close button in the mobile menu.
     * @default true
     */
    showCloseButton: boolean
    /**
     * Closes the mobile menu when the user clicks outside the menu.
     * @default true
     *
     * @remarks Only useful for `slide-left` and `slide-right` transition types when
     * the width is less than 100% or 100vw
     */
    closeOnBlur: boolean
    /**
     * Closes the mobile menu when the user selects a menu item and navigates to a
     * new route.
     * @default false
     */
    closeOnRouteChange: boolean
    /**
     * An option to add an optional error boundary to the MobileMenu container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI side navigation bar.
   */
  sideNav: {
    /**
     * The width of the side navigation bar.
     * @default [250, 300]
     */
    width: ResponsiveScale
    /**
     * The CSS `transition` property that controls how the side nav enters and exits
     * the viewport on mobile.
     * @default 'transform ease 0.3s'
     */
    cssTransition: string
    /**
     * Determines if the side nav should be rendered as a <header> tag. Don't use this if
     * you also use a <Header> component in your layout.
     * @default false
     */
    isHeader: boolean
    /**
     * Lets you connect the side nav to the header's mobile menu button istead of
     * activating the mobile menu component. This behavior is only for mobile.
     * @default false
     */
    isPrimaryMobileNav: boolean
    /**
     * Closes the side nav on mobile when the user clicks outside the menu.
     * @default true
     */
    closeOnBlur: boolean
    /**
     * Closes the side nav when the user selects a menu item and navigates to a
     * new route.
     * @default true
     */
    closeOnRouteChange: boolean
    /**
     * Adds a floating toggle to the viewport that lets you open / close the side nav
     * on mobile screens.
     * @default true
     */
    showToggleOnMobile: boolean
    /**
     * Lets you customize the side nav floating toggle button. By default,
     * it displays a button with `open` or `close` inner text, but you can use a custom React
     * component or a JSX callback to animate the button's state.
     * @default 'default'
     */
    toggleButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    /**
     * A boolean that lets you collapse Maker UI's SideNav.
     *
     * @remark Please note that this option does not currently use a performant
     * `transform` transition. It transitions the `margin-left` and `margin-right`
     * CSS attributes to maintain the content area's width.
     * @default false
     */
    collapse: boolean
    /**
     * Lets you customize the side nav collapse toggle button. By default, it displays a button
     * with `open` or `close` inner text, but you can use a custom React component or a JSX
     * callback to animate the button's state.
     * @remark You can also customize this component as a prop on `<SideNav />`
     * @default 'default'
     */
    collapseButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    /**
     * A specific breakpoint that controls when the grid for main content, sidebars, and the
     * side nav breaks down for mobile. You may also use an index to access a specific breakpoint
     * in the `options.breakpoints` array.
     * @default 0 (breakpoints[0], or 768px)
     */
    breakpoint: string | number
    /**
     * An option to add an optional error boundary to the SideNav container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI content area.
   */
  content: {
    /**
     * The max-width of the <main> tag content. Can be a responsive array.
     * @default 1020
     */
    maxWidth?: ResponsiveScale
    /**
     * The max-width of all nested <Section /> components. Can be a responsive array.
     * @default 1020
     *
     * @remarks To use sections with full-width backgrounds, make sure `content.maxWidth`
     * is set to `100%' and use this setting to control the content's max-width.
     */
    maxWidthSection?: ResponsiveScale
    /**
     * A specific breakpoint that controls when the grid for main content, sidebars, and the
     * side nav breaks down for mobile. You may also use an index to access a specific breakpoint
     * in the `options.breakpoints` array.
     * @default 0 (breakpoints[0], or 768px)
     */
    breakpoint: string | number
    /**
     * An option to add an optional error boundary to the main content area
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI sidebar.
   */
  sidebar: {
    /**
     * The width of the primary sidebar.
     * @default 300
     */
    width?: ResponsiveScale
    /**
     * The width of the secondary sidebar. In `sidebar content sidebar` layouts, this
     * value always determines the second (right-hand) sidebar width.
     * @default 200
     */
    width_2?: ResponsiveScale
    /**
     * The width of the gap between the main content area and optional sidebars.
     * Can be a responsive array.
     * @default 30
     */
    sidebarGap?: ResponsiveScale
    /**
     * An option to add an optional error boundary to the Sidebar container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for the Maker UI footer.
   */
  footer: {
    /**
     * The max-width of the layout's footer content. Can be a responsive array.
     * @default 1020
     */
    maxWidth?: ResponsiveScale
    /**
     * An option to add an optional error boundary to the Footer container
     * @default false
     */
    errorBoundary?: boolean
  }
  /**
   * Configuration object for Maker UI accessibility settings.
   */
  a11y: {
    /**
     * Adds native skiplink support to the root of your layout. Setting this value
     * to false is NOT recommended.
     * @default true
     */
    skiplinks?: boolean
  }
  /**
   * Configuration object for Maker UI error boundaries.
   */
  errors: {
    /**
     * A callback function that executes any time a Maker UI error boundary
     * is activated in production. Perfect for custom error monitoring or logging services.
     */
    logFunction?(error: string, errorDetails: object, component: string): any
    /**
     * Renders the error's stack trace in the error message. This is helpful for development
     * but not recommended for production.
     * @default false
     */
    showStackTrace?: boolean
    /**
     * Lets you easily add custom error components to each section of Maker UI's layout.
     */
    errorMessage?: {
      /** Custom component that displays for any error nested in the Topbar. */
      topbar?: React.ReactNode
      /** Custom component that displays for any error nested in the Header. */
      header?: React.ReactNode
      /** Custom component that displays for any error nested in the MobileMenu. */
      mobileMenu?: React.ReactNode
      /** Custom component that displays for any error nested in the Content component. */
      content?: React.ReactNode
      /** Custom component that displays for any error nested in the SideNav. */
      sideNav?: React.ReactNode
      /** Custom component that displays for any error nested in the Sidebar. */
      sidebar?: React.ReactNode
      /** Custom component that displays for any error nested in the Footer. */
      footer?: React.ReactNode
      /** Custom component that displays for any error nested in a Section component. */
      section?: React.ReactNode
    }
  }
}
