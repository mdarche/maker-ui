import React from 'react'
import { SxStyleProp } from 'theme-ui'

type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? U[P]
    : never
}

export type MaybeElement = JSX.Element | string | false | null | undefined

export type ResponsiveScale = string | number | string[] | number[]

export type ResponsiveString = string | string[]

export type SxProp = SxStyleProp

export interface LayoutProps {
  sx?: SxStyleProp
  variant?: string
  bg?: ResponsiveString
}

/**
 * Interface for `<Box/>` component props and style shortcuts.
 */
export interface BasicBoxProps {
  // children?: React.ReactNode
  variant?: string | string[]
  as?: string | React.ElementType<any>
  sx?: SxProp
  __css?: SxProp
  __sx?: SxProp
  // className?: string
  // id?: string
  // TESTING REWRITE THIS
  ref?: any //React.Ref<HTMLElement>
  // role?: any
  // onClick?: any
  // title?: any
  // tabIndex?: any
  // Stop testing
  bg?: string | string[]
  color?: string | string[]
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
 * Alias for Theme UI box component props that includes all
 * HTML div attributes. Used with MakerUI's internal `<Box />` component.
 *
 * @TODO Make all components use Box prop and dynamically load type depending on 'as' prop
 */
export interface BoxProps
  extends Assign<React.ComponentPropsWithRef<'div'>, BasicBoxProps> {}

/**
 * Alias for Theme UI `Box` component props that includes all
 * svg attributes. Used with MakerUI's internal `Box` component.
 */
export interface SVGProps
  extends Assign<React.ComponentPropsWithRef<'svg'>, BasicBoxProps> {}

/**
 * Alias for Theme UI `Box` component props that includes all
 * HTML button attributes. Used with MakerUI's internal `Box` component.
 */
export interface ButtonProps
  extends Assign<React.ComponentPropsWithRef<'button'>, BasicBoxProps> {}

/**
 * Alias for Theme UI `Box` component props that includes all
 * anchor tag attributes. Used with MakerUI's internal `<Box />` component.
 */
export interface LinkProps
  extends Assign<React.ComponentPropsWithRef<'a'>, BasicBoxProps> {}

/**
 * Alias for top-level Maker UI components layout components.
 */

export interface MakerOptions {
  navigation: string
  layout: string
  topbar: {
    maxWidth: ResponsiveScale
    hideOnMobile: boolean
    breakIndex: number
  }
  header: {
    maxWidth: ResponsiveScale
    sticky: boolean
    stickyMobile: boolean
    stickyScroll: boolean
    scroll: {
      toggleClass: boolean
      scrollTop: number
      className: string
    }
    colorToggle: boolean
    hideColorToggleOnMobile: boolean
    hideWidgetsOnMobile: boolean
    dropdown: {
      caret: boolean
      transition: string
    }
    breakIndex: number
  }
  mobileMenu: {
    width: ResponsiveScale
    transition: string
    visibleOnDesktop: boolean
    defaultCloseButton: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
  }
  sideNav: {
    width: ResponsiveScale
    isHeader: boolean
    isPrimaryMobileNav: boolean
    floatingToggle: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
    breakIndex: number
  }
  content: {
    maxWidth: ResponsiveScale
    maxWidthSection: ResponsiveScale
    sidebarGap: ResponsiveScale
    breakIndex: number
  }
  sidebar: {
    width: ResponsiveScale
  }
  footer: {
    maxWidth: ResponsiveScale
  }
  a11y: {
    skiplinks: boolean
  }
}

/**
 * Alias for shared <Navbar /> component props.
 */
export interface NavProps extends BasicBoxProps {
  logo: MaybeElement
  menuToggle: MaybeElement
  colorToggle: MaybeElement
  widgetArea: MaybeElement
  menu?: MenuProps[]
  bp?: number
  type?: string
  layout?: number
  pathname?: string
  maxWidth?: ResponsiveScale | any
  variant?: string
  sx?: SxStyleProp
}

/**
 * Alias for all Maker UI compatible menus. Offers support for nesting menus.
 */
export interface MenuProps {
  label: string
  path: string
  classes: string
  icon: MaybeElement
  newTab: boolean
  submenu: MenuProps[]
  openNested: boolean
}
