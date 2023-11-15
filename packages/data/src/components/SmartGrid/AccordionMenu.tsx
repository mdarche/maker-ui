import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useSmartGrid } from '@/hooks'
import { CaretIcon } from '@/icons'
import { FilterValue } from './types'

interface SharedProps {
  className?: string
  label?: string | React.ReactElement
  open?: boolean
  render?: (
    value: string | number,
    onClick: () => void,
    isActive?: boolean
  ) => React.ReactElement<HTMLButtonElement>
}

interface FilterGroup extends SharedProps {
  options: {
    label: string
    value: string
  }[]
}

function isGroup(prop: FilterGroup | FilterOption): prop is FilterGroup {
  return (prop as FilterOption)?.filter === undefined
}

interface FilterOption extends SharedProps {
  // corresponds to the registered filter name in provider
  filter: string
  options: {
    label: string
    value: string | number
  }[]
}

export interface AccordionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  filters: (FilterOption | FilterGroup)[]
  type?: 'checkbox' | 'button'
  classNames?: {
    root?: string
    details?: string
    summary?: string
    list?: string
    input?: string
    button?: string
    active?: string
  }
  renderOption?: (
    value: string | number,
    onClick: () => void,
    isActive?: boolean
  ) => React.ReactElement<HTMLButtonElement>
}

export const AccordionMenu = ({
  filters,
  type = 'checkbox',
  renderOption,
  classNames,
  ...props
}: AccordionMenuProps) => {
  const { activeFilters, setFilter } = useSmartGrid()

  return (
    <div className={cn(['mkui-filter-menu', classNames?.root])} {...props}>
      {filters?.map((f, i) => {
        // If the filter is a group, it will not have a filter property in the Accordion props
        const isFilterGroup = isGroup(f)
        return (
          <details
            key={`${f.label}` + i}
            className={cn([
              'mkui-filter-details',
              f.className,
              classNames?.details,
            ])}
            open={f.open ?? true}>
            <summary className={cn(['mkui-filter-label', classNames?.summary])}>
              {f?.label}
              <CaretIcon />
            </summary>
            <ul className={cn(['mkui-filter-list', classNames?.list])}>
              {f.options.map((o, i) => {
                const key = isFilterGroup ? (o.value as string) : f.filter
                const filterValues = activeFilters[key]
                let isChecked = isActive(filterValues, o.value)
                const className = isChecked
                  ? classNames?.active || 'checked'
                  : undefined

                return (
                  <li
                    key={`${o.value}` + i}
                    className={cn(['mkui-filter-option'])}>
                    {f?.render ? (
                      f.render(
                        o.value,
                        () => setFilter(key, o.value),
                        isChecked
                      )
                    ) : renderOption ? (
                      renderOption(
                        o.value,
                        () => setFilter(key, o.value),
                        isChecked
                      )
                    ) : type === 'checkbox' ? (
                      <label>
                        <input
                          type="checkbox"
                          name={`${key}-${o.value}`}
                          className={cn([classNames?.input, className])}
                          checked={isChecked}
                          onChange={() => setFilter(key, o.value)}
                        />
                        <span className="mkui-filter-option-label">
                          {o.label}
                        </span>
                      </label>
                    ) : (
                      <button
                        className={cn([classNames?.button, className])}
                        onClick={() => setFilter(key, o.value)}>
                        {o.label}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}
    </div>
  )
}

function isActive(f: FilterValue, value: string | number) {
  let active = false
  if (!f) return active
  if (Array.isArray(f)) {
    active = (f as Array<typeof value>).includes(value)
  } else if (typeof f === 'string') {
    active = f === value
  } else if (typeof f === 'number') {
    active = f === value
  } else if (typeof f === 'boolean') {
    active = f === Boolean(value)
  } else if (
    f &&
    typeof f === 'object' &&
    f !== null &&
    'min' in f &&
    'max' in f
  ) {
    active = (value as number) >= f.min && (value as number) <= f.max
  }
  return active
}
