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
  renderProps?: (
    active?: boolean,
    setPage?: (n: number) => void,
    currentPage?: number
  ) => React.ReactNode
}

export const FormProgress = forwardRef<HTMLDivElement, FormProgressProps>(
  ({ className, classNames, component, renderProps, _type, ...props }, ref) => {
    const { currentPage, setPage, totalPages } = useForm()
    return (
      <div
        ref={ref}
        className={cn(['mkui_form_progress', className, classNames?.container])}
        {...props}>
        {[...Array(totalPages)].map((_, i) => {
          const isActive = i + 1 === currentPage
          return (
            <Fragment key={i}>
              {renderProps ? (
                renderProps(isActive, setPage, currentPage)
              ) : (
                <button
                  onClick={() => setPage(i + 1)}
                  className={cn([
                    'mkui_form_page',
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
  const { isSubmitting, errors, settings } = useForm()
  const hasErrors = Object.keys(errors).length ? true : false

  const renderLifecycle = () =>
    lifecycle && isSubmitting ? lifecycle.submitting : children

  return (
    <button
      type="submit"
      ref={ref}
      className={cn(['mkui_form_submit', className])}
      onClick={onClick ? (e) => onClick(e, isSubmitting) : undefined}
      disabled={settings?.disableSubmit && hasErrors}
      {...props}>
      {renderLifecycle()}
    </button>
  )
})

export const FormSuccess = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(['mkui_form_success', className])}
      {...props}
    />
  )
)

export const FormError = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui_form_error', className])} {...props} />
  )
)

export const FormHeader = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui_form_header', className])} {...props} />
  )
)

export const FormFooter = forwardRef<HTMLDivElement, SlotProps>(
  ({ className, _type, ...props }, ref) => (
    <div ref={ref} className={cn(['mkui_form_footer', className])} {...props} />
  )
)

// Default props for slot layout
FormProgress.defaultProps = { _type: 'progress' }
FormSuccess.defaultProps = { _type: 'success' }
FormError.defaultProps = { _type: 'error' }
FormHeader.defaultProps = { _type: 'header' }
FormFooter.defaultProps = { _type: 'footer' }
