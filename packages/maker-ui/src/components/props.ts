/**
 * Alias for all valid HTML props for `<div>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 */
export type MaybeElement = JSX.Element | false | null | undefined

/**
 * Alias and type shortcut for Theme UI box abstraction
 */
export type ResponsiveScale = string | number | string[] | number[]

/**
 * Alias for all Maker UI compatible menus
 */

export interface MenuProps {
  label: string
  path: string
  classes: string
  icon: MaybeElement
  newTab: boolean
  submenu: [
    {
      label: string
      path: string
      newTab: boolean
    }
  ]
}

export interface BoxProps extends HTMLDivProps {
  // Main props
  variant?: string
  as?: string
  sx?: object
  ref?: React.Ref<HTMLElement>
  // Admin props
  __css?: object
  // Style props
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
 * Alias and type shortcut for special <MakerBox /> component
 * that renders special data for maker studio / local development
 */
export interface MakerBoxProps extends BoxProps {
  label?: string
}
