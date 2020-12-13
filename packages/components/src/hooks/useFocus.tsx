import { useState, useEffect } from 'react'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
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
 * returns an object that can be used for dynamic focus management
 *
 * @internal usage only
 */

export function useFocus({ containerRef, focusRef, show }: FocusConfig) {
  const [focusable, setFocusable] = useState<FocusState>({
    count: 0,
    container: containerRef?.current,
    first: null,
    last: null,
    next: null,
  })

  /**
   * Query DOM for the next focusable element
   */

  useEffect(() => {
    if (focusRef.current) {
      const elements = document.querySelectorAll(focusElements)

      elements.forEach((i, index) => {
        if (focusRef.current === i) {
          setFocusable(state => ({ ...state, next: elements[index + 1] }))
        }
      })
    }
  }, [focusRef])

  /**
   * Query the container for all focusable elements
   */

  useEffect(() => {
    if (containerRef.current && focusable.container === null) {
      setFocusable(s => ({ ...s, container: containerRef.current }))
    }

    if (show && containerRef.current) {
      const elements = containerRef.current.querySelectorAll(focusElements)

      if (elements.length !== 0) {
        setFocusable(state => ({
          ...state,
          count: elements.length,
          first: elements[0],
          last: elements[elements.length - 1],
        }))
        elements[0].focus()
      } else {
        containerRef.current.focus()
      }
    }
  }, [containerRef, focusRef, focusable.container, show])

  return { focusable }
}
