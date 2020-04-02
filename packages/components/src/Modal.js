import React, { useRef, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTransition, animated as a } from 'react-spring'
import { Box } from 'theme-ui'

const focusElements = [
  'a',
  'button:not([disabled])',
  'input',
  'textarea',
  'select',
  '[tabIndex]:not([tabIndex="-1"])',
].join(', ')

const AnimatedBox = a(Box)

const Portal = ({ children, root }) => {
  const link = document.getElementById(root)
  return createPortal(children, link)
}

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

const Modal = ({
  id,
  title = 'Modal Dialog',
  closeOnBlur = false,
  show,
  toggle,
  focusRef,
  center = false,
  bg = 'rgba(0, 0, 0, 0.66)',
  style = {},
  children,
  ...rest
}) => {
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

  const fade = useTransition(show, null, {
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
    <Portal root={id}>
      {fade.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedBox
              key={key}
              ref={modalRef}
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

export default Modal
