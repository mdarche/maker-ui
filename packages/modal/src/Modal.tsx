'use client'

import * as React from 'react'
import { cn, useFocus } from '@maker-ui/utils'
import { Transition, type TransitionState } from '@maker-ui/transition'

import { Portal } from './Portal'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A boolean that indicates if the modal is active or unmounted */
  show?: boolean
  /** A boolean toggle function that controls the modal's visibility */
  set?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
  /** The modal's background overlay color
   * @default "rgba(0, 0, 0, 0.66)"
   */
  background?: string
  /** An ID selector for the DOM node that the Modal should attach to
   * @default undefined (the end of the document body)
   */
  appendTo?: string
  /** A custom `aria-label` for screen readers
   * @default "Modal Dialog"
   */
  title?: string
  /** If true, the modal will close when users click the modal overlay
   * @default false
   */
  closeOnBlur?: boolean
  /** A ref that tells the modal where to direct focus when exited */
  focusRef?: React.MutableRefObject<any> | any
  /** Vertically centers your modal content in the center of the page. Only useful for content
   *  that doesn't fill the viewport.
   * @default false
   */
  center?: boolean
  /** Linear easing curve or cubic bezier from css `transition` declaration
   * (ease, ease-in-out, etc.).
   * @default "ease-in-out"
   */
  easing?: string
  /** Lets you customize the different states of the mount / unmount transition
   * @default
   * const transitions: {
   *   start: { opacity: 0 },
   *   entering: { opacity: 1 },
   *   entered: { opacity: 1 },
   *   exiting: { opacity: 0 },
   *   exited: { opacity: 0 },
   * }
   */
  transitionState?: TransitionState
  /** Animation duration in milliseconds
   * @default 300
   */
  duration?: number
  children?: React.ReactNode
}

/**
 * The `Modal` component displays content as a dialog box/popup window.
 * You can close the modal with the 'ESC' key or the optional `closeOnBlur` prop.
 *
 * @link https://maker-ui.com/docs/elements/modal
 */
export const Modal = ({
  appendTo,
  title = 'Modal Dialog',
  closeOnBlur = false,
  show,
  set,
  focusRef,
  center = false,
  background = 'rgba(0, 0, 0, 0.66)',
  className,
  easing,
  duration,
  transitionState,
  children,
  ...props
}: ModalProps) => {
  const modalRef = React.useRef<any>(null)

  const closeModal = React.useCallback(() => {
    if (set) {
      set(false)
    }
    focusRef?.current.focus()
  }, [set, focusRef])

  /**
   * Get important focusable elements.
   */
  const { focusable } = useFocus({
    containerRef: modalRef,
    focusRef,
    show,
  })

  /**
   * Lock body when modal is active
   */
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [show])

  /**
   * Add accessible keyboard shortcuts
   */
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      function previous(e: KeyboardEvent) {
        if (document.activeElement === focusable.first) {
          focusable.last?.focus()
          e.preventDefault()
        }
      }

      function next(e: KeyboardEvent) {
        if (document.activeElement === focusable.last) {
          focusable.first?.focus()
          e.preventDefault()
        }
      }
      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return closeModal()
        case 'Tab':
          if (show && !modalRef?.current.contains(document.activeElement)) {
            return focusable.first?.focus()
          }
          e.shiftKey ? previous(e) : next(e)
          return
        default:
          return
      }
    },
    [closeModal, focusable, show]
  )

  React.useEffect(() => {
    window.addEventListener(`keydown`, handleKeyDown)
    return () => window.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  return (
    <Portal root={appendTo}>
      <Transition
        nodeRef={modalRef}
        show={show as boolean}
        easing={easing}
        timeout={duration}
        transitionState={transitionState}
        containerProps={{
          role: 'dialog',
          className: cn(['modal fixed cover flex justify-center', className]),
          'aria-label': title,
          'aria-modal': 'true',
          tabIndex: focusable.count === 0 ? 0 : undefined,
          style: {
            alignItems: center ? 'center' : undefined,
            zIndex: 101,
            overflowY: 'scroll',
          },
          ...props,
        }}>
        <div
          role="button"
          data-cy="modal-overlay"
          onClick={() => (closeOnBlur ? closeModal() : undefined)}
          className="modal-overlay fixed cover"
          style={{ zIndex: -1, background }}
        />
        {children}
      </Transition>
    </Portal>
  )
}

Modal.displayName = 'Modal'
