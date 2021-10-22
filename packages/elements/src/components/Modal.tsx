import * as React from 'react'
import { useTransition, animated, SpringConfig } from '@react-spring/web'
import { Div, DivProps, mergeSelectors, MakerProps } from 'maker-ui'

import { Portal } from './Portal'
import { useFocus } from '../hooks'

const AnimatedDiv = animated(Div)

export interface ModalProps extends DivProps {
  show?: boolean
  set?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
  background?: string | string[]
  appendTo?: string
  title?: string
  closeOnBlur?: boolean
  focusRef?: React.MutableRefObject<any> | any
  _css?: MakerProps['css']
  center?: boolean
  spring?: SpringConfig
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
  spring,
  className,
  _css,
  css,
  children,
  ...rest
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

  /**
   * Configure react-spring mount animation
   */
  const transition = useTransition(show ? [1] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: spring,
  })

  return (
    <Portal root={appendTo}>
      {transition(
        (props, item) =>
          item && (
            <AnimatedDiv
              ref={modalRef}
              role="dialog"
              className={mergeSelectors(['modal', className])}
              aria-label={title}
              aria-modal="true"
              style={props}
              tabIndex={focusable.count === 0 ? 0 : undefined}
              css={{
                ...position,
                ...centered(center),
                zIndex: 101,
                ...(_css as object),
              }}>
              <Div
                role="button"
                onClick={() => (closeOnBlur ? closeModal() : undefined)}
                className="modal-overlay"
                css={{
                  ...position,
                  zIndex: -1,
                  background,
                }}
              />
              <Div
                className="modal-content"
                css={{
                  zIndex: 1,
                  overflow: 'scroll',
                  height: '100%',
                  ...(css as object),
                }}
                {...rest}>
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
 * Helper positioning object
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
const centered = (val: boolean) =>
  val
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : undefined
