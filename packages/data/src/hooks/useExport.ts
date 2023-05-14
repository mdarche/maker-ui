import { useCallback } from 'react'
import { ColumnConfig } from '../components/SmartTable'

type ExportType = 'csv' | 'json'

export const useExport = <T>(
  filename: string,
  data: T[],
  columns: ColumnConfig<T>[],
  type: ExportType = 'csv'
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

  const convertToJSON = useCallback(() => {
    return JSON.stringify(data, null, 2)
  }, [data])

  const downloadData = useCallback(
    (data: string, mimeType: string) => {
      const blob = new Blob([data], { type: mimeType })

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

  const exportData = useCallback(() => {
    let dataToExport: string
    let mimeType: string

    switch (type) {
      case 'csv':
        dataToExport = convertToCSV()
        mimeType = 'text/csv;charset=utf-8;'
        break
      case 'json':
        dataToExport = convertToJSON()
        mimeType = 'application/json;charset=utf-8;'
        break
    }

    downloadData(dataToExport, mimeType)
  }, [type, convertToCSV, convertToJSON, downloadData])

  return exportData
}
