import React, { useEffect, useReducer, useRef } from 'react'
import { GridMenu } from '../GridMenu'
import { cn } from '@maker-ui/utils'
import { calculateDiffX, calculateDiffY, extractPxValue } from './utils'
import { ExpandIcon } from '../Icons'

interface GridProps {
  resizeMode?: 'px' | '%' | 'fr'
}

const cells: string[] = ['add', 'add', 'add']

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
  gridTemplateColumns: 'repeat(3, 1fr)',
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
        gridTemplateColumns: `repeat(${action.payload}, 1fr)`,
      }
    case 'SET_GRID_TEMPLATE_COLUMNS':
      return { ...state, gridTemplateColumns: action.payload }
    default:
      return state
  }
}

const positionMap = ['top', 'right', 'bottom', 'left']

export const Grid = ({ resizeMode = 'px' }: GridProps) => {
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
      visible,
    },
    dispatch,
  ] = useReducer(gridReducer, initialState)

  useEffect(() => {
    const payload = [...Array(columns)].map(() => '1fr').join(' ')
    dispatch({ type: 'SET_GRID_TEMPLATE_COLUMNS', payload })
  }, [columns])

  const handleMouseDown = (
    e: React.MouseEvent,
    index: number,
    type: 'column' | 'padding' | 'margin'
  ) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'SET_ACTIVE_DRAG', payload: true })

    if (index < 0 || index > 3) {
      throw new Error('Index out of bounds')
    }

    const pos = positionMap[index]
    const isX = type === 'column' || pos === 'left' || pos === 'right'
    let width = 0
    let height = 0
    const values = (
      type === 'column'
        ? gridTemplateColumns
        : type === 'padding'
        ? padding
        : margin
    ).split(' ')

    const element =
      type === 'column'
        ? e.currentTarget.closest('.grid-cell')
        : e.currentTarget
    if (!element) return

    if (type === 'column' || type === 'padding' || type === 'margin') {
      width = isX ? element.clientWidth : 0
      height = !isX ? element.clientHeight : 0
    }

    const startX = e.pageX
    const startY = e.pageY

    const handleMouseMove = (e: MouseEvent) => {
      const diffX = calculateDiffX(e.pageX, startX, pos, type)
      const diffY = calculateDiffY(e.pageY, startY, pos)

      const newDimension = isX ? width + diffX : height + diffY
      if (newDimension < 0 && type !== 'margin') return

      if (index >= 0 && index < values.length) {
        values[index] = newDimension + 'px'
        const payload = values.join(' ')
        if (type === 'column') {
          dispatch({ type: 'SET_GRID_TEMPLATE_COLUMNS', payload })
        } else if (type === 'padding') {
          dispatch({ type: 'SET_PADDING', payload })
        } else if (type === 'margin') {
          dispatch({ type: 'SET_MARGIN', payload })
        }
      }
    }

    const handleMouseUp = () => {
      // TODO change this to ref.current for grid
      dispatch({ type: 'SET_ACTIVE_DRAG', payload: false })
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const updateGap = (e: React.MouseEvent, remove = true) => {
    const isShift = e.shiftKey
    const val = isShift ? 10 : 1
    if (remove) {
      dispatch({ type: 'SET_GAP', payload: gap > 0 ? gap - val : 0 })
    } else {
      dispatch({ type: 'SET_GAP', payload: gap + val })
    }
  }

  const showGapValue = gap > 31

  return (
    <div
      className={cn([
        'grid-wrapper',
        activeDrag ? 'grid-active' : undefined,
        collapse ? 'collapse' : undefined,
        !visible ? 'invisible' : undefined,
      ])}
      style={{ padding: padding }}>
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
          <div className="grid-box">
            {padding?.split(' ').map((v, i) => {
              const pos = positionMap[i]
              const num = extractPxValue(v)
              return (
                <div
                  key={pos}
                  className={cn([
                    'resize-padding',
                    'flex align-center justify-center',
                    pos,
                  ])}
                  onMouseDown={(e) => handleMouseDown(e, i, 'padding')}
                  style={{
                    height: pos === 'top' || pos === 'bottom' ? v : undefined,
                    width: pos === 'left' || pos === 'right' ? v : undefined,
                  }}>
                  <span
                    className={cn([
                      typeof num === 'number' &&
                      num <= 20 &&
                      (pos === 'left' || pos === 'right')
                        ? 'abs'
                        : undefined,
                    ])}
                    onMouseDown={(e) => handleMouseDown(e, i, 'padding')}>
                    {v}
                  </span>
                </div>
              )
            })}
          </div>
          <div
            ref={gridRef}
            className="grid"
            style={{ gridTemplateColumns, gap }}>
            {cells.map((cell, i) => (
              <div
                key={i}
                className="grid-cell flex align-center justify-center">
                <div className="mkui-add-compont">{cell}</div>
              </div>
            ))}
            <div className="resize-grid" style={{ gridTemplateColumns, gap }}>
              {[...Array(columns)].map((_, i) =>
                i < columns - 1 ? (
                  <div key={i} className="grid-cell">
                    <div
                      className="resize-gap"
                      onMouseDown={(e) => handleMouseDown(e, i, 'column')}
                      style={{ width: gap, transform: `translateX(${gap}px)` }}>
                      <div className="gap-control">
                        <div className="gap-buttons flex align-center">
                          <button onClick={(e) => updateGap(e, true)}>-</button>
                          <button onClick={(e) => updateGap(e, false)}>
                            +
                          </button>
                        </div>
                        <span className={cn(['gap-value'])}>
                          {showGapValue && `${gap}px`}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </>
      )}
      <GridMenu
        title={title}
        collapse={collapse}
        columns={columns}
        dispatch={dispatch}
        visible={visible}
      />
    </div>
  )
}
