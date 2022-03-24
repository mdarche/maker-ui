import * as React from 'react'
import { Grid, Div, type DivProps } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'
import type { ResponsiveScale, MakerProps } from '@maker-ui/css'
import { Form as FormikForm } from 'formik'

import { Page, Progress, PageButton } from '../Pagination'
import { Field } from '../Fields'
import { FormProvider, useForm } from './FormProvider'
import { SubmitButton } from './SubmitButton'

export interface FormProps
  extends React.HTMLAttributes<HTMLFormElement>,
    MakerProps {
  columns?: string | string[] | number
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
  columns,
  gap,
  css,
  breakpoints,
  ...props
}: FormProps) => {
  const { fields, settings } = useForm()
  const col = columns || settings.columns
  const gridCol = typeof col === 'number' ? ['1fr', `repeat(${col}, 1fr)`] : col

  // TODO use display name to determine where to place header

  return (
    <FormikForm id={id} className={className} {...props}>
      {/* {children?.type.displayName === 'FormHeader'} */}
      {fields ? (
        <Grid
          className="form-grid"
          breakpoints={breakpoints}
          columns={gridCol}
          gap={gap || settings?.gap}
          css={css}>
          {fields.map((p, index) => (
            <Field key={index} breakpoints={breakpoints} {...p} />
          ))}
        </Grid>
      ) : null}
      {children}
    </FormikForm>
  )
}

Form.displayName = 'Form'
Header.displayName = 'FormHeader'
Footer.displayName = 'FormFooter'

Form.Page = Page
Form.Provider = FormProvider
Form.Header = Header
Form.Footer = Footer
Form.Progress = Progress
Form.Submit = SubmitButton
Form.PageButton = PageButton
