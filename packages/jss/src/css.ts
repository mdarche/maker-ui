import { merge } from '@maker-ui/utils'
import type { Interpolation, Breakpoints } from './types'

const format = (value: any) => (isNaN(value) ? value : `${value}px`)
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
export function responsive(
  styles: Interpolation<any>,
  breakpoints: Breakpoints
) {
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
 * @returns An EmotionJS compatible CSSObject
 *
 * @internal
 *
 */
export const formatCSS =
  (css: Interpolation<any>, breakpoints?: Breakpoints) => (theme: any) => {
    let result: Interpolation<any> = {}

    const bp = breakpoints || theme?.breakpoints || defaultBreakpoints
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

/**
 * Converts camelcase JS-based style rules into dashes
 */
// const formatName = (n: string) =>
// n.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

// const formatValue = (v: any) => {
// // add pixels if number and not a whitelisted value like z-index
// return v
// }

// function nestedObjectToCssString(
//   obj: { [key: string]: any },
//   parentSelector: string = ''
// ): string {
//   let cssString = ''
//   for (const key in obj) {
//     const value = obj[key]
//     const currentSelector = parentSelector ? `${parentSelector} ${key}` : key
//     if (key.startsWith('@media')) {
//       cssString += `${key} { ${nestedObjectToCssString(
//         value,
//         parentSelector
//       )} }`
//     } else if (typeof value === 'object') {
//       cssString += nestedObjectToCssString(value, currentSelector)
//     } else {
//       cssString += `${currentSelector}: ${value};`
//     }
//   }
//   return cssString
// }

// function objectToCSS(
//   obj: { [key: string]: any },
//   parentSelector: string = ''
// ): string {
//   let cssString = ''
//   for (const key in obj) {
//     const value = obj[key]
//     const currentSelector = parentSelector ? `${parentSelector} ${key}` : key
//     if (key.startsWith('@media')) {
//       cssString += `${key} { ${objectToCSS(value, parentSelector)} }`
//     } else if (typeof value === 'object') {
//       cssString += objectToCSS(value, currentSelector)
//     } else {
//       cssString += `${currentSelector}: ${value};`
//     }
//   }
//   return cssString
// }
