import * as CSS from 'csstype'

declare module 'csstype' {
  interface Properties {
    [index: string]: any
  }
}
type CSSRule = undefined | string | number | (string | number)[] | ResponsiveCSS

export type ResponsiveCSS = {
  [k in keyof CSS.Properties]: CSSRule
}

export type Breakpoints = (string | number)[]

/**
 * Acess to the `css` prop that accepts a responsive CSS object to generate a valid <Style> tag.
 * This type also extends access to the `breakpoints` and `mediaQuery` properties for additional
 * customizations.
 */
export interface MakerCSS extends Omit<StyleSettings, 'root'> {}

export interface StyleSettings {
  /** The root selector that all nested styles will be appended to. This should be a className
   * and should not include a leading dot.
   * @example
   * 'my-component'
   */
  root?: string
  /** A CSS object that will be converted to a string of CSS. This can be deeply nested, include
   * pseudo selectors, as well as array-based media queries.
   */
  css?: ResponsiveCSS
  /** An array of breakpoints that will be used to generate media queries. */
  breakpoints?: Breakpoints
  /** The type of CSS size media query */
  mediaQuery?: 'min-width' | 'max-width' | 'min-height' | 'max-height'
}
