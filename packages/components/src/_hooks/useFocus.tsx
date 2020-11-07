import { useState, useEffect, useCallback } from 'react'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

interface FocusableElements {
  count: number
  container?: React.MutableRefObject<any>
  original?: React.MutableRefObject<any>
  first?: HTMLElement
  last?: HTMLElement
  next?: HTMLElement | any
}

interface FocusConfig {
  type?: 'modal' | 'dropdown' | 'popover'
  containerRef: React.MutableRefObject<any>
  focusRef?: React.MutableRefObject<any>
  show: boolean
  toggle: Function
  trapFocus?: boolean
  closeOnBlur?: boolean
}

export function useFocus({
  type,
  containerRef,
  focusRef,
  show,
  toggle,
  trapFocus,
  closeOnBlur,
}: FocusConfig) {
  const [focusable, setFocusable] = useState<FocusableElements>({
    count: 0,
    container: containerRef ? containerRef.current : null,
    original: focusRef ? focusRef.current : null,
    first: null,
    last: null,
    next: null,
  })

  const closeContainer = useCallback(
    (originalFocus: boolean) => {
      if (toggle) {
        // Send focus back to focus ref or the next element in the DOM
        if (originalFocus) {
          focusRef.current.focus()
        } else {
          focusable.next.focus()
        }
        toggle(false)
      }
    },
    [focusRef, focusable.next, toggle]
  )

  // 1. Query DOM for the next focusable element
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

  // 2. Query the container for all focusable elements
  useEffect(() => {
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
  }, [containerRef, show])

  // TODO add arrow keys for type === 'dropdown'
  // TODO clean up this whole function

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return closeContainer(true)
        case 'Tab':
          if (e.shiftKey) {
            // If tab + shift key is pressed
            if (document.activeElement === focusable.first) {
              if (trapFocus) {
                focusable.last.focus()
              } else {
                return closeContainer(true)
              }
              e.preventDefault()
            }
          } else {
            // If tab key is pressed
            if (document.activeElement === focusable.last) {
              if (trapFocus) {
                focusable.first.focus()
              } else {
                if (closeOnBlur) {
                  closeContainer(false)
                }
              }
              e.preventDefault()
            }
          }
          return
        case 'ArrowDown':
          return
        case 'ArrowUp':
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
  }, [focusable, show, closeOnBlur, focusRef, trapFocus, closeContainer])

  return { focusable }
}
