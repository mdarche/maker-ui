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
  const o = settings?.controls || ['search', 'total']

  const items: Record<
    'search' | 'export' | 'custom' | 'total',
    React.ReactNode
  > = {
    search: (
      <Search
        className="mkui-table-search"
        style={{ order: o.indexOf('search') }}
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
    ),
    export: (
      <div className="mkui-table-export" style={{ order: o.indexOf('export') }}>
        <ExportButton
          filename={settings?.export?.filename || 'table-data'}
          data={data}
          columns={state.reorderedColumns}
          className={cn(['mkui-table-btn-export', classNames?.exportButton])}
          label={settings?.export?.label}
          type={settings?.export?.output}
        />
      </div>
    ),
    custom: (
      <div
        className="mkui-table-toolbar"
        style={{ order: o.indexOf('custom') }}>
        {toolbar}
      </div>
    ),
    total: (
      <div className="mkui-table-total" style={{ order: o.indexOf('total') }}>
        <div className={cn(['mkui-table-total', classNames?.total])}>
          {total}
        </div>
      </div>
    ),
  }

  return (
    <div
      className={cn([
        'mkui-table-controls flex align-center',
        classNames?.controls,
      ])}>
      {o?.map((i, index) => (
        <React.Fragment key={index}>{items[i]}</React.Fragment>
      ))}
    </div>
  )
}
