import React, { useDeferredValue, useEffect, useState } from 'react'
import { CloseIcon, SearchIcon } from '@/icons'

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch: (query: string) => void
  /** An optional placeholder text for the search input field*/
  placeholder?: string
  /** Label for the 'clear' button. Can be a string or a React Element. */
  clearLabel?: string | React.ReactElement
  /** An optional callback function that will be called when the reset button is  clicked. */
  onReset?: () => void
}

export const Search = ({
  className,
  onSearch,
  placeholder = 'Search...',
  onReset,
  clearLabel = <CloseIcon />,
  ...props
}: SearchProps) => {
  const [value, setValue] = useState('')
  const [showClear, setShowClear] = useState(false)
  const deferredValue = useDeferredValue(value)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    if (value.length) {
      setShowClear(true)
    } else if (showClear) {
      setShowClear(false)
    }
  }

  const onClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue('')
    setShowClear(false)
    onReset?.()
  }

  useEffect(() => {
    if (deferredValue === value) {
      if (value.length >= 2) {
        onSearch(value)
      } else {
        onReset?.()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredValue])

  return (
    <div className={className} {...props}>
      <div className="mkui-search-bar">
        <SearchIcon />
        <input
          type="text"
          name="data-search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {value.length ? (
          <button
            className="btn-clear btn-naked flex align-center"
            onClick={onClear}>
            {clearLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}
