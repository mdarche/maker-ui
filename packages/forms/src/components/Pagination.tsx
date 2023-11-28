import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '@/context'

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  submitButton: React.ReactNode
}

export const Pagination = ({ submitButton }: PaginationProps) => {
  const {
    currentPage,
    totalPages,
    validatePage,
    setPage,
    settings: s,
  } = useForm()
  /**
   * Validate the current page before moving to the next page
   */
  const handlePageClick = (type: 'next' | 'prev') => {
    if (type === 'next') {
      const valid = validatePage(currentPage)
      if (valid) setPage(currentPage + 1)
    } else {
      setPage(currentPage - 1)
    }
  }

  return (
    <div className={cn(['mkui-form-pagination', s?.classNames?.pagination])}>
      {currentPage > 1 ? (
        <button
          type="button"
          onClick={() => handlePageClick('prev')}
          className={cn([
            'mkui-form-btn-page prev',
            s?.classNames?.pageButton,
            s?.classNames?.prevButton,
          ])}>
          {s?.prevButton || (
            <div className="mkui-prev-inner flex align-center">
              {s?.icons?.prevArrow}
              Previous
            </div>
          )}
        </button>
      ) : (
        <div />
      )}
      {currentPage < totalPages ? (
        <button
          type="button"
          onClick={() => handlePageClick('next')}
          className={cn([
            'mkui-form-btn-page next',
            s?.classNames?.pageButton,
            s?.classNames?.nextButton,
          ])}>
          {s?.nextButton || (
            <div className="mkui-next-inner flex align-center">
              Next
              {s?.icons?.nextArrow}
            </div>
          )}
        </button>
      ) : (
        submitButton
      )}
      <div></div>
    </div>
  )
}
