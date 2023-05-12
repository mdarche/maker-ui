import * as React from 'react'
import { useExportCSV } from '@/hooks'
import { ColumnConfig } from './types'

interface ExportButtonProps<T> extends React.HTMLAttributes<HTMLButtonElement> {
  filename: string
  data: T[]
  columns: ColumnConfig<T>[]
}

export const ExportButton = <T,>({
  filename,
  data,
  columns,
  ...props
}: ExportButtonProps<T>) => {
  const exportToCSV = useExportCSV(filename, data, columns)

  return (
    <button onClick={exportToCSV} {...props}>
      Export to CSV
    </button>
  )
}
