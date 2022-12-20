/**
 * Converts camelcase JS-based property name into dashes
 */
const formatName = (n: string) =>
  n.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

const formatValue = (v: any) => {
  // add pixels if number and not a whitelisted value like z-index
  return v
}
/**
 * Converts a deeply nested object into a flattened CSS string
 */
export function objectToCSS(
  root: string,
  obj: { [key: string]: any },
  parent = '',
  depth = 0,
  isMediaQuery = false
): string {
  let res = ''
  // Sort object keys by value type and then key name. Ensure media queries for a selector
  // are complete before beginning the next selector attributes
  const keys = Object.keys(obj).sort((a, b) => {
    if (typeof obj[a] === 'string' && typeof obj[b] === 'object') return -1
    if (typeof obj[a] === 'object' && typeof obj[b] === 'object') {
      if (a.startsWith('@media')) return -1
      return 1
    }
    return 1
  })
  // Counters
  let propCount = 0,
    mq = 0

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
  } else {
    if (!isMediaQuery) {
      res += ` .${root} ${parent} {`
    }
  }

  keys.forEach((k, i) => {
    const value = obj[k]
    const current = isMediaQuery ? '' : parent ? `${parent} ${k}` : k

    if (k.startsWith('@media')) {
      // Media Query
      res += ` ${k} { ${objectToCSS(root, value, parent, depth + 1, true)}`
      // Close Object if there are no other media queries
      if (mq === keys.length - propCount) {
        res += '}'
      }
      // Close final rule of depth === 0 when media queries are present
      if (depth === 0) {
        res += '}'
      }
    } else if (typeof value === 'object') {
      // Nested Object
      const nested = objectToCSS(root, value, current, depth + 1)
      res += nested
    } else {
      // Pure CSS value
      res += `${formatName(k)}: ${formatValue(value)};`
      // Close the style rule if this is the last property
      if (i === propCount - 1 && mq === 0) {
        res += '}'
      }
    }
  })
  return res
}
