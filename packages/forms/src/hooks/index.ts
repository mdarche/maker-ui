import { useContext } from 'react'
import { merge } from '@maker-ui/utils'
import { FormContext } from '@/components'
import { validate } from '@/helpers'
import { FieldProps } from '@/types'

function isEmpty(obj: object) {
  return Object.values(obj as object).every(
    (el) => el === undefined || el === null
  )
}

function deepSearch(
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

export function useForm() {
  const { state: s, dispatch } = useContext(FormContext)

  function validateForm(): boolean {
    const { isValid, errors } = validate({
      type: 'form',
      schema: s.schema,
      values: s.values,
    })

    dispatch({ type: 'SET_ERRORS', value: !isEmpty(errors) ? errors : {} })

    return isValid
  }

  function validatePage(page: number): boolean {
    const { isValid, errors } = validate({
      type: 'page',
      schema: s.schema,
      values: s.values,
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
    const { isValid, errors } = validate({
      type: 'field',
      schema: s.schema,
      values: s.values,
      field: name,
    })

    if (!isEmpty(errors)) {
      dispatch({ type: 'SET_ERRORS', value: merge(s.errors, errors) })
    }
    // TODO remove error if it no longer exists

    return isValid
  }

  return {
    field: deepSearch(s.fields, 'name', name),
    touched: s.touched.includes(name),
    error: s.errors[name] || false,
    value: s.values[name],
    page,
    setValue,
    setTouch,
    validateField,
  }
}
