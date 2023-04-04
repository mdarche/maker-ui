import * as React from 'react'

/**
 * Checks whether an object is empty, meaning that all its values are undefined or null.
 *
 * @param obj The object to check.
 * @returns True if all values in the object are undefined or null, false otherwise.
 */
export function isEmpty(obj: object) {
  return Object.values(obj as object).every(
    (el) => el === undefined || el === null
  )
}

/**
 * Searches for a specific key-value pair in a collection of objects,
 * including nested arrays of objects.
 *
 * @param array The array of objects to search through.
 * @param key The key to search for.
 * @param value The value to search for.
 * @returns The first object that contains the specified key-value pair,
 * or undefined if the pair is not found.
 */
export function deepSearch<T>(
  collection: T[],
  key: keyof T,
  value: T[keyof T]
): T | undefined {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o as object)) {
      if (k === key && v === value) {
        return o
      }
      if (Array.isArray(v)) {
        const _o = deepSearch(v, key, value)
        if (_o) {
          return _o
        }
      }
    }
  }
}

/**
 * Recursively searches for all values within an object that correspond to a given key.
 *
 * @param obj - The object to search.
 * @param target - The key to search for.
 * @returns An array of all values within the object that correspond to the target key.
 */
export function findAllValuesByKey(obj: object, target: string): any {
  return (
    Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === target
          ? acc.concat(value)
          : typeof value === 'object' && value && !React.isValidElement(value)
          ? acc.concat(findAllValuesByKey(value, target))
          : acc,
      []
    ) || []
  )
}

export function findDuplicateKey<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): string | undefined {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  const set = new Set<string>(obj1Keys)
  return obj2Keys.find((key) => set.has(key))
}
