import * as React from 'react'
import { generateId, merge } from '@maker-ui/utils'

import {
  FieldProps,
  FormErrors,
  FormSchema,
  FormSettings,
  FormState,
  FormValues,
} from '@/types'
import { initialState } from '../defaults'
import { findDuplicateKey, initRepeaterValues, setDefault } from '@/helpers'

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
        ...initFieldData({ fields }),
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

const containers = ['page', 'group', 'repeater']
const uniqueError = (name: string) =>
  `Each field should have a unique name. The field "${name}" is used more than once. This will lead to unexpected errors in your form.`
const reservedError = (name: string) =>
  `Fields cannot include a period symbol "." in their name. The field "${name}" is invalid.`

interface InitProps {
  fields: FieldProps[]
  index?: number
  parent?: string
  group?: string
}

export function initFieldData({ fields, index = 0, parent, group }: InitProps) {
  const page = index + 1
  let values: FormValues = {}
  let schema: FormSchema = {}

  fields.forEach((f, i) => {
    // Verify name validity
    if (f.name.includes('.')) {
      throw new Error(reservedError(f.name))
    }
    // Handle fields that have `subFields` property
    if (f?.subFields) {
      schema[f.name] = {
        type: f.type,
        page,
        conditions: f.conditions,
        validation: f.validation,
      }

      if (f.type === 'repeater') {
        // Handle repeater fields
        if (f.subFields.some((s) => containers.includes(s.type))) {
          throw new Error('You cannot further nest a repeater field.')
        }

        const subFieldNames = new Set<string>()
        f.subFields.forEach((s) => {
          if (subFieldNames.has(s.name)) {
            throw new Error(uniqueError(s.name))
          }
          subFieldNames.add(s.name)
        })

        // Assign initial value to repeater field and add unique keys to each item
        values[f.name] = f?.initialValue
          ? (f.initialValue as any[])?.map((d) => ({
              ...d,
              _id: generateId(),
            }))
          : [initRepeaterValues(f.subFields)]

        schema = merge(
          schema,
          initFieldData({
            fields: f.subFields,
            index,
            parent: f.name,
            group: f.name,
          }).schema
        )
      } else if (f.type === 'group' || f.type === 'page') {
        const isPaginated = f.type === 'page'

        if (isPaginated) {
          if (fields.find((f) => f.type !== 'page')) {
            throw new Error(
              'If your form is paginated, all top level fields must use type "page".'
            )
          }
          if (fields.length === 1) {
            throw new Error(
              'Your form is paginated but only has one page. Please create additional pages or remove the "page" field type.'
            )
          }
        }

        const nested = initFieldData({
          fields: f.subFields,
          index: isPaginated ? i : undefined,
          group: f.type === 'group' ? f.name : undefined,
        })
        const dupe = findDuplicateKey(values, nested.values)
        if (dupe) {
          console.error(uniqueError(dupe)) // throw error if duplicate key exists
        }
        values = merge(values, nested.values)
        schema = merge(schema, nested.schema)
      }
    } else {
      // Handle normal / flat fields
      if (values[f.name]) {
        throw new Error(uniqueError(f.name))
      }
      if (f.type !== 'divider') {
        const name = parent ? `${parent}.${f.name}` : f.name

        if (!parent) {
          values[f.name] = f.initialValue || setDefault(f.type)
        }

        schema[name] = {
          type: f.type,
          required: typeof f?.required === 'string' ? f.required : !!f.required,
          page,
          group,
          validation: f?.validation,
          conditions: f?.conditions,
        }
      }
    }
  })

  return { values, schema }
}
