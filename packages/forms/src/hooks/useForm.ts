import { useContext } from 'react'
import { FormContext } from '@/components'
import { isEmpty, validate } from '@/helpers'

/**
 * A hook that provides a set of functions and properties to interact with the form.
 *
 * @returns {Object} An object containing the form's properties and functions.
 */
export function useForm() {
  const { state: s, dispatch } = useContext(FormContext)

  function validateForm(): boolean {
    const { isValid, errors } = validate({
      type: 'form',
      schema: s.schema,
      values: s.values,
      conditions: s.conditions,
    })

    dispatch({ type: 'SET_ERRORS', value: !isEmpty(errors) ? errors : {} })

    return isValid
  }

  function validatePage(page: number): boolean {
    const { isValid, errors } = validate({
      type: 'page',
      schema: s.schema,
      values: s.values,
      conditions: s.conditions,
      page,
    })

    dispatch({ type: 'SET_ERRORS', value: !isEmpty(errors) ? errors : {} })

    return isValid
  }

  function setSubmitCount() {
    dispatch({ type: 'SET_SUBMIT_COUNT' })
  }

  function setIsSubmitting(b: boolean) {
    dispatch({ type: 'SET_STATUS', value: b })
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' })
  }

  function setPage(n: number) {
    // Go to top of page
    const form = document.querySelector(`.${s.formId}`)
    if (form) {
      const buffer = 100
      const offsetTop =
        form.getBoundingClientRect().top + window.pageYOffset - buffer
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    dispatch({ type: 'SET_PAGE', value: n })
  }

  return {
    // Static
    formId: s.formId,
    success: s.formSuccess,
    error: s.formError,
    currentPage: s.currentPage,
    totalPages: s.totalPages,
    settings: s.settings,
    resetCount: s.resetCount,
    submitCount: s.submitCount,
    isSubmitting: s.isSubmitting,
    fields: s.fields,
    values: s.values,
    errors: s.errors,
    touched: s.touched,
    schema: s.schema,
    formError: s.formError,
    // Functions
    setPage,
    setIsSubmitting,
    setSubmitCount,
    resetForm,
    validateForm,
    validatePage,
  }
}
