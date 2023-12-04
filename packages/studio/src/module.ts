import { ModuleStyle, ModuleProps } from '@/types'

export type ModuleAction =
  | {
      type: 'SET_SETTING'
      payload: {
        property: string
        value: any
      }
    }
  | {
      type: 'SET_STYLE'
      payload: {
        property: string
        value: any
      }
    }
  | { type: 'SET_BACKGROUND'; payload: ModuleStyle['background'] }
  | { type: 'SET_VISIBILITY'; payload: boolean }
  | { type: 'SET_ORDER'; payload: number }
  | { type: 'SET_PARENT'; payload: string }
  | { type: 'SET_COLUMNS'; payload: number }
  | { type: 'SET_DATA'; payload: { [key: string]: any } }
  // Local context only
  | { type: 'SET_ACTIVE_DRAG'; payload: boolean }
  | { type: 'SET_COLLAPSE'; payload: boolean }

export interface ModuleState extends ModuleProps {
  currentBreakpoint: string
  bp: number // Index of current breakpoint for simplified access
  collapse: boolean
  activeDrag: boolean
  columns: number
}

export function moduleReducer(
  state: ModuleState,
  action: ModuleAction
): ModuleState {
  const isStyle =
    action.type === 'SET_STYLE' ||
    action.type === 'SET_BACKGROUND' ||
    action.type === 'SET_COLUMNS'
  // Get the current UI's breakpoint index
  const styleIndex = isStyle
    ? state.styles.findIndex(
        (style) => style.breakpoint === state.currentBreakpoint
      )
    : 0
  const styles = isStyle ? [...state.styles] : []

  switch (action.type) {
    case 'SET_ACTIVE_DRAG':
      return { ...state, activeDrag: action.payload }
    case 'SET_COLLAPSE':
      return { ...state, collapse: action.payload }
    case 'SET_PARENT':
      return { ...state, parentId: action.payload }
    case 'SET_ORDER':
      return { ...state, order: action.payload }
    case 'SET_VISIBILITY':
      return { ...state, visible: !state.visible }
    case 'SET_DATA':
      return { ...state, data: action.payload }
    case 'SET_SETTING':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.property]: action.payload.value,
        },
      }
    case 'SET_STYLE':
      if (styleIndex === -1) return state

      styles[styleIndex] = {
        ...styles[styleIndex],
        [action.payload.property]: action.payload.value,
      }

      return { ...state, styles }
    case 'SET_BACKGROUND':
      if (styleIndex === -1) return state

      styles[styleIndex] = {
        ...styles[styleIndex],
        background: action.payload,
      }

      return { ...state, styles }
    case 'SET_COLUMNS':
      styles[styleIndex] = {
        ...styles[styleIndex],
        gridTemplateColumns: [...Array(action.payload)]
          .map((i) => '1fr')
          .join(' '),
      }
      return {
        ...state,
        columns: action.payload,
        styles,
      }
    default:
      return state
  }
}
