import { merge } from '@maker-ui/utils'
import { objectToCSS } from './transformer'
import type { ResponsiveCSS, Breakpoints, StyleSettings } from './types'

const formatBreakpoint = (value: any) =>
  typeof value === 'string' ? value : `${value}px`
const defaultBreakpoints: Breakpoints = [768, 960, 1440]

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
  breakpoints = defaultBreakpoints,
  mediaQuery = 'min-width'
): CSSObject {
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

    parsed[key] = value[0]
    for (let i = 0; i < value.length - 1; i++) {
      const mq = `@media screen and (${mediaQuery}: ${formatBreakpoint(
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

  // return parsed
  return sort(parsed)
}

type CSSObject = {
  [key: string]: any
}

/**
 * Sorts media queries in a CSS object by min-width so styles cascade properly
 */
function sort(css: CSSObject): CSSObject {
  const mediaQueries = Object.entries(css).filter(([key]) =>
    key.startsWith('@media')
  )
  const others = Object.entries(css).filter(
    ([key]) => !key.startsWith('@media')
  )
  const sortedMQs = mediaQueries.sort(([a], [b]) => {
    const aMatch = a.match(/\d+/)
    const bMatch = b.match(/\d+/)
    if (aMatch && bMatch) {
      const aWidth = parseInt(aMatch[0], 10)
      const bWidth = parseInt(bMatch[0], 10)
      return bWidth - aWidth
    }
    return 0
  })
  const sorted = [...others, ...sortedMQs]
  return Object.fromEntries(sorted)
}

/**
 * Recursively parses a user-generated CSS object and generates media queries for each item
 * in the breakpoint array.
 *
 * @param css - a CSS style object
 * @param breakpoints - an array of breakpoints
 * @returns A new CSS object that replaces arrays with media queries
 *
 * @internal
 *
 */
const formatStyleObject = (
  css: ResponsiveCSS,
  breakpoints?: Breakpoints,
  mediaQuery?: StyleSettings['mediaQuery']
) => {
  let result: ResponsiveCSS = {}

  const styles = parseArrays(css, breakpoints, mediaQuery)

  for (const [key, val] of Object.entries(styles)) {
    if (val && typeof val === 'object') {
      /** Recursively format nested objects */
      result[key] = formatStyleObject(
        val as ResponsiveCSS,
        breakpoints,
        mediaQuery
      )
      continue
    }
    result[key] = val
  }

  return result
}

/**
 *  Generates CSS from a user-generated CSS object
 *
 * @param styles{ResponsiveCSS} a responsive CSS object
 * @param root{string} the root selector
 * @param breakpoints{Breakpoints} an array of breakpoints
 *
 * @returns a string of CSS for style tag insertion
 */
export function generateCSS({
  css: styles = {},
  root = 'global',
  breakpoints,
  mediaQuery,
}: StyleSettings) {
  const styleObject = formatStyleObject(styles, breakpoints, mediaQuery)
  return objectToCSS(root, styleObject)
}
