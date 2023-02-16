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
 *
 * @param callback - a callback function that is invoked each time the window is resized
 *
 */
export function useWindowSize(callback?: (w?: WindowState) => void) {
  const [windowSize, setWindowSize] = useState<WindowState>(getWindowWidth())

  useEffect(() => {
    function resize() {
      if (callback) {
        callback(windowSize)
      }
      setWindowSize(getWindowWidth())
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
