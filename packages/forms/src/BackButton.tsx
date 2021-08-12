import * as React from 'react'
import { Button, ButtonProps, mergeSelectors } from 'maker-ui'

import { useForm } from './Provider'

export interface BackButtonProps extends ButtonProps {
  children?:
    | string
    | React.ReactNode
    | ((currentPage: number) => React.ReactNode)
}

export const BackButton = ({ children, ...props }: BackButtonProps) => {
  const { currentPage, setPage } = useForm()

  return (
    <Button
      type="button"
      className={mergeSelectors([
        'form-back-btn',
        currentPage === 0 ? 'hide' : undefined,
      ])}
      onClick={e => {
        e.preventDefault()
        setPage('prev')
      }}
      {...props}>
      {typeof children === 'function' ? children(currentPage) : children}
    </Button>
  )
}

BackButton.displayName = 'BackButton'
