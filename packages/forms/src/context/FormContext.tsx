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
const uniqueError = (name: string) =>
  `Each field should have a unique name. The field "${name}" is used more than once. This will lead to unexpected errors in your form.`

export function getFieldData(fields: FieldProps[], index = 0) {
  const nonFields = ['page', 'group', 'repeater', 'divider']
  let values: FormValues = {}
  let schema: FormSchema = {}
  let conditions: FormConditions = {}

  fields.forEach((f, i) => {
    // Handle fields that have `subFields` property
    if (nonFields.includes(f.type) && f?.subFields) {
      if ((f.type === 'group' || f.type === 'repeater') && f?.conditions) {
        conditions[f.name] = f.conditions
      }

      if (f.type === 'repeater') {
        // Handle repeater fields
        if (f.subFields.some((s) => nonFields.includes(s.type))) {
          throw new Error('You cannot further nest a repeater field.')
        }

        const subFieldNames = new Set<string>()
        f.subFields.forEach((s) => {
          if (subFieldNames.has(s.name)) {
            throw new Error(uniqueError(s.name))
          }
          subFieldNames.add(s.name)
        })
        // - Loop over f.subFields
        // - Use subField index to create unique key for each subField
        // - Throw error if any subFields have the same name
      } else {
        // Handle page and group fields
        const nested = getFieldData(
          f.subFields,
          f.type === 'page' ? i : undefined
        )
        const usedKey = findDuplicateKey(values, nested.values)
        if (usedKey) {
          console.error(uniqueError(usedKey)) // throw error if duplicate key exists
        }
        values = merge(values, nested.values)
        schema = merge(schema, nested.schema)
        conditions = merge(conditions, nested.conditions)
      }
    } else {
      // Handle normal / flat fields
      if (values[f.name]) {
        console.error(uniqueError(f.name))
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
