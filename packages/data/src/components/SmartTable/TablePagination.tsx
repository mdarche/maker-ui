import * as React from 'react'
import { Pagination } from '../Pagination'
import { useSmartTable } from '@/hooks'
import { SmartTableProps, TableSettings } from './types'

interface TablePaginationProps<T> {
  fetchData?: SmartTableProps<T>['fetchData']
  settings: TableSettings<T>
  classNames?: SmartTableProps<T>['classNames']
  count?: number
}

export const TablePagination = <T,>({
  settings,
  fetchData,
  count = 0,
}: TablePaginationProps<T>) => {
  const { state, dispatch } = useSmartTable<T>()
  const searchPagination =
    settings?.pagination && count < settings.itemsPerPage!

  const handlePageChange = async (newPage: number) => {
    if (fetchData !== undefined) {
      dispatch({ type: 'SET_LOADING', value: true })
      const newData = await fetchData({
        page: newPage,
        itemsPerPage: settings.itemsPerPage!,
        sortColumn: state.sortColumn,
        sortDirection: state.sortDirection,
        searchColumns: state.searchColumns,
        searchQuery: state.searchQuery,
      })
      dispatch({ type: 'SET_LOCAL_DATA', value: newData })
      dispatch({ type: 'SET_LOADING', value: false })
    }
    dispatch({ type: 'SET_PAGE', value: newPage })
  }

  return (
    <Pagination
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
