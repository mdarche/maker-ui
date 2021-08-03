import * as React from 'react'
import { Formik, FormikHelpers } from 'formik'

import { ValidateIcon } from './Icons'

interface Settings {
  validateOnBlur: boolean
  validateOnChange: boolean // Bad UX
  columns: any
  pages: number
  pageTransition: boolean
  placeholderColor: string
  labelStyle: string
  validationIcon: React.ReactNode
}

interface FormSettings extends Settings {
  currentPage: number
}

interface FormProviderProps {
  children: React.ReactNode
  initialValues: any
  validationSchema?: any // use Yup
  onSubmit: (<Values>(
    values: Values,
    helpers: FormikHelpers<Values>
  ) => void | Promise<any>) &
    (<Values>(values: Values) => void)
  settings?: FormSettings
}

/**
 * The `Form` component lets you generate a highly customized form from a
 * configuration object and field array. Based on Formik.
 * .
 *
 * @link https://maker-ui.com/docs/form
 */

export const FormProvider = ({
  initialValues,
  onSubmit,
  validationSchema,
  settings,
  children,
}: FormProviderProps) => {
  return (
    <FormSettingsProvider settings={settings}>
      <Formik
        initialValues={initialValues}
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

const FormSettingsContext = React.createContext<Partial<FormSettings>>({})
const FormSettingsUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<Partial<FormSettings>>>
>(() => {})

const FormSettingsProvider = ({
  children,
  settings,
}: {
  children: React.ReactNode
  settings?: Partial<FormSettings>
}) => {
  const [state, setState] = React.useState<Partial<FormSettings>>({
    currentPage: 0,
    columns: '1fr',
    pages: 0,
    pageTransition: true,
    placeholderColor: '#b7b7b7',
    labelStyle: 'default',
    validationIcon: <ValidateIcon />,
  })

  React.useEffect(() => {
    setState(s => ({ ...s, settings }))
  }, [settings])

  return (
    <FormSettingsContext.Provider value={state}>
      <FormSettingsUpdateContext.Provider value={setState}>
        {children}
      </FormSettingsUpdateContext.Provider>
    </FormSettingsContext.Provider>
  )
}

export function useFormSettings() {
  const settings = React.useContext(FormSettingsContext)
  const setState = React.useContext(FormSettingsUpdateContext)

  // function updatePage(page: 'next' | 'prev' | number) {
  //   if (settings.currentPage > 0 && page === 'prev') {
  //     setState((s) => ({ ...s, currentPage: s.currentPage - 1 }))
  //   }
  // }

  return { settings }
}
