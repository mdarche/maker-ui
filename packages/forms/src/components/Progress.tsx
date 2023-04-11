import React, { forwardRef, Fragment } from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '@/hooks'
import { SlotProps } from './FormSlots'

export interface ProgressProps extends SlotProps {
  classNames?: {
    indicator?: string
    container?: string
    active?: string
  }
  /** A custom component that will be used inside each page indicator button. For more control, use `renderProps`. */
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

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, classNames, component, renderProps, _type, ...props }, ref) => {
    const { currentPage, setPage, totalPages, validatePage, settings } =
      useForm()
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
        className={cn([
          'mkui-form-progress',
          className,
          settings?.classNames?.progress,
          classNames?.container,
        ])}
        {...props}>
        {[...Array(totalPages)].map((_, i) => {
          const isActive = i + 1 === currentPage
          const isPrevious = i + 1 < currentPage
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
                    isPrevious ? 'previous' : '',
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

Progress.defaultProps = { _type: 'progress' }
