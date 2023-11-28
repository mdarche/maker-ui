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

export function containsAtLeastOneItem(
  array1: (string | number)[],
  array2: (string | number)[]
) {
  return array1.some((item) => array2.includes(item))
}
