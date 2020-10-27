import { useState, useRef, useEffect, MutableRefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function format(value: any): string | number {
  return isNaN(value) ? value : `${value}px`
}

export function getSign(type: string): string {
  return type.includes('right') || type.includes('down') ? '-' : ''
}

export function usePrevious(value: any): any {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState<any>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}

export function useTracker(type, key, toggle, expiration) {
  const [active, set] = useState(true)
  const delay = () => {
    setTimeout(() => {
      set(false)
    }, 1000)
  }

  useEffect(() => {
    // Use session storage

    if (type === 'session') {
      const sessionCheck = sessionStorage.getItem(key)

      if (toggle && sessionCheck) {
        return set(false)
      }
      if (!toggle && !sessionCheck) {
        delay()
        return sessionStorage.setItem(key, 'true')
      }
    }

    // Use cookie storage

    if (type === 'cookie') {
      const cookieCheck = document.cookie
        .split(';')
        .some(i => i.trim().startsWith(key))

      if (toggle && cookieCheck) {
        return set(false)
      }
      if (!toggle && !cookieCheck) {
        delay()
        document.cookie = `${key}=true;expires=${expiration};path=/`
      }
    }
  }, [toggle, type, expiration, key])

  return active
}

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

export function useFocus(
  ref: React.MutableRefObject<any>,
  show: boolean,
  toggle: Function
) {
  const [focusable, setFocusable] = useState({
    count: 0,
    first: null,
    last: null,
  })

  useEffect(() => {
    if (show && ref.current) {
      const elements = ref.current.querySelectorAll(focusElements)
      if (elements.length !== 0) {
        setFocusable({
          count: elements.length,
          first: elements[0],
          last: elements[elements.length - 1],
        })
        elements[0].focus()
      } else {
        ref.current.focus()
      }
    }
  }, [ref, show])

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.keyCode) {
        case 27: // esc
          return toggle()
        case 9: // tab
          if (e.shiftKey) {
            // If tab + shift key is pressed
            if (document.activeElement === focusable.first) {
              focusable.last.focus()
              e.preventDefault()
            }
          } else {
            // If tab key is pressed
            if (document.activeElement === focusable.last) {
              focusable.first.focus()
              e.preventDefault()
            }
          }
          return
        default:
          return
      }
    }

    if (typeof window !== 'undefined') {
      if (show) {
        window.addEventListener(`keydown`, handleKeyDown)
      }
      return () => window.removeEventListener(`keydown`, handleKeyDown)
    }
  }, [focusable, show, toggle])

  return { focusable }
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
    setBox(ref && ref.current ? ref.current.getBoundingClientRect() : {})
  }

  useEffect(() => {
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  return [box, ref]
}
