import React, { forwardRef } from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '@/hooks'

export interface FormSubmitButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  _type?: string
  children?: React.ReactNode
  onClick?: (e: any, isSubmitting: boolean) => void
  lifecycle?: {
    submitting?: React.ReactNode
    disabled?: React.ReactNode
  }
}

export const SubmitButton = forwardRef<
  HTMLButtonElement,
  FormSubmitButtonProps
>(({ onClick, lifecycle, children, className, ...props }, ref) => {
  const { isSubmitting, errors, settings, schema, values } = useForm()

  function checkRequired() {
    let res = true
    Object.keys(schema).forEach((name) => {
      if (!res) return
      if (schema[name].required && !values[name]) {
        res = false
      }
    })
    return res
  }
  // Check if all required fields have been filled out
  const hasErrors = Object.keys(errors).length ? true : false
  const hasRequiredVals = settings?.disableSubmit && checkRequired()
  const isDisabled = settings?.disableSubmit && (hasErrors || !hasRequiredVals)

  const renderLifecycle = () =>
    lifecycle && isSubmitting ? lifecycle.submitting : children

  return (
    <button
      type="submit"
      ref={ref}
      className={cn(['mkui-form-submit', className])}
      onClick={onClick ? (e) => onClick(e, isSubmitting) : undefined}
      disabled={isDisabled}
      {...props}>
      {renderLifecycle()}
    </button>
  )
})

SubmitButton.defaultProps = { _type: 'submit' }
