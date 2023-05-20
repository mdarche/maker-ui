import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { CaretIcon } from '@/icons'
import { useSmartGrid } from '@/hooks'

export interface SortButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Optional label to be displayed on the sort button.
   * @default 'Sort by
   */
  label?: string | React.ReactElement
  /**
   * Optional callback function that will be called when the sort button is clicked.
   * The new sort value is passed as an argument to this function.
   */
  onChange?: (value: string) => void
  /** Optional icon to be displayed on the sort button. */
  icon?: React.ReactElement
}

export const SortButton = ({
  label = 'Sort by',
  onChange,
  icon = <CaretIcon />,
  className,
  ...props
}: SortButtonProps) => {
  const { filters, activeSort, setSort } = useSmartGrid()
  const sortOptions = filters.filter((f) => f.type === 'sort')

  function onSelect(value: string) {
    setSort(value)
    onChange && onChange(value)
  }

  return (
    <div
      className={cn(['mkui-grid-sort flex align-center', className])}
      {...props}>
      <label className="select-label" htmlFor="grid-sort">
        {label}
      </label>
      <div className="select-input">
        <select
          id="grid-sort"
          value={activeSort?.name as string}
          onChange={(e) => onSelect(e.target.value)}>
          {sortOptions?.map(({ label, name }) => (
            <option key={name} value={name}>
              {label}
            </option>
          ))}
        </select>
        {icon}
      </div>
    </div>
  )
}
