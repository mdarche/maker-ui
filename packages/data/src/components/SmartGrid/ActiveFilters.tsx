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

// All active filters
export const ActiveFilters = () => {
  const { activeFilters, setFilter, resetFilters } = useSmartGrid()
  const a = formatFilterObject(activeFilters)

  return a?.length ? (
    <div className={cn(['mkui-data-active-filters'])}>
      {a.map((f, i) => (
        <div key={`${f?.key}-${i}`} className={cn(['mkui-data-active-item'])}>
          <button
            className={cn(['mkui-data-remove'])}
            onClick={() => setFilter(f?.key, f.value)}>
            <CloseIcon />
          </button>
          {f.label}
        </div>
      ))}
      {a?.length > 1 && (
        <button
          className={cn(['mkui-data-clear'])}
          onClick={() => resetFilters()}>
          Clear All
        </button>
      )}
    </div>
  ) : null
}
