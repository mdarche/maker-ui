import merge from 'deepmerge'
import { Interpolation } from '@emotion/react'

import { Breakpoints } from './types'

const format = (value: any) => (isNaN(value) ? value : `${value}px`)
const defaultBreakpoints = ['768px', '960px', '1440px']

/**
 * Formats a CSS object and generates a style object
 * with media queries for each item in the breakpoint array.
 *
 * @param styles - an CSS style object
 * @param breakpoints - an array of breakpoints
 *
 * @internal usage only
 *
 */

function responsive(styles: Interpolation<any>, breakpoints: Breakpoints) {
  let next: Interpolation<any> = {}
  for (const [key, value] of Object.entries(styles as object)) {
    if (value === null) continue
    /** If value is not an array */
    if (!Array.isArray(value)) {
      next[key] = value
      continue
    }
    /** If value is a responsive array */
    next[key] = value[0]
    for (let i = 0; i < value.length - 1; i++) {
      const mq = `@media screen and (min-width: ${format(breakpoints[i])})`
      if (next[mq]) {
        merge(next, { mq: { [key]: value[i + 1] } })
      } else {
        next[mq] = {
          [key]: value[i + 1],
        }
      }
    }
  }
  return next
}

/**
 * A recursive function that formats all nested objects into an Interpolation
 * for Emotion's css prop
 *
 * @param styles - a CSS style object
 * @param breakpoints - an array of breakpoints
 *
 * @internal usage only
 *
 */

export const formatCSS = (
  css: Interpolation<any>,
  breakpoints?: Breakpoints
) => (theme: any) => {
  /** The theme call is a critical piece of Emotion's themeable css prop. */
  let result: Interpolation<any> = {}

  const bp = breakpoints || theme.breakpoints || defaultBreakpoints
  const styles = responsive(css, bp)

  for (const [key, value] of Object.entries(styles)) {
    // @ts-ignore
    const val = typeof value === 'function' ? value(theme) : value

    if (val && typeof val === 'object') {
      /** Recursively format nested objects */
      result[key] = formatCSS(val as Interpolation<any>, bp)(theme)
      continue
    }
    result[key] = val
  }

  return result
}
