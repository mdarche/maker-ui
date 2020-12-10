import { useState, useEffect, useCallback } from 'react'

import { useKeyboard } from './useKeyboard'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

export interface FocusState {
  all?: HTMLElement[]
  count: number
  container?: React.MutableRefObject<any>
  first?: HTMLElement
  last?: HTMLElement
  next?: HTMLElement | any
}

interface FocusConfig {
  type?: 'modal' | 'dropdown' | 'popover' | 'tabs' | 'tooltip'
  containerRef: React.MutableRefObject<any>
  focusRef?: React.MutableRefObject<any>
  show?: boolean
  toggle?(set?: boolean): void
  trapFocus?: boolean
  closeOnBlur?: boolean
}

/**
 * The `useFocus` hook controls all Maker UI components that require
 * dynamic focus management for accessibility
 *
 * @internal usage only
 */

export function useFocus({
  type,
  containerRef,
  focusRef,
  show,
  toggle,
  trapFocus,
  closeOnBlur,
}: FocusConfig) {
  const [focusable, setFocusable] = useState<FocusState>({
    all: null,
    count: 0,
    container: containerRef ? containerRef.current : null,
    first: null,
    last: null,
    next: null,
  })

  const closeContainer = useCallback(
    (originalFocus: boolean) => {
      if (toggle) {
        // Send focus back to focus ref or the next element in the DOM
        originalFocus ? focusRef.current.focus() : focusable.next.focus()
        toggle(false)
      }
    },
    [focusRef, focusable.next, toggle]
  )

  /**
   * 1. Query DOM for the next focusable element
   */

  useEffect(() => {
    if (!trapFocus && type !== 'modal' && focusRef.current) {
      const elements = document.querySelectorAll(focusElements)
      elements.forEach((i, index) => {
        if (focusRef.current === i) {
          setFocusable(state => ({ ...state, next: elements[index + 1] }))
        }
      })
    }
  }, [focusRef, trapFocus, type])

  /**
   * 2. Query the container for all focusable elements
   */

  useEffect(() => {
    if (containerRef.current && focusable.container === null) {
      setFocusable(s => ({ ...s, container: containerRef.current }))
    }

    if ((show && containerRef.current) || type === 'tabs') {
      const elements = containerRef.current.querySelectorAll(focusElements)
      console.log(elements)

      if (elements.length !== 0) {
        setFocusable(state => ({
          ...state,
          all: type === 'tabs' && elements,
          count: elements.length,
          first: elements[0],
          last: elements[elements.length - 1],
        }))
        elements[0].focus()
      } else {
        containerRef.current.focus()
      }
    }
  }, [containerRef, focusable.container, show, type])

  /**
   * 3. Send focus information to useKeyboard event handler
   */

  useKeyboard({
    type,
    closeContainer,
    focusable,
    show,
    config: { trapFocus, closeOnBlur },
  })

  return { focusable }
}
