import * as React from 'react'
import { merge } from '@maker-ui/utils'

import {
  FieldProps,
  FormConditions,
  FormErrors,
  FormSchema,
  FormSettings,
  FormState,
  FormValues,
} from '@/types'
import { initialState } from '../defaults'
import { findDuplicateKey } from '@/helpers'

export type Action =
  | { type: 'SET_FIELDS'; value: FieldProps[] }
  | { type: 'SET_VALUE'; value: FormValues }
  | { type: 'SET_ERRORS'; value: FormErrors }
  | { type: 'SET_TOUCHED'; value: string }
  | { type: 'SET_PAGE'; value: number }
  | { type: 'SET_STATUS'; value: boolean }
  | { type: 'SET_FORM_SUCCESS'; value: boolean }
  | { type: 'SET_FORM_ERROR'; value: boolean }
  | { type: 'UPDATE_SETTINGS'; value: Partial<FormSettings> }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SUBMIT_COUNT' }

export const FormContext = React.createContext<{
  state: FormState
  dispatch: (a: Action) => void
}>({ state: initialState as FormState, dispatch: (a) => {} })

export function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.value }
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, ...action.value } }
    case 'SET_ERRORS':
      return { ...state, errors: action.value }
    case 'SET_TOUCHED':
      return { ...state, touched: [...(state.touched || []), action.value] }
    case 'SET_FORM_SUCCESS':
      return { ...state, formSuccess: action.value }
    case 'SET_FORM_ERROR':
      return { ...state, formError: action.value }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: merge(state.settings, action.value) }
    case 'SET_FIELDS':
    case 'RESET_FORM':
      const fields =
        action.type === 'SET_FIELDS' ? action.value : state.fields || []
      return {
        ...state,
        resetCount: state.resetCount + 1,
        fields,
        errors: {},
        touched: [],
        ...getFieldData(fields),
      }
    case 'SET_SUBMIT_COUNT':
      return {
        ...state,
        isSubmitting: true,
        submitCount: state.submitCount + 1,
      }
    case 'SET_STATUS':
      return { ...state, isSubmitting: action.value }
  }
}

function getDefault(type: FieldProps['type']) {
  const numVals = ['number', 'range']
  return numVals.includes(type)
    ? 0
    : type === 'switch'
    ? false
    : type === 'checkbox' || type === 'select' || type === 'repeater'
    ? []
    : type === 'image-picker'
    ? null
    : type === 'date-picker' || type === 'date-time-picker'
    ? ''
    : ''
}
const error = (name: string) =>
  `Each field should have a unique name. The field "${name}" is used more than once. This will lead to unexpected errors in your form.`

export function getFieldData(fields: FieldProps[], index = 0) {
  const nonFields = ['page', 'group', 'repeater', 'divider']
  let values: FormValues = {}
  let schema: FormSchema = {}
  let conditions: FormConditions = {}

  // TODO get initial values for Repeater
  fields.forEach((f, i) => {
    // Handle nested fields
    if (nonFields.includes(f.type) && f?.subFields) {
      // If group has conditions, add this to the conditions object
      if (f.type === 'group' && f?.conditions) {
        conditions[f.name] = f.conditions
      }
      // Recursively get nested field data
      const nested = getFieldData(f.subFields, i)
      const usedKey = findDuplicateKey(values, nested.values)
      // Throw error if a duplicate key is found
      if (usedKey) {
        console.error(error(usedKey))
      }
      values = merge(values, nested.values)
      schema = merge(schema, nested.schema)
      conditions = merge(conditions, nested.conditions)
    } else {
      // Handle normal / flat fields
      if (values[f.name]) {
        console.error(error(f.name))
      }
      if (f.type !== 'divider') {
        values[f.name] = f.initialValue || getDefault(f.type)
        conditions[f.name] = f?.conditions
        schema[f.name] = {
          type: f.type,
          required: typeof f?.required === 'string' ? f.required : !!f.required,
          page: index + 1,
          validation: f?.validation,
        }
      }
    }
  })

  return { values, schema, conditions }
}
