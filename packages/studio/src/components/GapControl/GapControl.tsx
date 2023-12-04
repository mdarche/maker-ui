import React, { useRef } from 'react'
import { cn } from '@maker-ui/utils'
import { extractValue, handleColumnResize } from '../Grid/utils'
import { ModuleAction } from '@/module'

interface GapControlProps {
  columns: number
  gridTemplateColumns: string
  gap: string
  dispatch: React.Dispatch<ModuleAction>
}

export const GapControl = ({
  columns,
  gridTemplateColumns,
  gap,
  dispatch,
}: GapControlProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const gapVal = extractValue(gap) as number

  const showGapValue = gapVal > 31

  const updateGap = (e: React.MouseEvent, remove = true) => {
    e.stopPropagation()
    const isShift = e.shiftKey
    const v = isShift ? 10 : 1
    const value = remove ? (gapVal > 0 ? gapVal - v : 0) : gapVal + v
    dispatch({
      type: 'SET_STYLE',
      payload: { property: 'gap', value: `${value}px` },
    })
  }

  return (
    <div
      ref={ref}
      className="grid-resize studio-reveal"
      style={{ gridTemplateColumns, gap }}>
      {[...Array(columns)].map((_, index) =>
        index < columns - 1 ? (
          <div key={index} className="grid-cell">
            <div
              className="resize-gap"
              onDoubleClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: 'SET_STYLE',
                  payload: { property: 'gap', value: '0px' },
                })
              }}
              onMouseDown={(e) =>
                handleColumnResize({
                  e,
                  index,
                  gridTemplateColumns,
                  dispatch,
                })
              }
              style={{ width: gap, transform: `translateX(${gap})` }}>
              <div className="gap-control">
                <div className="gap-buttons flex align-center">
                  <button onClick={(e) => updateGap(e, true)}>-</button>
                  <button onClick={(e) => updateGap(e, false)}>+</button>
                </div>
                <span
                  className={cn([
                    'resize-value gap flex align-center',
                    showGapValue ? 'show' : '',
                  ])}>
                  {showGapValue && gap}
                </span>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}
