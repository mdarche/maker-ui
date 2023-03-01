import { ResponsiveCSS } from './types'

type CSSRootSelector = string

/**
 * CSS attributes that accept an integer
 */
const numberProps = new Set([
  'zIndex',
  'opacity',
  'lineHeight',
  'flex',
  'order',
  'tabSize',
  'columnCount',
])

/**
 * Converts camelcase JS property name into dashed CSS attribute
 */
const formatName = (n: string) =>
  n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Converts integer values into pixels if necessary
 */
const formatValue = (v: any, n: string) => {
  switch (typeof v) {
    case 'number':
      return numberProps.has(n) ? v : `${v}px`
    case 'string':
      return v
    default:
      throw new Error(
        `Unsupported data type for value "${v}" of property "${n}"`
      )
  }
}

/**
 * Sorts an object that includes media query keys, nested object values, and
 * basic style rules
 */
function ruleSort(a: string, b: string, obj: any) {
  if (
    (typeof obj[a] === 'string' || typeof obj[a] === 'number') &&
    typeof obj[b] === 'object'
  ) {
    return -1
  }

  if (typeof obj[a] === 'object' && typeof obj[b] === 'object') {
    if (a.startsWith('@media')) return -1
    return 1
  }
  return 1
}
/**
 * Formats CSS attributes that start with the '&' symbol. Otherwise adds a leading space
 * to normal properties
 */
const formatKey = (p: string) =>
  p.includes('&') ? p.replace(/&|\s&/g, '') : ` ${p}`

/**
 * Checks for empty style object
 */
function isObjectEmpty(obj: ResponsiveCSS) {
  return Object.keys(obj).length === 0
}

/**
 * Converts a deeply nested object into a flattened CSS string
 *
 * @param root - the parent element's CSS selector. Should be unique for locally scoped styles
 * @param obj - a deeply nested style object
 * @param parentSelector - The current object key for recursive function calls
 * @param depth - The current level of recursion
 * @param isMediaQuery - If the current iteration is a media query
 *
 */
export function objectToCSS(
  root: CSSRootSelector,
  obj: { [key: string]: any },
  parentSelector = '',
  depth = 0,
  isMediaQuery = false
): string {
  const base = root === 'global' ? '' : `.${root}`
  const isGlobal = root === 'global'
  let res = '',
    propCount = 0,
    mq = 0
  const keyList = Object.keys(obj).sort((a, b) => ruleSort(a, b, obj))
  const parent = formatKey(parentSelector)
  const empty = isObjectEmpty(obj)

  // Determine if this rule is a media query or a style rule
  for (let k of keyList) {
    if (k.startsWith('@media')) {
      mq++
    }
    if (typeof obj[k] !== 'object') {
      propCount++
    }
  }

  if (depth === 0) {
    // Initial check at depth === 0 to open style rule
    if (propCount > 0 && !isGlobal) {
      res += `${base} {`
    }
  } else if (!isMediaQuery && !empty) {
    res += ` ${base}${parent} {`
  }

  keyList.forEach((k, i) => {
    const value = obj[k]

    if (k.startsWith('@media')) {
      // Handle Media Query
      res += `${res.endsWith('}}') ? ' ' : '} '}${k} { ${base}${
        depth !== 0 ? parent : ''
      } { ${objectToCSS(root, value, parent, depth + 1, true)}`

      // Close media query when all properties have been processed
      const closeBracket =
        mq === keyList.length - propCount ||
        mq === keyList.length - mq ||
        mq === 1

      if (depth !== 0 && closeBracket) {
        res += '}'
      }
      // Close final rule of depth === 0 when media queries are present
      if (depth === 0) {
        res += '}'
      }
    } else if (typeof value === 'object') {
      // Handle Nested Object
      const current = parent ? `${parent}${k.includes(':') ? '' : ' '}${k}` : k
      const nested = objectToCSS(root, value, current, depth + 1)
      res += nested
    } else if (!(depth === 0 && isGlobal)) {
      // Handle CSS attribute / value
      if (value !== undefined) {
        res += `${formatName(k)}: ${formatValue(value, k)};`
      }
      // Close the style rule if this is the last property
      if (i === propCount - 1 && mq === 0) {
        res += '}'
      }
    }
  })
  return res.replace(/\s+/g, ' ').trim()
}
