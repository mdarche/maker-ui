import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Box, BasicBoxProps } from 'maker-ui'

import { Portal } from './Portal'

// TODO add and export a close button and use as a sub-component

const focusElements = [
  'a',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

const AnimatedBox = a(Box)

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

export interface ModalProps extends BasicBoxProps {
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

  const fade = useTransition(show, modalRef, {
    // @ts-ignore
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  // Handle Focus

  useEffect(() => {
    if (show) {
      const elements = modalRef.current.querySelectorAll(focusElements)
      document.body.style.overflow = 'hidden'

      if (elements.length !== 0) {
        setFocusable({
          count: elements.length,
          // @ts-ignore
          elements,
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
          if (focusable.count <= 1) {
            e.preventDefault()
            return
          } else {
            if (e.shiftKey && document.activeElement === focusable.first) {
              e.preventDefault()
              return focusable.last.focus()
            }
            if (!e.shiftKey && document.activeElement === focusable.last) {
              e.preventDefault()
              return focusable.first.focus()
            }
            // @ts-ignore
            if (![...focusable.elements].includes(document.activeElement)) {
              return focusable.first.focus()
            }
            return
          }
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
  }, [show, focusable, closeModal])

  return (
    // @ts-ignore
    <Portal root={appendTo}>
      {fade.map(
        ({ item, key, props }: any) =>
          item && (
            <AnimatedBox
              key={key}
              ref={modalRef}
              variant={variant}
              role="dialog"
              aria-label={title}
              aria-modal="true"
              style={{ ...style, ...props }}
              tabIndex={focusable.count === 0 ? '0' : undefined}
              __css={{
                ...position,
                ...centered(center),
                zIndex: 100,
              }}>
              <Box
                onClick={e => (closeOnBlur ? closeModal() : null)}
                className="modal-overlay"
                variant={`${variant}.overlay`}
                __css={{
                  ...position,
                  zIndex: -1,
                  bg,
                }}
              />
              <Box __css={{ zIndex: 1, overflow: 'scroll' }} {...rest}>
                {children}
              </Box>
            </AnimatedBox>
          )
      )}
    </Portal>
  )
}
