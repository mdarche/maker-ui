import React, { forwardRef, Fragment } from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '@/hooks'

export interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: string
}

export const FormPageButton = () => {
  return <button></button>
}

export interface FormProgressProps extends SlotProps {
  classNames?: {
    indicator?: string
    container?: string
    active?: string
  }
  component?: React.ReactNode
  /** Custom render props for the pagination button. Don't forget to set your custom button's
   * type attribute to 'button' to prevent the form from submitting when clicked.
   */
  renderProps?: (
    active?: boolean,
    setPage?: (n: number) => void,
    currentPage?: number
  ) => React.ReactNode
}

export const FormProgress = forwardRef<HTMLDivElement, FormProgressProps>(
  ({ className, classNames, component, renderProps, _type, ...props }, ref) => {
    const { currentPage, setPage, totalPages, validatePage } = useForm()
    /**
     * Validate the current page before moving to the next page
     */
    const handlePageClick = (i: number) => {
      if (i > currentPage) {
        const valid = validatePage(currentPage)
        if (valid) setPage(i)
      } else {
        setPage(i)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(['mkui-form-progress', className, classNames?.container])}
        {...props}>
        {[...Array(totalPages)].map((_, i) => {
          const isActive = i + 1 === currentPage
          return (
            <Fragment key={i}>
              {renderProps ? (
                renderProps(isActive, setPage, currentPage)
              ) : (
                <button
                  type="button"
                  onClick={() => handlePageClick(i + 1)}
                  className={cn([
                    'mkui-btn-form-progress',
                    classNames?.indicator,
                    isActive ? 'active' : '',
                    isActive ? classNames?.active : '',
                  ])}>
                  {component ?? null}
                </button>
              )}
            </Fragment>
          )
        })}
      </div>
    )
  }
)

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

export const FormSubmit = React.forwardRef<
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
FormProgress.defaultProps = { _type: 'progress' }
FormSubmit.defaultProps = { _type: 'submit' }
FormSuccess.defaultProps = { _type: 'success' }
FormError.defaultProps = { _type: 'error' }
FormHeader.defaultProps = { _type: 'header' }
FormFooter.defaultProps = { _type: 'footer' }
