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
  // Always add a letter as the first character (important for CSS selectors)
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
 * @param maxDepth - the maximum depth to check. Default = 0
 * @param depth - the current depth
 * @param checkFalsy - check for falsy values. Default = false
 *
 * @returns boolean
 */
export function isObjectEmpty(
  obj?: Record<string, any>,
  maxDepth = 2,
  depth = 0,
  checkFalsy = false
): boolean {
  if (!obj || Object.keys(obj).length === 0) return true
  let result = true

  for (const key in obj) {
    // If depth requirements are met and result is false, exit loop and return false
    if (depth <= maxDepth && !result) return false
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (checkFalsy) {
        if (!value || value === 0) {
          result = true
        }
      } else {
        if (value === null || value === undefined) {
          result = true
        }
      }
      if (value) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          if (
            depth <= maxDepth &&
            isObjectEmpty(value, maxDepth, depth + 1, checkFalsy)
          ) {
            result = true
          } else {
            result = false
          }
        } else {
          result = false
        }
      }
    }
  }
  return result
}

/**
 * This function cleans an object by removing any key-value pairs
 * where the value is null or undefined.
 * If all key-value pairs are null or undefined, the function returns undefined.
 *
 * @param {Record<string, any>} obj - The object to be cleaned.
 *
 * @returns {Record<string, any> | undefined}
 */
export function cleanObject(
  obj: Record<string, any>
): Record<string, any> | undefined {
  let cleanedObject: Record<string, any> = {}
  let hasDefinedKeys = false

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      cleanedObject[key] = obj[key]
      hasDefinedKeys = true
    }
  })

  return hasDefinedKeys ? cleanedObject : undefined
}

/**
 * This function formats a number based on a provided template. If the value is a string,
 * it's returned as is. If the value is a number, it's converted to a string and inserted
 * into the template in place of the '%' character. If the value is neither a string nor a
 * number, the function throws an error.
 *
 * @param {string | number} value - The value to be formatted. Can be a string or a number.
 * @param {string} template - The template to use for formatting the number. This should
 * include a '%' character where the number should be inserted. Default is `%px`.
 *
 * @returns {string} The formatted string.
 *
 * @throws {Error} Throws an error if the value is neither a string nor a number.
 */
export function formatNumber(value?: string | number, template = '%px') {
  if (!value) return undefined
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return template.replace('%', value.toString())
  } else {
    throw new Error(`Invalid type for value: ${typeof value}`)
  }
}
