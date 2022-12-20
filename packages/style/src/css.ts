import { merge } from '@maker-ui/utils'
import type { ResponsiveCSS, Breakpoints } from './types'

const formatBreakpoint = (value: any) => (isNaN(value) ? value : `${value}px`)
const defaultBreakpoints = ['768px', '960px', '1440px']

/**
 * Formats array values in the CSS object as responsive media queries
 *
 * @param styles - a CSS style object
 * @param breakpoints - an array of breakpoints
 * @returns A CSS style object
 *
 * @internal
 *
 */
export function parseArrays(styles: ResponsiveCSS, breakpoints: Breakpoints) {
  let next: ResponsiveCSS = {}
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
      const mq = `@media screen and (min-width: ${formatBreakpoint(
        breakpoints[i]
      )})`
      if (next[mq]) {
        next = merge(next, { [mq]: { [key]: value[i + 1] } })
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
 * Formats a user-generated CSS object and generates an Emotion-compatible
 * version with media queries for each item in the breakpoint array.
 *
 * @param styles - a CSS style object
 * @param breakpoints - an array of breakpoints
 * @returns A CSS object
 *
 * @internal
 *
 */
export const formatCSS = (css: ResponsiveCSS, breakpoints?: Breakpoints) => {
  let result: ResponsiveCSS = {}

  const bp = breakpoints || defaultBreakpoints
  const styles = parseArrays(css, bp)

  for (const [key, val] of Object.entries(styles)) {
    if (val && typeof val === 'object') {
      /** Recursively format nested objects */
      result[key] = formatCSS(val as ResponsiveCSS, bp)
      continue
    }

    result[key] = val
  }

  return result
}
