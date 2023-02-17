import { useState, useEffect } from 'react'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

export interface FocusState {
  count: number
  container?: React.MutableRefObject<any>
  first?: HTMLElement
  last?: HTMLElement
  next?: HTMLElement | any
}

export interface FocusConfig {
  containerRef: React.MutableRefObject<any>
  focusRef?: React.MutableRefObject<any>
  show?: boolean
}

/**
 * The `useFocus` hook queries the DOM for nearby focusable elements and
 * returns an object that can be used for dynamic focus management and focus traps.
 *
 * @param containerRef - A React ref that points to the focus container
 * @param focusRef - A React ref that points to the desired focus HTML Element
 * @param show - A boolean that determines whether the effect should run
 *
 */
export function useFocus({ containerRef, focusRef, show }: FocusConfig) {
  const [focusable, setFocusable] = useState<FocusState>({
    count: 0,
    container: containerRef?.current,
  })

  /**
   * Query DOM for the next focusable element
   */
  useEffect(() => {
    if (focusRef?.current) {
      const els = document.querySelectorAll(focusElements)

      els.forEach((i, index) => {
        if (focusRef.current === i) {
          setFocusable((state) => ({ ...state, next: els[index + 1] }))
        }
      })
    }
  }, [focusRef])

  /**
   * Query the container for all focusable elements
   */
  useEffect(() => {
    if (containerRef.current && focusable.container === null) {
      setFocusable((s) => ({ ...s, container: containerRef.current }))
    }

    if (show && containerRef.current) {
      const els = containerRef.current.querySelectorAll(focusElements)

      if (els.length !== 0) {
        setFocusable((state) => ({
          ...state,
          count: els.length,
          first: els[0],
          last: els[els.length - 1],
        }))
        els[0].focus()
      } else {
        containerRef.current.focus()
      }
    }
  }, [containerRef, focusRef, focusable.container, show])

  return { focusable }
}
