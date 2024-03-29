import { cn } from '@maker-ui/utils'
import { useSmartGrid } from '@/hooks'
import { Search } from '../Search'

export interface GridSearchProps {
  className?: string
}

export const GridSearch = ({ className }: GridSearchProps) => {
  const { setSearchQuery, resetSearchQuery } = useSmartGrid()

  return (
    <Search
      className={cn(['mkui-grid-search', className])}
      onSearch={setSearchQuery}
      onReset={resetSearchQuery}
    />
  )
}
