import * as React from 'react'
import { useForm } from '@/hooks'
import { cn } from '@maker-ui/utils'
import { ArrowIcon } from './Icons'

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
          ])}>
          {settings?.prevButton || (
            <div className="mkui-prev-inner flex align-center">
              <ArrowIcon
                style={{
                  transform: 'rotate(90deg)',
                  height: 10,
                  marginRight: 5,
                }}
              />
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
          ])}>
          {settings?.nextButton || (
            <div className="mkui-next-inner flex align-center">
              Next
              <ArrowIcon
                style={{
                  height: 10,
                  transform: 'rotate(-90deg)',
                  marginLeft: 5,
                }}
              />
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
