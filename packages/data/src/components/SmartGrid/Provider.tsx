import React, { useReducer, createContext, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { Action, FilterConfig, SmartGridState, LayoutType } from './types'

/**
 * FetchDataResponse interface specifies the structure of the response expected from a fetchData request.
 */
interface FetchDataResponse<T extends object> {
  /** An array of data items. Each item is an object of generic type T. */
  data: T[]
  /** The total number of pages of data available. */
  totalPages: number
}

interface SmartGridProviderProps<T extends object> {
  /** An optional initial dataset to be provided to the component. */
  data?: T[]
  /** The child components that the FilterProvider will wrap. */
  children: React.ReactNode
  /** An array of FilterConfig objects, each representing a filter's configuration. */
  filters: FilterConfig<T>[]
  /**  The initial layout of the data. Default is `grid`. Can be
   * - grid
   * - row
   */
  initialLayout?: LayoutType
  /** The number of items to be displayed per page. Default is `100`. */
  itemsPerPage?: number
  /**
   * An optional function that fetches data. This function is expected to return a Promise that resolves with an object matching the FetchDataResponse interface.
   * This function will be passed two arguments:
   *   - page: The current page number.
   *   - itemsPerPage: The number of items to be fetched per page.
   */
  fetchData?: (
    page: number,
    itemsPerPage: number
  ) => Promise<FetchDataResponse<T>>
  /**
   * An optional configuration object for the search functionality.
   * The object can contain the following properties:
   *   - keys: An array of string keys that should be searched.
   *   - limit: The maximum number of search results to return.
   *   - fuseOptions: An object of options to be passed to the Fuse.js library for fuzzy searching.
   */
  searchSettings?: {
    keys?: string[]
    limit?: number
    fuseOptions?: Fuse.IFuseOptions<T>
  }
}

export const SmartGridContext = createContext<{
  state: SmartGridState<any>
  dispatch: React.Dispatch<any>
} | null>(null)

function filterSortReducer<T extends object>(
  state: SmartGridState<T>,
  action: Action<T>
): SmartGridState<T> {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.value }
    case 'ADD_SEARCH_FILTER':
      return { ...state, searchResults: action.value }
    case 'REMOVE_SEARCH_FILTER':
      return { ...state, searchResults: [], searchQuery: '' }
    case 'SET_FILTER':
      const { key, value } = action.value
      const activeFilters = { ...state.activeFilters }

      if (Array.isArray(activeFilters[key])) {
        const index = (activeFilters[key] as Array<any>).indexOf(value)

        if (index > -1) {
          // Value is in filter array. Remove it.
          activeFilters[key] = [
            ...(activeFilters[key] as Array<any>).slice(0, index),
            ...(activeFilters[key] as Array<any>).slice(index + 1),
          ]
        } else {
          // Value is not in filter array. Add it.
          activeFilters[key] = [...(activeFilters[key] as Array<any>), value]
        }
      } else if (activeFilters[key] === value) {
        // Filter already exists. Remove it.
        delete activeFilters[key]
      } else {
        // Filter does not exist. Add it.
        activeFilters[key] = value
      }

      return {
        ...state,
        activeFilters,
      }
    case 'REMOVE_FILTER':
      const newFilters = { ...state.activeFilters }
      if (newFilters[action.value]) {
        delete newFilters[action.value]
      }
      return { ...state, activeFilters: newFilters }
    case 'SET_PANEL':
      return { ...state, panelActive: action.value }
    case 'SET_SORT':
      return { ...state, activeSort: action.value }
    case 'UPDATE_DATA':
      return { ...state, data: action.value }
    case 'UPDATE_FILTER_CONFIG':
      return { ...state, filters: action.value }
    case 'RESET_FILTERS':
      return { ...state, activeFilters: {} }
    case 'RESET_ALL':
      return { ...state, activeFilters: {}, searchResults: [], searchQuery: '' }
    case 'SET_LOADING':
      return { ...state, isLoading: action.value }
    case 'SET_LAYOUT':
      return { ...state, layout: action.value }
    case 'SET_PAGE':
      return { ...state, currentPage: action.value }
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.value }
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.value }
    default:
      return state
  }
}

export function SmartGridProvider<T extends object>({
  data = [],
  children,
  filters = [],
  initialLayout = 'grid',
  itemsPerPage = 100,
  fetchData,
  searchSettings = {},
}: SmartGridProviderProps<T>) {
  const initialState: SmartGridState<T> = {
    data,
    searchResults: [],
    filters,
    activeFilters: {},
    activeSort: filters.find((filter) => filter.defaultActive) || null,
    searchQuery: '',
    layout: initialLayout,
    isLoading: false,
    panelActive: false,
    currentPage: 1,
    itemsPerPage,
    totalPages: 1,
  }
  const [state, dispatch] = useReducer(filterSortReducer<T>, initialState)

  const fuse = useMemo(() => {
    return new Fuse(state.data, {
      ...(searchSettings?.fuseOptions || {}),
      keys: searchSettings?.keys || [],
    })
  }, [state.data, searchSettings])

  // Handle search filter when searchQuery changes
  useEffect(() => {
    if (searchSettings && state.searchQuery && state.searchQuery !== '') {
      const results = fuse
        .search(state.searchQuery)
        .map((result) => result.item)
      dispatch({
        type: 'ADD_SEARCH_FILTER',
        value: results,
      })
    } else {
      dispatch({ type: 'REMOVE_SEARCH_FILTER' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery])

  // fetchData is provided, we're fetching data from a remote source
  useEffect(() => {
    if (fetchData) {
      fetchData(state.currentPage, state.itemsPerPage)
        .then((response) => {
          dispatch({ type: 'UPDATE_DATA', value: response.data })
          dispatch({ type: 'SET_TOTAL_PAGES', value: response.totalPages })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [fetchData, state.currentPage, state.itemsPerPage])

  // data prop is provided, we're using local data
  useEffect(() => {
    if (data && !fetchData) {
      dispatch({ type: 'UPDATE_DATA', value: data })
      // Set total pages based on data length and itemsPerPage
      const totalPages = Math.ceil(data.length / state.itemsPerPage)
      dispatch({ type: 'SET_TOTAL_PAGES', value: totalPages })
    }
  }, [data, fetchData, state.itemsPerPage])

  // Run filter configuration validations whenever filters change
  useEffect(() => {
    // Key validation
    if (data.length) {
      filters?.forEach((filterConfig) => {
        const target = (filterConfig?.key || filterConfig.name) as string
        if (!Object.keys(data[0]).includes(target)) {
          throw new Error(`Invalid key '${target}' in filter configuration.`)
        }
      })
    }

    // Function validation
    filters?.forEach((filterConfig) => {
      if (
        filterConfig.filterFunction &&
        typeof filterConfig.filterFunction !== 'function'
      ) {
        throw new Error(
          `'filterFunction' for filter '${
            filterConfig.name as string
          }' must be a function.`
        )
      }
      if (
        filterConfig.sortFunction &&
        typeof filterConfig.sortFunction !== 'function'
      ) {
        throw new Error(
          `'sortFunction' for sort '${
            filterConfig.name as string
          }' must be a function.`
        )
      }
    })
  }, [filters, data])

  return (
    <SmartGridContext.Provider value={{ state, dispatch }}>
      {children}
    </SmartGridContext.Provider>
  )
}
