const regex = /^[a-zA-Z0-9]+$/
/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @param length - an integer that determines the length of the random string
 *
 */
export function generateId(
  length: number = 6,
  casing: 'lower' | 'upper' | 'mixed' = 'lower'
): string {
  let result = ''
  // Always add a letter as the first character
  result += String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  for (let i = 1; i < length; i++) {
    let char
    do {
      char = Math.floor(Math.random() * 256)
    } while (!regex.test(String.fromCharCode(char)))
    result += String.fromCharCode(char)
  }
  switch (casing) {
    case 'lower':
      return result.toLowerCase()
    case 'upper':
      return result.toUpperCase()
    default:
      return result
  }
}

/**
 * Returns a formatted selector string for `id` or `className` attributes that
 * merges user generated classNames with MakerUI defaults.
 *
 * @param selectors - an array of classNames or ids supplied by component props.
 * Can be dynamically generated
 *
 */
export function cn(selectors: (string | undefined)[]): string | undefined {
  let s = selectors
    ? selectors
        .join(' ')
        .replace(/ +(?= )/g, '')
        .trim()
    : undefined

  return s !== '' ? s : undefined
}

/**
 * Utility for merging a local ref with the useMeasure ref
 */
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

/**
 * Checks if an object is empty using recursion
 *
 * @param obj - the object to check
 * @param maxDepth - the maximum depth to check
 * @param depth - the current depth
 * @param checkFalsy - check for falsy values
 *
 * @returns boolean
 */
export function isObjectEmpty(
  obj?: Record<string, any>,
  maxDepth: number = 2,
  depth: number = 0,
  checkFalsy: boolean = false
): boolean {
  if (!obj) return true
  const result = Object.keys(obj).length === 0
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (checkFalsy) {
        if (
          !value ||
          (isObjectEmpty(value) && Object.keys(value).length === 0)
        ) {
          return true
        }
      } else {
        if (value === null || value === undefined) {
          return true
        }
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        if (
          depth < maxDepth &&
          isObjectEmpty(value, maxDepth, depth + 1, checkFalsy)
        ) {
          return true
        }
      }
    }
  }
  return result
}
