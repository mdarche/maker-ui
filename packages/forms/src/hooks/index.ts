import { useContext } from 'react'
import { FormContext } from '@/components'
// import type { FormErrors, FormSchema, FormValues } from '@/types'

// Validate function
// - validate required
// - validate anything custom per field
// - if using pages, determine what to validate
// - update errors

function isEmpty(obj: object) {
  return Object.values(obj as object).every(
    (el) => el === undefined || el === null
  )
}

// function validate(
//   values: FormValues,
//   schema: FormSchema
// ): { success: boolean; errors: FormErrors } {
//   let success = false
//   let errors = {}

//   return { success, errors }
// }

export function useForm() {
  const { state: s, dispatch } = useContext(FormContext)

  function validateForm(): boolean {
    let success = true
    let errors: { [key: string]: any } = {}

    // Loop through all values
    Object.keys(s.schema).forEach((name) => {
      if (s.schema[name].required && !s.values[name]) {
        // Check for required
        success = false
        errors[name] = `Field is required`
      } else if (s.schema[name].validation) {
        // Check for custom validation
        const parsed = s.schema[name].validation.safeParse(s.values[name])
        console.log('parsed is', parsed)
      }
    })

    if (!isEmpty(errors)) {
      dispatch({ type: 'SET_ERRORS', value: errors })
    }

    return success
  }

  function validatePage(): boolean {
    let success = false
    let errors = {}

    return true
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
    dispatch({ type: 'SET_PAGE', value: n })
  }

  return {
    // Static
    success: s.formSuccess,
    error: s.formError,
    currentPage: s.currentPage,
    totalPages: s.totalPages,
    settings: s.settings,
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

export function useField(name: string) {
  const { state: s, dispatch } = useContext(FormContext)
  const page = s.schema[name].page

  function setTouch() {
    dispatch({ type: 'SET_TOUCHED', value: name })
  }

  function setValue(val: any, touch?: boolean) {
    if (touch && !s.touched.includes(name)) {
      setTouch()
    }
    dispatch({ type: 'SET_VALUE', value: { [name]: val } })
  }

  function validateField(): boolean {
    // Validate the current value for this field
    // Add error if fails validation
    return true
  }

  return {
    field:
      page > 1
        ? s.fields[page]?.subFields?.find((p) => p.name === name)
        : s.fields.find((p) => p.name === name),
    touched: s.touched.includes(name),
    error: s.errors[name] || false,
    value: s.values[name],
    page,
    setValue,
    setTouch,
    validateField,
  }
}
