import { useSmartGrid } from '@/hooks'
import { cn } from '@maker-ui/utils'
import type { Filters } from './types'
import { CloseIcon } from '@/icons'

interface KeyValueArrayItem {
  key: string
  value: any
  label: string
}

const formatString = (input: string): string =>
  input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const formatKeyValueObject = (obj: Filters): KeyValueArrayItem[] =>
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
  const a = formatKeyValueObject(activeFilters)

  return a?.length ? (
    <div className={cn(['mkui-data-active-filters'])}>
      {a.map((f, i) => (
        <div key={`${f?.key}-${i}`} className={cn(['mkui-data-active-filter'])}>
          <button
            className={cn(['mkui-data-remove'])}
            onClick={() => setFilter(f?.key, f.value)}>
            <CloseIcon />
          </button>
          {f.label}
        </div>
      ))}
      {a?.length > 1 && (
        <button onClick={() => resetFilters()}>Clear All</button>
      )}
    </div>
  ) : null
}
