import { ColumnConfig } from './types'

type TableSearchProps<T> = {
  columns: ColumnConfig<T>[]
  searchColumns: (keyof T)[]
  setSearchColumns: (columns: (keyof T)[]) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const TableSearch = <T,>({
  columns,
  searchColumns,
  setSearchColumns,
  searchQuery,
  setSearchQuery,
}: TableSearchProps<T>) => {
  return (
    <div>
      <label htmlFor="search-column">Search column:</label>
      <select
        id="search-column"
        value={
          searchColumns && searchColumns.length === 1
            ? searchColumns[0].toString()
            : ''
        }
        onChange={(e) => {
          const value = e.target.value as keyof T
          setSearchColumns(
            searchColumns.includes(value)
              ? searchColumns.filter((columnKey) => columnKey !== value)
              : [...searchColumns, value]
          )
        }}>
        <option value="">Select a column</option>
        {columns
          .filter((column) => column.filterable)
          .map((column) => (
            <option key={column.key.toString()} value={column.key.toString()}>
              {column.title}
            </option>
          ))}
      </select>
      <label htmlFor="search-query">Search:</label>
      <input
        id="search-query"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
