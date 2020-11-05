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

  const closeContainer = useCallback(() => {
    if (toggle) {
      // if (!trapFocus && focusable.next !== undefined) {
      //   focusable.next.focus()
      // }

      if (trapFocus && focusRef !== undefined) {
        focusRef.current.focus()
      }
      toggle(false)
    }
  }, [focusRef, focusable.next, toggle, trapFocus])

  useEffect(() => {
    // Query DOM for the next focusable element
    // type !== 'modal' && don't trap focus
    if (!trapFocus && type !== 'modal' && focusRef.current) {
      const elements = document.querySelectorAll(focusElements)
      console.log('Elements are', elements)
      console.log('Ref current is', focusRef.current)
      elements.forEach((i, index) => {
        if (focusRef.current === i) {
          setFocusable(state => ({ ...state, next: elements[index] }))
        }
      })
    }
  }, [])

  useEffect(() => {
    // Query the container for all focusable elements
    // Set the first and last elements
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return closeContainer()
        case 'Tab':
          if (e.shiftKey) {
            // If tab + shift key is pressed
            if (document.activeElement === focusable.first) {
              if (trapFocus) {
                focusable.last.focus()
              } else {
                focusRef.current.focus()
                return closeContainer()
              }
              e.preventDefault()
            }
          } else {
            // If tab key is pressed
            if (document.activeElement === focusable.last) {
              if (trapFocus) {
                focusable.first.focus()
              } else {
                focusable.next.focus()
                return closeContainer()
              }
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
  }, [focusable, show, closeContainer])

  return { focusable }
}
