import { ModuleAction } from '@/module'

export const positionMap = ['top', 'right', 'bottom', 'left']

type ComponentType = 'column' | 'padding' | 'margin'

export const calculateDiffX = (
  currentX: number,
  startX: number,
  pos: string,
  type: ComponentType
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

export const calculateDiffY = (
  currentY: number,
  startY: number,
  pos: string
) => {
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

export function extractValue(input: string): number | string {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/)
  return match ? parseFloat(match[1]) : input
}

export const handleBoxResize = (
  e: React.MouseEvent,
  index: number,
  property: 'padding' | 'margin',
  currentValue: string,
  dispatch: React.Dispatch<ModuleAction>
) => {
  e.preventDefault()
  e.stopPropagation()
  dispatch({ type: 'SET_ACTIVE_DRAG', payload: true })

  if (index < 0 || index > 3) {
    throw new Error('Index out of bounds')
  }

  const pos = positionMap[index]
  const isX = pos === 'left' || pos === 'right'
  let width = 0
  let height = 0
  const values = currentValue.split(' ')

  const element = e.currentTarget
  if (!element) return

  width = isX ? element.clientWidth : 0
  height = !isX ? element.clientHeight : 0

  const startX = e.pageX
  const startY = e.pageY

  const handleMouseMove = (e: MouseEvent) => {
    const diffX = calculateDiffX(e.pageX, startX, pos, property)
    const diffY = calculateDiffY(e.pageY, startY, pos)

    const newDimension = isX ? width + diffX : height + diffY
    if (newDimension < 0 && property !== 'margin') return
    if ((isX && diffX === 0) || (!isX && diffY === 0)) return

    if (index >= 0 && index < values.length) {
      values[index] = newDimension + 'px'
      const value = values.join(' ')

      dispatch({ type: 'SET_STYLE', payload: { property, value } })
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

interface ColumnResizeProps {
  e: React.MouseEvent
  index: number
  gridTemplateColumns: string
  dispatch: React.Dispatch<ModuleAction>
  mode?: 'px' | 'fr' | '%'
}

export const handleColumnResize = ({
  e,
  index,
  gridTemplateColumns,
  dispatch,
  mode = 'px',
}: ColumnResizeProps) => {
  e.preventDefault()
  e.stopPropagation()

  let width = 0
  let gridWidth = 0
  const values = gridTemplateColumns.split(' ')
  const startX = e.pageX

  const grid = e.currentTarget.closest('.grid-resize')
  const element = e.currentTarget.closest('.grid-cell')

  if (!element || !grid) return

  width = element.clientWidth
  gridWidth = grid.clientWidth

  const handleMouseMove = (e: MouseEvent) => {
    const diffX = calculateDiffX(e.pageX, startX, 'left', 'column')
    const newDimension = width + diffX
    if (newDimension < 0) return

    if (index >= 0 && index < values.length) {
      let newSizeValue

      switch (mode) {
        case 'px':
          newSizeValue = newDimension + 'px'
          break
        case 'fr':
          const totalFr = values.reduce((acc, val) => acc + parseFloat(val), 0)
          newSizeValue = (newDimension / gridWidth) * totalFr + 'fr'
          break
        case '%':
          newSizeValue = (newDimension / gridWidth) * 100 + '%'
          break
      }

      values[index] = newSizeValue
      const value = values.join(' ')

      dispatch({
        type: 'SET_STYLE',
        payload: { property: 'gridTemplateColumns', value },
      })
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

export function replaceValue(
  original: string,
  index: number,
  newValue: string
) {
  const values = original.split(' ')
  values[index] = newValue
  return values.join(' ')
}

export function validateCssUnit(value: string): string | false {
  const validUnits = [
    'px',
    'em',
    'rem',
    '%',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'cm',
    'mm',
    'in',
    'pt',
    'pc',
    'ex',
    'ch',
  ]

  // Check if value ends with a valid unit
  if (validUnits.some((unit) => value.endsWith(unit))) {
    return value
  }

  // Check if value is an integer and append 'px'
  if (/^\d+$/.test(value)) {
    return `${value}px`
  }

  return false
}
