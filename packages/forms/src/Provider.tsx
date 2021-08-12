import * as React from 'react'
import { Formik } from 'formik'
import { Div, MakerProps, merge } from 'maker-ui'

import { ValidateIcon } from './Icons'
import { FieldProps, FormValues, FormHelpers } from './types'

interface Settings {
  validateOnBlur: boolean
  validateOnChange: boolean // Bad UX
  validateIcon: React.ReactNode
  columns: string | string[]
  pages: number
  pageTransition: 'none' | 'fade' | 'fade-down' | 'fade-up'
  placeholderColor: string
  labelStyle: 'top' | 'bottom' | 'left' | 'right' | 'center' // Global
}

export interface FormState {
  currentPage: number
  settings: Partial<Settings>
  fields?: FieldProps[]
  pageFields: { [key: string]: { name: string; required?: boolean }[] }
}

export interface FormProviderProps extends MakerProps {
  children: React.ReactNode
  validationSchema?: any // use Yup
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
  // onSubmit: <T>(values: T, actions: FormikHelpers<T>) => void | Promise<any>
  onSubmit: (values: any, actions: FormHelpers) => void | Promise<any>
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
  settings,
  fields,
  children,
  css,
  breakpoints,
}: FormProviderProps) => {
  // Calculate initial values via fields
  let values: Partial<FormValues> = {}
  fields.forEach(({ name, initialValue }) => (values[name] = initialValue))

  // TODO - Add form style classes to Div or Global

  return (
    <MakerForm fields={fields} settings={settings as Settings}>
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Div
          className="form-wrapper"
          breakpoints={breakpoints}
          css={{
            'input::placeholder, input:-ms-input-placeholder, ::-ms-input-placeholder': {
              opacity: 1,
              color: settings?.placeholderColor || '#b7b7b7',
            },
            ...(css as object),
          }}>
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
    pages: 1,
    pageTransition: 'none',
    placeholderColor: '#b7b7b7',
    labelStyle: 'top',
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
    // Todo add pagination logic
    if (currentPage > 0 && page === 'prev') {
      setState(s => ({ ...s, currentPage: s.currentPage - 1 }))
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
