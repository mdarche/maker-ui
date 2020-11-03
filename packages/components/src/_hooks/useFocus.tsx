import { useState, useEffect } from 'react'

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
  toggle: Function,
  trap?: boolean
) {
  const [focusable, setFocusable] = useState({
    count: 0,
    first: null,
    last: null,
  })

  useEffect(() => {
    if (!trap && ref.current) {
      const elements = document.querySelectorAll(focusElements)
      console.log('Elements are', elements)
      console.log('Ref current is', ref.current.className)
      elements.forEach(i => {
        console.log(i.className)
      })
    }
  }, [])

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
          if (toggle) {
            return toggle()
          }
          return
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
