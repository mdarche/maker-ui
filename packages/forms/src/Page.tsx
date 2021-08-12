import * as React from 'react'
import { ResponsiveScale, Div, DivProps, Grid, mergeSelectors } from 'maker-ui'

import { renderFields } from './render'
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
  columns = '1fr',
  gap = 30,
  children,
}: FormPageProps) => {
  const { currentPage, setPageFields } = useForm()

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
      <Grid className="form-grid" columns={columns} gap={gap}>
        {renderFields(fields)}
      </Grid>
      {children}
    </Div>
  )
}


Page.displayName = 'FormPage'
