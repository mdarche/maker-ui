import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { Accordion } from '@maker-ui/accordion'
import { useSmartGrid } from '@/hooks'
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
  renderOption?: (
    value: string | number,
    onClick: () => void,
    isActive?: boolean
  ) => React.ReactElement<HTMLButtonElement>
}

export const AccordionMenu = ({
  filters,
  type,
  renderOption,
  className,
  ...props
}: AccordionMenuProps) => {
  const { activeFilters, setFilter } = useSmartGrid()

  return (
    <div className={cn(['mkui-filter-menu', className])} {...props}>
      <Accordion>
        {filters?.map((f, i) => {
          const isFilterGroup = isGroup(f)
          return (
            <Accordion.Panel
              key={`${f.label}` + i}
              title={f.label}
              className={f.className}
              open={f.open}>
              <ul>
                {f.options.map((o, i) => {
                  const key = isFilterGroup ? (o.value as string) : f.filter
                  const filterValues = activeFilters[key]
                  let isChecked = isActive(filterValues, o.value)
                  const className = cn([
                    'mkui-filter-option',
                    isChecked ? 'checked' : undefined,
                  ])
                  return (
                    <li key={`${o.value}` + i}>
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
                      ) : (
                        <label>
                          <input
                            type="checkbox"
                            className={className}
                            value={o.value}
                            onChange={() => setFilter(key, o.value)} // Hide the default checkbox
                          />
                          <span
                            className={className}
                            onClick={() => setFilter(key, o.value)}></span>
                          <span className="mkui-filter-label">{o.label}</span>
                        </label>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Accordion.Panel>
          )
        })}
      </Accordion>
    </div>
  )
}

function isActive(f: FilterValue, value: string | number) {
  let active = false
  if (Array.isArray(f)) {
    active = (f as Array<typeof value>).includes(value)
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
