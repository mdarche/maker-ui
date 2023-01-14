import { useContext } from 'react'
import { z } from 'zod'
import { FormContext } from './Form'

// Validate function
// - validate required
// - validate anything custom per field
// - if using pages, determine what to validate
// - update errors

export function useForm() {
  const { state: s, dispatch } = useContext(FormContext)
  // submit form
  // reset form
  // validate form
  function validate(key: string) {
    if (key === '*') {
      // validate all
    } else {
      // validate field
    }
  }

  function setIsSubmitting(b: boolean) {
    dispatch({ type: 'SET_STATUS', value: b })
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' })
  }

  function setPage(n: number) {
    dispatch({ type: 'SET_PAGE', value: n })
  }

  return {
    // Static
    success: s.formSuccess,
    error: s.formError,
    currentPage: s.currentPage,
    totalPages: s.totalPages,
    settings: s.settings,
    isSubmitting: s.isSubmitting,
    fields: s.fields,
    values: s.values,
    errors: s.errors,
    touched: s.touched,
    // Functions
    setPage,
    setIsSubmitting,
    resetForm,
    validate,
  }
}

export function useField() {
  const { state, dispatch } = useContext(FormContext)
  // update value
  // validate field
  // touch field
  // static: value, error, touched
}
