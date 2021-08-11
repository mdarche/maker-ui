import * as React from 'react'
import { ResponsiveScale, Div, DivProps, Grid, mergeSelectors } from 'maker-ui'

import { renderFields } from './render'
import { PageButton } from './PageButton'
import type { FieldProps } from './types'

export interface FormPageProps extends Omit<DivProps, 'title'> {
  id: string
  fields: FieldProps[]
  title?: string | React.ReactNode
  columns?: string | string[]
  gap?: ResponsiveScale
}

// Title prop that accepts a react component and is page aware
export const Page = ({
  id,
  title,
  fields,
  className,
  columns = '1fr',
  gap = 30,
  children,
}: FormPageProps) => {
  return (
    <Div id={id} className={mergeSelectors(['form-page', className])}>
      {title}
      FormPage
      <Grid className="form-grid" columns={columns} gap={gap}>
        {renderFields(fields)}
      </Grid>
      <PageButton />
      {children}
    </Div>
  )
}
