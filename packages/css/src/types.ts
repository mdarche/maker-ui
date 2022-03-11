import type { Interpolation } from '@emotion/react'

export type Breakpoints = (string | number)[]
export type StyleObject = object | Interpolation<any>

/**
 * Support for the breakpoints prop and responsive CSS scales.
 *
 * @param breakpoints - An array of breakpoints that determines the css prop media queries
 * @param css - A css object that can support array values for all nested properties
 *
 * @remarks
 * Used by all Maker UI components, primitives, and custom jsx pragma.
 *
 */
export interface MakerProps {
  /** A css object that can support array of responsive values for all nested properties */
  css?: StyleObject
  /** An array of breakpoints that determines the css prop media queries */
  breakpoints?: Breakpoints
}

/**
 * A string, number, or array of either lets you stack values for media queries.
 *
 * @example A simple example:
 * <div css={{ height: [50, 100]}} />
 */
export type ResponsiveScale = string | number | (string | number)[]

/**
 * Utility type for responsive css strings
 */
export type ResponsiveString = string | string[]

/**
 * Direct export from EmotionJS
 */
export { Interpolation }
