import * as React from 'react'
import { Formik } from 'formik'
import { Div } from '@maker-ui/primitives'
import { type MakerProps, type ResponsiveScale, Global } from '@maker-ui/css'
import { merge } from '@maker-ui/utils'
import * as Yup from 'yup'

import { ValidateIcon } from '../Icons'
import type {
  FieldProps,
  FormValues,
  FormHelpers,
  AutoSaveSettings,
} from '../types'
import { styles } from '../styles/position'

interface Settings {
  /** Shows validation for an individual field. Requires `validateFormOnBlur` to be true. */
  validateFieldOnBlur: boolean
  /** Validates all fields when an input is blurred  */
  validateFormOnBlur: boolean
  /** Validates all fields when an input changes */
  validateFormOnChange: boolean
  validateIcon: React.ReactElement
  columns: string | string[] | number
  gap: ResponsiveScale
  pages: number
  pageTransition: 'none' | 'fade' | 'fade-down' | 'fade-up'
  placeholderColor: string | string[]
  labelStyle: FieldProps['labelStyle']
  errorStyle: FieldProps['errorStyle']
  disableSubmit: boolean
  autoSave: boolean | AutoSaveSettings
}

export interface FormState {
  currentPage: number
  settings: Partial<Settings>
  fields?: FieldProps[]
  pageFields: { [key: string]: { name: string; required?: boolean }[] }
  success?: boolean
  error?: boolean
}

export interface FormProviderProps extends MakerProps {
  children: React.ReactNode
  /** Forwards access to the Formik `validationSchema` prop for Yup validation. See for details:
   * @link https://formik.org/docs/guides/validation
   */
  validationSchema?: any
  /**A single depth array of `FieldProp` objects that includes all form fields.
   *
   * @example If you use form pages, you should combine all separate `fields` props
   * into a single array:
   * const firstPageFields = [...]
   * const secondPageFields = [...]
   *
   * // Use `allFields` as the FormProvider `fields` prop
   * const allFields = [...firstPageFields, ...secondPageFields]
   */
  fields: FieldProps[]
  /** Submission handler that gives you access to all form values as well as Formik actions
   * @link https://formik.org/docs/guides/form-submission
   */
  onSubmit: (values: any, actions: FormHelpers) => void | Promise<any>
  /** A settings configuration object for global form settings*/
  settings?: Partial<Settings>
  /** An optional error boolean that will toggle the Form.Error component if true*/
  error?: boolean
  /** An optional success boolean that will toggle the Form.Success component if true*/
  success?: boolean
}

function getInitialValue(type: FieldProps['type']) {
  const numberValues = ['number', 'range']
  return numberValues.includes(type)
    ? 0
    : type === 'switch'
    ? false
    : type === 'checkbox'
    ? []
    : type === 'image-picker'
    ? null
    : type === 'select'
    ? []
    : ''
}

/**
 * The `Form` component lets you generate a highly customizable form from a
 * configuration object and field array. Built on top of Formik.
 * .
 * @todo update field state via props
 * @link https://maker-ui.com/docs/form
 */

export const FormProvider = ({
  onSubmit,
  validationSchema,
  settings = {},
  fields,
  success,
  error,
  children,
  css,
  breakpoints,
  ...props
}: FormProviderProps) => {
  const mergedSettings = merge(settings, initialState.settings)

  /* Calculate initial values via fields */
  let values: Partial<FormValues> = {}
  fields.forEach(({ type, name, initialValue }) => {
    return type !== 'divider'
      ? (values[name] = initialValue || getInitialValue(type))
      : undefined
  })

  /* Calculate form validation schema via fields */
  let schema: { [key: string]: any } = {}
  fields.forEach(({ name, validation }) =>
    validation ? (schema[name] = validation) : undefined
  )

  const FormSchema =
    Object.keys(schema).length !== 0 ? Yup.object().shape(schema) : undefined

  return (
    <MakerForm
      fields={fields}
      success={success}
      error={error}
      settings={mergedSettings}>
      {/* {datepicker ? <Global styles={{}} /> : null} */}
      <Global styles={{ ...(styles as object) }} />
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={validationSchema || FormSchema}
        validateOnBlur={mergedSettings.validateFormOnBlur}
        validateOnChange={mergedSettings.validateFormOnChange}>
        <Div
          className="form-wrapper"
          breakpoints={breakpoints}
          css={{
            'input::placeholder, input:-ms-input-placeholder, textarea::placeholder, textarea:-ms-input-placeholder':
              {
                opacity: 1,
                color: mergedSettings.placeholderColor,
              },
            ...(css as object),
          }}
          {...props}>
          {children}
        </Div>
      </Formik>
    </MakerForm>
  )
}

/**
 * The `MakerForm` provider stores all form settings that are not part of
 * Formik's scope.
 * .
 *
 * @internal - usage only
 */
const initialState: FormState = {
  currentPage: 1,
  pageFields: {},
  settings: {
    columns: '1fr',
    gap: 30,
    pages: 1,
    pageTransition: 'none',
    placeholderColor: '#b7b7b7',
    labelStyle: 'top-left',
    errorStyle: 'bottom-right',
    validateIcon: <ValidateIcon />,
    validateFormOnChange: false,
    validateFormOnBlur: true,
    validateFieldOnBlur: true,
    disableSubmit: false,
    autoSave: false,
  },
}
const FormContext = React.createContext<{
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}>({ state: initialState, setState: (a) => {} })

const MakerForm = ({
  children,
  fields,
  settings,
  success = false,
  error = false,
}: {
  children: React.ReactNode
  fields: FieldProps[]
  settings: Settings
  success?: boolean
  error?: boolean
}) => {
  const [state, setState] = React.useState<FormState>({
    ...initialState,
    success,
    error,
    fields,
  })

  React.useEffect(() => {
    setState((s) => ({ ...s, settings, fields }))
  }, [settings, fields])

  React.useEffect(() => {
    if (success || error) {
      setState({ ...state, error, success })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error])

  return (
    <FormContext.Provider value={{ state, setState }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const {
    state: { fields, settings, currentPage, pageFields, success, error },
    setState,
  } = React.useContext(FormContext)

  function setPage(page: 'next' | 'prev' | number) {
    if (currentPage > 0 && page === 'prev') {
      setState((s) => ({ ...s, currentPage: s.currentPage - 1 }))
    }

    if (currentPage < (settings.pages as number) - 1 && page === 'prev') {
      setState((s) => ({ ...s, currentPage: s.currentPage + 1 }))
    }
  }

  function updateSettings(
    newSettings: Partial<Settings>,
    mergeSettings = true
  ) {
    setState((s) => ({
      ...s,
      settings: mergeSettings ? merge(s.settings, newSettings) : newSettings,
    }))
  }

  function setPageFields(pageObject: FormState['pageFields']) {
    setState((s) => ({
      ...s,
      pageFields: merge(s.pageFields, pageObject),
    }))
  }

  return {
    settings,
    fields,
    success,
    error,
    currentPage,
    setPage,
    pageFields,
    setPageFields,
    updateSettings,
  }
}

FormProvider.displayName = 'FormProvider'
