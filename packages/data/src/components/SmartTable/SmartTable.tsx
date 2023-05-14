import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { cleanObject, cn, merge } from '@maker-ui/utils'
import { formatNumber } from '@/utils'
import { CaretIcon } from '@/icons'
import { Search } from '../Search'
import { smartTableReducer } from './reducer'
import type { SmartTableProps, SmartTableState, TableAction } from './types'
import { TablePagination } from './TablePagination'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { ExportButton } from './ExportButton'

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
  const [state, dispatch] = useReducer<
    React.Reducer<SmartTableState<T>, TableAction<T>>
  >(smartTableReducer, initialState)

  const processedData = useMemo(() => {
    let result = state.localData

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
        state.searchColumns.some((columnKey) =>
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

  return (
    <TableContext.Provider value={{ state, dispatch } as any}>
      <div
        className={cn(['mkui-smart-table'])}
        style={cleanObject({
          '--table-cell-padding': formatNumber(styles?.cellPadding),
          '--table-header-color': styles?.headerColor,
          '--table-header-padding': formatNumber(styles?.headerPadding),
          '--table-header-bg': styles?.headerBackground,
          '--table-header-top': formatNumber(styles?.stickyHeaderTop),
          '--table-header-font-family': styles?.headerFontFamily,
          '--table-header-font-size': formatNumber(styles?.headerFontSize),
          '--table-header-icon-height': formatNumber(styles?.headerIconHeight),
          '--table-font-size': formatNumber(styles?.fontSize),
          '--table-font-family': styles?.fontFamily,
          '--table-border-color': styles?.borderColor,
          '--table-alt-row-bg': styles?.altRowBackground,
          '--table-row-hover-bg': styles?.hoverRowBackground,
        } as React.CSSProperties)}>
        {settings?.export && (
          <ExportButton
            filename={settings?.export?.filename || 'table-data'}
            data={paginatedData}
            columns={state.reorderedColumns}
            className={classNames?.exportButton}
            label={settings?.export?.label}
            type={settings?.export?.output}
          />
        )}
        {settings?.search && (
          <Search
            onSearch={(query) =>
              dispatch({ type: 'SET_SEARCH_QUERY', value: query })
            }
            onReset={() => dispatch({ type: 'SET_SEARCH_QUERY', value: '' })}
            // allOptions={columns.filter((column) => column.filterable)}
            currentOptions={state.searchColumns}
            setOptions={(columns) =>
              dispatch({ type: 'SET_SEARCH_COLUMNS', value: columns })
            }
          />
        )}
        {state.loading ? (
          settings.loadingIndicator
        ) : (
          <div
            className={cn([
              'mkui-table-wrapper',
              styles?.stickyHeader ? 'sticky-header' : undefined,
              styles?.altRowBackground ? 'alt-row' : undefined,
              onRowClick !== undefined ? 'row-select' : undefined,
            ])}>
            <table>
              <TableHeader
                settings={settings}
                styles={styles}
                columns={columns}
                classNames={classNames}
              />
              <tbody>
                {paginatedData.map((item) => (
                  <TableRow
                    {...{
                      key: item.id,
                      item,
                      rowClass,
                      onRowClick,
                      onRowSelect,
                      onDelete,
                      settings,
                      classNames,
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {settings.pagination && (
          <TablePagination
            settings={settings}
            fetchData={fetchData}
            count={processedData.length}
            classNames={classNames}
          />
        )}
      </div>
    </TableContext.Provider>
  )
}
