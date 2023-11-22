import React, { useEffect, useRef, useState } from 'react'
import { GridMenu } from '../GridMenu'
import { cn } from '@maker-ui/utils'
import { calculateDiffX, calculateDiffY, extractPxValue } from './utils'
import { ExpandIcon } from '../Icons'

interface GridProps {
  resizeMode?: 'px' | '%' | 'fr'
}

const cells: string[] = ['add', 'add', 'add']

export const Grid = ({ resizeMode = 'px' }: GridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeDrag, setActiveDrag] = useState(false)
  const [adminTitle, setAdminTitle] = useState('Grid')
  const [collapse, setCollapse] = useState(false)
  const [maxWidth, setMaxWidth] = useState('100%')
  const [background, setBackground] = useState<undefined | string>(undefined)
  const [gap, setGap] = useState(30)
  const [margin, setMargin] = useState('0px 0px 0px 0px') // Or default
  const [padding, setPadding] = useState('30px 30px 30px 30px') // Or default
  const [columns, setColumns] = useState(3)
  const [gridTemplateColumns, setGridTemplateColumns] = useState(
    `repeat(${columns}, 1fr)` // Or default
  )

  useEffect(() => {
    setGridTemplateColumns([...Array(columns)].map(() => '1fr').join(' '))
  }, [columns])

  const positionMap = ['top', 'right', 'bottom', 'left']

  const handleMouseDown = (
    e: React.MouseEvent,
    index: number,
    type: 'column' | 'padding' | 'margin'
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveDrag(true)

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
        if (type === 'column') {
          setGridTemplateColumns(values.join(' '))
        } else if (type === 'padding') {
          setPadding(values.join(' '))
        } else if (type === 'margin') {
          setMargin(values.join(' '))
        }
      }
    }

    const handleMouseUp = () => {
      // TODO change this to ref.current for grid
      setActiveDrag(false)
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
      setGap((g) => (g > 0 ? g - val : 0))
    } else {
      setGap((g) => g + val)
    }
  }

  const showGapValue = gap > 31

  return (
    <div
      className={cn([
        'grid-wrapper',
        activeDrag ? 'grid-active' : undefined,
        collapse ? 'collapse' : undefined,
      ])}
      style={{ padding }}>
      {collapse ? (
        <div className="grid-collapse">
          <button className="btn-collapse" onClick={() => setCollapse(false)}>
            {adminTitle}
            <ExpandIcon />
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
        columns={columns}
        addColumn={() => setColumns((s) => s + 1)}
        removeColumn={() => setColumns((s) => s - 1)}
        collapse={collapse}
        setCollapse={setCollapse}
      />
    </div>
  )
}
