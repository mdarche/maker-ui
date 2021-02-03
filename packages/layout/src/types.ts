import * as React from 'react'
import { Interpolation, ResponsiveScale } from '@maker-ui/css'

import { mobileNavTypes, navTypes, transitionTypes } from './constants'

export interface MakerProps {
  css?: Interpolation<any>
  breakpoints?: (string | number)[]
}

type ThemeColors = {
  [key: string]: {
    /** The site's primary text color. */
    text: string
    /** The default color for all anchor tags. */
    link: string
    /** The default hover color for all anchor tags. */
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
   * A JSX callback function that lets you wrap your framework's local
   * Link or Route component around all native Maker UI anchor tags.
   */
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: React.ReactElement
  ): React.ReactElement
  /**
   * Configuration object for the Maker UI topbar.
   */
  topbar: {
    /**
     * The max-width of the topbar's content container. Can be a responsive array.
     */
    maxWidth: ResponsiveScale
    /**
     * Determines if the topbar sticks to the top of the viewport while scrolling.
     */
    sticky?: boolean
    /**
     * Determines if the header sticks to the top of the viewport on mobile.
     */
    stickyOnMobile?: boolean
    /**
     * Determines if the topbar is visible on mobile.
     */
    hideOnMobile?: boolean
    /**
     * A specific breakpoint that determines when the topbar is visible. You may also use an index
     * to access a specific breakpoint in the `options.breakpoints` array.
     *
     * @remark - This is only helpful if `hideOnMobile` is true.
     */
    breakpoint: number | string
  }
  /**
   * Configuration object for the Maker UI header.
   */
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
     * The max-width of the header's content container. Can be a responsive array.
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
    /**
     * Determines whether the header nav area displays a color toggle button.
     */
    showColorButton: boolean
    /**
     * Hides the header's color toggle button on mobile.
     */
    hideColorButtonOnMobile: boolean
    /**
     * Hides the header nav area on mobile (typically containing search, social icons,
     * or other custom components).
     */
    hideWidgetsOnMobile: boolean
    /**
     * Controls the header's default dropdown menu settings.
     */
    dropdown: {
      /** A boolean that displays the default caret or a React Element that lets you
       * use a custom caret component.*/
      caret: boolean | 'default' | React.ReactElement
      /** The transition animation for showing/hiding header dropdown menus on hover or focus.*/
      transition: 'scale' | 'fade' | 'fade-down' | 'fade-up'
    }
    /**
     * Lets you decide if your nav menu should wrap to the next line or scroll horizontally
     * when the menu is larger than its container width.
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
     */
    breakpoint: number | string
  }
  /**
   * Configuration object for the Maker UI mobile menu.
   */
  mobileMenu: {
    /**
     * The width of the mobile menu when active. This can be a responsive array.
     */
    width: ResponsiveScale
    /**
     * The transition style for the mobile menu when a user clicks the header's
     * mobile menu button.
     */
    transition: typeof transitionTypes[number]
    /**
     * The CSS `transition` property that controls how the mobile menu enters and exits
     * the viewport.
     */
    easingCurve?: string
    /**
     * Displays the header's mobile menu button at all times.
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
     */
    showCloseButton: boolean
    /**
     * Closes the mobile menu when the user clicks outside the menu.
     *
     * @remarks - Only useful for `slide-left` and `slide-right` transition types when
     * the width is less than 100% or 100vw
     */
    closeOnBlur: boolean
    /**
     * Closes the mobile menu when the user selects a menu item and navigates to a
     * new route.
     */
    closeOnRouteChange: boolean
  }
  /**
   * Configuration object for the Maker UI side navigation bar.
   */
  sideNav: {
    /**
     * The width of the side navigation bar.
     */
    width: ResponsiveScale
    /**
     * The CSS `transition` property that controls how the side nav enters and exits
     * the viewport on mobile.
     */
    easingCurve: string
    /**
     * Determines if the side nav should be rendered as a <header> tag. Don't use this if
     * you also use a <Header> component in your layout.
     */
    isHeader: boolean
    /**
     * Lets you connect the side nav to the header's mobile menu button istead of
     * activating the mobile menu component. This behavior is only for mobile.
     */
    isPrimaryMobileNav: boolean
    /**
     * Closes the side nav on mobile when the user clicks outside the menu.
     */
    closeOnBlur: boolean
    /**
     * Closes the side nav when the user selects a menu item and navigates to a
     * new route.
     */
    closeOnRouteChange: boolean
    /**
     * Adds a floating toggle to the viewport that lets you open / close the side nav
     * on mobile screens.
     */
    showToggleOnMobile: boolean
    /**
     * Lets you customize the side nav floating toggle button. By default, it displays a button
     * with `open` or `close` inner text, but you can use a custom React component or a JSX
     * callback to animate the button's state.
     */
    toggleButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    breakpoint: string | number
  }
  /**
   * Configuration object for the Maker UI content area.
   */
  content: {
    /**
     * The max-width of the <main> tag content. Can be a responsive array.
     */
    maxWidth?: ResponsiveScale
    /**
     * The max-width of all nested <Section /> components. Can be a responsive array.
     *
     * @remarks - To use sections with full-width backgrounds, make sure `content.maxWidth`
     * is set to `100%' and use this setting to control the content's max-width.
     */
    maxWidthSection?: ResponsiveScale
    /**
     * The width of the gap between the main content area and optional sidebars.
     * Can be a responsive array.
     */
    sidebarGap?: ResponsiveScale
    /**
     * Use this setting to defer the DOM calculations of absolutely positioned components
     * like Popovers or Dropdowns if your layout uses Page Transitions.
     *
     * @remarks - This is a temporary solution in v1.0
     */
    deferMeasurements?: number
    /**
     * A specific breakpoint that controls when the grid for main content, sidebars, and the
     * side nav breaks down for mobile. You may also use an index to access a specific breakpoint
     * in the `options.breakpoints` array.
     */
    breakpoint: string | number
  }
  /**
   * Configuration object for the Maker UI sidebar.
   */
  sidebar: {
    /**
     * The width of the primary sidebar.
     */
    width?: ResponsiveScale
    /**
     * The width of the secondary sidebar. In `sidebar content sidebar` layouts, this
     * value always determines the second (right-hand) sidebar width.
     */
    secondWidth?: ResponsiveScale // TODO
  }
  /**
   * Configuration object for the Maker UI footer.
   */
  footer: {
    /**
     * The max-width of the layout's footer content. Can be a responsive array.
     */
    maxWidth?: ResponsiveScale
  }
  /**
   * Configuration object for Maker UI accessibility settings.
   */
  a11y: {
    /**
     * Adds native skiplink support to the root of your layout. Setting this value
     * to false is NOT recommended.
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
      /** Custom component that displays for any error nested in the Main component. */
      main?: React.ReactNode
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
  /**
   * Configuration object for the Maker UI workspace layout.
   */
  workspace: {
    /**
     * The max-width of the workspace canvas content. Can be a responsive array.
     */
    canvasMaxWidth?: ResponsiveScale
    /**
     * Configuration object for the left workspace panel.
     */
    panelLeft?: PanelProps
    /**
     * Configuration object for the right workspace panel.
     */
    panelRight?: PanelProps
    /**
     * Configuration object for the workspace dock component.
     */
    dock?: {
      /** The width of the dock. */
      width?: ResponsiveScale
      /** Hides the dock on mobile. */
      hideOnMobile?: boolean
      /** A specific breakpoint that controls when the dock breaks down for mobile. You may also
       * use an index to access a specific breakpoint in the `options.breakpoints` array.
       */
      breakpoint: string | number
    }
    /**
     * A specific breakpoint that controls when the workspace panels and toolbar break down on
     * mobile. You may also use an index to access a specific breakpoint in the `options
     * breakpoints` array.
     */
    breakpoint: string | number
  }
}

type PanelProps = {
  /**
   * The width of the workspace panel.
   */
  width?: ResponsiveScale
  /**
   * Determines if the panel can expand and collapse.
   */
  collapsible?: boolean
  /**
   * The width of the panel when it is collapsed.
   */
  collapseWidth?: ResponsiveScale
  /**
   * Lets you customize the panel collapse / expand button. By default, it displays a button
   * with `open` or `close` inner text, but you can use a custom React component or a JSX
   * callback to animate the button's state.
   */
  collapseButton?:
    | 'default'
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  /**
   * Lets you choose if the panel should be open or closed by default.
   */
  defaultOpen?: boolean
  /**
   * The transition type for closing and opening the panel.
   */
  transition?: 'slide' | 'scale'
}
