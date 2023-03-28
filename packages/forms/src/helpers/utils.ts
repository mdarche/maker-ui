import * as React from 'react'
import { FieldProps } from '@/types'

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
 * @param collection The collection to search through.
 * @param key The key to search for.
 * @param value The value to search for.
 * @returns The first object that contains the specified key-value pair,
 * or undefined if the pair is not found.
 */
export function deepSearch(
  collection: FieldProps[],
  key: string,
  value: string | number
): FieldProps | undefined {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o)) {
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
export function findAllByKey(obj: object, target: string): any {
  return (
    Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === target
          ? acc.concat(value)
          : typeof value === 'object' && value && !React.isValidElement(value)
          ? acc.concat(findAllByKey(value, target))
          : acc,
      []
    ) || []
  )
}
