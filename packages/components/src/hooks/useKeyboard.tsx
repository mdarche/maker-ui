import { useEffect } from 'react'

import { FocusState } from './useFocus'

interface KeyboardProps {
  type: 'tabs' | 'slider' | 'modal' | 'popover' | 'dropdown' | 'tooltip'
  closeContainer?(set: boolean): void
  focusable: FocusState
  show?: boolean
  config?: {
    trapFocus?: boolean
    closeOnBlur?: boolean
  }
}

export const useKeyboard = ({
  type,
  focusable,
  closeContainer,
  show,
  config,
}: KeyboardProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const focusGroup = ['modal', 'popover', 'tooltip', 'dropdown']

      /**
       * Check trapFocus and determine previous focus action
       */

      function previous() {
        if (document.activeElement === focusable.first) {
          if (config.trapFocus) {
            focusable.last.focus()
          } else {
            return closeContainer(true)
          }
          e.preventDefault()
        }
      }

      /**
       * Check trapFocus and determine next focus action
       */

      function next() {
        if (document.activeElement === focusable.last) {
          if (config.trapFocus) {
            focusable.first.focus()
          } else {
            if (config.closeOnBlur) {
              closeContainer(false)
            }
          }
          e.preventDefault()
        }
      }

      /**
       * Keyboard Controls for:
       * Modal, Popover, Tooltip, and Dropdown
       */

      if (focusGroup.includes(type)) {
        switch (e.code) {
          case 'Esc':
          case 'Escape':
            return closeContainer(true)
          case 'Tab':
            e.shiftKey ? previous() : next()
            // @ts-ignore
            if (!focusable.container?.contains(e.target)) {
              focusable.first?.focus()
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

      /**
       * Keyboard Controls for Tabs
       */

      if (type === 'tabs') {
        switch (e.code) {
          case 'ArrowDown':
            console.log(focusable)
            // if (document.activeElement.hasAttribute('role="tab"')) {
            //   console.log('Yas!')
            // }
            return
          case 'ArrowRight':
            return console.log('Right!')
          case 'ArrowUp':
          case 'ArrowLeft':
            return console.log('Left!')
          default:
            return
        }
      }
    }

    if (type === 'tabs' || show) {
      window.addEventListener(`keydown`, handleKeyDown)
    }
    if (config.trapFocus) {
      window.addEventListener('focusin', handleKeyDown)
    }
    return () => {
      window.removeEventListener(`focusin`, handleKeyDown)
      window.removeEventListener(`keydown`, handleKeyDown)
    }
  }, [closeContainer, config, focusable, show, type])
}
