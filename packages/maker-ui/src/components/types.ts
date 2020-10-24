import React from 'react'
import { SxStyleProp, Theme } from 'theme-ui'

export type MaybeElement = JSX.Element | string | false | null | undefined

export type ResponsiveScale =
  | string
  | number
  | string[]
  | number[]
  | (string | number)[]

export type ResponsiveString = string | string[]

export interface LayoutProps {
  sx?: SxStyleProp
  variant?: string
  bg?: ResponsiveString
}

/**
 * Interface for `<Box/>` component props and style shortcuts.
 */
export interface BasicBoxProps {
  variant?: string
  sx?: SxStyleProp
  bg?: string | string[]
  // color?: string | string[]
  m?: ResponsiveScale
  mt?: ResponsiveScale
  mr?: ResponsiveScale
  ml?: ResponsiveScale
  mb?: ResponsiveScale
  mx?: ResponsiveScale
  my?: ResponsiveScale
  p?: ResponsiveScale
  pt?: ResponsiveScale
  pr?: ResponsiveScale
  pl?: ResponsiveScale
  pb?: ResponsiveScale
  px?: ResponsiveScale
  py?: ResponsiveScale
  b?: ResponsiveScale
  bt?: ResponsiveScale
  br?: ResponsiveScale
  bl?: ResponsiveScale
  bb?: ResponsiveScale
}

/**
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps
  extends BasicBoxProps,
    React.SVGAttributes<SVGElement> {}

/**
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLButtonElement> {}

/**
 * Alias for `Link` component props that includes all
 * anchor tag attributes.
 */
export interface LinkProps
  extends BasicBoxProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * Alias for `UList` component props that includes all
 * unordered list tag attributes.
 */
export interface UListProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLUListElement> {}

/**
 * Alias for `OList` component props that includes all
 * ordered list tag attributes.
 */
export interface OListProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLOListElement> {}

/**
 * Alias for `ListItem` component props that includes all
 * list item tag attributes.
 */
export interface ListItemProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLLIElement> {}

/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface DivProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * Alias for `Span` component props that includes all
 * HTML span tag attributes.
 */
export interface SpanProps
  extends BasicBoxProps,
    React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Alias for `Flex` component props that includes all
 * HTML span tag attributes.
 */
export interface FlexProps extends DivProps {
  inline?: ResponsiveString
  align?: ResponsiveString
  justify?: ResponsiveString
  direction?: ResponsiveString
  flex?: ResponsiveScale
  wrap?: ResponsiveString
}

/**
 * Alias for Maker UI theme object.
 */

export type MakerTheme = Theme

/**
 * Alias for top-level Maker UI layout components.
 */

export interface MakerOptions {
  navigation?: string
  layout?: string
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
  }
  sideNav?: {
    width?: ResponsiveScale
    isHeader?: boolean
    isPrimaryMobileNav?: boolean
    floatingToggle?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
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

/**
 * Alias for shared <Navbar /> component props.
 */
export interface NavProps extends BasicBoxProps {
  logo?: MaybeElement
  menuToggle?: MaybeElement
  colorToggle?: MaybeElement
  widgetArea?: MaybeElement
  menu?: MenuProps[]
  bp?: number
  type?: string
  layout?: number
  pathname?: string
  maxWidth?: ResponsiveScale | any
  variant?: string
}

/**
 * Alias for all Maker UI compatible menus. Offers support for nesting menus.
 */
export interface MenuProps {
  label: string
  path: string
  classes?: string
  icon?: MaybeElement
  newTab?: boolean
  submenu?: MenuProps[]
  openNested?: boolean
}
