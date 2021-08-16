import * as React from 'react'
import { Formik } from 'formik'
import { Div, MakerProps, merge, ResponsiveScale, Global } from 'maker-ui'
import * as Yup from 'yup'

import { ValidateIcon } from './Icons'
import { FieldProps, FormValues, FormHelpers } from './types'
import styles from './styles/position'

interface Settings {
  validateOnBlur: boolean
  validateOnChange: boolean
  validateIcon: React.ReactNode
  columns: string | string[]
  gap: ResponsiveScale
  pages: number
  pageTransition: 'none' | 'fade' | 'fade-down' | 'fade-up'
  placeholderColor: string | string[]
  labelStyle: FieldProps['labelStyle']
  errorStyle: FieldProps['errorStyle']
}

export interface FormState {
  currentPage: number
  settings: Partial<Settings>
  fields?: FieldProps[]
  pageFields: { [key: string]: { name: string; required?: boolean }[] }
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
  /** Forwards access to the Formik `validationSchema` prop for Yup validation. See for details:
   * @link https://formik.org/docs/guides/validation
   */
  onSubmit: (values: any, actions: FormHelpers) => void | Promise<any>
  /** A settings configuration object for global form settings*/
  settings?: Partial<Settings>
}

/**
 * The `Form` component lets you generate a highly customizable form from a
 * configuration object and field array. Built on top of Formik.
 * .
 *
 * @link https://maker-ui.com/docs/form
 */

export const Provider = ({
  onSubmit,
  validationSchema,
  settings = {},
  fields,
  children,
  css,
  breakpoints,
  ...props
}: FormProviderProps) => {
  let datepicker = false
  /* Calculate initial values via fields */
  let values: Partial<FormValues> = {}
  fields.forEach(({ name, type, initialValue }) => {
    if (type === 'datepicker') {
      datepicker = true
    }
    return (values[name] = initialValue)
  })

  /* Calculate form validation schema via fields */
  let schema: { [key: string]: any } = {}
  fields.forEach(({ name, validation }) =>
    validation ? (schema[name] = validation) : undefined
  )

  const FormSchema =
    Object.keys(schema).length !== 0 ? Yup.object().shape(schema) : undefined

  // TODO - Add form style classes to Global
  // - Check for datepicker

  return (
    <MakerForm fields={fields} settings={settings as Settings}>
      {datepicker ? <Global styles={{}} /> : null}
      <Global styles={styles} />
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={validationSchema || FormSchema}
        validateOnBlur={settings?.validateOnBlur}
        validateOnChange={settings?.validateOnChange}>
        <Div
          className="form-wrapper"
          breakpoints={breakpoints}
          css={{
            'input::placeholder, input:-ms-input-placeholder, ::-ms-input-placeholder': {
              opacity: 1,
              color: settings?.placeholderColor || '#b7b7b7',
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
    labelStyle: 'top',
    errorStyle: 'bottom-right',
    validateIcon: <ValidateIcon />,
  },
}
const FormContext = React.createContext<FormState>(initialState)
const FormUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<FormState>>
>(() => {})

const MakerForm = ({
  children,
  fields,
  settings,
}: {
  children: React.ReactNode
  fields: FieldProps[]
  settings: Settings
}) => {
  const [state, setState] = React.useState<FormState>({
    ...initialState,
    fields,
  })

  React.useEffect(() => {
    setState(s => ({ ...s, settings: merge(s.settings, settings), fields }))
  }, [settings, fields])

  return (
    <FormContext.Provider value={state}>
      <FormUpdateContext.Provider value={setState}>
        {children}
      </FormUpdateContext.Provider>
    </FormContext.Provider>
  )
}

export function useForm() {
  const { fields, settings, currentPage, pageFields } = React.useContext(
    FormContext
  )
  const setState = React.useContext(FormUpdateContext)

  function setPage(page: 'next' | 'prev' | number) {
    if (currentPage > 0 && page === 'prev') {
      setState(s => ({ ...s, currentPage: s.currentPage - 1 }))
    }

    if (currentPage < (settings.pages as number) - 1 && page === 'prev') {
      setState(s => ({ ...s, currentPage: s.currentPage + 1 }))
    }
  }

  function updateSettings(
    newSettings: Partial<Settings>,
    mergeSettings = true
  ) {
    setState(s => ({
      ...s,
      settings: mergeSettings ? merge(s.settings, newSettings) : newSettings,
    }))
  }

  function setPageFields(pageObject: FormState['pageFields']) {
    setState(s => ({
      ...s,
      pageFields: merge(s.pageFields, pageObject),
    }))
  }

  return {
    settings,
    fields,
    currentPage,
    setPage,
    pageFields,
    setPageFields,
    updateSettings,
  }
}

Provider.displayName = 'FormProvider'
