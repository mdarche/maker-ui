import { useState, useEffect, MutableRefObject } from 'react'

export function format(value: any): string | number {
  return isNaN(value) ? value : `${value}px`
}

export function getSign(type: string): string {
  return type.includes('right') || type.includes('down') ? '-' : ''
}

interface Position {
  top: number
  bottom: number
  left: number
  right: number
  height: number
  width: number
  x: number
  y: number
}

export const usePosition = (ref: MutableRefObject<any>) => {
  const [box, setBox] = useState<any>({})

  const set = () => {
    console.log('boundingRect =', ref.current.getBoundingClientRect())
    console.log('scrollTop =', document.documentElement.scrollTop)
    // Add these two values together to get the correct top value
    setBox(ref && ref.current ? ref.current.getBoundingClientRect() : {})
  }

  useEffect(() => {
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  return [box, ref]
}
