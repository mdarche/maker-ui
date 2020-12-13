import * as React from 'react'
import { useTransition, animated, SpringConfig } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { useFocus } from '../hooks'

const AnimatedDiv = animated(Div)

export interface ModalProps extends DivProps {
  show?: boolean
  toggle?: React.Dispatch<React.SetStateAction<boolean>>
  bg?: string | string
  appendTo?: string
  title?: string
  closeOnBlur?: boolean
  focusRef: React.MutableRefObject<any>
  style?: any
  center?: boolean
  springConfig?: SpringConfig
}

/**
 * The `Modal` component displays content as a dialog box/popup window.
 * You can close the modal with the 'ESC' key or the optional `closeOnBlur` prop.
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
  springConfig,
  ...rest
}: ModalProps) => {
  const modalRef = React.useRef(null)
  const closeModal = React.useCallback(() => {
    toggle(false)
    focusRef?.current.focus()
  }, [toggle, focusRef])

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
      document.body.style.overflow = null
    }
  }, [show])

  /**
   * Add accessible keyboard shortcuts
   */

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      function previous(e: KeyboardEvent) {
        if (document.activeElement === focusable.first) {
          focusable.last.focus()
          e.preventDefault()
        }
      }

      function next(e: KeyboardEvent) {
        if (document.activeElement === focusable.last) {
          focusable.first.focus()
          e.preventDefault()
        }
      }
      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return closeModal()
        case 'Tab':
          if (show && !modalRef?.current.contains(document.activeElement)) {
            return focusable?.first.focus()
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

  /**
   * Configure react-spring mount animation
   */

  const transition = useTransition(show ? [1] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: springConfig,
  })

  return (
    <Portal root={appendTo}>
      {transition(
        (props, item) =>
          item && (
            <AnimatedDiv
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
                zIndex: 101,
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
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}

Modal.displayName = 'Modal'

/**
 * Helper positioning function
 */

const position = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
}

/**
 * Helper centering function
 */

const centered = val =>
  val
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : null
