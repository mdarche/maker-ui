import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { TableSettings } from './types'

interface TableControlsProps<T> {
  toolbar?: React.ReactNode
  total?: number
  settings: TableSettings<T>
}

export const TableControls = <T,>({ toolbar }: TableControlsProps<T>) => {
  return <div className={cn([])}></div>
}
