import * as React from 'react'
import { Formik, FormikHelpers } from 'formik'

import { ValidateIcon } from './Icons'
import { FieldProps } from './types'
import { FormValues } from '../dist'

interface Settings {
  validateOnBlur: boolean
  validateOnChange: boolean // Bad UX
  validateIcon: React.ReactNode
  columns: string | string[]
  pages: number
  pageTransition: boolean // TODO
  placeholderColor: string
  labelStyle: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

interface FormState {
  currentPage: number
  settings: Partial<Settings>
  fields: FieldProps[]
}

export interface FormProviderProps {
  children: React.ReactNode
  validationSchema?: any // use Yup
  fields: FieldProps[]
  onSubmit: (<Values>(
    values: Values,
    helpers: FormikHelpers<Values>
  ) => void | Promise<any>) &
    (<Values>(values: Values) => void)
  settings?: Partial<Settings>
}

/**
 * The `Form` component lets you generate a highly customized form from a
 * configuration object and field array. Based on Formik.
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
}: FormProviderProps) => {
  // Calculate initial values via fields
  let values: Partial<FormValues> = {}
  fields.forEach(({ name, initialValue }) => (values[name] = initialValue))

  return (
    <FormSettingsProvider fields={fields} settings={settings}>
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {children}
      </Formik>
    </FormSettingsProvider>
  )
}

/**
 * The `FormSettings` provider stores all form settings that are not part of
 * Formik's scope.
 * .
 *
 * @internal - usage only
 */

const FormSettingsContext = React.createContext<Partial<FormState>>({})
const FormSettingsUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<Partial<FormState>>>
>(() => {})

const FormSettingsProvider = ({
  children,
  fields,
  settings,
}: {
  children: React.ReactNode
  fields: FieldProps[]
  settings?: Partial<FormState['settings']>
}) => {
  const [state, setState] = React.useState<Partial<FormState>>({
    currentPage: 0,
    settings: {
      columns: '1fr',
      pages: 0,
      pageTransition: true,
      placeholderColor: '#b7b7b7',
      labelStyle: 'top',
      validateIcon: <ValidateIcon />,
    },
    fields,
  })

  React.useEffect(() => {
    setState(s => ({ ...s, settings, fields }))
  }, [settings, fields])

  return (
    <FormSettingsContext.Provider value={state}>
      <FormSettingsUpdateContext.Provider value={setState}>
        {children}
      </FormSettingsUpdateContext.Provider>
    </FormSettingsContext.Provider>
  )
}

export function useForm() {
  const { fields, settings } = React.useContext(FormSettingsContext)
  // const setState = React.useContext(FormSettingsUpdateContext)

  // function updatePage(page: 'next' | 'prev' | number) {
  //   if (settings.currentPage > 0 && page === 'prev') {
  //     setState((s) => ({ ...s, currentPage: s.currentPage - 1 }))
  //   }
  // }

  return { settings, fields }
}
