import React, { useEffect, useReducer, useState } from 'react'
import { merge } from '@maker-ui/utils'

import type {
  FieldProps,
  FormSettings,
  FormState,
  FormValues,
  ValidationSchema,
} from './types'
import { initialState } from './defaults'
import { FormRenderer } from './FormRenderer'
import { FormHeader, FormFooter, FormError, FormSuccess } from './FormSlots'

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

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  fields: FieldProps[]
  settings?: Partial<FormSettings>
  error?: boolean
  success?: boolean
  onSubmit: (values: FormValues) => void | Promise<any>
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
      const { values, validation } = getFieldData(state.fields || [])
      return {
        ...state,
        values,
        validation,
        errors: {},
        touched: [],
      }
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

function getFieldData(fields: FieldProps[]) {
  const nonFields = ['page', 'group', 'divider']
  let values: FormValues = {}
  let validation: ValidationSchema = {}

  fields.forEach((f) => {
    if (nonFields.includes(f.type) && f.subFields) {
      // Recursively get nested field data
      const nested = getFieldData(f.subFields)
      values = merge(values, nested.values)
      validation = merge(validation, nested.validation)
    } else {
      values[f.name] = f.initialValue || getDefault(f.type)
      validation[f.name] = f.validation
    }
  })
  return { values, validation }
}

export const Form = ({
  children,
  settings,
  success,
  error,
  onSubmit,
  fields,
  ...props
}: FormProps) => {
  const isPaginated = fields.find((f) => f.type === 'page')
  const { values, validation } = getFieldData(fields)
  // Parse fields for initial values and page count
  const [rendered, setRendered] = useState(false)
  const [state, dispatch] = useReducer(
    formReducer,
    merge(initialState, {
      settings,
      fields,
      formSuccess: success,
      formError: error,
      totalPages: isPaginated ? fields.length : 1,
      validation,
      values,
    }) as FormState
  )

  if (isPaginated) {
    // Warn if the form is paginated but not all fields are of type `page`
    if (fields.find((f) => f.type !== 'page')) {
      console.warn(
        'If your form is paginated, all top level fields must use type `page`.'
      )
    }
    // Warn if there is only one page
    if (fields.length === 1) {
      console.warn('Your form is paginated but only has one page.')
    }
  }

  // Listen for changes to fields, settings, error, and success
  useEffect(() => {
    if (!rendered) return
    if (fields.length) {
      dispatch({ type: 'UPDATE_FIELDS', value: fields })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields])

  useEffect(() => {
    if (!rendered) return
    if (settings) {
      dispatch({ type: 'UPDATE_SETTINGS', value: settings })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  useEffect(() => {
    if (!rendered) return
    if (error !== undefined) {
      dispatch({ type: 'SET_FORM_ERROR', value: error })
    }
    if (success !== undefined) {
      dispatch({ type: 'SET_FORM_SUCCESS', value: success })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success])

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

Form.Header = FormHeader
Form.Footer = FormFooter
Form.Error = FormError
Form.Success = FormSuccess
