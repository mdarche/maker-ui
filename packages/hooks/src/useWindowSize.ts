import { useState, useEffect } from 'react'

interface WindowState {
  /** Width of the window */
  width?: number
  /** Height of the window */
  height?: number
}

const getWindowWidth = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * A React hook that adds a resize event-listener to the window and returns
 * the current window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowState>(getWindowWidth())

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowWidth())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
