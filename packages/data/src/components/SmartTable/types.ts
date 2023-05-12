export type SortDirection = 'asc' | 'desc'

export interface ColumnConfig<T> {
  /** The key for the data property that corresponds to the column.*/
  key: keyof T
  /** The display text for the column header. */
  title: string
  /**  The data type of the column. Used for rendering and sorting.*/
  dataType: 'string' | 'number' | 'date' | 'delete' | 'custom'
  /** Indicates whether the column can be sorted. */
  sortable?: boolean
  /** Indicates whether the column can be filtered.*/
  filterable?: boolean
  /** The width of the column. */
  width?: string | number
  /** Indicates whether the column is hidden.*/
  hidden?: boolean
  /** Optional custom rendering function for the cell content. */
  render?: (item: T, key: keyof T) => React.ReactNode
  /** Configuration for the delete button in the 'delete' type column. */
  deleteButton?: DeleteButtonConfig
}

export interface FetchDataParams<T> {
  /** The current page number.*/
  page: number
  /** The number of items per page. */
  itemsPerPage: number
  /** The key of the column used for sorting. */
  sortColumn?: keyof T | null
  /** The sort direction ('asc' or 'desc'). */
  sortDirection?: SortDirection
  /** An array of keys for columns that are searchable. */
  searchColumns?: (keyof T)[]
  /** The search query string. */
  searchQuery?: string
}

interface TableStyles {
  /** Indicates whether the table header should be sticky. */
  stickyHeader?: boolean
  /** The top position for the sticky header. */
  stickyHeaderTop?: string | number
  /** Padding for table cells. */
  cellPadding?: string
  /** Color of the table header text. */
  headerColor?: string
  /** Background color of the table header. */
  headerBackground?: string
  /** Font size for the table. */
  fontSize?: string
  /** Border color for the table and its cells. */
  borderColor?: string
  /** Background color for alternating rows.*/
  alternateRowBackground?: string
}

interface DeleteButtonConfig {
  /** Display text for the delete button.*/
  text?: string
  /** An optional icon to display in the delete button.*/
  icon?: React.ReactNode
  /** A custom class name for the delete button. */
  className?: string
  /** Custom styles for the delete button. */
  styles?: React.CSSProperties
}

export interface SmartTableProps<T> {
  /** The data array to be displayed in the table.*/
  data?: T[]
  /** An array of column configurations for the table.*/
  columns: ColumnConfig<T>[]
  /** Indicates whether pagination should be enabled.*/
  pagination?: boolean
  /** The number of items to display per page when pagination is enabled. */
  itemsPerPage?: number
  /** Indicates whether the table should include a search input. */
  search?: boolean
  /** The total number of data items, used for server-side pagination. */
  totalCount?: number
  /** Indicates whether columns can be reordered by dragging.*/
  reorder?: boolean
  /** Indicates whether rows can be selected. */
  selectable?: boolean
  /** Indicates whether the table should include an "Export to CSV" button.*/
  exportToCSV?: boolean
  /** A function to fetch data when using server-side pagination, filtering, or sorting. */
  fetchData?: (params: FetchDataParams<T>) => Promise<T[]>
  /** A function called when a delete button is clicked in a 'delete' type column. */
  onDelete?: (item: T) => Promise<T> | void
  /** A function called when a row is clicked. */
  onRowClick?: (item: T) => void
  /** A function called when rows are selected or deselected. */
  onRowSelect?: (
    selectedRows: Set<string | number>,
    clearSelection?: () => void
  ) => void
  /** A custom loading indicator to display when the table is loading data. */
  loadingIndicator?: React.ReactNode
  /** Custom styles for various table elements. */
  styles?: TableStyles
  /** A function to add a custom class to each row based on the item data. */
  rowClass?: (item: T) => string
}
