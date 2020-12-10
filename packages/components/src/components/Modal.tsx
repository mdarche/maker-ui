import * as React from 'react'
import { useTransition, animated, SpringConfig } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { useFocus } from '../hooks'

const AnimatedDiv = animated(Div)

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
  show?: boolean
  toggle?: (state?: boolean | string) => void
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
    if (focusRef !== undefined) {
      focusRef.current.focus()
    }

    toggle()
  }, [toggle, focusRef])

  // Trap focus inside the modal
  const { focusable } = useFocus({
    type: 'modal',
    containerRef: modalRef,
    focusRef,
    show,
    toggle,
    trapFocus: true,
  })

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = null
    }
  }, [show])

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
