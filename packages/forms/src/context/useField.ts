import { useContext } from 'react'
import { merge } from '@maker-ui/utils'
import { FormContext } from './FormContext'
import {
  deepSearch,
  isEmpty,
  extractField,
  getFieldValue,
  validate,
} from '@/helpers'

/**
 * A hook that provides a set of functions and properties to interact with a specific form field.
 *
 * @param {string} name - The name of the form field to interact with.
 * @returns {Object} An object containing the field's properties and functions.
 */
export function useField(name: string) {
  const { state: s, dispatch } = useContext(FormContext)
  const page = s.schema ? s.schema[name]?.page : 1
  const r = extractField(name)
  const isRepeater = !!r

  function setTouched() {
    dispatch({ type: 'SET_TOUCHED', value: name })
  }

  function setValue(val: any, touch?: boolean) {
    if (touch && !s.touched.includes(name)) {
      setTouched()
    }

    if (r) {
      // Handle nested repeater fields
      if (!Array.isArray(s.values[r.field])) {
        console.error(
          `Expected an array for field '${r.field}', but received:`,
          s.values[r.field]
        )
        return
      }

      const newArray = [...s.values[r.field]]

      if (r.index >= newArray.length) {
        newArray.length = r.index + 1
        newArray.fill(undefined, s.values[r.field].length, r.index)
      }
      newArray[r.index] = { ...newArray[r.index], [r.subField]: val }

      dispatch({ type: 'SET_VALUE', value: { [r.field]: newArray } })
    } else {
      dispatch({ type: 'SET_VALUE', value: { [name]: val } })
    }
  }

  function validateField(): boolean {
    console.log('Name is', name)
    const { isValid, errors } = validate({
      type: 'field',
      schema: s.schema,
      values: s.values,
      field: name,
    })

    if (!isEmpty(errors)) {
      dispatch({ type: 'SET_ERRORS', value: merge(s.errors, errors) })
    }

    if (isValid && s.errors[name]) {
      const newErrors = { ...s.errors }
      delete newErrors[name]
      dispatch({ type: 'SET_ERRORS', value: newErrors })
    }

    return isValid
  }

  return {
    // Static values
    field: isRepeater
      ? deepSearch(s.fields, 'name', r?.field)?.subFields?.find(
          (f) => f?.name === r?.subField
        )
      : deepSearch(s.fields, 'name', name),
    touched: s.touched.includes(name),
    error: s.errors[name],
    value: isRepeater ? getFieldValue(name, s.values) : s.values[name],
    page,
    // Functions
    setValue,
    setTouched,
    validateField,
  }
}
