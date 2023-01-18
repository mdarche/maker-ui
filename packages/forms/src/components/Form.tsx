import React, { useMemo, useEffect, useReducer, useState } from 'react'
import { merge } from '@maker-ui/utils'

import { FormRenderer } from './FormRenderer'
import {
  FormHeader,
  FormFooter,
  FormError,
  FormSuccess,
  FormSubmit,
} from './Slots'
import type {
  FieldProps,
  FormSchema,
  FormSettings,
  FormState,
  FormValues,
} from '@/types'
import { initialState } from '@/helpers'

export type Action =
  | {
      type: 'UPDATE_FIELDS'
      value: FieldProps[]
    }
  | {
      type: 'SET_VALUE'
      value: { [key: string]: any }
    }
  | {
      type: 'SET_ERRORS'
      value: { [key: string]: any }
    }
  | { type: 'SET_TOUCHED'; value: string }
  | { type: 'SET_PAGE'; value: number }
  | { type: 'SET_STATUS'; value: boolean }
  | { type: 'SET_FORM_SUCCESS'; value: boolean }
  | { type: 'SET_FORM_ERROR'; value: boolean }
  | { type: 'UPDATE_SETTINGS'; value: Partial<FormSettings> }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SUBMIT_COUNT' }

interface FormHelpers {
  submitCount: number
  setIsSubmitting: (value: boolean) => void
  resetForm: () => void
}

export interface FormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode
  fields: FieldProps[]
  settings?: Partial<FormSettings>
  error?: boolean
  success?: boolean
  onSubmit: (values: FormValues, helpers: FormHelpers) => void | Promise<any>
}

export const FormContext = React.createContext<{
  state: FormState
  dispatch: (a: Action) => void
}>({ state: initialState, dispatch: (a) => {} })

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: { ...state.values, ...action.value },
      }
    case 'SET_ERRORS':
      return {
        ...state,
        errors: merge(state.errors || {}, action.value),
      }
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: [...(state.touched || []), action.value],
      }
    case 'SET_FORM_SUCCESS':
      return {
        ...state,
        formSuccess: action.value,
      }
    case 'SET_FORM_ERROR':
      return {
        ...state,
        formError: action.value,
      }
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: merge(state.settings, action.value),
      }
    case 'RESET_FORM':
      const { values, schema } = getFieldData(state.fields || [])
      return {
        ...state,
        values,
        schema,
        errors: {},
        touched: [],
      }
    case 'SET_SUBMIT_COUNT':
      return { ...state, submitCount: state.submitCount + 1 }
    default: {
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function getDefault(type: FieldProps['type']) {
  const numVals = ['number', 'range']
  return numVals.includes(type)
    ? 0
    : type === 'switch'
    ? false
    : type === 'checkbox' || type === 'select'
    ? []
    : type === 'image-picker'
    ? null
    : ''
}

function getFieldData(fields: FieldProps[], index = 0) {
  const nonFields = ['page', 'group', 'divider']
  let values: FormValues = {}
  let schema: FormSchema = {}

  fields.forEach((f, i) => {
    if (nonFields.includes(f.type) && f?.subFields) {
      // Recursively get nested field data
      const nested = getFieldData(f.subFields, i)
      values = merge(values, nested.values)
      schema = merge(schema, nested.schema)
    } else {
      values[f.name] = f.initialValue || getDefault(f.type)
      schema[f.name] = {
        type: f.type,
        required: !!f.required,
        page: index + 1,
        validation: f?.validation,
      }
    }
  })
  return { values, schema }
}

export const Form = ({
  children,
  settings = {},
  success,
  error,
  onSubmit,
  fields = [],
  ...props
}: FormProps) => {
  const memoFields = useMemo(() => fields, [fields])
  const isPaginated = !!fields.find((f) => f.type === 'page')
  const { values, schema } = getFieldData(fields)
  const [rendered, setRendered] = useState(false)
  const [state, dispatch] = useReducer(
    formReducer,
    merge(initialState, {
      settings,
      fields: memoFields,
      formSuccess: success,
      formError: error,
      totalPages: isPaginated ? fields.length : 1,
      schema,
      values,
    }) as FormState
  )

  if (isPaginated) {
    if (fields.find((f) => f.type !== 'page')) {
      // Warn if the form is paginated but not all fields are of type `page`
      console.warn(
        'If your form is paginated, all top level fields must use type `page`.'
      )
    }
    if (fields.length === 1) {
      // Warn if there is only one page
      console.warn('Your form is paginated but only has one page.')
    }
  }

  /**
   * Listen for changes to error and success
   */
  useEffect(() => {
    if (!rendered) return
    if (error !== undefined) {
      dispatch({ type: 'SET_FORM_ERROR', value: error })
    }
    if (success !== undefined) {
      dispatch({ type: 'SET_FORM_SUCCESS', value: success })
    }
  }, [error, success, rendered])

  useEffect(() => {
    setRendered(true)
  }, [])

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <FormRenderer onSubmit={onSubmit} {...props}>
        {children}
      </FormRenderer>
    </FormContext.Provider>
  )
}

Form.Submit = FormSubmit
Form.Header = FormHeader
Form.Footer = FormFooter
Form.Error = FormError
Form.Success = FormSuccess
