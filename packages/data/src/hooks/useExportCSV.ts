import { useCallback } from 'react'
import { ColumnConfig } from '../components/SmartTable'

export const useExportCSV = <T>(
  filename: string,
  data: T[],
  columns: ColumnConfig<T>[]
) => {
  const convertToCSV = useCallback(() => {
    const filteredColumns = columns.filter((column) =>
      ['string', 'number', 'date'].includes(column.dataType)
    )

    const headers = filteredColumns.map((column) => column.title).join(',')
    const rows = data
      .map((row) =>
        filteredColumns
          .map((column) => JSON.stringify(row[column.key]))
          .join(',')
      )
      .join('\n')

    return headers + '\n' + rows
  }, [data, columns])

  const downloadCSV = useCallback(
    (csv: string) => {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.href = url
      link.download = filename

      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)
    },
    [filename]
  )

  const exportToCSV = useCallback(() => {
    const csv = convertToCSV()
    downloadCSV(csv)
  }, [convertToCSV, downloadCSV])

  return exportToCSV
}
