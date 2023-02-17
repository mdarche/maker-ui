import { useEffect } from 'react'

type KeyboardShortcut = {
  /** The target keyboard code that will trigger your `callback` function */
  key: KeyboardEvent['code']
  /** If true, the shortcut will only match if the Shift key is also pressed. */
  shiftKey?: boolean
  /** If true, the shortcut will only match if the Ctrl key is also pressed. */
  ctrlKey?: boolean
  /** If true, the shortcut will only match if the Alt key is also pressed. */
  altKey?: boolean
  /** A callback function that is invoked anytime this shortcut is matched to a keyboard event. */
  callback: () => void
}

/**
 * A browser hook that allows you to register keyboard shortcuts for your application.
 *
 * @param shortcuts{KeyboardShortcut[]} - An array of keyboard shortcuts to match against
 * @param ref{React.RefObject<any>} - A React ref object that will be bound to the keyboard
 * event listener. If no ref is provided, the listener will be attached to the document.
 */
export function useKeyboardShortcut(
  shortcuts: KeyboardShortcut[],
  ref?: React.RefObject<any>
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchedShortcut = shortcuts.find((s) => {
        if (s.key === e.code) {
          let match = true
          if (
            (s.shiftKey && !e.shiftKey) ||
            (s.ctrlKey && !e.ctrlKey) ||
            (s.altKey && !e.altKey)
          ) {
            match = false
          }
          return match
        }
        return false
      })

      if (matchedShortcut) {
        e.preventDefault()
        matchedShortcut.callback()
      }
    }
    const target = (ref && ref.current) || document

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts, ref])
}
