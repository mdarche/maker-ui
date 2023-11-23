import { cn } from '@maker-ui/utils'
import { handleMouseDown } from '../Grid/utils'
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
  const showGapValue = gap > 31

  const updateGap = (e: React.MouseEvent, remove = true) => {
    const isShift = e.shiftKey
    const val = isShift ? 10 : 1
    if (remove) {
      dispatch({ type: 'SET_GAP', payload: gap > 0 ? gap - val : 0 })
    } else {
      dispatch({ type: 'SET_GAP', payload: gap + val })
    }
  }

  return (
    <div className="resize-grid" style={{ gridTemplateColumns, gap }}>
      {[...Array(columns)].map((_, i) =>
        i < columns - 1 ? (
          <div key={i} className="grid-cell">
            <div
              className="resize-gap"
              onMouseDown={(e) =>
                handleMouseDown(e, i, 'column', gridTemplateColumns, dispatch)
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
