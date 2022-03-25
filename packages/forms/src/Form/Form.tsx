import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Grid } from '@maker-ui/primitives'
import type { ResponsiveScale, MakerProps } from '@maker-ui/css'
import { Form as FormikForm } from 'formik'

import { Page, Progress, PageButton } from '../Pagination'
import { Field } from '../Fields'
import { FormProvider, useForm } from './FormProvider'
import { SubmitButton } from './SubmitButton'
import { FormError, FormSuccess, FormFooter, FormHeader } from './FormElements'
import { type NestedComponents, defaultComponents, sortChildren } from './utils'

export interface FormProps
  extends React.HTMLAttributes<HTMLFormElement>,
    MakerProps {
  columns?: string | string[] | number
  gap?: ResponsiveScale
}

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
  const ref = useRef(null)
  const { fields, settings, success, error } = useForm()
  const [components, setComponents] =
    useState<NestedComponents>(defaultComponents)
  const col = columns || settings.columns
  const gridCol = typeof col === 'number' ? ['1fr', `repeat(${col}, 1fr)`] : col

  useEffect(() => {
    setComponents(sortChildren(children))
  }, [children])

  return (
    <FormikForm id={id} className={className} {...props}>
      {components.formHeader}
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
      {components.formChildren?.map((child, i) => (
        <Fragment key={i}>{child}</Fragment>
      ))}
      {components.formSubmit}
      {error ? components.formError : null}
      {components.formHeader}
    </FormikForm>
  )
}

Form.displayName = 'Form'

Form.Page = Page
Form.Provider = FormProvider
Form.Header = FormHeader
Form.Footer = FormFooter
Form.Progress = Progress
Form.Submit = SubmitButton
Form.PageButton = PageButton
Form.Error = FormError
Form.Success = FormSuccess
