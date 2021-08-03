import * as React from 'react'
import { useFormikContext, FormikErrors, FormikTouched } from 'formik'
import { Button, ButtonProps } from 'maker-ui'

interface SubmitButtonProps extends Omit<ButtonProps, 'onClick'> {
  children?: React.ReactNode
  onClick?: (e: any, isSubmitting: boolean) => void
  lifecycle?: {
    submitting?: React.ReactNode
    disabled?: React.ReactNode
  }
}

export const SubmitButton = ({
  css,
  onClick,
  lifecycle,
  children,
  ...props
}: SubmitButtonProps) => {
  // Todo get required fields array from form context
  const {
    errors,
    touched,
    values,
    isSubmitting,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
    values: any
    isSubmitting: boolean
  } = useFormikContext()

  // TODO check if required fields all have values
  const isValidated = errors === {} ? true : false

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
      onClick={onClick ? event => onClick(event, isSubmitting) : undefined}
      disabled={isValidated}
      css={{ ...(css as object) }}
      {...props}>
      {renderLifecycle()}
    </Button>
  )
}
