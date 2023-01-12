import React, { useReducer } from 'react'
import { merge } from '@maker-ui/utils'
import type { FormSettings, FormState, FormValues } from './types'
import { initialState } from './defaults'
import { FormRenderer } from './FormRenderer'

export type Action =
  | {
      type: 'SET_FIELDS'
      value: any[]
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
  fields: any[]
  settings?: Partial<FormSettings>
  error?: boolean
  success?: boolean
  onSubmit: (values: FormValues) => void | Promise<any>
}

export const FormContext = React.createContext<{
  state: Partial<FormState>
  dispatch: (a: Action) => void
}>({ state: {}, dispatch: (a) => {} })

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
      return {
        ...state,
        values: {},
        errors: {},
        touched: [],
      }
    default: {
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
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
  // Parse fields for initial values and page count
  const [state, dispatch] = useReducer(
    formReducer,
    merge(initialState, {
      settings,
      fields,
      formSuccess: success,
      formError: error,
    }) as FormState
  )
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <FormRenderer onSubmit={onSubmit} {...props}>
        {children}
      </FormRenderer>
    </FormContext.Provider>
  )
}
