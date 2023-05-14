import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { SmartTableProps, TableSettings } from './types'
import { useSmartTable } from '@/hooks'
import { ExportButton } from './ExportButton'
import { Search } from '../Search'

interface TableControlsProps<T> {
  data: T[]
  toolbar?: React.ReactNode
  total?: number
  settings: TableSettings<T>
  classNames?: SmartTableProps<T>['classNames']
}

export const TableControls = <T,>({
  data = [],
  classNames,
  toolbar,
  total,
  settings,
}: TableControlsProps<T>) => {
  const { state, dispatch } = useSmartTable()
  return (
    <div className={cn(['mkui-table-controls', classNames?.controls])}>
      {settings?.export && (
        <div className="ctrl-export">
          <ExportButton
            filename={settings?.export?.filename || 'table-data'}
            data={data}
            columns={state.reorderedColumns}
            className={classNames?.exportButton}
            label={settings?.export?.label}
            type={settings?.export?.output}
          />
        </div>
      )}
      {settings?.search && (
        <div className="ctrl-search">
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
        </div>
      )}
      {toolbar && <div className="ctrl-toolbar">{toolbar}</div>}
      {total && (
        <div className="ctrl-total">
          <div className={cn(['mkui-table-total', classNames?.total])}>
            {total}
          </div>
        </div>
      )}
    </div>
  )
}
