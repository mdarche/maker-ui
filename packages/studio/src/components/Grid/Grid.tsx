import React, { useEffect, useRef, useState } from 'react'
import { GridMenu } from '../GridMenu'

interface GridProps {
  resizeMode?: 'px' | '%' | 'fr'
}

const cells: string[] = ['add', 'add', 'add']

export const Grid = ({ resizeMode = 'px' }: GridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [gap, setGap] = useState(30)
  const [margin, setMargin] = useState('0px 0px 0px 0px') // Or default
  const [padding, setPadding] = useState('30px 30px 30px 30px') // Or default
  const [columns, setColumns] = useState(3)
  const [gridTemplateColumns, setGridTemplateColumns] = useState(
    `repeat(${columns}, 1fr)`
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
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={'grid-wrapper'} style={{ padding }}>
      {padding?.split(' ').map((v, i) => {
        const type =
          i === 0 ? 'top' : i === 1 ? 'right' : i === 2 ? 'bottom' : 'left'
        return (
          <div
            key={type}
            className={`resize-padding ${type}`}
            onMouseDown={(e) => handleMouseDown(e, i, 'padding')}
            style={{
              height: type === 'top' || type === 'bottom' ? v : undefined,
              width: type === 'left' || type === 'right' ? v : undefined,
            }}></div>
        )
      })}
      <GridMenu
        onChangeLayout={setGridTemplateColumns}
        addColumn={() => setColumns((s) => s + 1)}
        removeColumn={() => setColumns((s) => s - 1)}
      />
      <div ref={gridRef} className="grid" style={{ gridTemplateColumns, gap }}>
        {cells.map((cell, i) => (
          <div key={i} className="grid-cell flex align-center justify-center">
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
                    <button onClick={() => setGap((g) => (g > 0 ? g - 1 : 0))}>
                      -
                    </button>
                    <button onClick={() => setGap((g) => g + 1)}>+</button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

type CallerType = 'column' | 'padding' | 'margin'

const calculateDiffX = (
  currentX: number,
  startX: number,
  pos: string,
  type: CallerType
) => {
  const dirX = currentX > startX ? 'right' : 'left'

  if (type === 'column') {
    return currentX - startX
  }

  if (
    (dirX === 'left' && pos === 'left') ||
    (dirX === 'right' && pos === 'left')
  ) {
    return currentX - startX
  } else if (dirX === 'right' && pos === 'right') {
    return Math.abs(currentX - startX) * -1
  } else {
    return Math.abs(currentX - startX)
  }
}

const calculateDiffY = (currentY: number, startY: number, pos: string) => {
  const dirY = currentY > startY ? 'down' : 'up'

  if (dirY === 'down' && pos === 'top') {
    return currentY - startY
  } else if (
    (dirY === 'down' && pos === 'bottom') ||
    (dirY === 'up' && pos === 'top')
  ) {
    return Math.abs(currentY - startY) * -1
  } else {
    return Math.abs(currentY - startY)
  }
}
