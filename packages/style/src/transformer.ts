/**
 * CSS attributes that accept an integer
 */
const numberProps = [
  'zIndex',
  'opacity',
  'lineHeight',
  'flex',
  'order',
  'tabSize',
  'columnCount',
]

/**
 * Converts camelcase JS property name into dashed CSS attribute
 */
const formatName = (n: string) =>
  n.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

/**
 * Converts integer values into pixels if necessary
 */
const formatValue = (v: any, n: string) =>
  typeof v === 'number' ? (numberProps.includes(n) ? v : `${v}px`) : v

/**
 * Sorts an object that includes media queries, nested selectors, and
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
 * Converts a deeply nested object into a flattened CSS string
 */
export function objectToCSS(
  root: string,
  obj: { [key: string]: any },
  parentSelector = '',
  depth = 0,
  isMediaQuery = false
): string {
  let res = '',
    propCount = 0,
    mq = 0
  const keys = Object.keys(obj).sort((a, b) => ruleSort(a, b, obj))
  const parent = formatKey(parentSelector)

  for (let k of keys) {
    if (k.startsWith('@media')) {
      mq++
    }
    if (typeof obj[k] !== 'object') {
      propCount++
    }
  }

  if (depth === 0) {
    // Initial check at depth === 0 to open style rule
    if (propCount > 0) {
      res += `.${root} {`
    }
  } else if (!isMediaQuery) {
    res += ` .${root}${parent} {`
  }

  keys.forEach((k, i) => {
    const value = obj[k]

    if (k.startsWith('@media')) {
      // Handle Media Query
      res += `} ${k} { .${root}${depth !== 0 ? parent : ''} { ${objectToCSS(
        root,
        value,
        parent,
        depth + 1,
        true
      )}`
      // Close Object if there are no other media queries
      if (mq === keys.length - propCount) {
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
    } else {
      // Handle CSS attribute / value
      res += `${formatName(k)}: ${formatValue(value, k)};`
      // Close the style rule if this is the last property
      if (i === propCount - 1 && mq === 0) {
        res += '}'
      }
    }
  })
  return res
}
