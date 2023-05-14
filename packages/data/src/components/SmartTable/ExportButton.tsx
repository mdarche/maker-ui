import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useExport } from '@/hooks'
import { ColumnConfig } from './types'

interface ExportButtonProps<T> extends React.HTMLAttributes<HTMLButtonElement> {
  filename: string
  type?: 'csv' | 'json'
  data: T[]
  columns: ColumnConfig<T>[]
  label?: string | React.ReactElement
}

export const ExportButton = <T,>({
  className,
  label = 'Export',
  type,
  filename,
  data,
  columns,
  ...props
}: ExportButtonProps<T>) => {
  const exportData = useExport(filename, data, columns, type)

  return (
    <button
      className={cn(['mkui-btn-export', className])}
      onClick={exportData}
      {...props}>
      {label}
    </button>
  )
}
