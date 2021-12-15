import * as React from 'react'
import { Div, DivProps, StyleObject, mergeSelectors } from 'maker-ui'
import { Transition } from 'react-transition-group'
import { TransitionState } from '../Modal'

import { Portal } from '../Portal'
// import { getSign } from '../helper'
import { useFocus } from '../../hooks'

export interface Position {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}

export interface PopoverProps extends DivProps {
  show: boolean
  set: React.Dispatch<React.SetStateAction<boolean>>
  anchorRef: React.MutableRefObject<any>
  anchorWidth?: boolean
  position?: Position
  gap?: { x: number; y: number } | number
  appendTo?: string | Element | null
  trapFocus?: boolean
  closeOnBlur?: boolean
  _css?: StyleObject
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale'
    | 'none'
  defer?: number
  children: React.ReactNode
  /** Linear easing curve or cubic bezier from css `transition` declaration
   * (ease, ease-in-out, etc.).
   * @default "ease"
   */
  easing?: string
  /** Lets you customize the different states of the mount / unmount transition
   * @default
   * const transitions: {
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
  /** @internal usage only */
  _type?: 'popover' | 'dropdown' | 'tooltip'
}

const defaultTransitions: TransitionState = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or the document body.
 *
 * Use the `Popover` to customize your own components, otherwise try out the pre-configured
 * `Tooltip` or `Dropdown` components.
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Popover = ({
  show,
  set,
  id,
  anchorRef,
  anchorWidth,
  position = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  gap = 0,
  closeOnBlur = true,
  transition = 'fade',
  defer = 100,
  _type = 'popover',
  className,
  _css,
  css,
  easing = 'ease',
  duration = 200,
  transitionState = defaultTransitions,
  children,
  ...rest
}: PopoverProps) => {
  const popoverRef = React.useRef<any>(null)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [initialRender, setInitialRender] = React.useState(true)
  const [box, setBox] = React.useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    documentTop: 0,
    measured: false,
  })

  function resize() {
    if (anchorRef.current) {
      const { top, bottom, left, right, x, y, height, width } =
        anchorRef.current.getBoundingClientRect()
      setBox({
        top,
        bottom,
        left,
        right,
        x,
        y,
        height,
        width,
        documentTop: top + document.documentElement.scrollTop,
        measured: true,
      })
    }
  }

  // Initial Measurement or changing Anchor Ref

  React.useEffect(() => {
    if (anchorRef.current) {
      setTimeout(() => {
        resize()
      }, defer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defer, anchorRef])

  // Browser Resize

  React.useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Measure the popover's child container to calculate its height and width for
   * positioning & the `scale` transition.
   */

  const measuredRef = React.useCallback(
    (node) => {
      if (node !== null && height === 0) {
        setHeight(node.offsetHeight)
        setWidth(node.offsetWidth)
      }
    },
    [height]
  )

  /**
   * Get all relevant focusable elements.
   */

  const { focusable } = useFocus({
    containerRef: popoverRef,
    focusRef: anchorRef,
    show,
  })

  /**
   * If transition = 'scale', activate the popover with `visibility: hidden`
   * to capture height measurement
   */

  React.useEffect(() => {
    if (transition === 'scale' && initialRender) {
      setInitialRender(false)
      // set(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition, set])

  /**
   * Set anchor width measurement
   */

  React.useEffect(() => {
    if (!box.measured) return
    if (anchorWidth) {
      setWidth(box.width)
    }
  }, [box, anchorWidth])

  /**
   * Add focus trap and update tab sequence for popovers attached to body
   */

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const setFocus = (
        close?: boolean,
        focus?: 'anchor' | 'nextEl' | 'first' | 'last',
        preventDefault?: boolean
      ) => {
        if (close) set(false)
        if (preventDefault) e.preventDefault()

        return focus === 'anchor'
          ? anchorRef.current.focus()
          : focus === 'nextEl'
          ? focusable.next?.focus()
          : focus === 'first'
          ? focusable.first?.focus()
          : focus === 'last'
          ? focusable.last?.focus()
          : anchorRef.current.focus()
      }

      switch (e.code) {
        case 'Esc':
        case 'Escape':
          return trapFocus
            ? setFocus(true, _type === 'dropdown' ? 'anchor' : 'nextEl')
            : null
        case 'Tab':
          if (e.shiftKey && document.activeElement === focusable.first) {
            return trapFocus
              ? setFocus(false, 'last', true)
              : closeOnBlur
              ? setFocus(true, 'anchor', true)
              : null
          }
          if (!e.shiftKey && document.activeElement === focusable.last) {
            return trapFocus
              ? setFocus(false, 'first', true)
              : setFocus(
                  closeOnBlur ? true : false,
                  _type === 'dropdown' ? 'anchor' : 'nextEl',
                  true
                )
          }
          return
        default:
          return
      }
    },
    [anchorRef, closeOnBlur, focusable, set, trapFocus, _type]
  )

  React.useEffect(() => {
    const ref = popoverRef.current
    ref?.addEventListener(`keydown`, handleKeyDown)

    return () => ref?.removeEventListener(`keydown`, handleKeyDown)
  }, [handleKeyDown])

  /**
   * Get the popover's X position by calculating its distance to the anchor ref element.
   */

  const gapX = typeof gap === 'object' ? gap.x : gap
  const gapY = typeof gap === 'object' ? gap.y : gap

  const getX = () => {
    if (!box.measured) return
    return position.x === 'center'
      ? box.left + box.width / 2 - width / 2
      : position.x === 'left'
      ? box.left - width - gapX
      : position.x === 'right'
      ? box.right + gapX
      : box.left
  }

  /**
   * Get the popover's Y position by calculating its distance to the anchor ref element.
   */

  const getY = () => {
    if (!box.measured) return
    return position.y === 'top'
      ? box.documentTop - height - gapY
      : position.y === 'bottom'
      ? box.documentTop + box.height + gapY
      : position.y === 'center'
      ? box.documentTop + box.height / 2 - height / 2
      : 0
  }

  return typeof window !== 'undefined' && box.measured ? (
    <Portal root={appendTo}>
      <Transition in={show} timeout={duration} unmountOnExit>
        {(state) => (
          <Div
            id={id}
            ref={popoverRef}
            className={mergeSelectors([
              'popover',
              show ? 'active' : undefined,
              className,
            ])}
            style={{
              transition: `all ${duration}ms ${easing}`,
              ...transitionState[state],
            }}
            css={{
              position: 'absolute',
              display: 'block',
              zIndex: 99,
              left: !appendTo ? getX() : undefined,
              top: !appendTo ? getY() : undefined,
              width: anchorWidth ? width : undefined,
              overflow: transition.includes('scale') ? 'hidden' : undefined,
              ...(_css as object),
            }}
            {...rest}>
            <Div
              ref={measuredRef}
              className="container"
              css={{
                opacity:
                  transition === 'scale' && initialRender ? 0 : undefined,
                visibility:
                  transition === 'scale' && initialRender
                    ? 'hidden'
                    : undefined,
                ...(css as object),
              }}>
              {children}
            </Div>
          </Div>
        )}
      </Transition>
    </Portal>
  ) : null
}

Popover.displayName = 'Popover'

/**
 * Returns a CSS transform string
 */

// const getTransform = (type: string) => {
//   switch (type) {
//     case 'fade-up':
//     case 'fade-down':
//       return `translate3d(0,${getSign(type)}10px,0)`
//     case 'fade-left':
//     case 'fade-right':
//       return `translate3d(${getSign(type)}10px, 0, 0)`
//     case 'fade':
//     default:
//       return `translate3d(0px,0px,0px)`
//   }
// }

/**
 * Configure the useTransition hook
 */

// const getTransition = (transition: string, height: number) => {
//   // No transition
//   if (transition === 'none') {
//     return {
//       from: {
//         visibility: 'hidden',
//       },
//       enter: {
//         visibility: 'visible',
//       },
//       leave: {
//         visibility: 'hidden',
//       },
//     }
//   }
//   // Scale transition
//   if (transition === 'scale') {
//     return {
//       from: {
//         height: '0px',
//       },
//       enter: {
//         height: `${height}px`,
//       },
//       leave: {
//         height: '0px',
//       },
//     }
//   }
//   // Fade transition & default
//   return {
//     from: {
//       opacity: 0,
//       transform: getTransform(transition),
//     },
//     enter: {
//       opacity: 1,
//       transform: `translate3d(0px,0px,0px)`,
//     },
//     leave: {
//       opacity: 0,
//       transform: getTransform(transition),
//     },
//   }
// }
