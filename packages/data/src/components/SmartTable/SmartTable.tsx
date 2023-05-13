import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { cleanObject, cn, merge } from '@maker-ui/utils'
import { ExportButton } from './ExportButton'
import { formatNumber } from '@/utils'
import { CaretIcon } from '@/icons'
import { Search } from '../Search'
import { Pagination } from '../Pagination'
import { smartTableReducer } from './reducer'
import type {
  SmartTableProps,
  ColumnConfig,
  TableSettings,
  SmartTableState,
  TableAction,
} from './types'

export const SmartTable = <T extends { id: string | number }>(
  props: SmartTableProps<T>
) => {
  const {
    data = [],
    columns,
    totalCount,
    settings,
    styles,
    fetchData,
    onDelete,
    onRowClick,
    onRowSelect,
    rowClass,
  } = merge(
    {
      settings: {
        pagination: false,
        itemsPerPage: 100,
        loadingIndicator: 'Loading...',
        caretIcon: <CaretIcon />,
      } as TableSettings<T>,
    } as SmartTableProps<T>,
    props || {}
  )
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

  const clearSelection = () => {
    dispatch({ type: 'SET_SELECTED_ROWS', value: new Set() })
  }

  const handleRowSelection = (itemId: string | number) => {
    const updatedSelectedRows = new Set(state.selectedRows)

    if (state.selectedRows.has(itemId)) {
      updatedSelectedRows.delete(itemId)
    } else {
      updatedSelectedRows.add(itemId)
    }

    dispatch({ type: 'SET_SELECTED_ROWS', value: updatedSelectedRows })
    if (onRowSelect) {
      onRowSelect(updatedSelectedRows, clearSelection)
    }
  }

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

  const deleteItem = async (item: T) => {
    if (onDelete) {
      try {
        await onDelete(item)
      } catch (error) {
        console.error('Error deleting item:', error)
        return
      }
    }
    dispatch({
      type: 'SET_LOCAL_DATA',
      value: state.localData.filter(({ id }) => id !== item.id),
    })
    dispatch({
      type: 'SET_LOCAL_TOTAL_COUNT',
      value: state.localTotalCount - 1,
    })
  }

  const handleColumnHeaderClick = (column: ColumnConfig<T>) => {
    if (column.sortable) {
      if (state.sortColumn === column.key) {
        dispatch({
          type: 'SET_SORT_DIRECTION',
          value: state.sortDirection === 'asc' ? 'desc' : 'asc',
        })
      } else {
        dispatch({ type: 'SET_SORT_COLUMN', value: column.key })
        dispatch({ type: 'SET_SORT_DIRECTION', value: 'asc' })
      }
    }
  }

  useEffect(() => {
    if (JSON.stringify(prevColumns.current) !== JSON.stringify(columns)) {
      dispatch({ type: 'SET_REORDERED_COLUMNS', value: columns })
    }
    prevColumns.current = columns
  }, [columns])

  useEffect(() => {
    if (fetchData !== undefined) {
      handlePageChange(1)
    } else {
      if (JSON.stringify(prevData.current) !== JSON.stringify(data)) {
        dispatch({ type: 'SET_LOCAL_DATA', value: data })
        dispatch({
          type: 'SET_LOCAL_TOTAL_COUNT',
          value: totalCount || data.length,
        })
      }
      prevData.current = data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    const table = e.currentTarget.closest('table')
    const th = e.currentTarget.closest('th')

    if (!table || !th) return

    const tableWidth = table.clientWidth
    const columnWidth = th.clientWidth
    const startX = e.pageX

    const handleMouseMove = (e: MouseEvent) => {
      const diffX = e.pageX - startX
      const newWidth = columnWidth + diffX

      if (newWidth < 50) return // Minimum column width, you can adjust this value

      const percentage = (newWidth / tableWidth) * 100
      th.style.width = `${percentage}%`
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    columnKey: keyof T
  ) => {
    e.dataTransfer.effectAllowed = 'move'
    dispatch({ type: 'SET_DRAGGED_COLUMN', value: columnKey })
  }

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (
    e: React.DragEvent<HTMLTableCellElement>,
    columnKey: keyof T
  ) => {
    e.preventDefault()
    if (state.draggedColumn === null) return

    const newColumns = [...columns]
    const draggedColumnIndex = newColumns.findIndex(
      (column) => column.key === state.draggedColumn
    )
    const droppedColumnIndex = newColumns.findIndex(
      (column) => column.key === columnKey
    )

    if (draggedColumnIndex !== -1 && droppedColumnIndex !== -1) {
      const temp = newColumns[draggedColumnIndex]
      newColumns[draggedColumnIndex] = newColumns[droppedColumnIndex]
      newColumns[droppedColumnIndex] = temp
    }

    // Update the columns with the reordered array
    dispatch({ type: 'SET_REORDERED_COLUMNS', value: newColumns })
  }

  const searchPagination =
    settings?.pagination && processedData.length < settings.itemsPerPage!

  return (
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
      {settings?.exportToCSV && (
        <ExportButton
          filename="export"
          data={paginatedData}
          columns={state.reorderedColumns}
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
            <thead>
              <tr>
                {settings.selectable && <th />}
                {state.reorderedColumns.map(
                  (column, index) =>
                    !column.hidden && (
                      <th
                        key={column.key.toString()}
                        onClick={() => handleColumnHeaderClick(column)}
                        draggable={settings.reorder}
                        onDragStart={
                          settings.reorder
                            ? (e) => handleDragStart(e, column.key)
                            : undefined
                        }
                        onDragOver={
                          settings.reorder
                            ? (e) => handleDragOver(e)
                            : undefined
                        }
                        onDrop={
                          settings.reorder
                            ? (e) => handleDrop(e, column.key)
                            : undefined
                        }
                        className={cn([
                          column.sortable ? 'sortable' : undefined,
                          styles?.stickyHeader ? 'sticky' : undefined,
                        ])}
                        style={{
                          width:
                            typeof column.width === 'number'
                              ? `${column.width}px`
                              : column.width,
                        }}>
                        <div className="flex align-center">
                          {column.title}
                          {column.sortable &&
                            state.sortColumn === column.key && (
                              <span
                                className={cn([
                                  'sort-indicator',
                                  state.sortDirection,
                                ])}>
                                {settings.caretIcon}
                              </span>
                            )}
                        </div>
                        <div
                          className="resize-handle"
                          onMouseDown={(e) => handleMouseDown(e, index)}
                        />
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className={rowClass ? rowClass(item) : undefined}
                  onClick={() => onRowClick && onRowClick(item)}>
                  {settings.selectable && (
                    <td>
                      <input
                        type="checkbox"
                        checked={state.selectedRows.has(item.id)}
                        onChange={() => handleRowSelection(item.id)}
                      />
                    </td>
                  )}
                  {state.reorderedColumns.map(
                    (column) =>
                      !column.hidden && (
                        <td key={column.key.toString()}>
                          {column.render ? (
                            column.render(item, column.key)
                          ) : column.dataType === 'delete' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteItem(item)
                              }}
                              className={column.deleteButton?.className}
                              style={column.deleteButton?.styles}>
                              {column.deleteButton?.icon}
                              {column.deleteButton?.text || 'Delete'}
                            </button>
                          ) : (
                            <>{item[column.key]}</>
                          )}
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {settings.pagination && (
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
      )}
    </div>
  )
}
