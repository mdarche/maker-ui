import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'

interface PageIcons {
  /** The content for the "first" page button. Can be a string or a React element. */
  first?: React.ReactElement | string
  /** The content for the "last" page button. Can be a string or a React element. */
  last?: React.ReactElement | string
  /** The content for the "next" page button. Can be a string or a React element.*/
  next?: React.ReactElement | string
  /** The content for the "previous" page button. Can be a string or a React element.*/
  prev?: React.ReactElement | string
}

interface InputLabels {
  /** The content to prepend to the input field. Can be a string or a React element. */
  prepend?: React.ReactElement | string
  /** The content to append to the input field. Can be a string or a React element. */
  append?: React.ReactElement | string
}

interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The current page number. */
  page: number
  /** The total number of pages. */
  totalPages: number
  /**
   * A callback function that is triggered when the page changes.
   * @param newPage - The new page number.
   */
  onChange: (newPage: number) => void
  /** An optional object specifying custom icons or text for the pagination buttons. */
  icons?: PageIcons
  /** An optional object specifying custom labels for the input field. */
  input?: InputLabels
  /** The type of pagination to display. Can be 'simple', 'input', or 'numbered'. */
  type?: 'simple' | 'input' | 'numbered'
  /** The number of pages to show in the pagination component. Only applicable for 'numbered' type*/
  showPages?: number
}

export const Pagination = ({
  type = 'input',
  page,
  totalPages,
  icons = {},
  input = {},
  onChange,
  showPages,
  className,
  ...props
}: PaginationProps) => {
  const inputLabels = merge(input, {
    prepend: 'Page',
    append: `of ${totalPages}`,
  })
  const buttonLabels = merge(icons, {
    first: 'First',
    last: 'Last',
    next: 'Next',
    prev: 'Previous',
  })

  const attrs = {
    totalPages,
    page,
    onChange,
    buttonLabels,
  }

  return (
    <div
      className={cn(['mkui-smart-grid-pagination', `type-${input}`, className])}
      {...props}>
      {type === 'input' && <InputPagination {...{ ...attrs, inputLabels }} />}
      {type === 'numbered' && (
        <NumberedPagination {...{ ...attrs, showPages }} />
      )}
      {type === 'simple' && <SimplePagination {...attrs} />}
    </div>
  )
}

interface SharedProps {
  page: number
  totalPages: number
  buttonLabels: PageIcons
  inputLabels?: InputLabels
  showPages?: number
  onChange: (newPage: number) => void
}

const InputPagination = ({
  onChange,
  totalPages,
  page,
  inputLabels,
  buttonLabels,
}: SharedProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPage = parseInt(e.target.value, 10)
    if (!isNaN(inputPage) && inputPage > 0 && inputPage <= totalPages) {
      onChange(inputPage)
    }
  }

  return (
    <>
      <button onClick={() => onChange(1)} disabled={page === 1}>
        {buttonLabels.first}
      </button>
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>
        {buttonLabels.prev}
      </button>
      <span>
        {inputLabels?.prepend}
        <input
          type="number"
          min="1"
          max={totalPages}
          value={page}
          onChange={handleInputChange}
        />
        {inputLabels?.append}
      </span>
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        {buttonLabels.next}
      </button>
      <button
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}>
        {buttonLabels.last}
      </button>
    </>
  )
}

const NumberedPagination = ({
  onChange,
  totalPages,
  page,
  buttonLabels,
  showPages = 5,
}: SharedProps) => {
  let startPage = Math.max(page - Math.floor(showPages / 2), 1)
  let endPage = Math.min(startPage + showPages - 1, totalPages)

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(endPage - showPages + 1, 1)
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <>
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>
        {buttonLabels.prev}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onChange(number)}
          className={page === number ? 'active' : ''}>
          {number}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        {buttonLabels.next}
      </button>
    </>
  )
}

const SimplePagination = ({
  onChange,
  totalPages,
  page,
  buttonLabels,
}: SharedProps) => (
  <>
    <button onClick={() => onChange(page - 1)} disabled={page === 1}>
      {buttonLabels.prev}
    </button>
    <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>
      {buttonLabels.next}
    </button>
  </>
)
