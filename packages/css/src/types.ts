import { Interpolation } from '@emotion/react'

export type Breakpoints = (string | number)[]

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
  css?: Interpolation<any> | object
  breakpoints?: Breakpoints
}

/**
 * A string, number, or array of either lets you stack values for media queries.
 *
 * @example A simple example:
 * <div css={{ height: [50, 100]}} />
 */
export type ResponsiveScale = string | number | (string | number)[]

declare module 'react' {
  interface Attributes extends MakerProps {}
}

/**
 * Direct export from EmotionJS
 */
export { Interpolation }
