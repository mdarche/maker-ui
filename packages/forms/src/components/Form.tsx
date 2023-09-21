import React, {
  useMemo,
  useEffect,
  useReducer,
  useState,
  forwardRef,
} from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'

import { initialState, findDuplicateKey } from '@/helpers'
import { FormRenderer } from './FormRenderer'
import { SubmitButton } from './SubmitButton'
import { Progress } from './Progress'
import type {
  FieldProps,
  FormConditions,
  FormErrors,
  FormHelpers,
  FormSchema,
  FormSettings,
  FormState,
  FormValues,
  FormSlotProps,
} from '@/types'

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

export interface FormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** React Node inserted before the form renderer. Helpful if you need to access state
   * from the form provider */
  preFormSlot?: React.ReactNode
  /** React Node inserted after the form renderer. Helpful if you need to access state
   * from the form provider */
  postFormSlot?: React.ReactNode
  /** Any generic children that will be appended to the DOM inside of the Form element. */
  children: React.ReactNode
  /** An array of all form fields or pages / groups with subfields */
  fields: FieldProps[]
  /** Global form layout and validation settings. */
  settings?: Partial<FormSettings>
  /** When true, this prop will trigger the <Form.Error /> component to render. */
  error?: boolean
  /** When true, this prop will trigger the <Form.Success /> component to render, replacing
   * the form element with a custom success message.
   */
  success?: boolean
  /** A callback that executes when the form is submitted. Prior to calling this function, the
   * form will validate all fields. */
  onSubmit: (values: FormValues, helpers: FormHelpers) => void | Promise<any>
}

export const FormContext = React.createContext<{
  state: FormState
  dispatch: (a: Action) => void
}>({ state: initialState as FormState, dispatch: (a) => {} })

function formReducer(state: FormState, action: Action): FormState {
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

function getFieldData(fields: FieldProps[], index = 0) {
  const nonFields = ['page', 'group', 'divider']
  let values: FormValues = {}
  let schema: FormSchema = {}
  let conditions: FormConditions = {}

  // TODO get initial values for Repeater
  fields.forEach((f, i) => {
    if (nonFields.includes(f.type) && f?.subFields) {
      // If group has conditions, add this to the conditions object
      if (f.type === 'group' && f?.conditions) {
        conditions[f.name] = f.conditions
      }
      // Recursively get nested field data
      const nested = getFieldData(f.subFields, i)
      const usedKey = findDuplicateKey(values, nested.values)
      if (usedKey) {
        console.error(error(usedKey))
      }
      values = merge(values, nested.values)
      schema = merge(schema, nested.schema)
      conditions = merge(conditions, nested.conditions)
    } else {
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

export const Form = ({
  children,
  preFormSlot,
  postFormSlot,
  settings = {},
  success,
  error,
  onSubmit,
  fields = [],
  ...props
}: FormProps) => {
  const memoFields = useMemo(() => fields, [fields])
  const isPaginated = !!fields.find((f) => f.type === 'page')
  const { values, schema, conditions } = getFieldData(fields)
  const [rendered, setRendered] = useState(false)
  const [state, dispatch] = useReducer(
    formReducer,
    merge(initialState, {
      formId: generateId(),
      settings,
      fields: memoFields,
      formSuccess: success,
      formError: error,
      totalPages: isPaginated ? fields.length : 1,
      schema,
      values,
      conditions,
    }) as FormState
  )

  if (isPaginated) {
    if (fields.find((f) => f.type !== 'page')) {
      // Err if the form is paginated but not all fields are of type `page`
      console.error(
        'If your form is paginated, all top level fields must use type "page".'
      )
    }
    if (fields.length === 1) {
      // Err if there is only one page
      console.error(
        'Your form is paginated but only has one page. Please create additional pages or remove the "page" field type.'
      )
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

  /**
   * Listen for changes to fields
   */
  useEffect(() => {
    if (!rendered) return
    dispatch({ type: 'SET_FIELDS', value: fields })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields])

  useEffect(() => {
    setRendered(true)
  }, [])

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {preFormSlot}
      <FormRenderer onSubmit={onSubmit} {...props}>
        {children}
      </FormRenderer>
      {postFormSlot}
    </FormContext.Provider>
  )
}

const createFormComponent = (type: string, defaultClass: string) => {
  return forwardRef<HTMLDivElement, FormSlotProps>(
    ({ className, _type, ...props }, ref) => (
      <div ref={ref} className={cn([defaultClass, className])} {...props} />
    )
  )
}

export const FormSuccess = createFormComponent('success', 'mkui-form-success')
export const FormError = createFormComponent('error', 'mkui-form-error')
export const FormHeader = createFormComponent('header', 'mkui-form-header')
export const FormFooter = createFormComponent('footer', 'mkui-form-footer')

// Default props for slot layout
FormSuccess.defaultProps = { _type: 'success' }
FormError.defaultProps = { _type: 'error' }
FormHeader.defaultProps = { _type: 'header' }
FormFooter.defaultProps = { _type: 'footer' }

Form.Header = FormHeader
Form.Footer = FormFooter
Form.Error = FormError
Form.Success = FormSuccess
Form.Progress = Progress
Form.Submit = SubmitButton
