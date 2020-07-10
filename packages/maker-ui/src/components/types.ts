import React from 'react'

type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? U[P]
    : never
}

export type MaybeElement = JSX.Element | string | false | null | undefined

export type ResponsiveScale = string | number | string[] | number[]

/**
 * Interface for Theme UI `<Box/>` component props and style shortcuts.
 */
export interface BasicBoxProps {
  children?: React.ReactNode
  variant?: string | string[]
  as?: React.ElementType | string
  sx?: object
  __css?: object
  className?: string
  id?: string
  admin?: {
    variant?: string | string[]
    sx?: object
    label?: string
  }
  // TESTING REWRITE THIS
  // ref?: any //React.Ref<HTMLElement>
  // role?: any
  // onClick?: any
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
export interface MakerProps extends BasicBoxProps {
  label?: string
  className?: string
}

/**
 * Alias for shared <Navbar /> component props.
 */
export interface NavProps extends MakerProps {
  logo: MaybeElement
  menuToggle: MaybeElement
  colorToggle: MaybeElement
  widgetArea: MaybeElement
  menu?: MenuProps[]
  bp?: number
  type?: string
  layout?: number
  pathname?: string
  maxWidth?: ResponsiveScale
  variant?: string
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
