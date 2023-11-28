import type { SmartTableState, TableAction } from './types'

export function smartTableReducer<T>(
  state: SmartTableState<T>,
  action: TableAction<T>
): SmartTableState<T> {
  switch (action.type) {
    case 'SET_SELECTED_ROWS':
      return { ...state, selectedRows: action.value }
    case 'SET_LOADING':
      return { ...state, loading: action.value }
    case 'SET_LOCAL_DATA':
      return { ...state, localData: action.value }
    case 'SET_LOCAL_TOTAL_COUNT':
      return { ...state, localTotalCount: action.value }
    case 'SET_PAGE':
      return { ...state, page: action.value }
    case 'SET_REORDERED_COLUMNS':
      return { ...state, reorderedColumns: action.value }
    case 'SET_DRAGGED_COLUMN':
      return { ...state, draggedColumn: action.value }
    case 'SET_SORT_COLUMN':
      return { ...state, sortColumn: action.value }
    case 'SET_SORT_DIRECTION':
      return { ...state, sortDirection: action.value }
    case 'SET_SEARCH_COLUMNS':
      return { ...state, searchColumns: action.value }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.value }
    default:
      throw new Error('Unsupported action type')
  }
}
