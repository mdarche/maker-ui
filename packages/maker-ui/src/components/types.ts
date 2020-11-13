import * as React from 'react'
import { SxStyleProp, Theme } from 'theme-ui'

export type MaybeElement = JSX.Element | string | false | null | undefined

export type ResponsiveScale =
  | string
  | string[]
  | number
  | number[]
  | (string | number)[]

export type ResponsiveString = string | string[]

export interface MakerProps {
  sx?: SxStyleProp
  variant?: string
}

/**
 * Alias for Maker UI theme object.
 */

export type MakerTheme = Theme

/**
 * Alias for top-level Maker UI layout components.
 */

export interface MakerOptions {
  layout?: string
  navType?: string
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: MaybeElement
  ): React.ReactElement
  topbar?: {
    maxWidth?: ResponsiveScale
    hideOnMobile?: boolean
    breakIndex?: number
  }
  header?: {
    maxWidth?: ResponsiveScale
    sticky?: boolean
    stickyMobile?: boolean
    stickyScroll?: boolean
    scroll?: {
      toggleClass?: boolean
      scrollTop?: number
      className?: string
    }
    colorToggle?: boolean
    hideColorToggleOnMobile?: boolean
    hideWidgetsOnMobile?: boolean
    dropdown?: {
      caret?: boolean
      transition?: string
    }
    breakIndex?: number
  }
  mobileMenu?: {
    width?: ResponsiveScale
    transition?: string
    visibleOnDesktop?: boolean
    defaultCloseButton?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
    customButton?(state?: boolean): React.ReactElement
  }
  sideNav?: {
    width?: ResponsiveScale
    isHeader?: boolean
    isPrimaryMobileNav?: boolean
    floatingToggle?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
    customToggle?(isOpen?: boolean, attributes?: object): React.ReactElement
    breakIndex?: number
  }
  content?: {
    maxWidth?: ResponsiveScale
    maxWidthSection?: ResponsiveScale
    sidebarGap?: ResponsiveScale
    breakIndex?: number
  }
  sidebar?: {
    width?: ResponsiveScale
  }
  footer?: {
    maxWidth?: ResponsiveScale
  }
  a11y?: {
    skiplinks?: boolean
  }
}
