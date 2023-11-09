import { useContext } from 'react'
import { FormContext } from './FormContext'
import { deepSearch, initRepeaterValues } from '@/helpers'

/**
 * A hook that provides a set of functions and properties to interact with repeater fields.
 *
 * @param {string} name - The name of the form field to interact with.
 * @returns {Object} An object containing the field's properties and functions.
 */
export function useRepeater(name: string) {
  const { state: s, dispatch } = useContext(FormContext)
  const field = deepSearch(s.fields, 'name', name)

  function removeIndex(index: number) {
    if (
      !s.values[name] ||
      !Array.isArray(s.values[name]) ||
      s.values[name][index] === undefined
    ) {
      return console.error(
        'Repeater field does not exist or index is out of range.'
      )
    }

    // Create a new array excluding the item at the specified index
    const newArray = [
      ...s.values[name].slice(0, index),
      ...s.values[name].slice(index + 1),
    ]
    dispatch({ type: 'SET_VALUE', value: { [name]: newArray } })
  }

  // Done
  function addIndex() {
    if (!Array.isArray(s.values[name])) {
      return console.error(
        `Expected an array for field '${name}', but received:`,
        s.values[name]
      )
    }
    const newArray = [...s.values[name], initRepeaterValues(field?.subFields)]
    dispatch({ type: 'SET_VALUE', value: { [name]: newArray } })
  }

  // function reorder(newIndex: number) {
  //   validateRepeaterOperation(r, (array) => {
  //     if (newIndex < 0 || newIndex >= array.length) {
  //       return console.error('New index is out of bounds.')
  //     }

  //     const newArray = [...array]
  //     const [item] = newArray.splice(r!.index, 1)
  //     newArray.splice(newIndex, 0, item)

  //     dispatch({ type: 'SET_VALUE', value: { [r!.field]: newArray } })
  //   })
  // }
  function reorder() {}

  return {
    removeIndex,
    addIndex,
    reorder,
  }
}
