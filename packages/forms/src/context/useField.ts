import { useContext } from 'react'
import { merge } from '@maker-ui/utils'
import { FormContext } from './FormContext'
import { deepSearch, isEmpty, validate } from '@/helpers'

/**
 * A hook that provides a set of functions and properties to interact with a specific form field.
 *
 * @param {string} name - The name of the form field to interact with.
 * @returns {Object} An object containing the field's properties and functions.
 */
export function useField(name: string) {
  const { state: s, dispatch } = useContext(FormContext)
  const page = s.schema ? s.schema[name]?.page : 1

  function setTouched() {
    dispatch({ type: 'SET_TOUCHED', value: name })
  }

  function setValue(val: any, touch?: boolean) {
    if (touch && !s.touched.includes(name)) {
      setTouched()
    }
    dispatch({ type: 'SET_VALUE', value: { [name]: val } })
  }

  function validateField(): boolean {
    const { isValid, errors } = validate({
      type: 'field',
      schema: s.schema,
      values: s.values,
      conditions: s.conditions,
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
    field: deepSearch(s.fields, 'name', name),
    touched: s.touched.includes(name),
    error: s.errors[name] || false,
    value: s.values[name],
    page,
    setValue,
    setTouched,
    validateField,
  }
}
