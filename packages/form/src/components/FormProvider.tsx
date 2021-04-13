import * as React from 'react'
import { Formik, FormikHelpers } from 'formik'

type FormValues = any

interface FormProviderProps {
  children: React.ReactNode
  initialValues: FormValues
  onSubmit: ((
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<any>) &
    ((values: FormValues) => void)
  settings: {
    pagination: boolean
    pageAnimation: boolean
    validateOnBlur: boolean
    validateOnChange: boolean
    validationSchema: any // use Yup
  }
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
  settings,
  children,
}: FormProviderProps) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {children}
    </Formik>
  )
}
