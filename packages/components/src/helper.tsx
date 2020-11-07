export function format(value: any): string | number {
  return isNaN(value) ? value : `${value}px`
}

export function getSign(type: string): string {
  return type.includes('right') || type.includes('down') ? '-' : ''
}
