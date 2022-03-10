import * as React from 'react'
import { useFormikContext, FormikErrors, FormikTouched } from 'formik'
import { Button, ButtonProps, mergeSelectors } from 'maker-ui'
import { useForm } from './FormProvider'
import { getRequired } from './utils'

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
  const { fields } = useForm()
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

  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const required = getRequired(fields)
  // console.log('Required fields are', required)
  // console.log('Errors are', errors)
  // console.log('Values are', values)

  // TODO check if required fields all have values
  const isValidated = Object.keys(errors).length ? true : false

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
      disabled={isValidated}
      {...props}>
      {renderLifecycle()}
    </Button>
  )
}

SubmitButton.displayName = 'FormSubmit'
