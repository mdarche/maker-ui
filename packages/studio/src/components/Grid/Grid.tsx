import React, { useEffect, useReducer, useRef } from 'react'
import { cn } from '@maker-ui/utils'
import { GridMenu } from '../GridMenu'
import { ExpandIcon } from '../Icons'
import { GapControl } from '../GapControl'
import { ResizeHandle } from '../ResizeHandle'
import { GridCell } from '../GridCell'

interface GridProps {
  resizeMode?: 'px' | '%' | 'fr'
}

export type GridAction =
  | { type: 'TOGGLE_VISIBILITY'; payload: boolean }
  | { type: 'SET_ACTIVE_DRAG'; payload: boolean }
  | { type: 'SET_ADMIN_TITLE'; payload: string }
  | { type: 'SET_COLLAPSE'; payload: boolean }
  | { type: 'SET_MAX_WIDTH'; payload: string }
  | { type: 'SET_BACKGROUND'; payload: string | undefined }
  | { type: 'SET_GAP'; payload: number }
  | { type: 'SET_MARGIN'; payload: string }
  | { type: 'SET_PADDING'; payload: string }
  | { type: 'SET_COLUMNS'; payload: number }
  | { type: 'SET_GRID_TEMPLATE_COLUMNS'; payload: string }

export interface GridState {
  activeDrag: boolean
  visible: boolean
  title: string
  collapse: boolean
  maxWidth: string
  background: string | undefined
  gap: number
  margin: string
  padding: string
  columns: number
  gridTemplateColumns: string
}

const initialState: GridState = {
  visible: true,
  activeDrag: false,
  title: 'Grid',
  collapse: false,
  maxWidth: '100%',
  background: undefined,
  gap: 30,
  margin: '0px 0px 0px 0px',
  padding: '30px 30px 30px 30px',
  columns: 3,
  gridTemplateColumns: '1fr 1fr 1fr',
}

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case 'SET_ACTIVE_DRAG':
      return { ...state, activeDrag: action.payload }
    case 'SET_ADMIN_TITLE':
      return { ...state, title: action.payload }
    case 'SET_COLLAPSE':
      return { ...state, collapse: action.payload }
    case 'SET_MAX_WIDTH':
      return { ...state, maxWidth: action.payload }
    case 'SET_BACKGROUND':
      return { ...state, background: action.payload }
    case 'SET_GAP':
      return { ...state, gap: action.payload }
    case 'SET_MARGIN':
      return { ...state, margin: action.payload }
    case 'TOGGLE_VISIBILITY':
      return { ...state, visible: !state.visible }
    case 'SET_PADDING':
      return { ...state, padding: action.payload }
    case 'SET_COLUMNS':
      return {
        ...state,
        columns: action.payload,
        gridTemplateColumns: [...Array(action.payload)]
          .map((i) => '1fr')
          .join(' '),
      }
    case 'SET_GRID_TEMPLATE_COLUMNS':
      return { ...state, gridTemplateColumns: action.payload }
    default:
      return state
  }
}

export const positionMap = ['top', 'right', 'bottom', 'left']

export const Grid = (props: GridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [
    {
      gridTemplateColumns,
      columns,
      padding,
      margin,
      gap,
      activeDrag,
      title,
      collapse,
      maxWidth,
      visible,
    },
    dispatch,
  ] = useReducer(gridReducer, initialState)

  useEffect(() => {
    const payload = [...Array(columns)].map(() => '1fr').join(' ')
    dispatch({ type: 'SET_GRID_TEMPLATE_COLUMNS', payload })
  }, [columns])

  return (
    <div
      className={cn([
        'grid-wrapper',
        activeDrag ? 'grid-active' : undefined,
        collapse ? 'collapse' : undefined,
        !visible ? 'invisible' : undefined,
      ])}
      style={
        {
          padding: padding,
          // '--studio-primary': '#6315ed',
          // '--studio-handle': '',
          // '--studio-handle-dark': '',
          // '--studio-handle-text': '',
          // '--studio-gray-100': '',
          // '--studio-gray-200': '',
        } as React.CSSProperties
      }>
      {collapse ? (
        <div className="grid-collapse">
          <button
            className="btn-expand"
            onClick={() => {
              dispatch({ type: 'SET_COLLAPSE', payload: false })
            }}>
            <ExpandIcon />
            <span>{title}</span>
            <div
              className="current-grid"
              style={{ gridTemplateColumns, width: columns > 4 ? 20 : 15 }}>
              {[...Array(columns)].map((_, i) => (
                <div key={i} className="current-cell" />
              ))}
            </div>
          </button>
        </div>
      ) : (
        <>
          <ResizeHandle margin={margin} padding={padding} dispatch={dispatch} />
          <div
            ref={gridRef}
            className="grid"
            style={{ gridTemplateColumns, gap }}>
            {[...Array(columns)].map((cell, i) => (
              <GridCell key={i} />
            ))}
            <GapControl
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              gap={gap}
              dispatch={dispatch}
            />
          </div>
        </>
      )}
      <GridMenu
        title={title}
        collapse={collapse}
        columns={columns}
        visible={visible}
        dispatch={dispatch}
      />
    </div>
  )
}
