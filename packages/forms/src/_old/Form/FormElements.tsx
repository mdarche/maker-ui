import React, { forwardRef } from 'react'
import { Div, type DivProps } from '@maker-ui/primitives'
import { cn } from '@maker-ui/utils'

export const FormSuccess = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div ref={ref} className={cn(['form-success', className])} {...props} />
  )
)

export const FormError = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div ref={ref} className={cn(['form-error', className])} {...props} />
  )
)

export const FormHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div ref={ref} className={cn(['form-header', className])} {...props} />
  )
)

export const FormFooter = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <Div ref={ref} className={cn(['form-footer', className])} {...props} />
  )
)

FormSuccess.displayName = 'FormSuccess'
FormError.displayName = 'FormError'
FormHeader.displayName = 'FormHeader'
FormFooter.displayName = 'FormFooter'
