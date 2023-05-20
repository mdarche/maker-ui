import { useSmartGrid } from '@/hooks'
import { cn } from '@maker-ui/utils'

// All active filters
export const ActiveFilters = () => {
  const { activeFilters } = useSmartGrid()
  console.log('Active filters are', activeFilters)
  return <div className={cn(['mkui-grid-active-filters'])}></div>
}
