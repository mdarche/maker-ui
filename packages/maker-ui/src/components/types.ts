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
 * @TODO replace the following with `@types/theme-ui` and `@types/theme-ui__components`
 * extensions when the packages are stable and `@theme-ui/components` is rebuilt in TS.
 */

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
  // ref?: React.Ref<HTMLElement>
  // Sx prop shortcuts
  bg?: string | string[]
  margin?: ResponsiveScale
  m?: ResponsiveScale
  marginTop?: ResponsiveScale
  mt?: ResponsiveScale
  marginRight?: ResponsiveScale
  mr?: ResponsiveScale
  marginLeft?: ResponsiveScale
  ml?: ResponsiveScale
  marginBottom?: ResponsiveScale
  mb?: ResponsiveScale
  marginX?: ResponsiveScale
  mX?: ResponsiveScale
  marginY?: ResponsiveScale
  my?: ResponsiveScale
  padding?: ResponsiveScale
  p?: ResponsiveScale
  paddingTop?: ResponsiveScale
  pt?: ResponsiveScale
  paddingRight?: ResponsiveScale
  pr?: ResponsiveScale
  paddingLeft?: ResponsiveScale
  pl?: ResponsiveScale
  paddingBottom?: ResponsiveScale
  pb?: ResponsiveScale
  paddingX?: ResponsiveScale
  px?: ResponsiveScale
  paddingY?: ResponsiveScale
  py?: ResponsiveScale
}

/**
 * Alias for Theme UI box component props that includes all
 * HTML div attributes. Used with MakerUI's internal `<Box />` component.
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
