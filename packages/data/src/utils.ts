/**
 * This function retrieves the keys of an object where the corresponding value is not
 * considered "empty". In this context, "empty" means the value is either undefined, null,
 * an empty string, an empty array, or an empty object.
 *
 * @param {Record<string, any>} obj - The object from which to retrieve non-empty keys.
 *
 * @returns {string[]} An array of key names
 */
export function getNonEmptyKeys(obj: Record<string, any>): string[] {
  return Object.keys(obj).filter((key) => {
    const value = obj[key]
    if (value === undefined || value === null || value === '') {
      return false
    }
    if (Array.isArray(value) && value.length === 0) {
      return false
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return false
    }
    return true
  })
}

/**
 * This function formats a number based on a provided template. If the value is a string,
 * it's returned as is. If the value is a number, it's converted to a string and inserted
 * into the template in place of the '%' character. If the value is neither a string nor a
 * number, the function throws an error.
 *
 * @param {string | number} value - The value to be formatted. Can be a string or a number.
 * @param {string} template - The template to use for formatting the number. This should
 * include a '%' character where the number should be inserted.
 *
 * @returns {string} The formatted string.
 *
 * @throws {Error} Throws an error if the value is neither a string nor a number.
 */
export function formatNumber(value: string | number, template: string): string {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return template.replace('%', value.toString())
  } else {
    throw new Error(`Invalid type for value: ${typeof value}`)
  }
}
