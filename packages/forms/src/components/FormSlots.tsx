import React, { forwardRef } from 'react'
import { cn } from '@maker-ui/utils'

export interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: string
}

export const FormSuccess = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(['mkui-form-success', className])}
      {...props}
    />
  )
)

export const FormError = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui-form-error', className])} {...props} />
  )
)

export const FormHeader = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui-form-header', className])} {...props} />
  )
)

export const FormFooter = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui-form-footer', className])} {...props} />
  )
)

// Default props for slot layout
FormSuccess.defaultProps = { _type: 'success' }
FormError.defaultProps = { _type: 'error' }
FormHeader.defaultProps = { _type: 'header' }
FormFooter.defaultProps = { _type: 'footer' }
