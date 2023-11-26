import React, { useRef } from 'react'
import { cn } from '@maker-ui/utils'
import { handleColumnResize } from '../Grid/utils'
import { GridAction } from '../Grid/Grid'

interface GapControlProps {
  columns: number
  gridTemplateColumns: string
  gap: number
  dispatch: React.Dispatch<GridAction>
}

export const GapControl = ({
  columns,
  gridTemplateColumns,
  gap,
  dispatch,
}: GapControlProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const showGapValue = gap > 31

  const updateGap = (e: React.MouseEvent, remove = true) => {
    const isShift = e.shiftKey
    const val = isShift ? 10 : 1
    const payload = remove ? (gap > 0 ? gap - val : 0) : gap + val
    dispatch({ type: 'SET_GAP', payload })
  }

  return (
    <div ref={ref} className="grid-resize" style={{ gridTemplateColumns, gap }}>
      {[...Array(columns)].map((_, index) =>
        index < columns - 1 ? (
          <div key={index} className="grid-cell">
            <div
              className="resize-gap"
              onMouseDown={(e) =>
                handleColumnResize({
                  e,
                  index,
                  gridTemplateColumns,
                  dispatch,
                })
              }
              style={{ width: gap, transform: `translateX(${gap}px)` }}>
              <div className="gap-control">
                <div className="gap-buttons flex align-center">
                  <button onClick={(e) => updateGap(e, true)}>-</button>
                  <button onClick={(e) => updateGap(e, false)}>+</button>
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
  )
}
