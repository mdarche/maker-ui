import * as React from 'react'
// import { Grid } from 'maker-ui'
// import { Form as FormikForm } from 'formik'

interface FormProps {
  children: React.ReactNode
}

/**
 * The `Form` component lets you generate a highly customized form from a
 * configuration object and field array. Based on Formik.
 * .
 *
 * @link https://maker-ui.com/docs/form
 */

export const Form = ({ children }: FormProps) => {
  return (
    <div>{children}</div>
    // <FormikForm>
    //   <Grid>{children}</Grid>
    // </FormikForm>
  )
}
