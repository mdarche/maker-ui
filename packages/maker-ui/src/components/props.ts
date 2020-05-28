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
 * Alias for all valid HTML props for `<svg>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLSVGProps = React.SVGAttributes<HTMLElement>

/**
 * Alias for all valid HTML props for `<svg>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Alias for all valid HTML props for `<svg>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLAriaProps = React.AriaAttributes

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 */
export type MaybeElement = JSX.Element | false | null | undefined

/**
 * Alias and type shortcut for Theme UI responsive scales. Can be a `string`,
 * `number`, or an array of either.
 */
export type ResponsiveScale = string | number | string[] | number[]

/**
 * Alias for all Maker UI compatible menus. Offers support for nesting menus
 * one level deeper.
 */
export interface MenuProps {
  label: string
  path: string
  classes: string
  icon: MaybeElement
  newTab: boolean
  submenu: MenuProps[] // TODO test that this might have a problem
}

/**
 * Interface for Theme UI `<Box/>` component props and style shortcuts.
 */
export interface BasicBoxProps {
  children?: React.ReactNode
  // Theme UI-specific
  variant?: string
  as?: string
  sx?: object
  ref?: React.Ref<HTMLElement>
  // Style prop shortcuts
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
export interface BoxProps extends BasicBoxProps, HTMLDivProps {
  __css?: object
}

/**
 * Alias for Theme UI box component props that includes all
 * HTML svg attributes. Used with MakerUI's internal `<Box />` component.
 */
export interface SVGProps extends BasicBoxProps, HTMLSVGProps {
  __css?: object
}

/**
 * Alias for Theme UI box component props that includes all
 * HTML button attributes. Used with MakerUI's internal `<Box />` component.
 */
export interface ButtonProps extends BoxProps {
  __css?: object
}

/**
 * Alias for Theme UI box component props that includes all
 * HTML button attributes. Used with MakerUI's internal `<Box />` component.
 */
export interface LinkProps extends BoxProps {
  __css?: object
  href: string
  target?: string
  download?: string
  rel?: string
}

/**
 * Alias for special <MakerBox /> component
 * that is used in the top level of each Maker UI layout component.
 */
export interface MakerProps extends BasicBoxProps {
  label?: string
  className?: string
}
