import * as React from 'react'
import { Button, type ButtonProps } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'

import { useForm } from '../Form/FormProvider'
import type { PaginationElement } from '../types'

export interface FormBackButtonProps extends ButtonProps {
  children?: PaginationElement
}

export const BackButton = ({ children, ...props }: FormBackButtonProps) => {
  const { currentPage, setPage } = useForm()

  return (
    <Button
      type="button"
      className={mergeSelectors([
        'form-back-btn',
        currentPage === 0 ? 'hide' : undefined,
      ])}
      onClick={(e) => {
        e.preventDefault()
        setPage('prev')
      }}
      {...props}>
      {typeof children === 'function' ? children(currentPage) : children}
    </Button>
  )
}

BackButton.displayName = 'BackButton'
