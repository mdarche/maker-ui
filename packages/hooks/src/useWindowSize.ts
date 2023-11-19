import { useState, useEffect } from 'react'

interface WindowState {
  /** Width of the window */
  width?: number
  /** Height of the window */
  height?: number
}

/**
 * A React hook that adds a resize event-listener to the window and returns
 * the current window size
 *
 * @param callback - a callback function that is invoked each time the window is resized
 *
 */
export function useWindowSize(callback?: (w?: WindowState) => void) {
  const [windowSize, setWindowSize] = useState<WindowState>({
    width: typeof window !== 'undefined' ? window.innerWidth : undefined,
    height: typeof window !== 'undefined' ? window.innerHeight : undefined,
  })

  /**
   * Invoke the callback function on first render if it is defined
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && callback) {
      callback(windowSize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Add a resize event-listener to the window and update the windowSize state
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function resize() {
      if (callback) {
        callback(windowSize)
      }
      setWindowSize({ width: window?.innerWidth, height: window?.innerHeight })
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback])

  return windowSize
}
