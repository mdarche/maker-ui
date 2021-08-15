import * as React from 'react'
import { Button, ButtonProps } from 'maker-ui'

import { useForm } from './Provider'
import { FieldProps } from './types'
import { getRequired } from './Fields/render'

export interface PageButtonProps extends ButtonProps {
  pageId: string
  label?: string | React.ReactNode | ((currentPage: number) => React.ReactNode)
}

export const PageButton = ({
  pageId,
  label = 'Next Page',
  ...props
}: PageButtonProps) => {
  const { currentPage, pageFields, setPage } = useForm()

  const fields = pageFields[pageId]
  const required = getRequired(fields as FieldProps[])

  console.log('fields are', fields)
  console.log('Required fields are', required)

  return (
    <Button
      type="button"
      className="form-page-btn"
      onClick={e => {
        e.preventDefault()
        // Todo run page-specific validation
        setPage('next')
      }}
      {...props}>
      {typeof label === 'function' ? label(currentPage) : label}
    </Button>
  )
}

PageButton.displayName = 'PageButton'
