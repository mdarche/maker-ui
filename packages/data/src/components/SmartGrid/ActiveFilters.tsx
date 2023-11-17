import { useSmartGrid } from '@/hooks'
import { cn } from '@maker-ui/utils'
import type { Filters } from './types'
import { CloseIcon } from '@/icons'

const formatString = (input: string): string =>
  input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const formatFilterObject = (obj: Filters) =>
  Object.entries(obj).flatMap(([key, value]) =>
    Array.isArray(value)
      ? value.map((item) => ({
          key,
          value: String(item),
          label: formatString(String(item)),
        }))
      : typeof value === 'string'
      ? [{ key, value, label: formatString(value) }]
      : []
  )

export interface ActiveFilterProps {
  classNames?: {
    root?: string
    item?: string
    remove?: string
    clear?: string
  }
}

// All active filters
export const ActiveFilters = ({ classNames }: ActiveFilterProps) => {
  const { activeFilters, setFilter, resetFilters } = useSmartGrid()
  const a = formatFilterObject(activeFilters)

  return a?.length ? (
    <div className={cn(['mkui-data-active-filters', classNames?.root])}>
      {a.map((f, i) => (
        <div
          key={`${f?.key}-${i}`}
          className={cn(['mkui-data-active-item', classNames?.item])}>
          <button
            className={cn(['mkui-data-remove', classNames?.remove])}
            onClick={() => setFilter(f?.key, f.value)}>
            <CloseIcon />
          </button>
          {f.label}
        </div>
      ))}
      {a?.length > 1 && (
        <button
          className={cn(['mkui-data-clear', classNames?.clear])}
          onClick={() => resetFilters()}>
          Clear All
        </button>
      )}
    </div>
  ) : null
}
