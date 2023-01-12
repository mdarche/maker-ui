import { useContext } from 'react'
import { z } from 'zod'
import { FormContext } from './Form'

// Validate function
// - validate required
// - validate anything custom per field
// - if using pages, determine what to validate
// - update errors

export function useForm() {
  const { state, dispatch } = useContext(FormContext)
  // submit form
  // reset form
  // validate form
  // update status
  // update page
  // validate page
  // static: values, errors, touched, currentPage, totalpages, isSubmitting, isValidating
}

export function useField() {
  const { state, dispatch } = useContext(FormContext)
  // update value
  // validate field
  // touch field
  // static: value, error, touched
}
