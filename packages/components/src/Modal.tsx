import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'

// TODO add and export a close button and use as a sub-component

const focusElements = [
  '[href]',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

const AnimatedBox = a(Div)

const position = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
}

const centered = val =>
  val
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : null

export interface ModalProps extends DivProps {
  appendTo?: string
  title?: string
  closeOnBlur?: boolean
  show: boolean
  toggle: Function
  focusRef: any
  style: any
  center: boolean
}

/**
 * The `Modal` component displays content as a dialog box/popup window.
 *
 * @see https://maker-ui.com/docs/components/modal
 */

export const Modal = ({
  appendTo,
  title = 'Modal Dialog',
  closeOnBlur = false,
  variant = 'modal',
  show,
  toggle,
  focusRef,
  center = false,
  bg = 'rgba(0, 0, 0, 0.66)',
  style = {},
  children,
  ...rest
}: ModalProps) => {
  const modalRef = useRef(null)
  const [focusable, setFocusable] = useState({
    count: 0,
    first: null,
    last: null,
  })

  const closeModal = useCallback(() => {
    if (focusRef !== undefined) {
      focusRef.current.focus()
    }

    toggle(false)
  }, [toggle, focusRef])

  const transition = useTransition(show ? [1] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  // Handle Focus

  useEffect(() => {
    if (show && modalRef.current) {
      const elements = modalRef.current.querySelectorAll(focusElements)
      document.body.style.overflow = 'hidden'

      // Look for any nested focusable elements and set focus to the first element in the array
      if (elements.length !== 0) {
        setFocusable({
          count: elements.length,
          first: elements[0],
          last: elements[elements.length - 1],
        })
        elements[0].focus()
      } else {
        modalRef.current.focus()
      }
    } else {
      document.body.style.overflow = null
    }
  }, [show, setFocusable])

  // Handle Keyboard

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.keyCode) {
        case 27: // esc
          return closeModal()
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

    // Add keyboard controls if rendered in the browser

    if (typeof window !== 'undefined') {
      if (show) {
        window.addEventListener(`keydown`, handleKeyDown)
      }
      return () => window.removeEventListener(`keydown`, handleKeyDown)
    }
  }, [show, focusable, closeModal])

  return (
    <Portal root={appendTo}>
      {transition(
        (props, item) =>
          item && (
            <AnimatedBox
              ref={modalRef}
              role="dialog"
              aria-label={title}
              aria-modal="true"
              style={{ ...style, ...props }}
              tabIndex={focusable.count === 0 ? 0 : undefined}
              sx={{
                variant,
                ...position,
                ...centered(center),
                zIndex: 100,
              }}>
              <Div
                role="button"
                onClick={e => (closeOnBlur ? closeModal() : undefined)}
                className="modal-overlay"
                sx={{
                  variant: `${variant}.overlay`,
                  ...position,
                  zIndex: -1,
                  bg,
                }}
              />
              <Div sx={{ zIndex: 1, overflow: 'scroll' }} {...rest}>
                {children}
              </Div>
            </AnimatedBox>
          )
      )}
    </Portal>
  )
}
