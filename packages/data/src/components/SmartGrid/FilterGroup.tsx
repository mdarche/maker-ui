import React, { useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import { useSmartGrid } from '@/hooks'
import { getNonEmptyKeys } from '@/utils'

interface FilterOption {
  /** An optional React Node to be used as an icon for the filter option. */
  icon?: React.ReactNode
  /** The label for the filter option. Can be a string or a React element. */
  label: string | React.ReactElement
  /** The value of the filter option. This is what will be passed to the onChange
   * function when this option is selected. */
  value: string | number
  /** The name of the filter option. This can be used for tracking which filter
   * option was selected.*/
  name: string
  /** If true, this filter will be applied by default */
  activeDefault?: boolean
}

interface FilterGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** An array of filter options to be displayed. Each option should be an object adhering
   * to the FilterOption interface. */
  options?: FilterOption[]
  /**
   * A callback function that is triggered when a filter option is selected.
   * @param value - The value of the selected filter option.
   */
  onChange?: (value: string) => void
  /** An optional string for custom styling classes. */
  className?: string
}

export const FilterGroup = ({
  options = [],
  onChange,
  className,
  ...props
}: FilterGroupProps) => {
  const { filters, activeFilters, setFilter, setAndRemoveFilters } =
    useSmartGrid()
  const activeKeys = getNonEmptyKeys(activeFilters)
  const activeValues = activeKeys
    .map((key) => [].concat(activeFilters[key] as any))
    .flat()

  function onClick(option: FilterOption) {
    // Check if the option is a valid filter
    const isValid = filters.some((filter) => filter.name === option.name)

    if (!isValid) {
      throw new Error(`Filter named ${option.name} does not exist.`)
    }

    const remove = options
      ?.filter((f) => f.name !== option.name)
      .map(({ name }) => name)
    setAndRemoveFilters(option.name, option.value, remove)
    // Remove all other options and add the new one
    onChange && onChange(option.name)
  }

  // Check for default and apply it
  useEffect(() => {
    if (options?.length) {
      const defaultOption = options.find((o) => o.activeDefault)
      if (defaultOption) {
        setFilter(defaultOption.name, defaultOption.value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <div className={cn(['filters', className])} {...props}>
      {options.map((o) => (
        <button
          key={o.name}
          onClick={() => onClick(o)}
          // @ts-ignore
          className={activeValues.includes(o.value) ? 'active' : ''}>
          {o?.icon}
          {o?.label}
        </button>
      ))}
    </div>
  )
}
