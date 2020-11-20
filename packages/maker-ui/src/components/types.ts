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
 *
 * @TODO - address button callbacks vs react components ---> React.ReactNode
 */

export interface MakerOptions {
  navType?: string
  layout?: string // readonly
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
    stickyOnMobile?: boolean
    stickyUpScroll?: boolean
    scroll?: {
      toggleClass?: boolean
      scrollTop?: number
      className?: string
    }
    showColorButton?: boolean
    hideColorButtonOnMobile?: boolean
    hideWidgetsOnMobile?: boolean
    dropdown?: {
      caret?: boolean
      transition?: string
    }
    customMenuButton?: (
      isOpen?: boolean,
      attributes?: object
    ) => React.ReactElement | React.ReactElement
    customColorButton?: (
      currentMode?: string,
      attributes?: object
    ) => React.ReactElement | React.ReactElement
    breakIndex?: number
  }
  mobileMenu?: {
    width?: ResponsiveScale
    transition?: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right'
    visibleOnDesktop?: boolean
    customCloseButton?: (
      isOpen?: boolean,
      attributes?: object
    ) => React.ReactElement | React.ReactElement
    defaultCloseButton?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
  }
  sideNav?: {
    width?: ResponsiveScale
    isHeader?: boolean
    isPrimaryMobileNav?: boolean
    floatingToggle?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
    customToggle?: (
      isOpen?: boolean,
      attributes?: object
    ) => React.ReactElement | React.ReactElement
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
  errors?: {
    logFunction?: (
      error: string,
      errorDetails: object,
      component: string
    ) => any
    eventHandlerCatch?: (error: string) => any
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
  dock?: {
    width?: ResponsiveScale
    hideOnMobile?: boolean
    breakIndex?: number
  }
  workspace?: {
    layout?: string // read only
    canvasType?: string
    canvasMaxWidth?: ResponsiveScale
    toolbarHeight?: ResponsiveScale
    breakIndex?: number
    panelLeft?: {
      width?: ResponsiveScale
      collapseWidth?: ResponsiveScale
      defaultOpen?: boolean
      animationStyle?: 'slide' | 'scale'
      stickyContents?: boolean
    }
    panelRight?: {
      width?: ResponsiveScale
      collapseWidth?: ResponsiveScale
      defaultOpen?: boolean
      animationStyle?: 'slide' | 'scale'
      stickyContents?: boolean
    }
  }
}
