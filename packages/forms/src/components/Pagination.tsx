import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useForm } from '@/hooks'

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  submitButton: React.ReactNode
}

export const Pagination = ({ submitButton }: PaginationProps) => {
  const { currentPage, totalPages, validatePage, setPage, settings } = useForm()
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
    <div
      className={cn([
        'mkui-form-pagination',
        settings?.classNames?.pagination,
      ])}>
      {currentPage > 1 ? (
        <button
          type="button"
          onClick={() => handlePageClick('prev')}
          className={cn([
            'mkui-form-btn-page prev',
            settings?.classNames?.pageButton,
            settings?.classNames?.prevButton,
          ])}>
          {settings?.prevButton || (
            <div className="mkui-prev-inner flex align-center">
              {settings?.icons?.prevArrow}
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
            settings?.classNames?.pageButton,
            settings?.classNames?.nextButton,
          ])}>
          {settings?.nextButton || (
            <div className="mkui-next-inner flex align-center">
              Next
              {settings?.icons?.nextArrow}
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
