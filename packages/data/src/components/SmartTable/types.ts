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

export interface TableStyles {
  /** Indicates whether the table header should be sticky. */
  stickyHeader?: boolean
  /** The top position for the sticky header. */
  stickyHeaderTop?: string | number
  /** Padding of the table header cells. */
  headerPadding?: string | number
  /** Color of the table header text. */
  headerColor?: string
  /** Background color of the table header. */
  headerBackground?: string
  /** Font family for the table header. */
  headerFontFamily?: string
  /** Font size for the table header. */
  headerFontSize?: string | number
  /** Height of the SVG caret / arrow icon */
  headerIconHeight?: string | number
  /** Padding for table cells. */
  cellPadding?: string | number
  /** Font size for the table. */
  fontSize?: string | number
  /** Font family for the table cells. */
  fontFamily?: string
  /** Border color for the table and its cells. */
  borderColor?: string
  /** Background color for alternating rows.*/
  altRowBackground?: string
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

export interface TableSettings {
  /** Indicates whether the table should include a search input. */
  search?: boolean
  /** Indicates whether rows can be selected. */
  selectable?: boolean
  /** Indicates whether columns can be reordered by dragging.*/
  reorder?: boolean
  /** Indicates whether the table should include an "Export to CSV" button.*/
  exportToCSV?: boolean
  /** Indicates whether pagination should be enabled.*/
  pagination?: boolean
  /** The number of items to display per page when pagination is enabled. */
  itemsPerPage?: number
  /** A custom loading indicator to display when the table is loading data. */
  loadingIndicator?: React.ReactNode
  /** A custom arrow indicator that will be used to show column sort direction. */
  caretIcon?: React.ReactNode
  /** Allows you to show the total result count */
  total?: boolean
}

export interface SmartTableProps<T> {
  /** The data array to be displayed in the table.*/
  data?: T[]
  /** An array of column configurations for the table.*/
  columns: ColumnConfig<T>[]
  /** The total number of data items, used for server-side pagination. */
  totalCount?: number
  /** Custom styles for various table elements. */
  styles?: TableStyles
  settings?: TableSettings
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
  /** A function to add a custom class to each row based on the item data. */
  rowClass?: (item: T) => string
}
