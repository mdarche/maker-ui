import * as React from 'react'
import { useFormikContext, FormikErrors, FormikTouched } from 'formik'
import { Button, type ButtonProps } from '@maker-ui/primitives'
import { mergeSelectors } from '@maker-ui/utils'
import { useForm } from './FormProvider'

export interface FormSubmitButtonProps extends Omit<ButtonProps, 'onClick'> {
  children?: React.ReactNode
  onClick?: (e: any, isSubmitting: boolean) => void
  lifecycle?: {
    submitting?: React.ReactNode
    disabled?: React.ReactNode
  }
}

// TODO - Forward ref

export const SubmitButton = ({
  onClick,
  lifecycle,
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { settings } = useForm()
  const {
    errors,
    // touched,
    // values,
    isSubmitting,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
    values: any
    isSubmitting: boolean
  } = useFormikContext()

  // TODO check if required fields all have values

  const hasErrors = Object.keys(errors).length ? true : false

  function renderLifecycle() {
    if (lifecycle) {
      if (isSubmitting) {
        return lifecycle.submitting
      }
    }
    return children
  }

  return (
    <Button
      type="submit"
      className={mergeSelectors(['form-submit-btn', className])}
      onClick={onClick ? (e) => onClick(e, isSubmitting) : undefined}
      disabled={settings.disableSubmit && hasErrors}
      {...props}>
      {renderLifecycle()}
    </Button>
  )
}

SubmitButton.displayName = 'FormSubmit'
