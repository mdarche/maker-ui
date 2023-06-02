import { useEffect, useRef, useState } from 'react'

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabIndex]:not([tabIndex="-1"])',
]

interface FocusTrapProps {
  /** The container ref for trapping focus */
  ref: React.RefObject<HTMLElement> | null
  /** The anchor ref for focus to return to when exiting the container */
  anchor?: React.RefObject<HTMLElement> | null
  /** Whether or not the container ref is actively visible */
  active?: boolean
  /** Whether or not to trap focus */
  trap?: boolean
  /** A callback to run when focus exits the container or active becomes false via
   * external state changes
   */
  exitCallback?: (next?: HTMLElement | null) => void
  /** The element to focus when exiting the container. Defaults to 'none' */
  exitFocus?: 'next' | 'anchor' | 'dynamic' | 'none'
}

/**
 * The `useFocus` hook allows you to trap focus within a container. This is useful for
 * creating modal dialogs or other components that require focus to remain within the
 * container.
 *
 * @param containerRef - A React ref that points to the focus container
 * @param active - A boolean that determines whether the effect should run
 *
 */
export function useFocusTrap({
  ref,
  anchor,
  active = false,
  trap = true,
  exitFocus = 'none',
  exitCallback,
}: FocusTrapProps) {
  const firstRef = useRef<HTMLElement | null>(null)
  const lastRef = useRef<HTMLElement | null>(null)
  const nextRef = useRef<HTMLElement | null>(null)
  const [count, setCount] = useState(0)
  // Boolean to track if the focus trap has been previously activated
  const [activated, setActivated] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  /**
   * Query DOM for the next focusable element
   */
  useEffect(() => {
    if (!ref?.current || !active) return

    const container = ref.current
    const getNextElement = () => {
      if (!anchor?.current) return null
      const allFocusable = document.querySelectorAll<HTMLElement>(
        focusElements.join(',')
      )
      // @ts-ignore
      const index = [...allFocusable].indexOf(anchor.current)
      return allFocusable[index + 1]
    }
    const els = container.querySelectorAll(focusElements.join(','))
    setCount(els.length)
    const firstFocusable = els[0] as HTMLElement
    const lastFocusable = els[els.length - 1] as HTMLElement

    // Assign to refs
    firstRef.current = firstFocusable
    lastRef.current = lastFocusable
    nextRef.current = getNextElement()

    /**
     * Hand tab key events to ensure focus stays within the container, moves to the anchor, or
     * moves to the next focusable element.
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!active) return
      if (e.key === 'Tab') {
        // Previous
        if (e.shiftKey) {
          if (document.activeElement === firstRef.current) {
            if (trap && lastRef.current) {
              lastRef.current?.focus()
              e.preventDefault()
            } else {
              setDirection('prev')
              exitCallback?.(anchor?.current)
            }
          }
          // Next
        } else {
          if (document.activeElement === lastRef.current) {
            if (trap && firstRef.current) {
              firstRef.current?.focus()
              e.preventDefault()
            } else {
              setDirection('next')
              exitCallback?.(nextRef?.current)
            }
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [ref, anchor, active, trap, exitCallback])

  useEffect(() => {
    if (!active && !activated) {
      setActivated(true)
    }

    if (active) {
      firstRef.current?.focus()
    }

    if (!active && activated && exitFocus === 'anchor') {
      anchor?.current?.focus()
    }
    if (!active && activated && exitFocus === 'next') {
      nextRef?.current?.focus()
    }
    if (!active && activated && exitFocus === 'dynamic') {
      return trap
        ? anchor?.current?.focus()
        : direction === 'next'
        ? nextRef?.current?.focus()
        : anchor?.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return {
    count,
    first: firstRef.current,
    last: lastRef.current,
    next: nextRef.current,
  }
}
