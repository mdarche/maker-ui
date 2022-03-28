import { Div, type DivProps } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'
import React, { forwardRef } from 'react'

export const FormSuccess = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div
      ref={ref}
      className={mergeSelectors(['form-success', className])}
      {...props}
    />
  )
)

export const FormError = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div
      ref={ref}
      className={mergeSelectors(['form-error', className])}
      {...props}
    />
  )
)

export const FormHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div
      ref={ref}
      className={mergeSelectors(['form-header', className])}
      {...props}
    />
  )
)

export const FormFooter = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div
      ref={ref}
      className={mergeSelectors(['form-footer', className])}
      {...props}
    />
  )
)

FormSuccess.displayName = 'FormSuccess'
FormError.displayName = 'FormError'
FormHeader.displayName = 'FormHeader'
FormFooter.displayName = 'FormFooter'
