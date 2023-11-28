import { useContext } from 'react'
import { TableContext } from 'src/components/SmartTable/SmartTable'
import { SmartTableState, TableAction } from 'src/components/SmartTable/types'

export const useSmartTable = <T>() => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return context as {
    state: SmartTableState<T>
    dispatch: React.Dispatch<TableAction<T>>
  }
}
