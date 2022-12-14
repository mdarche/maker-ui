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
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowState>({})

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
