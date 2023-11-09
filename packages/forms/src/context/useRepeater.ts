import { useContext } from 'react'
import { FormContext } from './FormContext'
import { extractField } from '@/helpers'

/**
 * A hook that provides a set of functions and properties to interact with repeater fields.
 *
 * @param {string} name - The name of the form field to interact with.
 * @returns {Object} An object containing the field's properties and functions.
 */
export function useRepeater(name: string) {
  const { state: s, dispatch } = useContext(FormContext)
  const r = extractField(name)

  function validateRepeaterOperation(
    r: { field: string; index: number } | undefined,
    operation: (newArray: any[]) => void
  ) {
    if (!r) {
      return console.error('No repeater field specified for operation.')
    }
    if (!Array.isArray(s.values[r.field])) {
      return console.error(
        `Expected an array for field '${r.field}', but received:`,
        s.values[r.field]
      )
    }

    operation(s.values[r.field])
  }

  function removeIndex() {
    validateRepeaterOperation(r, (array) => {
      const newArray = [
        ...array.slice(0, r!.index),
        ...array.slice(r!.index + 1),
      ]
      dispatch({ type: 'SET_VALUE', value: { [r!.field]: newArray } })
    })
  }

  function addIndex() {
    validateRepeaterOperation(r, (array) => {
      const newArray = [...array, {}]
      dispatch({ type: 'SET_VALUE', value: { [r!.field]: newArray } })
    })
  }

  function reorder(newIndex: number) {
    validateRepeaterOperation(r, (array) => {
      if (newIndex < 0 || newIndex >= array.length) {
        return console.error('New index is out of bounds.')
      }

      const newArray = [...array]
      const [item] = newArray.splice(r!.index, 1)
      newArray.splice(newIndex, 0, item)

      dispatch({ type: 'SET_VALUE', value: { [r!.field]: newArray } })
    })
  }

  return {
    removeIndex,
    addIndex,
    reorder,
  }
}
