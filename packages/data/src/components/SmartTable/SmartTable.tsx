import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { cn, merge } from '@maker-ui/utils'
import { CaretIcon } from '@/icons'
import { smartTableReducer } from './reducer'
import { TablePagination } from './TablePagination'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { TableControls } from './TableControls'
import { tableVars } from '../../variables'
import type { SmartTableProps, SmartTableState, TableAction } from './types'

const defaultProps = {
  settings: {
    pagination: false,
    itemsPerPage: 100,
    loadingIndicator: 'Loading...',
    caretIcon: <CaretIcon />,
  },
}

export const TableContext = createContext<{
  state: SmartTableState<any>
  dispatch: React.Dispatch<TableAction<any>>
} | null>(null)

export const SmartTable = <T extends { id: string | number }>(
  props: SmartTableProps<T>
) => {
  const {
    data = [],
    columns,
    totalCount,
    settings,
    classNames = {},
    styles,
    fetchData,
    onDelete,
    onRowClick,
    onRowSelect,
    toolbar,
    rowClass,
  } = merge(defaultProps as SmartTableProps<T>, props || {})
  const prevColumns = useRef<typeof columns | null>(null)
  const prevData = useRef<typeof data | null>(null)
  const initialState: SmartTableState<T> = {
    selectedRows: new Set(),
    loading: false,
    localData: data,
    localTotalCount: totalCount || data.length,
    page: 1,
    reorderedColumns: columns,
    draggedColumn: null,
    sortColumn: null,
    sortDirection: 'asc',
    searchColumns: settings?.search?.columns || [],
    searchQuery: '',
  }
  const variables = tableVars(styles)
  const [state, dispatch] = useReducer<
    React.Reducer<SmartTableState<T>, TableAction<T>>
  >(smartTableReducer, initialState)

  const processedData = useMemo(() => {
    let result = state.localData

    if (fetchData !== undefined) {
      return state.localData
    }

    // Sorting
    if (state.sortColumn) {
      result = [...result].sort((a, b) => {
        const sortKey = state.sortColumn as keyof T
        if (a[sortKey] < b[sortKey])
          return state.sortDirection === 'asc' ? -1 : 1
        if (a[sortKey] > b[sortKey])
          return state.sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    // Filtering
    if (state.searchQuery && state.searchColumns.length > 0) {
      const query = state.searchQuery.toLowerCase()
      result = result.filter((item) =>
        state.searchColumns.some(
          (columnKey) =>
            item[columnKey]?.toString().toLowerCase().includes(query)
        )
      )
    }

    return result
  }, [
    state.localData,
    state.sortColumn,
    state.sortDirection,
    state.searchQuery,
    state.searchColumns,
    fetchData,
  ])

  const paginatedData = useMemo(() => {
    if (!settings?.pagination) return processedData
    return fetchData !== undefined
      ? state.localData
      : processedData.slice(
          (state.page - 1) * settings.itemsPerPage!,
          state.page * settings.itemsPerPage!
        )
  }, [
    processedData,
    state.localData,
    settings.pagination,
    state.page,
    settings.itemsPerPage,
    fetchData,
  ])

  useEffect(() => {
    if (JSON.stringify(prevColumns.current) !== JSON.stringify(columns)) {
      dispatch({ type: 'SET_REORDERED_COLUMNS', value: columns })
    }
    prevColumns.current = columns
  }, [columns])

  useEffect(() => {
    if (JSON.stringify(prevData.current) !== JSON.stringify(data)) {
      dispatch({ type: 'SET_LOCAL_DATA', value: data })
      dispatch({
        type: 'SET_LOCAL_TOTAL_COUNT',
        value: totalCount || data.length,
      })
    }
    prevData.current = data

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const fetchDataAndUpdateState = useCallback(async () => {
    if (fetchData) {
      dispatch({ type: 'SET_LOADING', value: true })
      const data = await fetchData({
        page: state.page,
        itemsPerPage: settings.itemsPerPage!,
        sortColumn: state.sortColumn,
        sortDirection: state.sortDirection,
        searchColumns: state.searchColumns,
        searchQuery: state.searchQuery,
      })
      dispatch({ type: 'SET_LOCAL_DATA', value: data })
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }, [
    fetchData,
    state.page,
    settings.itemsPerPage,
    state.sortColumn,
    state.sortDirection,
    state.searchColumns,
    state.searchQuery,
  ])

  useEffect(() => {
    fetchDataAndUpdateState()
  }, [fetchDataAndUpdateState])

  useEffect(() => {
    dispatch({ type: 'SET_LOCAL_TOTAL_COUNT', value: totalCount })
  }, [totalCount])

  return (
    <TableContext.Provider value={{ state, dispatch } as any}>
      <div
        className={cn([
          'mkui-table',
          classNames?.root,
          styles?.header?.sticky ? 'sticky-header' : undefined,
          styles?.row?.bgAlt ? 'alt-row' : undefined,
          onRowClick !== undefined ? 'row-select' : undefined,
        ])}
        style={variables}>
        <TableControls
          {...{
            data: paginatedData,
            classNames,
            settings,
            total: processedData?.length,
            toolbar,
          }}
        />
        <div className={cn(['mkui-table-wrapper', classNames?.tableWrapper])}>
          <table className={classNames?.table}>
            <TableHeader {...{ settings, styles, columns, classNames }} />
            <tbody>
              {state.loading ? (
                <tr
                  className={cn([
                    'mkui-table-loading',
                    classNames?.loadScreen,
                  ])}>
                  <td colSpan={columns.length} style={{ padding: 20 }}>
                    {settings?.loadingIndicator}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <TableRow
                    key={item.id}
                    {...{
                      item,
                      rowClass,
                      onRowClick,
                      onRowSelect,
                      onDelete,
                      settings,
                      classNames,
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        {settings.pagination && (
          <TablePagination
            {...{
              settings,
              count: paginatedData.length,
              classNames,
            }}
          />
        )}
      </div>
    </TableContext.Provider>
  )
}
