import { useContext, useMemo } from 'react'
import {
  type Action,
  type SmartGridState,
  type LayoutType,
  SmartGridContext,
} from '../components/SmartGrid'

export function useSmartGrid<T extends object = any>() {
  const context = useContext<{
    state: SmartGridState<T>
    dispatch: React.Dispatch<Action<T>>
  } | null>(SmartGridContext)
  if (context === null) {
    throw new Error('useSmartGrid must be used within a SmartGridProvider')
  }
  const { state, dispatch } = context

  const filteredSortedData = useMemo(() => {
    // If no filters or sorts are active, return the data as is
    if (Object.keys(state.activeFilters).length === 0 && !state.activeSort) {
      return state.searchResults.length > 0 ? state.searchResults : state.data
    }

    let dataToFilter =
      state.searchResults.length > 0 ? state.searchResults : state.data

    try {
      // Apply filters
      for (let key in state.activeFilters) {
        const filterConfig = state.filters.find((filter) => filter.name === key)
        if (!filterConfig) continue

        let filterFunction = filterConfig.filterFunction
        const filterValue = state.activeFilters[key]
        const filterTarget = (filterConfig?.key || filterConfig.name) as string

        if (!filterFunction) {
          if (Array.isArray(filterValue)) {
            const filterValueTyped = filterValue as Array<string | number>
            if (typeof filterValueTyped[0] === 'string') {
              filterFunction = (item) =>
                filterValueTyped.includes(String(item[filterTarget as keyof T]))
            } else if (typeof filterValueTyped[0] === 'number') {
              filterFunction = (item) =>
                filterValueTyped.includes(Number(item[filterTarget as keyof T]))
            }
          } else {
            filterFunction = (item) =>
              filterValue === item[filterTarget as keyof T]
          }
        }
        dataToFilter = dataToFilter.filter((i) =>
          filterFunction!(i, filterValue)
        )
      }

      // Apply sort
      if (state.activeSort) {
        const { key, direction, sortFunction } = state.activeSort

        dataToFilter = [...dataToFilter].sort((a, b) => {
          if (sortFunction) {
            return sortFunction(a, b)
          }

          let aValue = a[key as keyof T]
          let bValue = b[key as keyof T]
          let aValueDate: Date | null = null
          let bValueDate: Date | null = null

          // Check if values are date strings and convert to Date objects for comparison
          if (
            typeof aValue === 'string' &&
            typeof bValue === 'string' &&
            !isNaN(Date.parse(aValue)) &&
            !isNaN(Date.parse(bValue))
          ) {
            aValueDate = new Date(aValue)
            bValueDate = new Date(bValue)
          }

          // Use date values for comparison if available
          const aCompare = aValueDate || aValue
          const bCompare = bValueDate || bValue

          if (direction === 'asc') {
            if (aCompare < bCompare) return -1
            if (aCompare > bCompare) return 1
            return 0
          } else {
            if (aCompare < bCompare) return 1
            if (aCompare > bCompare) return -1
            return 0
          }
        })
      }

      return dataToFilter
    } catch (error) {
      console.error('Error filtering or sorting data:', error)
      return dataToFilter // Return the data unfiltered/sorted in case of error
    }
  }, [
    state.data,
    state.activeFilters,
    state.filters,
    state.activeSort,
    state.searchResults,
  ])

  function setSearchQuery(value: string) {
    dispatch({ type: 'SET_SEARCH_QUERY', value })
  }

  function resetSearchQuery() {
    dispatch({ type: 'REMOVE_SEARCH_FILTER' })
  }

  function setLayout(value: LayoutType) {
    if (value !== state.layout) {
      dispatch({ type: 'SET_LAYOUT', value })
    }
  }

  function setPanelActive(value?: boolean) {
    if (value !== undefined) {
      dispatch({ type: 'SET_PANEL', value })
    } else {
      dispatch({ type: 'SET_PANEL', value: !state.panelActive })
    }
  }

  function setSort(value: string) {
    const sortConfig = state.filters.find((filter) => filter.name === value)
    if (sortConfig) {
      dispatch({ type: 'SET_SORT', value: sortConfig })
    }
  }

  function setFilter(key: string, value: any) {
    dispatch({ type: 'SET_FILTER', value: { key, value } })
  }

  function setAndRemoveFilters(key: string, value: any, remove: string[] = []) {
    remove.forEach((filter) => {
      dispatch({ type: 'REMOVE_FILTER', value: filter })
    })
    dispatch({ type: 'SET_FILTER', value: { key, value } })
  }

  function resetFilters() {
    dispatch({ type: 'RESET_FILTERS' })
  }

  function resetAll() {
    dispatch({ type: 'RESET_ALL' })
  }

  function setPage(value: number) {
    dispatch({ type: 'SET_CURRENT_PAGE', value })
  }

  function setItemsPerPage(value: number) {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', value })
  }

  return {
    // Data
    data: filteredSortedData,
    originalData: state.data,
    originalCount: state.data.length || 0,
    isLoading: state.isLoading,
    // Filters / Sorting
    filters: state.filters,
    activeFilters: state.activeFilters,
    activeSort: state.activeSort,
    setSort,
    setFilter,
    setAndRemoveFilters,
    resetFilters,
    resetAll,
    // Search
    searchQuery: state.searchQuery,
    setSearchQuery,
    resetSearchQuery,
    // Layout
    layout: state.layout,
    setLayout,
    // Filer Panel (optional if collapsible)
    panelActive: state.panelActive,
    setPanelActive,
    // Pagination
    page: state.currentPage,
    totalPages: state.totalPages,
    itemsPerPage: state.itemsPerPage,
    setPage,
    setItemsPerPage,
  }
}
