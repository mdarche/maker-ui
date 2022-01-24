import * as React from 'react'
import { ResponsiveScale, Div, DivProps, Grid, mergeSelectors } from 'maker-ui'

import { Field } from './Fields'
import { FormState, useForm } from './FormProvider'
import { FieldProps } from './types'

export interface FormPageProps extends Omit<DivProps, 'title'> {
  id: string
  fields: FieldProps[]
  title?: string | React.ReactNode | ((currentPage: number) => React.ReactNode)
  columns?: string | string[] | number
  gap?: ResponsiveScale
}

export const Page = ({
  id,
  title,
  fields,
  className,
  columns,
  gap,
  css,
  breakpoints,
  children,
}: FormPageProps) => {
  const { currentPage, setPageFields, settings } = useForm()
  const col = columns || settings.columns
  const gridCol = typeof col === 'number' ? ['1fr', `repeat(${col}, 1fr)`] : col

  React.useEffect(() => {
    /* Register current page fields in Form State */
    let pageFields: FormState['pageFields'] = {}
    pageFields[id] = fields.map(({ name, required }) => ({ name, required }))
    setPageFields(pageFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fields])

  return (
    <Div id={id} className={mergeSelectors(['form-page', className])}>
      {typeof title === 'function' ? title(currentPage) : title}
      <Grid
        className="form-grid"
        breakpoints={breakpoints}
        columns={gridCol}
        gap={gap || settings?.gap}
        css={css}>
        {fields.map((props, index) => (
          <Field key={index} breakpoints={breakpoints} {...props} />
        ))}
      </Grid>
      {children}
    </Div>
  )
}

Page.displayName = 'FormPage'
