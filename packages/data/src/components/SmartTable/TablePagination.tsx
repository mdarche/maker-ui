import { Pagination } from '../Pagination'
import { useSmartTable } from '@/hooks'
import type { SmartTableProps, TableSettings } from './types'

interface TablePaginationProps<T> {
  settings: TableSettings<T>
  classNames?: SmartTableProps<T>['classNames']
  count?: number
}

export const TablePagination = <T,>({
  settings,
  count = 0,
  classNames,
}: TablePaginationProps<T>) => {
  const { state, dispatch } = useSmartTable<T>()
  const searchPagination =
    state.searchQuery?.length && count < settings.itemsPerPage!

  const handlePageChange = async (newPage: number) => {
    dispatch({ type: 'SET_PAGE', value: newPage })
  }

  return (
    <Pagination
      className={classNames?.pagination}
      type={
        typeof settings.pagination === 'string'
          ? settings.pagination
          : undefined
      }
      page={searchPagination ? 1 : state.page}
      totalPages={
        searchPagination
          ? 1
          : Math.ceil(state.localTotalCount / settings.itemsPerPage!)
      }
      onChange={handlePageChange}
    />
  )
}
