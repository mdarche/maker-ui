import * as React from 'react'
import { Button, type ButtonProps } from '@maker-ui/primitives'

import { useForm } from '../Form/FormProvider'
import type { FieldProps, PaginationElement } from '../types'
import { getRequired } from '../../utils'

export interface FormPageButtonProps extends ButtonProps {
  pageId: string
  label?: PaginationElement
}

export const PageButton = ({
  pageId,
  label = 'Next Page',
  ...props
}: FormPageButtonProps) => {
  const { currentPage, pageFields, setPage } = useForm()

  const fields = pageFields[pageId]
  const required = getRequired(fields as FieldProps[])

  return (
    <Button
      type="button"
      className="form-page-btn"
      onClick={(e) => {
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