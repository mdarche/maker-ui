import * as React from 'react'
import { Div, type DivProps, Grid } from '@maker-ui/primitives'
import { cn } from '@maker-ui/utils'
import type { ResponsiveScale } from '@maker-ui/css'

import { Field } from '../Fields'
import { type FormState, useForm } from '../Form/FormProvider'
import type { FieldProps } from '../types'

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
    <Div id={id} className={cn(['form-page', className])}>
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