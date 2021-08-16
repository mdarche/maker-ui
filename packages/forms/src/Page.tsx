import * as React from 'react'
import { ResponsiveScale, Div, DivProps, Grid, mergeSelectors } from 'maker-ui'

import { Field } from './Fields'
import { FormState, useForm } from './Provider'
import type { FieldProps } from './types'

export interface FormPageProps extends Omit<DivProps, 'title'> {
  id: string
  fields: FieldProps[]
  title?: string | React.ReactNode | ((currentPage: number) => React.ReactNode)
  columns?: string | string[]
  gap?: ResponsiveScale
}

export const Page = ({
  id,
  title,
  fields,
  className,
  columns,
  gap,
  children,
}: FormPageProps) => {
  const { currentPage, setPageFields, settings } = useForm()

  React.useEffect(() => {
    /* Register current page fields in Form State */
    let pageFields: FormState['pageFields'] = {}
    pageFields[id] = fields.map(({name, required}) => ({name, required}))
    setPageFields(pageFields)
  }, [id, fields])

  return (
    <Div id={id} className={mergeSelectors(['form-page', className])}>
      {typeof title === 'function' ? title(currentPage) : title}
      FormPage
      <Grid className="form-grid" columns={columns || settings.columns} gap={gap || settings.gap}>
      {fields.map(props => (
          <Field key={props.id} {...props} />
      ))}
      </Grid>
      {children}
    </Div>
  )
}


Page.displayName = 'FormPage'
