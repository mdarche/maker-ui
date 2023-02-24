'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@maker-ui/utils'
import { useFocusTrap, useKeyboardShortcut } from '@maker-ui/hooks'
import { Transition, type TransitionState } from '@maker-ui/transition'

import { Portal } from './Portal'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A boolean that indicates if the modal is active or unmounted */
  show: boolean
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
  focusRef?: React.RefObject<HTMLElement> | null
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
  const ref = useRef<HTMLElement | null>(null)

  const { count } = useFocusTrap(ref, show, () => focusRef?.current?.focus())
  useKeyboardShortcut(
    [{ key: 'Escape', callback: () => set && set(false) }],
    undefined,
    show
  )

  /**
   * Lock body when modal is active
   */
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [show])

  return (
    <Portal root={appendTo}>
      <Transition
        nodeRef={ref}
        show={show as boolean}
        easing={easing}
        timeout={duration}
        transitionState={transitionState}
        containerProps={{
          role: 'dialog',
          className: cn([
            'mkui-modal fixed cover flex',
            center ? 'justify-center align-center' : undefined,
            className,
          ]),
          'aria-label': title,
          'aria-modal': 'true',
          tabIndex: count === 0 ? 0 : undefined,
          style: {
            zIndex: 101,
            overflowY: 'scroll',
          },
          ...props,
        }}>
        <div
          role="button"
          data-cy="modal-overlay"
          onClick={() => (closeOnBlur ? set && set(false) : undefined)}
          className="modal-overlay fixed cover"
          style={{ zIndex: -1, background }}
        />
        {children}
      </Transition>
    </Portal>
  )
}

Modal.displayName = 'Modal'
