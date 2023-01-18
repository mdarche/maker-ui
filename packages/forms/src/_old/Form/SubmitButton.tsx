import * as React from 'react'
import { useFormikContext, FormikErrors, FormikTouched } from 'formik'
import { Button, type ButtonProps } from '@maker-ui/primitives'
import { cn } from '@maker-ui/utils'
import { useForm } from './FormProvider'

export interface FormSubmitButtonProps extends Omit<ButtonProps, 'onClick'> {
  children?: React.ReactNode
  onClick?: (e: any, isSubmitting: boolean) => void
  lifecycle?: {
    submitting?: React.ReactNode
    disabled?: React.ReactNode
  }
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  FormSubmitButtonProps
>(({ onClick, lifecycle, children, className, ...props }, ref) => {
  const { settings } = useForm()
  const {
    errors,
    isSubmitting,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
    values: any
    isSubmitting: boolean
  } = useFormikContext()

  // TODO check if required fields all have values

  const hasErrors = Object.keys(errors).length ? true : false

  const renderLifecycle = () =>
    lifecycle && isSubmitting ? lifecycle.submitting : children

  return (
    <Button
      type="submit"
      ref={ref}
      className={cn(['form-submit-btn', className])}
      onClick={onClick ? (e) => onClick(e, isSubmitting) : undefined}
      disabled={settings?.disableSubmit && hasErrors}
      {...props}>
      {renderLifecycle()}
    </Button>
  )
})

SubmitButton.displayName = 'FormSubmit'
