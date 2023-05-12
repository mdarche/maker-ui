/**
 * Filters interface is used to specify active filters on the data.
 * Each filter is defined by a name (string key) and its corresponding value.
 * Value type depends on the type of filter applied.
 */
export interface Filters {
  [name: string]:
    | boolean
    | string[]
    | number[]
    | number
    | { min: number; max: number }
}

/**
 * LayoutType is a type definition for layout settings of the grid.
 * It can be either `row` or `grid`.
 */
export type LayoutType = 'row' | 'grid'

export interface FilterConfig<T extends object> {
  /** Name of the filter, should be lowercase and snake_case. */
  name: string
  /** The type of operation, either `sort` or `filter`. */
  type: 'sort' | 'filter'
  /** Optional key to apply the filter if different from `name`.
   * Required for sort operations. */
  key?: keyof T
  /**  Direction of the sort operation, either 'asc' or 'desc'.
   * Only applicable for sort operations. */
  direction?: 'asc' | 'desc'
  /** Custom sort function for complex sort operations.
   * Only applicable for sort operations. */
  sortFunction?: (a: T, b: T) => number
  /** Custom filter function for complex filter operations.
   * Only applicable for filter operations. */
  filterFunction?: (item: T, filterValue: any) => boolean
  /** Label to display for the filter/sort operation in the UI. */
  label?: string | React.ReactElement
  /** Optional flag to set the filter/sort operation as active by default. */
  defaultActive?: boolean
}

export interface FilterSortState<T extends object> {
  /** The original data. */
  data: T[]
  /** The result of a search operation on the data. */
  searchResults: T[]
  /** Array of all filter configurations. */
  filters: FilterConfig<T>[]
  /** Object of all active filters. */
  activeFilters: Filters
  /** The active sort configuration. */
  activeSort: FilterConfig<T> | null
  /** The current search query. */
  searchQuery?: string
  /** The current layout setting. */
  layout?: LayoutType
  /** Flag to indicate if data is currently loading. */
  isLoading?: boolean
  /** Flag to indicate if the filter panel is currently active. */
  panelActive?: boolean
  /** The current page in the pagination setting. */
  currentPage: number
  /** The total number of pages in the pagination setting. */
  totalPages: number
  /** The number of items to display per page in the pagination setting. */
  itemsPerPage: number
}

export type Action<T extends object> =
  | { type: 'ADD_SEARCH_FILTER'; value: T[] }
  | { type: 'SET_SEARCH_QUERY'; value: string }
  | { type: 'REMOVE_SEARCH_FILTER' }
  | { type: 'SET_FILTER'; value: { key: string; value: any } }
  | { type: 'REMOVE_FILTER'; value: string }
  | { type: 'SET_PANEL'; value: boolean }
  | { type: 'SET_SORT'; value: FilterConfig<T> }
  | { type: 'UPDATE_DATA'; value: T[] }
  | { type: 'UPDATE_FILTER_CONFIG'; value: FilterConfig<T>[] }
  | { type: 'RESET_FILTERS' }
  | { type: 'RESET_ALL' }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_LAYOUT'; value: LayoutType }
  | { type: 'SET_CURRENT_PAGE'; value: number }
  | { type: 'SET_ITEMS_PER_PAGE'; value: number }
  | { type: 'SET_LOADING_PAGE'; value: boolean }
  | { type: 'SET_TOTAL_PAGES'; value: number }
