import { PaginationType } from '../Pagination'

export type SortDirection = 'asc' | 'desc'

export type SmartTableState<T> = {
  selectedRows: Set<string | number>
  loading: boolean
  localData: T[]
  localTotalCount: number
  page: number
  reorderedColumns: ColumnConfig<T>[]
  draggedColumn: keyof T | null
  sortColumn: keyof T | null
  sortDirection: SortDirection
  searchColumns: (keyof T)[]
  searchQuery: string
}

export type TableAction<T> =
  | { type: 'SET_SELECTED_ROWS'; value: Set<string | number> }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_LOCAL_DATA'; value: T[] }
  | { type: 'SET_LOCAL_TOTAL_COUNT'; value: number }
  | { type: 'SET_PAGE'; value: number }
  | { type: 'SET_REORDERED_COLUMNS'; value: ColumnConfig<T>[] }
  | { type: 'SET_DRAGGED_COLUMN'; value: keyof T | null }
  | { type: 'SET_SORT_COLUMN'; value: keyof T | null }
  | { type: 'SET_SORT_DIRECTION'; value: SortDirection }
  | { type: 'SET_SEARCH_COLUMNS'; value: (keyof T)[] }
  | { type: 'SET_SEARCH_QUERY'; value: string }

export interface ColumnConfig<T> {
  /** The key for the data property that corresponds to the column.*/
  key: keyof T
  /** The display text for the column header. */
  title: string
  /**  The data type of the column. Used for rendering and sorting.*/
  dataType: 'string' | 'number' | 'date' | 'delete' | 'custom'
  /** Indicates whether the column can be sorted by clicking the table header. */
  sortable?: boolean
  /** Indicates whether the column can be filtered via search.*/
  filterable?: boolean
  /** The width of the column. */
  width?: string | number
  /** Indicates whether the column is hidden.*/
  hidden?: boolean
  /** Optional custom rendering function for the cell content. */
  render?: (item: T, key: keyof T) => React.ReactNode
  /** Configuration for the delete button in the `delete` type column. */
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

export interface SearchStyles {
  input: {
    /** The margin for the search input. */
    margin?: string | number
    /** The font size for the search input. */
    fontSize?: string | number
    /** The font family for the search input. */
    fontFamily?: string
    /** The background color for the search input. */
    bg?: string
    /** The color for the search input. */
    color?: string
    /** The border for the search input. */
    border?: string
    /** The border radius for the search input. */
    borderRadius?: string | number
    /** The height of the search input. */
    height?: string | number
    /** The minimum width of the search input. */
    minWidth?: string | number
  }
  icon: {
    fill: string
    height: string | number
  }
  clear: {
    fill: string
    height: string | number
    padding: string | number
    bg: string
    borderRadius: string | number
    border: string
  }
}

export interface PaginationStyles {
  /** The margin for the pagination button group. */
  margin: string | number
  /** The font size for the pagination buttons. */
  fontSize?: string | number
  /** The font family for the pagination buttons. */
  fontFamily?: string
  /** The background color for the pagination buttons. */
  bg?: string
  /** The background color for the active pagination button (if applicable). */
  bgActive?: string
  /** The color for the pagination buttons. */
  color?: string
  /** The color for the active pagination button (if applicable). */
  colorActive?: string
  /** The fill for pagination button icons. */
  iconFill?: string
  /** The height for pagination button icons. */
  iconHeight?: string | number
  /** The border for the pagination buttons. */
  border?: string
  /** The border for the active pagination button (if applicable). */
  borderActive?: string
  /** The border radius for the pagination buttons. */
  borderRadius?: string | number
  /** The padding for the pagination buttons. */
  padding?: string | number
  /** The margin-right (gap) value for all pagination buttons. */
  gap?: string | number
}

export interface TableStyles {
  table: {
    /** Background color for the table. */
    bg?: string
    /** Border color for the table and its cells. */
    borderColor?: string
    /** Font size for the table. */
    fontSize?: string | number
    /** Font family for the table cells. */
    fontFamily?: string
  }
  header: {
    /** Indicates whether the table header should be sticky. */
    sticky?: boolean
    /** The top position for the sticky header. */
    top?: string | number
    /** Padding of the table header cells. */
    padding?: string | number
    /** Color of the table header text. */
    color?: string
    /** Background color of the table header. */
    bg?: string
    /** Font family for the table header. */
    fontFamily?: string
    /** Font size for the table header. */
    fontSize?: string | number
    /** Height of the SVG caret / arrow icon */
    iconHeight?: string | number
    /** Width of the SVG caret / arrow icon */
    iconWidth?: string | number
    /** Color of the SVG caret / arrow icon */
    iconFill?: string
  }
  cell: {
    /** Padding for table cells. */
    padding?: string | number
  }
  row: {
    /** Background color for alternating rows.*/
    bgAlt?: string
    /** Background color for rows when hovered. */
    bgHover?: string
  }
  export: {
    /** Background color for the export button. */
    bg?: string
    /** Color for the export button text. */
    color?: string
    /** Font family for the export button. */
    fontFamily?: string
    /** Font size for the export button. */
    fontSize?: string | number
    /** Padding for the export button. */
    padding?: string | number
    /** Border radius for the export button. */
    borderRadius?: string | number
    /** Border for the export button. */
    border?: string
  }
  pagination: PaginationStyles
  search: SearchStyles
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

export interface TableSettings<T> {
  /** Indicates whether the table should include a search input. */
  search?: {
    // Default search column keys (Required for search)
    columns: (keyof T)[]
    showOptions?: boolean
    // All possible search columns (for showOptions)
    options?: { label: string; value: keyof T }[]
    placeholder?: string
    optionsLabel?: string | React.ReactElement
    clearLabel?: string | React.ReactElement
    onSearch?: (query: string) => void
    onReset?: () => void
    classNames?: {
      root?: string
      input?: string
      clear?: string
    }
  }
  /** Indicates whether rows can be selected. */
  selectable?: boolean
  /** Indicates whether columns can be reordered by dragging.*/
  reorder?: boolean
  /** Indicates whether the table should include an "Export to CSV" button.*/
  export?: {
    output?: 'csv' | 'json'
    filename?: string
    label?: string | React.ReactElement
    onExport?: (data: T[]) => void
  }
  /** Indicates whether pagination should be enabled.*/
  pagination?: boolean | PaginationType
  /** The number of items to display per page when pagination is enabled. */
  itemsPerPage?: number
  /** A custom loading indicator to display when the table is loading data. */
  loadingIndicator?: React.ReactNode
  /** A custom arrow indicator that will be used to show column sort direction. */
  caretIcon?: React.ReactNode
  /** Customize the order of the table controls UI.
   * @options
   * - 'search'
   * - 'total'
   * - 'custom'
   * - 'export'
   */
  controls?: ('search' | 'export' | 'total' | 'custom')[]
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
  settings?: TableSettings<T>
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
  classNames?: {
    root?: string
    table?: string
    tableWrapper?: string
    tableRow?: string
    tableCell?: string
    tableHeader?: string
    tableSelect?: string
    pagination?: string
    loadScreen?: string
    sortIcon?: string
    total?: string
    exportButton?: string
    deleteButton?: string
    controls?: string
  }
  toolbar?: React.ReactNode
}
