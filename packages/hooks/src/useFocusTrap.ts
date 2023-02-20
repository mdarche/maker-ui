import { useEffect, useRef, useState } from 'react'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabIndex]:not([tabIndex="-1"])',
]

/**
 * The `useFocus` hook allows you to trap focus within a container. This is useful for
 * creating modal dialogs or other components that require focus to remain within the
 * container.
 *
 * @param containerRef - A React ref that points to the focus container
 * @param active - A boolean that determines whether the effect should run
 *
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement> | null,
  active = true,
  exitCallback?: () => void
) {
  const firstRef = useRef<HTMLElement | null>(null)
  const lastRef = useRef<HTMLElement | null>(null)
  const [count, setCount] = useState(0)

  /**
   * Query DOM for the next focusable element
   */
  useEffect(() => {
    if (!containerRef?.current) return
    if (!active) return

    const container = containerRef.current

    const els = container.querySelectorAll(focusElements.join(','))
    setCount(els.length)
    const firstFocusable = els[0] as HTMLElement
    const lastFocusable = els[els.length - 1] as HTMLElement
    firstRef.current = firstFocusable
    lastRef.current = lastFocusable

    const handleFocus = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !container.contains(e.target) &&
        firstRef.current
      ) {
        firstRef.current.focus()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstRef.current && lastRef.current) {
            lastRef.current?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastRef.current && firstRef.current) {
            firstRef.current?.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focus', handleFocus, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focus', handleFocus, true)
    }
  }, [containerRef, exitCallback, active])

  return {
    count,
    first: firstRef.current,
    last: lastRef.current,
  }
}
