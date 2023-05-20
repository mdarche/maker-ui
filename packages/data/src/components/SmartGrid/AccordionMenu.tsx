import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { Accordion } from '@maker-ui/accordion'
import { useSmartGrid } from '@/hooks'

interface FilterOption {
  // corresponds to the registered filter name in provider
  name: string
  className?: string
  independent?: boolean // if true, each option will be interpreted as independent filters
  label?: string | React.ReactElement // optional if not using the one registered in provider
  options: {
    label: string
    value: string | number
  }[]
  render?: (
    value: string | number,
    onClick: () => void
  ) => React.ReactElement<HTMLButtonElement>
  open?: boolean // if true accordion will be open by default
}

export interface AccordionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterOption[]
}

export const AccordionMenu = ({
  filters = [],
  className,
  ...props
}: AccordionMenuProps) => {
  const { activeFilters, setFilter } = useSmartGrid()

  return (
    <div className={cn(['mkui-filter-menu', className])} {...props}>
      <Accordion>
        {filters?.map((f) => (
          <Accordion.Panel
            key={f.name}
            title={f.label}
            className={f.className}
            open={f.open}>
            <ul>
              {f.options.map((o) => (
                <li key={o.value}>
                  {f?.render ? (
                    f.render(o.value, () => setFilter(f.name, o.value))
                  ) : (
                    <label>
                      <input
                        type="checkbox"
                        value={o.value}
                        onChange={() => setFilter(f.name, o.value)}
                        style={{ display: 'none' }} // Hide the default checkbox
                      />
                      <span
                        className={cn([
                          'mkui-filter-checkbox',
                          // activeFilters[f.name]?.includes(f.value)
                          //   ? 'checked'
                          //   : undefined,
                        ])}
                        onClick={() => setFilter(f.name, o.value)}></span>
                      <span className="mkui-filter-label">{o.label}</span>
                    </label>
                  )}
                </li>
              ))}
            </ul>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  )
}
