import React, { useState, useLayoutEffect, useRef } from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { useFocusTrap, useResizeObserver, useWindowSize } from '@maker-ui/hooks'
import { Portal } from '@maker-ui/modal'
import { Transition, type TransitionState } from '@maker-ui/transition'
import { type ResponsiveCSS, type Breakpoints, Style } from '@maker-ui/style'

import { getTransition, Position, TransitionType } from './position'

export type Offset = { x: number; y: number } | number

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  css?: ResponsiveCSS
  breakpoints?: Breakpoints
  /** A boolean that indicates if the popover is active. */
  show: boolean
  /** A setter for the show boolean that lets the popover close itself. */
  set: React.Dispatch<React.SetStateAction<boolean>>
  /** A React ref that is used to anchor the position of the Popover. */
  anchorRef: React.RefObject<HTMLElement>
  /** If true, the Popover will match the width of the anchorRef element. Useful for
   * dropdown menus.
   */
  matchWidth?: boolean
  /** The {x, y} position of the popover.
   * @default { x: "origin", y: "bottom" }
   */
  position?: Position
  /** The amount of space (in pixels) between the popover and its anchor element.
   * @default 0
   */
  offset?: Offset
  /** An optional ID selector or React ref that the popover will attach to. Defaults to
   * the document body.
   * @default 0
   */
  appendTo?: string | Element | null
  /** If true, the Popover will prevent keyboard focus from exiting the component.*/
  trapFocus?: boolean
  /** If true, the Popover will close when keyboard focus leaves the component.
   * @default true
   */
  closeOnBlur?: boolean
  /** Predefined transition styles that you can use to toggle the Popover.
   * @default "fade"
   */
  transition?: TransitionType
  /** Lets you customize the different states of the mount / unmount transition instead of using
   * the `transition` prop.
   * @example
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
   * @default 200
   */
  duration?: number
  /** @internal */
  _type?: 'popover' | 'dropdown' | 'tooltip'
  /** The child component of the Popover */
  children: React.ReactNode
}

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or directly to the document body.
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
  matchWidth,
  position = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  offset = 0,
  closeOnBlur = true,
  transition = 'fade-down',
  className,
  breakpoints,
  css,
  duration = 200,
  transitionState,
  children,
  _type = 'popover',
  ...rest
}: PopoverProps) => {
  const [styleId] = useState(generateId())
  const popoverRef = useRef<HTMLDivElement>(null)
  // Inner contents height and width
  const [state, setState] = useState({
    height: 0,
    width: 0,
  })
  // Anchor element measurements
  const [box, setBox] = useState({
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
    isMeasuring: true,
  })
  useWindowSize(resize)
  useResizeObserver({ ref: anchorRef, onResize: resize })
  const { ref } = useResizeObserver({
    onResize: ({ height, width }) => {
      if (height && width) {
        setState({ height, width: matchWidth ? box?.width : width })
      }
    },
  })

  /** Configure animation states based on `transition` and `transitionState` props */

  const animations = getTransition(state.height ? transition : 'none')
  const popoverTransition: TransitionState = (state.height &&
    transitionState) || {
    start: animations.start,
    entering: animations.enter,
    entered: animations.enter,
    exiting: animations.leave,
    exited: animations.leave,
  }

  /** Grab the latest getBoundingClientRect for a the anchor React ref */

  function resize() {
    if (anchorRef.current) {
      const { top, bottom, left, right, x, y, height, width } =
        anchorRef.current.getBoundingClientRect()
      if (!height && !width) return
      if (matchWidth) {
        setState((s) => ({ ...s, width }))
      }
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
        isMeasuring: false,
      })
    }
  }

  /**
   * Get all relevant focusable elements.
   */
  // const { focusable } = useFocus({
  //   containerRef: popoverRef,
  //   focusRef: anchorRef,
  //   show,
  // })

  useFocusTrap(popoverRef, trapFocus && show ? true : false)

  /**
   * Add focus trap and update tab sequence for popovers attached to body
   */
  // const handleKeyDown = useCallback(
  //   (e: KeyboardEvent) => {
  //     const setFocus = (
  //       close?: boolean,
  //       focus?: 'anchor' | 'next' | 'first' | 'last',
  //       preventDefault?: boolean
  //     ) => {
  //       if (close) set(false)
  //       if (preventDefault) e.preventDefault()

  //       return focus === 'anchor'
  //         ? anchorRef.current.focus()
  //         : focus === 'next'
  //         ? focusable.next?.focus()
  //         : focus === 'first'
  //         ? focusable.first?.focus()
  //         : focus === 'last'
  //         ? focusable.last?.focus()
  //         : anchorRef.current.focus()
  //     }

  //     switch (e.code) {
  //       case 'Esc':
  //       case 'Escape':
  //         return trapFocus
  //           ? setFocus(true, _type === 'dropdown' ? 'anchor' : 'next')
  //           : null
  //       case 'Tab':
  //         if (e.shiftKey && document.activeElement === focusable.first) {
  //           return trapFocus
  //             ? setFocus(false, 'last', true)
  //             : closeOnBlur
  //             ? setFocus(true, 'anchor', true)
  //             : null
  //         }
  //         if (!e.shiftKey && document.activeElement === focusable.last) {
  //           return trapFocus
  //             ? setFocus(false, 'first', true)
  //             : setFocus(
  //                 closeOnBlur ? true : false,
  //                 _type === 'dropdown' ? 'anchor' : 'next',
  //                 true
  //               )
  //         }
  //         return
  //       default:
  //         return
  //     }
  //   },
  //   [anchorRef, closeOnBlur, focusable, set, trapFocus, _type]
  // )

  // Lifecycle events

  useLayoutEffect(() => {
    if (show && !box.isMeasuring) {
      setBox({ ...box, measured: false, isMeasuring: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  useLayoutEffect(() => {
    if (box.isMeasuring) {
      resize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.isMeasuring])

  // useEffect(() => {
  //   const ref = popoverRef.current
  //   ref?.addEventListener(`keydown`, handleKeyDown)

  //   return () => ref?.removeEventListener(`keydown`, handleKeyDown)
  // }, [handleKeyDown])

  /**
   * Get the popover's X and Y position by calculating its distance to the anchor ref element.
   * This effect only fires if the anchor ref has already been measured and the `appendTo`
   * prop is not set.
   */
  function getPosition() {
    if (appendTo || !box.measured) return {}
    const gapX = typeof offset === 'object' ? offset.x : offset
    const gapY = typeof offset === 'object' ? offset.y : offset

    const x =
      position.x === 'center'
        ? box.left + box.width / 2 - state.width / 2
        : position.x === 'left'
        ? box.left - state.width - gapX
        : position.x === 'right'
        ? box.right + gapX
        : box.left

    const y =
      position.y === 'top'
        ? box.documentTop - state.height - gapY
        : position.y === 'bottom'
        ? box.documentTop + box.height + gapY
        : position.y === 'center'
        ? box.documentTop + box.height / 2 - state.height / 2
        : 0

    const offscreenX = x < 0 || x + state.width > window.innerWidth
    const offscreenY = y < 0 || y + state.height > window.innerHeight

    return {
      left: offscreenX
        ? position.x === 'left'
          ? 0
          : window.innerWidth - state.width
        : x,
      top: offscreenY
        ? position.y === 'top'
          ? 0
          : window.innerHeight - state.height
        : y,
    }
  }

  return (
    <Portal root={appendTo}>
      <Transition
        show={!state.height ? true : show}
        nodeRef={popoverRef}
        timeout={duration}
        transitionState={popoverTransition}
        containerProps={{
          id,
          className: cn([
            'mkui-popover',
            className,
            show ? 'active' : undefined,
            styleId,
            'absolute',
          ]),
          style: {
            ...getPosition(),
            width: matchWidth ? state.width : undefined,
            visibility: !state.height ? 'hidden' : undefined,
            opacity: !state.height ? 0 : undefined,
          },
          ...rest,
        }}>
        <Style
          root={styleId}
          breakpoints={breakpoints}
          css={{ display: 'block', zIndex: 99, ...css }}
        />
        <div ref={ref} className="mkui-popover-inner">
          {children}
        </div>
      </Transition>
    </Portal>
  )
}

Popover.displayName = 'Popover'
