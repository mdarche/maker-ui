import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useSmartTable } from '@/hooks'
import { SmartTableProps } from './types'

interface TableRowProps<T> {
  item: T
  rowClass?: SmartTableProps<T>['rowClass']
  onRowClick?: SmartTableProps<T>['onRowClick']
  onRowSelect?: SmartTableProps<T>['onRowSelect']
  onDelete?: SmartTableProps<T>['onDelete']
  settings: SmartTableProps<T>['settings']
  classNames?: SmartTableProps<T>['classNames']
}

export const TableRow = <T extends { id: string | number }>({
  item,
  rowClass,
  onRowClick,
  onRowSelect,
  onDelete,
  settings,
  classNames,
}: TableRowProps<T>) => {
  const { state, dispatch } = useSmartTable<T>()

  const clearSelection = () => {
    dispatch({ type: 'SET_SELECTED_ROWS', value: new Set() })
  }

  const handleRowSelect = (itemId: string | number) => {
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

  return (
    <tr
      className={cn([
        rowClass ? rowClass(item) : undefined,
        classNames?.tableRow,
      ])}
      onClick={() => onRowClick && onRowClick(item)}>
      {settings?.selectable && (
        <td>
          <input
            type="checkbox"
            className={classNames?.tableSelect}
            checked={state.selectedRows.has(item.id)}
            onChange={() => handleRowSelect(item.id)}
          />
        </td>
      )}
      {state.reorderedColumns.map(
        (column) =>
          !column.hidden && (
            <td className={classNames?.tableCell} key={column.key.toString()}>
              {column.render ? (
                column.render(item, column.key)
              ) : column.dataType === 'delete' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(item)
                  }}
                  className={cn([
                    column.deleteButton?.className,
                    classNames?.deleteButton,
                  ])}
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
  )
}
