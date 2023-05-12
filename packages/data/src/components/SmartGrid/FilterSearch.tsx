import React, { useDeferredValue, useEffect, useState } from 'react'
import { cn } from '@maker-ui/utils'
import { CloseIcon, SearchIcon } from '@/icons'
import { useSmartGrid } from '@/hooks'

interface FilterSearchProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /** An optional placeholder text for the search input field*/
  placeholder?: string
  /** Label for the 'clear' button. Can be a string or a React Element. */
  clearLabel?: string | React.ReactElement
  /** An optional callback function that will be called when the reset button is  clicked. */
  onReset?: () => void
}

export const FilterSearch = <T,>({
  className,
  placeholder = 'Search...',
  onReset,
  clearLabel = <CloseIcon />,
  ...props
}: FilterSearchProps<T>) => {
  const { setSearchQuery, resetSearchQuery } = useSmartGrid()
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
    resetSearchQuery()
    onReset?.()
  }

  useEffect(() => {
    if (deferredValue === value) {
      if (value.length >= 2) {
        setSearchQuery(value)
      } else {
        resetSearchQuery()
        onReset?.()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredValue])

  return (
    <div className={cn(['mkui-data-search', className])} {...props}>
      <SearchIcon />
      <input
        type="text"
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
  )
}
