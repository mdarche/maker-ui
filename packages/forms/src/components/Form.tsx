import React, {
  useMemo,
  useEffect,
  useReducer,
  useState,
  forwardRef,
} from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { FormContext, initFieldData, formReducer } from '@/context'
import { initialState } from '@/helpers'
import { FormRenderer } from './FormRenderer'
import { SubmitButton } from './SubmitButton'
import { Progress } from './Progress'
import type {
  FieldProps,
  FormHelpers,
  FormSettings,
  FormState,
  FormValues,
  FormSlotProps,
} from '@/types'

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
  const { values, schema } = initFieldData({ fields })
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
    }) as FormState
  )

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

const createFormComponent = (type: string) => {
  return forwardRef<HTMLDivElement, FormSlotProps>(
    ({ className, _type, ...props }, ref) => (
      <div
        ref={ref}
        className={cn([`mkui-form-${type}`, className])}
        {...props}
      />
    )
  )
}

export const FormSuccess = createFormComponent('success')
export const FormError = createFormComponent('error')
export const FormHeader = createFormComponent('header')
export const FormFooter = createFormComponent('footer')

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
