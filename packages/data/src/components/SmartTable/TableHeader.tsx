import * as React from 'react'
import { cn, formatNumber } from '@maker-ui/utils'
import type {
  ColumnConfig,
  TableSettings,
  SmartTableProps,
  TableStyles,
} from './types'
import { useSmartTable } from '@/hooks'

interface TableHeaderProps<T> {
  settings: TableSettings<T>
  styles: TableStyles
  columns: ColumnConfig<T>[]
  classNames: SmartTableProps<T>['classNames']
}

export const TableHeader = <T,>({
  settings,
  styles,
  columns,
  classNames,
}: TableHeaderProps<T>) => {
  const { state, dispatch } = useSmartTable<T>()

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

  return (
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
                  settings.reorder ? (e) => handleDragOver(e) : undefined
                }
                onDrop={
                  settings.reorder
                    ? (e) => handleDrop(e, column.key)
                    : undefined
                }
                className={cn([
                  classNames?.tableHeader,
                  column.sortable ? 'sortable' : undefined,
                  styles?.stickyHeader ? 'sticky' : undefined,
                ])}
                style={{
                  width: formatNumber(column.width),
                }}>
                <div className="flex align-center">
                  {column.title}
                  {column.sortable && state.sortColumn === column.key && (
                    <span
                      className={cn([
                        'sort-indicator',
                        classNames?.sortIcon,
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
  )
}
