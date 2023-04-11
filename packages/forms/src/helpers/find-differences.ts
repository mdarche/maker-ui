/**
 * Takes 2 objects and returns a list of keys with different values
 *
 * @param {T} values the new object
 * @param {T} initialValues the original object for comparison
 * @param {string[]} path the current object path (used for recursion)
 *
 * @returns string[]
 */
export function findDifferences<T>(
  values: T,
  initialValues: T,
  path: string[] = []
): string[] {
  const differences: string[] = []

  if (typeof values !== 'object' || typeof initialValues !== 'object') {
    return differences
  }

  const keys1 = Object.keys(values as object)
  const keys2 = Object.keys(initialValues as object)

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      differences.push([...path, key].join('.'))
      continue
    }

    const val1 = (values as any)[key]
    const val2 = (initialValues as any)[key]

    if (typeof val1 === 'object' || typeof val2 === 'object') {
      differences.push(...findDifferences(val1, val2, [...path, key]))
    } else if (val1 !== val2) {
      differences.push([...path, key].join('.'))
    }
  }

  return differences
}

/**
 * Creates an object with updated properties based on the given differences
 *
 * @param {T} originalObject the original object
 * @param {string[]} differences an array of keys with different values
 *
 * @returns Partial<T>
 */
export function createUpdateObject<T>(
  originalObject: T,
  differences: string[]
): Partial<T> {
  const updateObject: any = {}

  differences.forEach((diff) => {
    const keys = diff.split('.')
    let currentObj = originalObject
    let currentUpdateObj = updateObject

    keys.forEach((key, index) => {
      // @ts-ignore
      currentObj = currentObj[key]

      if (index === keys.length - 1) {
        currentUpdateObj[key] = currentObj
      } else {
        if (!currentUpdateObj[key]) {
          currentUpdateObj[key] = {}
        }
        currentUpdateObj = currentUpdateObj[key]
      }
    })
  })

  return updateObject
}
