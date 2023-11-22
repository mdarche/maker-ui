type CallerType = 'column' | 'padding' | 'margin'

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
