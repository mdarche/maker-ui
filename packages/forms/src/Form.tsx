import * as React from 'react'
import { Grid, Div, DivProps, ResponsiveScale, mergeSelectors } from 'maker-ui'
import { Form as FormikForm } from 'formik'

import { renderFields } from './render'
import { Page } from './Page'
import { Provider, useForm } from './Provider'
import { SubmitButton } from './SubmitButton'
import { Progress } from './Progress'

export interface FormProps {
  children: React.ReactNode
  className?: string
  id?: string
  columns?: string | string[]
  gap?: ResponsiveScale
}

const Header = ({ className, children, ...props }: DivProps) => (
  <Div className={mergeSelectors(['form-header', className])} {...props}>
    {children}
  </Div>
)
const Footer = ({ className, children, ...props }: DivProps) => (
  <Div className={mergeSelectors(['form-footer', className])} {...props}>
    {children}
  </Div>
)

/**
 * The `Form` component lets you generate a highly customized form from a
 * configuration object and field array. Based on Formik.
 * .
 *
 * @link https://maker-ui.com/docs/form
 */

export const Form = ({
  id,
  className,
  children,
  columns = '1fr',
  gap = 30,
}: FormProps) => {
  const { fields, settings } = useForm()

  return (
    <FormikForm id={id} className={className}>
      {settings.pages === 1 && fields ? (
        <Grid className="form-grid" columns={columns} gap={gap}>
          {renderFields(fields)}
        </Grid>
      ) : null}
      {children}
    </FormikForm>
  )
}

Form.displayName = 'Form'

Form.Page = Page
Form.Provider = Provider
Form.Header = Header
Form.Footer = Footer
Form.Progress = Progress
Form.Submit = SubmitButton
