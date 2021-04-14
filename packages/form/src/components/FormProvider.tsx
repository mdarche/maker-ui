import * as React from 'react'
import { Formik, FormikHelpers } from 'formik'

type FormValues = any

interface FormProviderProps {
  children: React.ReactNode
  initialValues: FormValues
  validationSchema?: any // use Yup
  onSubmit: ((
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<any>) &
    ((values: FormValues) => void)
  settings?: {
    pagination: boolean
    pageAnimation: boolean
    validateOnBlur: boolean
    validateOnChange: boolean
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
  validationSchema,
  children,
}: FormProviderProps) => {
  return (
    // <div>{children}</div>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {children}
    </Formik>
  )
}
