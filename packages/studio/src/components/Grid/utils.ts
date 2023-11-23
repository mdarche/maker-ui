import { GridAction } from './Grid'

type CallerType = 'column' | 'padding' | 'margin'

export const positionMap = ['top', 'right', 'bottom', 'left']

export const calculateDiffX = (
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

export function extractPxValue(input: string): number | string {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/)
  return match ? parseFloat(match[1]) : input
}

export const handleMouseDown = (
  e: React.MouseEvent,
  index: number,
  type: 'column' | 'padding' | 'margin',
  currentValue: string,
  dispatch: React.Dispatch<GridAction>
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
  const values = currentValue.split(' ')

  const element =
    type === 'column' ? e.currentTarget.closest('.grid-cell') : e.currentTarget
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
