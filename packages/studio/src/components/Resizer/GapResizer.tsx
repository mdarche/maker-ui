import React, { useRef } from 'react'
import { cn } from '@maker-ui/utils'

import { extractValue } from '@/utils'
import { type ModuleAction } from '@/module'
import { handleColumnResize } from './helper'
import styles from './resizer.module.css'

interface GapResizerProps {
  columns: number
  gridTemplateColumns: string
  gap: string
  dispatch: React.Dispatch<ModuleAction>
}

export const GapResizer = ({
  columns,
  gridTemplateColumns,
  gap,
  dispatch,
}: GapResizerProps) => {
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
      className={cn([styles['resize-grid'], 'mkui-studio-reveal'])}
      style={{ gridTemplateColumns, gap }}>
      {[...Array(columns)].map((_, index) =>
        index < columns - 1 ? (
          <div key={index} className="relative">
            <div
              className={styles['gap-resizer']}
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
              <div className={styles['gap-control']}>
                <div className="flex align-center">
                  <button
                    className={styles['btn-gap']}
                    onClick={(e) => updateGap(e, true)}>
                    -
                  </button>
                  <button
                    className={styles['btn-gap']}
                    onClick={(e) => updateGap(e, false)}>
                    +
                  </button>
                </div>
                <span
                  className={cn([styles['resize-value'], 'flex align-center'])}
                  style={showGapValue ? { padding: '0 4px' } : undefined}>
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
