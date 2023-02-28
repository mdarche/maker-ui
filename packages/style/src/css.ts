import { merge } from '@maker-ui/utils'
import type { ResponsiveCSS, Breakpoints } from './types'

const formatBreakpoint = (value: any) => (isNaN(value) ? value : `${value}px`)
const defaultBreakpoints: Breakpoints = ['768px', '960px', '1440px']

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
export function parseArrays(
  styles: ResponsiveCSS,
  breakpoints = defaultBreakpoints
) {
  let parsed: ResponsiveCSS = {}
  for (const [key, value] of Object.entries(styles as object)) {
    if (value === null) continue
    /** If value is not an array */
    if (!Array.isArray(value)) {
      parsed[key] = value
      continue
    }
    /** Throw error if not enough breakpoints are provided */
    if (value.length > breakpoints.length + 1) {
      throw new Error(
        `The number of style rules must be equal to or less than the number of breakpoints`
      )
    }
    /** If value is a responsive array, add rule in reverse order so we don't overwrite
     * cascading min-width media queries.
     */
    parsed[key] = value[0]
    for (let i = 0; i < value.length - 1; i++) {
      const mq = `@media screen and (min-width: ${formatBreakpoint(
        breakpoints[i]
      )})`
      if (parsed[mq]) {
        parsed = merge(parsed, { [mq]: { [key]: value[i + 1] } })
      } else {
        parsed[mq] = {
          [key]: value[i + 1],
        }
      }
    }
  }

  return sortMediaQueries(parsed)
}

type CSSObject = {
  [key: string]: any
}

function sortMediaQueries(css: CSSObject): CSSObject {
  const mediaQueryEntries = Object.entries(css).filter(([key]) =>
    key.startsWith('@media')
  )
  const otherEntries = Object.entries(css).filter(
    ([key]) => !key.startsWith('@media')
  )
  const sortedMediaQueryEntries = mediaQueryEntries.sort(([a], [b]) => {
    const aMatch = a.match(/\d+/)
    const bMatch = b.match(/\d+/)
    if (aMatch && bMatch) {
      const aWidth = parseInt(aMatch[0], 10)
      const bWidth = parseInt(bMatch[0], 10)
      return bWidth - aWidth
    }
    return 0
  })
  const sorted = [...otherEntries, ...sortedMediaQueryEntries]
  return Object.fromEntries(sorted)
}

/**
 * Formats a user-generated CSS object and generates media queries for each item
 * in the breakpoint array.
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

  const styles = parseArrays(css, breakpoints)

  for (const [key, val] of Object.entries(styles)) {
    if (val && typeof val === 'object') {
      /** Recursively format nested objects */
      result[key] = formatCSS(val as ResponsiveCSS, breakpoints)
      continue
    }
    result[key] = val
  }

  return result
}
