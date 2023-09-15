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

  if (
    typeof values !== 'object' ||
    typeof initialValues !== 'object' ||
    values === null ||
    initialValues === null
  ) {
    return differences
  }

  const keys1 = Object.keys(values)
  const keys2 = Object.keys(initialValues)

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      differences.push([...path, key].join('.'))
      continue
    }

    const val1 = (values as any)[key]
    const val2 = (initialValues as any)[key]

    // Treat empty strings and undefined as equal
    const normalizedVal1 = val1 === '' ? undefined : val1
    const normalizedVal2 = val2 === '' ? undefined : val2

    if (Array.isArray(normalizedVal1) && Array.isArray(normalizedVal2)) {
      const arraysAreDifferent =
        normalizedVal1.length !== normalizedVal2.length ||
        normalizedVal1.some((value, index) => value !== normalizedVal2[index])

      if (arraysAreDifferent) {
        differences.push([...path, key].join('.'))
      }
    } else if (
      typeof normalizedVal1 === 'object' ||
      typeof normalizedVal2 === 'object'
    ) {
      differences.push(
        ...findDifferences(normalizedVal1, normalizedVal2, [...path, key])
      )
    } else if (normalizedVal1 !== normalizedVal2) {
      differences.push([...path, key].join('.'))
    }
  }

  return differences
}
